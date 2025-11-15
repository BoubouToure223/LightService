# 📧 Guide de Configuration Resend - Light Service

## ✅ **Resend est maintenant installé et configuré !**

Le formulaire de contact est prêt à envoyer des emails. Il ne reste plus qu'à configurer votre clé API.

---

## 🚀 **Étapes de Configuration**

### **1. Créer un compte Resend** (Gratuit)

1. Allez sur : **https://resend.com**
2. Cliquez sur **"Sign Up"** (Inscription)
3. Créez votre compte (gratuit jusqu'à 3000 emails/mois)

### **2. Obtenir votre clé API**

1. Une fois connecté, allez dans **"API Keys"** (Clés API)
2. Cliquez sur **"Create API Key"** (Créer une clé API)
3. Donnez un nom (ex: "Light Service Production")
4. Copiez la clé API (elle commence par `re_`)

### **3. Vérifier votre domaine (Important)**

Pour envoyer depuis `contact@lightservice.ml`, vous devez :

1. Aller dans **"Domains"** (Domaines)
2. Cliquez sur **"Add Domain"** (Ajouter un domaine)
3. Entrez : `lightservice.ml`
4. Suivez les instructions pour ajouter les enregistrements DNS

**Note** : En attendant la vérification, vous pouvez utiliser l'email de test de Resend : `onboarding@resend.dev`

### **4. Créer le fichier `.env.local`**

Créez un fichier `.env.local` à la racine du projet avec :

```env
# Email qui recevra les messages
CONTACT_EMAIL=contact@lightservice.ml

# Email d'expéditeur (doit être vérifié dans Resend)
FROM_EMAIL=contact@lightservice.ml

# Clé API Resend (obtenue depuis le dashboard)
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

**⚠️ Important** : 
- Ne commitez **JAMAIS** le fichier `.env.local` dans Git
- Ce fichier est déjà dans `.gitignore`

---

## 🧪 **Tester le Formulaire**

### **Mode Développement (sans clé API)**
- Les messages sont loggés dans la console
- Le formulaire fonctionne mais n'envoie pas d'email réel

### **Mode Production (avec clé API)**
1. Ajoutez votre clé API dans `.env.local`
2. Redémarrez le serveur : `npm run dev`
3. Testez le formulaire
4. Vous recevrez l'email à l'adresse configurée dans `CONTACT_EMAIL`

---

## 📧 **Format de l'Email Reçu**

L'email reçu contiendra :
- ✅ **Sujet** : "Nouveau message de contact - [Nom]"
- ✅ **Expéditeur** : Contact Light Service <contact@lightservice.ml>
- ✅ **Destinataire** : L'email configuré dans `CONTACT_EMAIL`
- ✅ **Reply-To** : L'email du visiteur (pour répondre directement)
- ✅ **Contenu** : Nom, Email, Message formaté en HTML

---

## 🔧 **Configuration Avancée**

### **Changer l'email de destination**

Modifiez dans `.env.local` :
```env
CONTACT_EMAIL=votre-autre-email@exemple.com
```

### **Utiliser plusieurs destinataires**

Modifiez `app/api/contact/route.ts` ligne 56 :
```typescript
to: [recipientEmail, "autre-email@exemple.com"],
```

### **Personnaliser le template email**

Le template HTML est dans `app/api/contact/route.ts` (lignes 59-101).
Vous pouvez le modifier selon vos besoins.

---

## ✅ **Vérification**

Une fois configuré, testez le formulaire :

1. ✅ Le formulaire valide les champs
2. ✅ Le bouton affiche "Envoi en cours..." pendant l'envoi
3. ✅ Une notification de succès s'affiche
4. ✅ Vous recevez l'email à l'adresse configurée

---

## 🆘 **Dépannage**

### **Erreur "Resend non configuré"**
→ Vérifiez que `RESEND_API_KEY` est bien dans `.env.local`
→ Redémarrez le serveur après modification

### **Erreur "Domain not verified"**
→ Vérifiez votre domaine dans Resend
→ Utilisez temporairement `onboarding@resend.dev` comme FROM_EMAIL

### **Email non reçu**
→ Vérifiez les logs du serveur
→ Vérifiez votre spam
→ Vérifiez que `CONTACT_EMAIL` est correct

---

## 📊 **Statistiques**

Resend fournit un dashboard avec :
- Nombre d'emails envoyés
- Taux de délivrabilité
- Historique des envois

---

**Configuration terminée ! 🎉**

Une fois la clé API ajoutée, le formulaire enverra les emails en temps réel.





