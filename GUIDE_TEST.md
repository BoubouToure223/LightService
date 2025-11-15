# 🧪 Guide de Test - Light Service

## 📋 Commandes pour Tester le Projet

### 1️⃣ **Mode Développement** (pour tester rapidement)

```bash
npm run dev
```

Puis ouvrez : **http://localhost:3000**

---

### 2️⃣ **Build de Production** (recommandé pour tester les optimisations)

```bash
npm run build
```

Cette commande va :
- ✅ Compiler le projet en mode production
- ✅ Optimiser tous les assets
- ✅ Générer les pages statiques
- ✅ Afficher les statistiques de build

---

### 3️⃣ **Démarrer le Serveur de Production**

Après le build, lancez :

```bash
npm start
```

Puis ouvrez : **http://localhost:3000**

---

## 🔍 **Tester les Performances**

### **Option 1 : Lighthouse (Chrome DevTools)**

1. Ouvrez Chrome
2. Allez sur `http://localhost:3000`
3. Ouvrez les DevTools (F12)
4. Onglet **Lighthouse**
5. Sélectionnez :
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
6. Cliquez sur **"Analyze page load"**

### **Option 2 : Lighthouse CLI** (si installé)

```bash
# Installer Lighthouse globalement (optionnel)
npm install -g lighthouse

# Tester le site
lighthouse http://localhost:3000 --view
```

### **Option 3 : Web Vitals (Extension Chrome)**

1. Installez l'extension "Web Vitals" depuis le Chrome Web Store
2. Visitez votre site
3. L'extension affichera les métriques en temps réel

---

## 📊 **Métriques à Vérifier**

### **Performance**
- ✅ **FCP** (First Contentful Paint) : < 1.8s
- ✅ **LCP** (Largest Contentful Paint) : < 2.5s
- ✅ **TBT** (Total Blocking Time) : < 200ms
- ✅ **CLS** (Cumulative Layout Shift) : < 0.1
- ✅ **Speed Index** : < 3.4s

### **Score Lighthouse**
- ✅ **Performance** : 90-100
- ✅ **Accessibility** : 95-100
- ✅ **Best Practices** : 95-100
- ✅ **SEO** : 95-100

---

## 🚀 **Commandes Rapides**

### **Tout en une fois** (Build + Start)

```bash
npm run build && npm start
```

### **Mode Développement**

```bash
npm run dev
```

### **Vérifier les erreurs**

```bash
npm run lint
```

---

## 📝 **Checklist de Test**

- [ ] Le site se charge rapidement
- [ ] Les images sont optimisées (format WebP/AVIF)
- [ ] Le lazy loading fonctionne (composants chargés au scroll)
- [ ] Le header change au scroll
- [ ] Les animations sont fluides
- [ ] Le site est responsive (mobile/tablette/desktop)
- [ ] Les liens fonctionnent
- [ ] Le formulaire de contact fonctionne
- [ ] Pas d'erreurs dans la console
- [ ] Score Lighthouse > 90

---

## 🐛 **En cas de problème**

### **Erreur de build**
```bash
# Nettoyer le cache
rm -rf .next
npm run build
```

### **Port déjà utilisé**
```bash
# Changer le port (dans package.json ou directement)
PORT=3001 npm start
```

### **Vérifier les dépendances**
```bash
npm install
```

---

## ✅ **Résultat Attendu**

Après toutes les optimisations, vous devriez voir :

- ⚡ **Chargement rapide** (< 2s)
- 📦 **Bundle optimisé** (~280KB)
- 🖼️ **Images optimisées** (AVIF/WebP)
- 🎯 **Score Lighthouse élevé** (90+)
- 📱 **Responsive parfait**
- ✨ **Animations fluides**

---

**Bon test ! 🚀**


