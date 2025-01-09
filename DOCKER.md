# DOCKER Команды

**docker build -t <image_name> .**

Создаёт image по настройке в Dockerfile
Если нужно обновить image, просто вводишь эту же команду но с уже существующим image_name

**docker run --env-file .env <image_name>**

Запускает контейнер с применением .env файлов

**docker tag <old_image_name> <image_name>**

Смена image_name

**docker push <image_name>**

Загрузка image'а в Docker HUB.

**docker-compose up**

Запуск docker compose'а, по файлу docker-compose.yml

**docker-compose down**
**docker-compose build**
**docker-compose up**

Cвязка для пересборки, если что-то идёт не так



#### Остальные действия проще выполнять через Docker desktop!