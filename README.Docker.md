# Docker Инструкция для запуска приложения

## Структура контейнеров

Приложение состоит из трёх Docker контейнеров:

1. **postgres** - база данных PostgreSQL 16
2. **backend** - Node.js Express API (порт 4000)
3. **frontend** - Next.js приложение (порт 3000)

## Быстрый старт

### 1. Настройка переменных окружения

Создайте файл `.env` на основе `.env.example`:

```bash
cp .env.example .env
```

**Важно:** Измените `ACCESS_TOKEN_SECRET_KEY` на свой уникальный ключ:

```bash
# Генерация случайного ключа
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2. Запуск всех контейнеров

```bash
docker-compose up -d
```

Эта команда:
- Создаст и запустит контейнер PostgreSQL
- Создаст и запустит backend сервер
- Создаст и запустит frontend приложение

### 3. Проверка статуса контейнеров

```bash
docker-compose ps
```

### 4. Просмотр логов

```bash
# Все сервисы
docker-compose logs -f

# Только backend
docker-compose logs -f backend

# Только frontend
docker-compose logs -f frontend

# Только postgres
docker-compose logs -f postgres
```

## Доступ к приложению

После запуска контейнеров:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **PostgreSQL**: localhost:5432

## Инициализация базы данных

При первом запуске необходимо создать таблицы в базе данных:

```bash
# Подключение к контейнеру postgres
docker exec -it doctors-postgres psql -U telemed_user -d telemed_database

# Выполните SQL скрипты для создания таблиц
# (если есть файлы миграций, примените их)
```

## Полезные команды

### Остановка всех контейнеров

```bash
docker-compose down
```

### Остановка с удалением volumes (удаление данных БД)

```bash
docker-compose down -v
```

### Пересборка образов

```bash
docker-compose build

# Или с no-cache
docker-compose build --no-cache
```

### Перезапуск конкретного сервиса

```bash
docker-compose restart backend
```

### Выполнение команд внутри контейнера

```bash
# Backend
docker exec -it doctors-backend sh

# Frontend
docker exec -it doctors-frontend sh

# PostgreSQL
docker exec -it doctors-postgres psql -U telemed_user -d telemed_database
```

## Разработка с Docker

Для разработки можно использовать volume mounting, чтобы изменения в коде сразу отражались в контейнере.

Backend уже настроен с volume в `docker-compose.yml`:

```yaml
volumes:
  - ./BE:/app
  - /app/node_modules
```

Для frontend можно добавить аналогичную настройку, но для production сборки это не требуется.

## Troubleshooting

### Проблемы с подключением к БД

Если backend не может подключиться к PostgreSQL:

1. Проверьте, что контейнер postgres запущен:
   ```bash
   docker-compose ps postgres
   ```

2. Проверьте healthcheck:
   ```bash
   docker inspect doctors-postgres | grep Health
   ```

3. Проверьте логи postgres:
   ```bash
   docker-compose logs postgres
   ```

### Очистка и полный перезапуск

```bash
# Остановить все контейнеры
docker-compose down

# Удалить volumes
docker volume rm doctors-diplom_postgres_data

# Удалить все неиспользуемые Docker объекты
docker system prune -a

# Запустить заново
docker-compose up -d --build
```

### Проблемы с портами

Если порты 3000, 4000 или 5432 уже заняты, измените их в `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # внешний:внутренний
```

## Production Deployment

Для production развертывания:

1. Используйте отдельную managed PostgreSQL БД (не в контейнере)
2. Настройте переменные окружения через secrets
3. Используйте reverse proxy (nginx) для SSL/TLS
4. Настройте регулярные backup'ы БД
5. Используйте Docker Swarm или Kubernetes для оркестрации

## Миграция с внешней БД на локальную

Если вы использовали внешнюю БД (например, Neon, AWS RDS), и хотите перейти на локальную:

1. Сделайте dump существующей БД:
   ```bash
   pg_dump -h your-external-host -U your-user -d your-db > dump.sql
   ```

2. Импортируйте в Docker контейнер:
   ```bash
   docker exec -i doctors-postgres psql -U telemed_user -d telemed_database < dump.sql
   ```

## Сетевая архитектура

Все контейнеры находятся в одной Docker сети `doctors-network`, что позволяет им общаться между собой по именам сервисов:

- Backend подключается к БД по хосту `postgres`
- Frontend может обращаться к backend по `http://backend:4000`
