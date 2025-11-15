# 📧 Configuration de l'Envoi d'Email - Light Service

## ✅ Ce qui a été ajouté

### 1. **API Route** (`app/api/contact/route.ts`)
- ✅ Route API pour recevoir les messages de contact
- ✅ Validation des données
- ✅ Gestion des erreurs
- ✅ Prêt pour intégration avec un service d'email

### 2. **Formulaire de Contact Amélioré** (`components/contact.tsx`)
- ✅ Validation avec **react-hook-form** + **Zod**
- ✅ Messages d'erreur en temps réel
- ✅ État de chargement pendant l'envoi
- ✅ Notifications toast (succès/erreur)
- ✅ Réinitialisation automatique après succès
- ✅ Désactivation des champs pendant l'envoi

---

## 📬 **Qui recevra les messages ?**

Par défaut, les messages seront envoyés à : **`contact@lightservice.ml`**

Vous pouvez changer cet email en créant un fichier `.env.local` à la racine du projet :

```env
CONTACT_EMAIL=votre-email@exemple.com
```

**Important** : Actuellement, les messages sont seulement loggés dans la console. Pour recevoir réellement les emails, vous devez configurer un service d'email (voir options ci-dessous).

---

## 🔧 Configuration de l'Envoi d'Email

### **Option 1 : Resend (Recommandé - Gratuit jusqu'à 3000 emails/mois)**

1. **Créer un compte** : https://resend.com
2. **Obtenir la clé API** : Dashboard → API Keys
3. **Installer le package** :
```bash
npm install resend
```
4. **Ajouter les variables d'environnement** :
Créez un fichier `.env.local` à la racine du projet :
```env
# L'email qui recevra les messages
CONTACT_EMAIL=contact@lightservice.ml

# Email d'expéditeur (doit être vérifié dans Resend)
FROM_EMAIL=contact@lightservice.ml

# Clé API Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
```
5. **Modifier `app/api/contact/route.ts`** :
Décommentez et configurez le code Resend dans la route API.

---

### **Option 2 : Nodemailer (SMTP)**

1. **Installer le package** :
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```
2. **Ajouter les variables d'environnement** (`.env.local`) :
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-app
CONTACT_EMAIL=contact@lightservice.ml
```
3. **Modifier `app/api/contact/route.ts`** :
```typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

await transporter.sendMail({
  from: process.env.SMTP_USER,
  to: process.env.CONTACT_EMAIL,
  replyTo: email,
  subject: `Nouveau message de ${name}`,
  html: `
    <h2>Nouveau message de contact</h2>
    <p><strong>Nom:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `,
})
```

---

### **Option 3 : SendGrid**

1. **Créer un compte** : https://sendgrid.com
2. **Installer le package** :
```bash
npm install @sendgrid/mail
```
3. **Ajouter la variable d'environnement** :
```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
CONTACT_EMAIL=contact@lightservice.ml
```
4. **Modifier `app/api/contact/route.ts`** :
```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

await sgMail.send({
  to: process.env.CONTACT_EMAIL!,
  from: 'contact@lightservice.ml',
  replyTo: email,
  subject: `Nouveau message de ${name}`,
  html: `
    <h2>Nouveau message de contact</h2>
    <p><strong>Nom:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `,
})
```

---

### **Option 4 : Webhook (Zapier, Make, etc.)**

Pour utiliser un webhook externe :

```typescript
await fetch(process.env.WEBHOOK_URL!, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  }),
})
```

---

## 🧪 Test du Formulaire

### **Mode Développement**
1. Le formulaire fonctionne déjà en mode développement
2. Les messages sont loggés dans la console du serveur
3. Les notifications toast s'affichent

### **Mode Production**
1. Configurez un service d'email (voir options ci-dessus)
2. Ajoutez les variables d'environnement
3. Décommentez/modifiez le code d'envoi dans `app/api/contact/route.ts`
4. Testez l'envoi réel

---

## 📋 Fonctionnalités du Formulaire

✅ **Validation en temps réel**
- Nom : minimum 2 caractères
- Email : format valide
- Message : minimum 10 caractères

✅ **Feedback utilisateur**
- Messages d'erreur sous chaque champ
- Indicateur de chargement
- Notifications toast (succès/erreur)
- Réinitialisation automatique

✅ **Sécurité**
- Validation côté serveur
- Protection contre les injections
- Gestion des erreurs

---

## 🚀 Prochaines Étapes

1. **Choisir un service d'email** (Resend recommandé)
2. **Configurer les variables d'environnement**
3. **Modifier la route API** avec le code d'envoi
4. **Tester en production**

---

**Note** : Pour l'instant, les messages sont loggés dans la console. Configurez un service d'email pour l'envoi réel.

