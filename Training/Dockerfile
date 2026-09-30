# Étape 1 : Build
FROM node:22-alpine AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN npm ci || npm install
COPY . .
RUN npm run build
RUN npm prune --production

# Étape 2 : Runtime non-root
FROM node:22-alpine AS runner
WORKDIR /usr/src/app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

ENV NODE_ENV=production
ENV PORT=8080

COPY --from=builder --chown=appuser:appgroup /usr/src/app/package.json ./
COPY --from=builder --chown=appuser:appgroup /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /usr/src/app/dist ./dist

USER appuser
EXPOSE 8080

CMD ["node", "dist/index.js"]