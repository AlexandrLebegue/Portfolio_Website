# Build Stage
FROM node:18-alpine AS build


WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
 
# Production Stage
FROM nginx:stable-alpine AS production

COPY --from=build /app/build /usr/share/nginx/html
# Config nginx générée au démarrage (envsubst) depuis le template
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]