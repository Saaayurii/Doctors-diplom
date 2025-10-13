# Docker Setup для Телемедицина

## Структура проекта

```
Doctors-diplom/
├── backend/              # Node.js Backend API
│   ├── Dockerfile
│   └── .dockerignore
├── frontend/             # Next.js Frontend
│   ├── Dockerfile
│   └── .dockerignore
├── docker-compose.yml    # Docker Compose конфигурация
├── .env.docker          # Переменные окружения для Docker
└── DOCKER_SETUP.md      # Эта инструкция
```

## Сервисы

1. **postgres** - PostgreSQL 15 база данных (порт 5432)
2. **backend** - Node.js API сервер (порт 4000)
3. **frontend** - Next.js приложение (порт 3000)

## Быстрый старт

### 1. Убедитесь что Docker и Docker Compose установлены

```bash
docker --version
docker-compose --version
```

### 2. Запуск с локальной PostgreSQL базой

Используйте `.env.docker` для локальной БД:

```bash
docker-compose --env-file .env.docker up --build
```

### 3. Запуск с существующей облачной БД (Neon)

Используйте существующий `.env`:

```bash
docker-compose up --build
```

## Команды

### Запуск всех сервисов
```bash
docker-compose up -d
```

### Запуск с пересборкой
```bash
docker-compose up --build -d
```

### Остановка всех сервисов
```bash
docker-compose down
```

### Остановка с удалением volumes (БД будет удалена!)
```bash
docker-compose down -v
```

### Просмотр логов
```bash
# Все сервисы
docker-compose logs -f

# Только backend
docker-compose logs -f backend

# Только frontend
docker-compose logs -f frontend

# Только база данных
docker-compose logs -f postgres
```

### Перезапуск отдельного сервиса
```bash
docker-compose restart backend
docker-compose restart frontend
docker-compose restart postgres
```

### Проверка статуса
```bash
docker-compose ps
```

## Доступ к приложению

После запуска:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **PostgreSQL**: localhost:5432

## Конфигурация БД

### Локальная PostgreSQL (в Docker)

В файле `.env.docker`:
```env
PGDATABASE=telemed_database
PGUSER=telemed_user
PGPASSWORD=SecurePassword123!
PGPORT=5432
```

### Облачная БД (Neon)

В файле `.env`:
```env
PGHOST=ep-floral-resonance-a5ne96lj-pooler.us-east-2.aws.neon.tech
PGDATABASE=telemed_databaes
PGUSER=telemed_databaes_owner
PGPASSWORD=8lo2xPrbJHBt
```

## Troubleshooting

### Порты заняты
Если порты 3000, 4000 или 5432 заняты, измените их в `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Изменить первое число
```

### Проблемы с сетью
```bash
docker network ls
docker network inspect doctors-diplom_telemed-network
```

### Очистка всех данных Docker
```bash
docker system prune -a --volumes
```

### Пересоздание volumes
```bash
docker-compose down -v
docker volume prune
docker-compose up --build
```

## Разработка

### Hot Reload для Backend
```bash
docker-compose run --rm backend npm run dev
```

### Hot Reload для Frontend
```bash
docker-compose run --rm -p 3000:3000 frontend npm run dev
```

## Production

Для production используйте:
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```
