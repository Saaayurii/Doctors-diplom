#!/bin/bash

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Запуск Телемедицина в Docker ===${NC}\n"

# Проверка Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker не установлен! Установите Docker и попробуйте снова.${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose не установлен! Установите Docker Compose и попробуйте снова.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker установлен${NC}"
echo -e "${GREEN}✓ Docker Compose установлен${NC}\n"

# Выбор конфигурации БД
echo -e "${YELLOW}Выберите конфигурацию базы данных:${NC}"
echo "1) Локальная PostgreSQL в Docker (рекомендуется для разработки)"
echo "2) Облачная БД Neon (использовать существующую БД)"
read -p "Выбор (1 или 2): " db_choice

if [ "$db_choice" == "1" ]; then
    ENV_FILE=".env.docker"
    echo -e "${GREEN}Используется локальная PostgreSQL${NC}\n"
else
    ENV_FILE=".env"
    echo -e "${GREEN}Используется облачная БД Neon${NC}\n"
fi

# Остановка существующих контейнеров
echo -e "${YELLOW}Остановка существующих контейнеров...${NC}"
docker-compose down 2>/dev/null

# Запуск
echo -e "${YELLOW}Запуск Docker контейнеров...${NC}"
docker-compose --env-file "$ENV_FILE" up --build -d

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}=== Успешно запущено! ===${NC}\n"
    echo -e "Доступ к приложению:"
    echo -e "  ${GREEN}Frontend:${NC} http://localhost:3000"
    echo -e "  ${GREEN}Backend:${NC}  http://localhost:4000"
    if [ "$db_choice" == "1" ]; then
        echo -e "  ${GREEN}PostgreSQL:${NC} localhost:5432"
    fi
    echo -e "\nДля просмотра логов: ${YELLOW}docker-compose logs -f${NC}"
    echo -e "Для остановки: ${YELLOW}docker-compose down${NC}\n"
else
    echo -e "\n${RED}Ошибка при запуске контейнеров!${NC}"
    echo -e "Проверьте логи: ${YELLOW}docker-compose logs${NC}\n"
    exit 1
fi
