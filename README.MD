# Aplicacion de gestion de productos


La siguiente es una aplicacion para la gestions de productos

    a) Consulta de productos
    b) Creacion de productos
    c) Eliminacion de productos

Tanto backend como frontend tiene su README Especifico para correr en entorno LOCAL.

**Docker**

Se configuro docker para correr tanto front como back, incluyendo creacion de la bd, migraciones y seeders.

## **Requisitos Previos**

- Docker CLI
- Docker Desktop

Para ejecutar el docker debe correr en la consolta

- docker-compose up --build

Se adicionan los .env para su testeo, tener presente cambiar los datos a los de su entorno de desarrollo
se debe cambiar el password en el ".env" del api con los datos de su entorno
(Soy consiente de que no se suben los .env, se suben por solicitud de requerimiento)