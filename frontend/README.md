# DataShare — Frontend

Application Angular pour la plateforme de transfert de fichiers DataShare.

---

## 🛠️ Stack technique

| Technologie | Version | Rôle |
|-------------|---------|------|
| Angular | 21.x | Framework frontend |
| TypeScript | 5.9.x | Langage |
| SCSS | - | Styles |
| Jest | 30.x | Tests unitaires |
| Cypress | 15.x | Tests E2E |
| RxJS | 7.8.x | Programmation réactive |

---

## 📋 Prérequis

- Node.js 24.x
- npm 10.x
- Angular CLI 21.x
- Git

---

## ⚙️ Installation

### 1. Cloner le repository

```bash
git clone git@github.com:gmt86/DevOps-Projet_3-frontend---Pilotez_le_developpement_d_une_solution_informatique.git
cd frontend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer le proxy

Le fichier `proxy.conf.json` configuré pour pointer vers le backend :

```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false
  }
}
```

Il redirige automatiquement toutes les requêtes commençant par `/api` vers le backend Spring Boot (`http://localhost:8080`).

**Exemple :**
- Angular envoie : `/api/auth/login`
- Le proxy redirige vers : `http://localhost:8080/api/auth/login`

Cela évite les erreurs CORS en développement et permet aux services Angular d'utiliser des URLs courtes comme `/api/...` sans connaître l'adresse complète du backend.

### 4. Lancer le frontend

```bash
ng serve
```

➡️ Application disponible sur `http://localhost:4200`

---

## 📁 Structure du projet
![Structure frontend](https://raw.githubusercontent.com/gmt86/DevOps-Projet_3-docs---Pilotez_le_developpement_d_une_solution_informatique/main/screenshots/frontend-structure-1.png)
![Structure frontend](https://raw.githubusercontent.com/gmt86/DevOps-Projet_3-docs---Pilotez_le_developpement_d_une_solution_informatique/main/screenshots/frontend-structure-2.png)


---

## 🧪 Tests

### Tests unitaires (Jest)

```bash
npm run test:jest
```

Résultat attendu : **61 tests — 16 suites** ✅

### Tests avec couverture

```bash
npm run test:jest:coverage
```
![frontend coverage](https://raw.githubusercontent.com/gmt86/DevOps-Projet_3-docs---Pilotez_le_developpement_d_une_solution_informatique/main/screenshots/frontend-couverture-test.png)

### Tests E2E (Cypress)

```bash
# Backend et frontend doivent être démarrés
npx cypress open
# ou en mode headless
npx cypress run
```

Résultat attendu : **12 tests — 2 suites** ✅

![e2e test](https://raw.githubusercontent.com/gmt86/DevOps-Projet_3-docs---Pilotez_le_developpement_d_une_solution_informatique/main/screenshots/frontend-e2e-auth.png)
![e2e test](https://raw.githubusercontent.com/gmt86/DevOps-Projet_3-docs---Pilotez_le_developpement_d_une_solution_informatique/main/screenshots/frontend-e2e-gestionFichier.png)
---

## 📱 Responsive Design

| Taille | Breakpoint | Comportement |
|--------|-----------|--------------|
| Desktop | > 430px | Layout complet |
| Mobile | ≤ 430px | Sidebar hamburger, card en bas |

---

## 🔒 Sécurité

- JWT Interceptor — token ajouté automatiquement
- Auth Guard — protection des routes
- Validation des formulaires — Angular Reactive Forms
- Redirection automatique vers login si non authentifié

---


