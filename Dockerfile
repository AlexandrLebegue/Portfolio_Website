# Build Stage
FROM node:18-alpine AS build

# Define build arguments for environment variables
ARG REACT_APP_OPENROUTER_API_KEY
ARG REACT_APP_GITHUB_TOKEN

# Set environment variables from build arguments
ENV REACT_APP_OPENROUTER_API_KEY=$REACT_APP_OPENROUTER_API_KEY
ENV REACT_APP_GITHUB_TOKEN=$REACT_APP_GITHUB_TOKEN

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
 
# Production Stage
FROM nginx:stable-alpine AS production

# Set environment variables from build arguments
ENV REACT_APP_OPENROUTER_API_KEY=$REACT_APP_OPENROUTER_API_KEY
ENV REACT_APP_GITHUB_TOKEN=$REACT_APP_GITHUB_TOKEN

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]