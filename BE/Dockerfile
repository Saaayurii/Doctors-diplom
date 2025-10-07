# Backend Dockerfile
FROM node:18-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и установка зависимостей
COPY package.json ./
RUN npm install --production

# Копирование остального кода приложения
COPY . .

# Открытие порта для приложения
EXPOSE 4000

# Команда для запуска приложения
CMD ["npm", "start"]
