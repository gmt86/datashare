# DataShare — Monorepo

Plateforme de transfert sécurisé de fichiers (type WeTransfer).

## Structure du monorepo

    datashare/
    ├── backend/          ← API REST Spring Boot 3.5
    │   ├── Dockerfile    ← Image Docker backend
    │   └── k6/           ← Scripts de performance
    ├── frontend/         ← Application Angular 21
    │   ├── Dockerfile    ← Image Docker frontend
    │   └── nginx.conf    ← Configuration Nginx
    ├── docs/             ← Documentation technique
    │   ├── architecture/ ← Schémas MCD et architecture
    │   ├── quality/      ← TESTING.md, SECURITY.md, PERF.md, MAINTENANCE.md
    │   └── screenshots/  ← Captures d'écran
    ├── compose.yml       ← Lance tout (PostgreSQL + Backend + Frontend)
    └── README.md         ← Ce fichier

## Stack technique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Frontend | Angular | 21.x |
| Backend | Spring Boot | 3.5.x |
| Base de données | PostgreSQL | 15 |
| Conteneurisation | Docker | 24.x |
| Authentification | JWT | HS256 |
| Serveur web | Nginx | Alpine |

## Installation et lancement

### Prérequis

- Docker et Docker Compose

### Option A — Lancement complet avec Docker (recommandé)

```bash
git clone git@github.com:gmt86/datashare.git
cd datashare
docker compose up --build
```

- Frontend : http://localhost:4200
- Backend API : http://localhost:8080
- Swagger UI : http://localhost:8080/swagger-ui.html

### Option B — Lancement manuel (développement)

#### Prérequis supplémentaires
- Java 21
- Node.js 24.x
- Angular CLI 21.x

#### 1. Démarrer la base de données

```bash
cd backend
docker compose up postgres -d
```

#### 2. Lancer le backend

```bash
cd backend
./mvnw spring-boot:run
```

#### 3. Lancer le frontend

```bash
cd frontend
npm install
ng serve
```

## Tests

### Backend (JUnit — 64 tests — 86% couverture)

```bash
cd backend
docker compose up postgres-test -d  # BDD de test isolée port 5433
./mvnw test
```

### Frontend (Jest — 61 tests)

```bash
cd frontend
npm run test:jest
```

### E2E (Cypress — 12 tests)

```bash
cd frontend
npx cypress open
```

### Performance (k6)

```bash
cd backend
k6 run k6/upload-test.js
```

## Documentation

| Document | Description |
|----------|-------------|
| [TESTING.md](./docs/quality/TESTING.md) | Plan et résultats de tests |
| [SECURITY.md](./docs/quality/SECURITY.md) | Analyse de sécurité |
| [PERF.md](./docs/quality/PERF.md) | Tests de performance |
| [MAINTENANCE.md](./docs/quality/MAINTENANCE.md) | Procédures de maintenance |

## Liens utiles

| Ressource | Lien |
|-----------|------|
| Swagger UI | http://localhost:8080/swagger-ui.html |
| API Docs | http://localhost:8080/api-docs |

## Fonctionnalités

| US | Fonctionnalité | Statut |
|----|---------------|--------|
| US01 | Upload de fichier | ✅ |
| US02 | Téléchargement via lien | ✅ |
| US03 | Création de compte | ✅ |
| US04 | Connexion sécurisée | ✅ |
| US05 | Historique des fichiers | ✅ |
| US06 | Suppression de fichier | ✅ |
