FROM node:20-alpine
WORKDIR /app

COPY apps/auth-service/package.json apps/auth-service/package-lock.json ./
RUN npm ci

COPY apps/auth-service .

EXPOSE 3002
CMD ["npm", "run", "start:dev"]
