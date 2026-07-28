# DataShare — Documentation du projet

## Présentation

**DataShare** est une plateforme de transfert sécurisé de fichiers (type WeTransfer) développée dans le cadre d'une mission professionnelle de formation.

Elle permet aux utilisateurs de :
- Uploader des fichiers avec une date d'expiration
- Protéger les fichiers par mot de passe
- Obtenir un lien de téléchargement unique pouvant être partagé
- Télécharger des fichiers en cours de validité
- Gérer l'historique de ses fichiers

## Architecture

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Frontend | Angular | 21.x |
| Backend | Spring Boot | 3.5.x |
| Base de données | PostgreSQL | 15 |
| Conteneurisation | Docker | 24.x |
| Authentification | JWT | HS256 |

## Structure du repo datashare

    datashare/
    ├── docs/             ← Documentation (ce dossier)
    │   ├── architecture/ ← Schémas MCD et architecture
    │   ├── quality/      ← TESTING.md, SECURITY.md, PERF.md, MAINTENANCE.md
    │   └── screenshots/  ← Captures d'écran
    ├── backend/          ← API Spring Boot
    ├── frontend/         ← Application Angular
    ├── compose.yml       ← Lance tout avec Docker
    └── README.md         ← Installation globale

## Structure du docs
[capture](./screenshots/docs-structure-repository.png)

## Documentation

| Document | Description |
|----------|-------------|
| [TESTING.md](./quality/TESTING.md) | Plan de tests, résultats JUnit/Jest/Cypress, couverture JaCoCo |
| [SECURITY.md](./quality/SECURITY.md) | Scan de sécurité npm audit et Maven, mesures implémentées |
| [PERF.md](./quality/PERF.md) | Tests de performance k6 sur l'endpoint upload |
| [MAINTENANCE.md](./quality/MAINTENANCE.md) | Procédures de maintenance et mise à jour |

## Liens utiles

| Ressource | Lien |
|-----------|------|
| Repository GitHub (monorepo) | https://github.com/gmt86/datashare |
| Swagger UI | http://localhost:8080/swagger-ui.html |
| API Docs (OpenAPI) | http://localhost:8080/api-docs |

## Installation rapide

### Option A — Docker (recommandé)

```bash
git clone git@github.com:gmt86/datashare.git
cd datashare
docker compose up --build
```

- Frontend : http://localhost:4200
- Swagger UI : http://localhost:8080/swagger-ui.html

### Option B — Manuel

```bash
# 1. Cloner le monorepo
git clone git@github.com:gmt86/datashare.git
cd datashare

# 2. Démarrer la base de données
cd backend
docker compose up postgres -d

# 3. Lancer le backend
./mvnw spring-boot:run

# 4. Lancer le frontend
cd ../frontend
npm install
ng serve
```

➡️ Application disponible sur `http://localhost:4200`

## Fonctionnalités

| US | Fonctionnalité | Statut |
|----|---------------|--------|
| US01 | Upload de fichier | ✅ |
| US02 | Téléchargement via lien | ✅ |
| US03 | Création de compte | ✅ |
| US04 | Connexion | ✅ |
| US05 | Historique des fichiers | ✅ |
| US06 | Suppression de fichier | ✅ |
