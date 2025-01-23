# Используем стабильную LTS-версию Node.js
FROM node:21.5.0-bullseye

WORKDIR /app

COPY package*.json ./

# Устанавливаем pnpm
RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm prisma migrate deploy

# Сборка приложения
RUN pnpm run build

# Открываем порт
EXPOSE 443

# Указываем команду для запуска
CMD [ "pnpm", "run", "start:migrate:prod" ]




