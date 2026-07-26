# ================================
# Stage 1 — Build Angular
# ================================
FROM node:24-alpine AS build

WORKDIR /app

# Copie les fichiers de dépendances d'abord (cache npm)
COPY package*.json ./
RUN npm install

# Copie le code source
COPY . .

# Build en mode production
RUN npm run build --configuration=production

# ================================
# Stage 2 — Runtime avec Nginx
# ================================
FROM nginx:alpine

# Copie le build Angular dans Nginx
COPY --from=build /app/dist/datashare-frontend/browser /usr/share/nginx/html

# Configuration Nginx pour Angular (SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
