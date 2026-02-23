# Etapa 1: Construcción
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Etapa 2: Servidor Nginx
FROM nginx:alpine
COPY --from=build /app/dist/evasys/browser /usr/share/nginx/html
# Copia una configuración de Nginx para manejar rutas de Angular
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80