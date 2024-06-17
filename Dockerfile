# Étape de construction
FROM node:current-slim as builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copier les autres fichiers nécessaires
COPY . .

# Construction de l'application
RUN npm run build

# Étape de production
FROM node:current-slim

WORKDIR /app

RUN npm install -g serve

# Copier les fichiers de l'étape de construction
COPY --from=builder /app/dist ./dist

# Exposer le port 3000
EXPOSE 3000

# Commande d
CMD ["serve", "-s", "dist", "-l", "3000"]
