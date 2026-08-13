# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Run Stage (Nginx)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Add custom nginx config for SPA routing if needed
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
