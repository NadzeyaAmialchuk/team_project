FROM node:20-alpine
WORKDIR /app

COPY apps/core-server-app/package.json apps/core-server-app/package-lock.json ./
RUN npm ci

COPY apps/core-server-app .

RUN npm run build
EXPOSE 3001
CMD ["node", "dist/main"]
