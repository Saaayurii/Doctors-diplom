<<<<<<< HEAD:telemedapp/Dockerfile
# Frontend Dockerfile
FROM node:18-alpine AS base

# Установка зависимостей
=======
# Frontend Dockerfile (Next.js)
FROM node:20-alpine AS base

# Установка зависимостей только когда нужно
>>>>>>> d527880 (ru language):frontend/Dockerfile
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

<<<<<<< HEAD:telemedapp/Dockerfile
# Копирование файлов зависимостей
COPY package.json yarn.lock* package-lock.json* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi
=======
# Установка зависимостей с yarn
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile
>>>>>>> d527880 (ru language):frontend/Dockerfile

# Сборка приложения
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

<<<<<<< HEAD:telemedapp/Dockerfile
# Отключаем телеметрию Next.js
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production образ
=======
# Отключение телеметрии Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# Сборка Next.js приложения
RUN yarn build

# Production image
>>>>>>> d527880 (ru language):frontend/Dockerfile
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копирование необходимых файлов
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
