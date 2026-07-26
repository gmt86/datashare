---

## Stack technique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Frontend | Angular | 21.x |
| Backend | Spring Boot | 3.5.x |
| Base de données | PostgreSQL | 15 |
| Conteneurisation | Docker | 24.x |
| Authentification | JWT | HS256 |

---

## Installation et lancement

### Prérequis

- Java 21
- Node.js 24.x
- Docker et Docker Compose
- Angular CLI 21.x

### 1. Cloner le repository

```bash
git clone git@github.com:gmt86/datashare.git
cd datashare
```

### 2. Démarrer la base de données

```bash
docker compose up -d
```

### 3. Configurer et lancer le backend

```bash
cd backend
# Le fichier .env est déjà configuré
./mvnw spring-boot:run
```

➡️ API disponible sur `http://localhost:8080`
➡️ Swagger UI : `http://localhost:8080/swagger-ui.html`

### 4. Lancer le frontend

```bash
cd frontend
npm install
ng serve
```

➡️ Application disponible sur `http://localhost:4200`

---

## Tests

### Backend (JUnit — 64 tests — 86% couverture)

```bash
cd backend
docker compose up postgres-test -d  # BDD de test isolée
./mvnw test
```

### Frontend (Jest — 61 tests)

```bash
cd frontend
npm run test:jest
```

### E2E (Cypress — 12 tests)

```bash
# Backend et frontend doivent être démarrés
cd frontend
npx cypress open
```

### Performance (k6)

```bash
cd backend
k6 run k6/upload-test.js
```

---

## Documentation

| Document | Description |
|----------|-------------|
| [TESTING.md](./docs/quality/TESTING.md) | Plan et résultats de tests |
| [SECURITY.md](./docs/quality/SECURITY.md) | Analyse de sécurité |
| [PERF.md](./docs/quality/PERF.md) | Tests de performance |
| [MAINTENANCE.md](./docs/quality/MAINTENANCE.md) | Procédures de maintenance |

---

## Liens utiles

| Ressource | Lien |
|-----------|------|
| Swagger UI | http://localhost:8080/swagger-ui.html |
| API Docs | http://localhost:8080/api-docs |

---

## Fonctionnalités

| US | Fonctionnalité | Statut |
|----|---------------|--------|
| US01 | Upload de fichier | ✅ |
| US02 | Téléchargement via lien | ✅ |
| US03 | Création de compte | ✅ |
| US04 | Connexion sécurisée | ✅ |
| US05 | Historique des fichiers | ✅ |
| US06 | Suppression de fichier | ✅ |
