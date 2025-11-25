FROM node:20-alpine

WORKDIR /app

# 1. Копируем только package.json — чтобы кешировалось
COPY package*.json ./

# 2. Ставим зависимости (+ devDependencies)
RUN npm install

# 3. Копируем весь остальной код
COPY . .

# 4. Генерация Prisma Client (теперь есть schema.prisma)
RUN npx prisma generate

# 5. Собираем NestJS
RUN npm run build

# 6. Стартуем
CMD ["node", "dist/main.js"]
