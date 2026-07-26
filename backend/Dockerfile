# ================================
# Stage 1 — Build
# ================================
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copie les fichiers de dépendances d'abord (cache Maven)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copie le code source
COPY src ./src

# Build sans les tests
RUN mvn clean package -DskipTests

# ================================
# Stage 2 — Runtime
# ================================
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copie le jar depuis le stage build
COPY --from=build /app/target/*.jar app.jar

# Crée le dossier de stockage des fichiers
RUN mkdir -p /app/fichiers/uploads

# Expose le port
EXPOSE 8080

# Copie le .env
COPY .env .env

# Lance l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
