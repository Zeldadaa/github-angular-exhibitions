# stage 1
FROM node:latest as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage2
FROM nginx:alpine
COPY --from=builder /app/dist/exhibitions/ /usr/share/nginx/html