# Usar una imagen oficial de Node.js como base
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY .babelrc ./
COPY .sequelizerc ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY src ./src

# Exponer el puerto de la API
EXPOSE 3002

# Ejecutar el contenedor con migraciones, seeders y el servidor
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npx nodemon src/index.ts"]
