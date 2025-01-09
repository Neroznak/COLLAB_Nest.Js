# Используем стабильную LTS-версию Node.js
FROM node:21.5.0-bullseye

WORKDIR /app

COPY package*.json ./

# Устанавливаем pnpm
RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN npx prisma generate

# Сборка приложения
RUN pnpm build

# Открываем порт
EXPOSE 5000

# Указываем команду для запуска
CMD [ "pnpm", "run", "start:migrate:prod" ]




