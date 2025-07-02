
FROM node:20-alpine AS builder
WORKDIR /app
COPY apps/client-app/package.json apps/client-app/package-lock.json ./
RUN npm ci
COPY apps/client-app .
RUN npm run build


FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
