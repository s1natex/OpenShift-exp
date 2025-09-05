FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache curl
COPY package.json package-lock.json* ./
RUN npm install --include=dev
COPY . .
RUN npm run build
EXPOSE 8080
HEALTHCHECK --interval=10s --timeout=3s --retries=5 \
  CMD curl -fs http://localhost:8080/healthz || exit 1
CMD ["npm", "run", "serve"]
