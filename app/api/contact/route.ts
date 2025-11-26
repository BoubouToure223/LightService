import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import * as z from "zod"

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const rl = new Map<string, { count: number; resetAt: number }>()

function getClientIp(req: NextRequest) {
  const xf = req.headers.get("x-forwarded-for") || ""
  return (xf.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim()
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const entry = rl.get(ip)
  if (!entry || now > entry.resetAt) {
    rl.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  entry.count += 1
  rl.set(ip, entry)
  return entry.count > RATE_LIMIT_MAX
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

const bodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional(), // honeypot: must be empty
  cfToken: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    if (isRateLimited(ip)) {
      console.warn("contact_rate_limited", { ip, timestamp: new Date().toISOString() })
      return NextResponse.json({ error: "Trop de requêtes. Réessayez plus tard." }, { status: 429 })
    }

    const contentLength = Number(request.headers.get("content-length") || 0)
    const MAX_BYTES = 51_200 // 50KB
    if (contentLength && contentLength > MAX_BYTES) {
      return NextResponse.json({ error: "Requête trop volumineuse." }, { status: 413 })
    }

    // Lire d'abord le texte pour imposer une borne même si content-length est absent
    const raw = await request.text()
    if (raw.length > MAX_BYTES) {
      return NextResponse.json({ error: "Requête trop volumineuse." }, { status: 413 })
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(raw || "{}")
    } catch {
      console.warn("contact_invalid_json", { ip, timestamp: new Date().toISOString() })
      return NextResponse.json({ error: "JSON invalide" }, { status: 400 })
    }

    const parsedResult = bodySchema.safeParse(parsed)
    if (!parsedResult.success) {
      console.warn("contact_invalid_body", { ip, timestamp: new Date().toISOString() })
      return NextResponse.json({ error: "Données invalides" }, { status: 400 })
    }

    const { name, email, message, website, cfToken } = parsedResult.data as { name: string; email: string; message: string; website?: string; cfToken?: string }

    // Honeypot: bots often fill hidden fields
    if (website && website.trim().length > 0) {
      console.warn("contact_honeypot_triggered", { ip, timestamp: new Date().toISOString() })
      return NextResponse.json({ error: "Requête invalide" }, { status: 400 })
    }

    // Basic CSRF/automation mitigation: require XMLHttpRequest header from our form
    const xrwh = request.headers.get("x-requested-with")
    if (!xrwh || xrwh.toLowerCase() !== "xmlhttprequest") {
      console.warn("contact_missing_xhr_header", { ip, timestamp: new Date().toISOString() })
      return NextResponse.json({ error: "En-tête de requête manquant" }, { status: 400 })
    }

    const tsSecret = process.env.TURNSTILE_SECRET_KEY
    if (tsSecret) {
      if (!cfToken || cfToken.length < 10) {
        console.warn("contact_turnstile_missing_token", { ip, timestamp: new Date().toISOString() })
        return NextResponse.json({ error: "Vérification requise" }, { status: 400 })
      }
      const form = new URLSearchParams()
      form.append("secret", tsSecret)
      form.append("response", cfToken)
      form.append("remoteip", ip)
      const vRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: form,
      })
      const vJson = (await vRes.json()) as { success?: boolean }
      if (!vJson?.success) {
        console.warn("contact_turnstile_failed", { ip, timestamp: new Date().toISOString() })
        return NextResponse.json({ error: "Vérification échouée" }, { status: 400 })
      }
    }

    // Validation basique
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      )
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      )
    }

    // Email de destination (configuré via variable d'environnement)
    const recipientEmail = process.env.CONTACT_EMAIL || "contact@lightservice.tech"
    const fromEmail = process.env.FROM_EMAIL || "contact@lightservice.tech"
    const resendApiKey = process.env.RESEND_API_KEY

    // Si Resend n'est pas configuré, on log seulement (mode développement)
    if (!resendApiKey) {
      console.warn("Resend non configuré - message reçu", {
        recipientEmail,
        timestamp: new Date().toISOString(),
      })
      return NextResponse.json(
        {
          success: true,
          message: "Votre message a été reçu.",
        },
        { status: 200 }
      )
    }

    // Envoi réel avec Resend
    try {
      const resend = new Resend(resendApiKey)

      const safeName = escapeHtml(name)
      const safeEmail = escapeHtml(email)
      const safeMessage = escapeHtml(message).replace(/\n/g, "<br>")

      const { data, error } = await resend.emails.send({
        from: `Contact Light Service <${fromEmail}>`,
        to: [recipientEmail],
        replyTo: email,
        subject: `Nouveau message de contact - ${safeName}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #F97C30 0%, #e66a1f 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #F97C30; }
                .message-box { background: white; padding: 15px; border-left: 4px solid #F97C30; margin-top: 10px; }
                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>Nouveau message de contact</h2>
                  <p>Light Service - Formulaire de contact</p>
                </div>
                <div class="content">
                  <div class="field">
                    <span class="label">Nom :</span> ${safeName}
                  </div>
                  <div class="field">
                    <span class="label">Email :</span> <a href="mailto:${safeEmail}">${safeEmail}</a>
                  </div>
                  <div class="field">
                    <span class="label">Message :</span>
                    <div class="message-box">
                      ${safeMessage}
                    </div>
                  </div>
                  <div class="footer">
                    <p>Message reçu le ${new Date().toLocaleString("fr-FR")}</p>
                    <p>Vous pouvez répondre directement à cet email pour contacter ${safeName}.</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
        text: `
Nouveau message de contact - Light Service

Nom: ${safeName}
Email: ${safeEmail}

Message:
${safeMessage}

---
Message reçu le ${new Date().toLocaleString("fr-FR")}
Vous pouvez répondre directement à cet email pour contacter ${safeName}.
        `,
      })

      if (error) {
        console.error("Erreur Resend:", error)
        throw new Error("Erreur lors de l'envoi de l'email")
      }

      console.log("Email envoyé via Resend", {
        emailId: data?.id,
        recipientEmail,
        timestamp: new Date().toISOString(),
      })
    } catch (emailError) {
      console.error("Erreur lors de l'envoi de l'email:", emailError)
      throw emailError
    }

    // Réponse de succès
    return NextResponse.json(
      {
        success: true,
        message: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("contact_unhandled_error", {
      error,
      timestamp: new Date().toISOString(),
    })
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer plus tard.",
      },
      { status: 500 }
    )
  }
}

