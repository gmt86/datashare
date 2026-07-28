# Plan de tests DataShare


| # | Fonctionnalité | Type de test | Outil   | Critère d'acceptation                          |
|---|----------------|--------------|-------  |------------------------------------------------|
| 1 | Inscription    | Unitaire     | JUnit   | Email unique, password hashé, 201 retourné     |
| 2 | Connexion      | Unitaire     | JUnit   | Token JWT valide retourné, 401 si mauvais mdp  |
| 3 | Upload fichier | Unitaire     | JUnit   | Fichier sauvegardé, métadonnées en BDD         |
| 4 | Téléchargement | Unitaire     | JUnit   | Fichier retourné, 404 si token invalide        |
| 5 | Suppression    | Unitaire     | JUnit   | Fichier supprimé physiquement et en BDD        |
| 6 | AuthService    | Unitaire     | Jest    | Token stocké, isAuthenticated() retourne true  |
| 7 | ErrorService   | Unitaire     | Jest    | Messages d'erreur corrects selon code HTTP     |
| 8 | FichierService | Unitaire     | Jest    | uploadFichier() appelle bien l'API             |
| 9 | Flux complet   | E2E          | Cypress | Inscription → Upload → Download → Suppression |
| 10 | Auth flux     | E2E          | Cypress | Login → Accès espace personnel → Déconnexion   |

## Seuil de couverture
Objectif : **70% minimum** ✅ Atteint : **86% backend** | **82% frontend**

## Résultats JUnit

| Classe | Tests | Statut |
|--------|-------|--------|
| `AuthServiceImplTest` | 4 | ✅ |
| `FichierServiceImplTest` | 10 | ✅ |
| `StorageServiceImplTest` | 6 | ✅ |
| `JwtServiceImplTest` | 5 | ✅ |
| `AuthControllerTest` | 4 | ✅ |
| `FichierControllerTest` | 7 | ✅ |
| `GlobalExceptionHandlerTest` | 6 | ✅ |
| `JwtAuthenticationFilterTest` | 5 | ✅ |
| `FichierMapperTest` | 4 | ✅ |
| `UtilisateurMapperTest` | 2 | ✅ |
| `UtilisateurTest` | 4 | ✅ |
| `ErrorCodeTest` | 5 | ✅ |
| `BackendApplicationTests` | 1 | ✅ |
| **Total** | **66** | ✅ |

## Résultats Jest

| Fichier | Tests | Statut |
|---------|-------|--------|
| `auth.service.spec.ts` | 6 | ✅ |
| `error.service.spec.ts` | 6 | ✅ |
| `fichier.service.spec.ts` | 4 | ✅ |
| `user.service.spec.ts` | 3 | ✅ |
| `auth.guard.spec.ts` | 3 | ✅ |
| `jwt.interceptor.spec.ts` | 5 | ✅ |
| Composants | 56 | ✅ |
| **Total** | **83** | ✅ |

## Rapport de couverture JaCoCo

Couverture atteinte : **88%** et se trouve dans /target/site/jacoco/index.html

![Rapport JaCoCo](../screenshots/backend-testunitaire-rapport-couverture-jacoco-2.png)

## Instructions d'exécution

### Tests unitaires backend (JUnit)
```Dans un termial bash acceder au dossier projet backend 
cd backend 
./mvnw test --> pour lancer le test 
```

### Tests unitaires frontend (Jest)
```Dans un termial bash acceder au dossier projet frontend 
cd frontend 
npm run test:jest --> pour lancer le test
npm run test:jest:coverage --> pour générer le rapport de couverture de test
# Rapport disponible dans : /coverage/index.html
```
![Rapport Jest](../screenshots/frontend-couverture-test.png)

### Instructions d'exécution Cypress
```Dans des terminaux bash acceder aux dossiers projets backend et frontend 
# D'abord lancer le backend dans un terminal et frontend dans un autre terminal 

cd backend 
./mvnw spring-boot:run --> pour lancer le backend
cd frontend
ng serve --> pour lancer le frontend

puis dans un autre terminal acceder au dossier projet frontend
cd frontend 
npx cypress open --> pour demarrer le test
# ou en mode headless
npx cypress run
```

## Permissions dossier de stockage

Si l'upload échoue avec "Erreur lors du stockage du fichier",
vérifier les permissions du dossier :

```bash
ls -la backend/fichiers/
# Si owner = root, corriger avec :
sudo chown -R $USER:$USER backend/fichiers/
```


## Résultats Cypress E2E

| Fichier            | Tests | Statut |
|--------------------|-------|--------|
| `auth.cy.ts`       | 5     | ✅     |
| `fichiers.cy.ts`   | 7     | ✅     |
| **Total**          | **12**| ✅     |

 ![capture Cypress](../screenshots/frontend-e2e-auth.png)
 ![capture Cypress](../screenshots/frontend-e2e-gestionFichier.png)
