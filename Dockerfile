FROM node:18 AS build

# Ustawiamy katalog roboczy w kontenerze
WORKDIR /app

# Kopiujemy package.json oraz package-lock.json (jeśli używasz npm)
COPY package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy cały projekt do kontenera
COPY . .

# Budujemy aplikację (produkcyjna wersja)
RUN npm run build

# Etap 2: Uruchamianie aplikacji w środowisku produkcyjnym
FROM nginx:alpine

# Kopiujemy zbudowaną aplikację do katalogu publicznego serwera Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Ekspozycja portu, na którym Nginx działa
EXPOSE 80

# Uruchamiamy Nginx
CMD ["nginx", "-g", "daemon off;"]
