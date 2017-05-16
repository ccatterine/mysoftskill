# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact

# CORRER EL PROYECTO DE FORMA TRADICIONAL

## REQUISITOS
- mysql
- nodejs

## ANTES DE CORRER LA APLICACIÓN
  - Crea tu propia BD en mysql, si deseas usa PHPMYADMIN
  - Corre el archivo script.sql
  - Ubicate en la carpeta config y en el archivo `config.js` cambia tus accesos
  - Ub{icate en la carpeta `api` dentro de `mysoftskills-service` 
  - Ejecuta el comando `npm install` 

## CORRER LA APLICACION
 Ubicate en la carpeta api y ejecuta el comando `node app.js`


# CORRER EL PROYECTO CON DOCKER

## REQUISITOS

- nodejs
- docker
- docker compose

## ANTES DE CORRER LA APLICACIÓN
  - Ubicate en la carpeta `api` dentro de `mysoftskills-service` 
  - Ejecuta el comando `npm install` 

## CORRER LA APLICACION
Vuelve a la ruta raiz (nodejs-mysoftskills) al nivel del archivo `docker-compose.yml`
y ejecuta el comando `docker-compose up` desde el terminal y espera 1 minuto
y listo xD
