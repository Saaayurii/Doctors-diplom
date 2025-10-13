# Backend Dockerfile
<<<<<<< HEAD:BE/Dockerfile
FROM node:18-alpine
=======
FROM node:20-alpine
>>>>>>> d527880 (ru language):backend/Dockerfile

# Установка рабочей директории
WORKDIR /app

<<<<<<< HEAD:BE/Dockerfile
# Копирование package.json и установка зависимостей
COPY package.json ./
RUN npm install --production

# Копирование остального кода приложения
COPY . .

# Открытие порта для приложения
EXPOSE 4000

# Команда для запуска приложения
=======
# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci --only=production

# Копирование всех файлов проекта
COPY . .

# Открытие порта
EXPOSE 4000

# Запуск приложения
>>>>>>> d527880 (ru language):backend/Dockerfile
CMD ["npm", "start"]
