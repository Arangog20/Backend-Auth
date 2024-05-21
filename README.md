<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.



# Titulo del proyecto/ Project Title

RIWI MINDSET 

El propósito de este documento será servir como guía para la ejecución, programación y
lineamientos para él funcionamiento de nuestro proyecto. Contemplando los principales
requerimientos y objetivos a cumplir por parte de nosotros como equipo, así como los
recursos adicionales y él apoyo técnico que pueda ser necesario para él correcto desarrollo
del mismo y él cumplimiento de las expectativas planteadas.

The purpose of this document is to serve as a guide for the execution, scheduling, and guidelines for the operation of our project. It includes the main requirements and objectives to be met by our team, as well as the additional resources and technical support that may be necessary for the correct development of the project and the fulfillment of the stated expectations.

## ¿Por que? / why?

Surge para abordar la necesidad de optimizar el proceso de reserva de servicios, eliminando la limitación de disponibilidad y simplificando la comunicación entre el psicologo (profesor) y estudiante.

It arises to address the need to optimize the appointment booking process, eliminating availability limitations and simplifying communication between the psychologist (professor) and the student.

## ¿para que? / what for?

El objetivo es aumentar la  accesibilidad en la gestión de reservas de citas, beneficiando tanto a los profesores registrados en el sistema como a los estudiantes, permitiendo una programación más efectiva y mayor satisfacción del estudiante y porfesor, en el momento de realizar una asesoria .

The objective is to increase accessibility in the management of appointment bookings, benefiting both the professors registered in the system and the students, allowing for more effective scheduling and greater satisfaction for both students and professors when conducting a session.

## ¿Para quién? / for whom?
Está destinado a pequeñas y medianas empresas las cuales necesitan hacer test y agendamientos de citas. 

It is aimed at small and medium-sized businesses that need to conduct tests and schedule appointments.

## Installation / Instalacion

Install  with npm

```bash
  npm install 
```
    
## Running Tests / Ejecusion de pruebas

Para ejecutar pruebas utilice el siguiente comando 

To run tests, use the following command.

```bash
  npm run start:dev
```

```bash
  Spring Tools

https://marketplace.visualstudio.com/items?itemName=vmware.vscode-boot-dev-pack

Java extension

https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack 
```


## variables de entorno / Environment Variables

Para ejecutar este proyecto, necesitarás agregar las siguientes variables de entorno a tu archivo .env.

To run this project, you will need to add the following environment variables to your .env file

```sh
`DB_CONNECTION`= tu conexion / your conenction

`DB_HOST`= tu puerto de localhost / your port of localhost

`DB_NAMELOCAL`= tu base de datos local / your data base 

`DB_USERNAME`= tu nombre de usuario / your username

`DB_PASSWORD`= tu contraseña / your password

`DB_NAME`= tu base de datos o colecion / your data base or colection

`JWT_SECRET`= tu clave secreta/ your secret key

`ACCES_TOKEN_EXPIRE`=  tu tiempo de expiracion / your expiration time

`PORT`= tu numero de puerto ejemplo 3000 / your port number for example 3000
```

## Arquitectura
```sh
src/
├── adapters/
│   ├── controllers/
│   │   ├── auth.controller.ts
|   |   ├──students.controller.ts
|   |   └──teahcers.controller.ts
│   ├── dtos/
│   │   ├── dtos.auth/
|   |   |   ├── export.ts
|   |   |   ├── login.dto.ts
|   |   |   └── singup.dto.ts  
│   │   └── dtos.studen/
|   |   |   ├── index.ts
|   |   |   ├── students-register.dto.ts
|   |   |   └── students-login.dto.ts
│   │   └── dtos.studen/
|   |       ├── index.ts
|   |       ├── teachers-register.dto.ts
|   |       └── teachers-login.dto.ts
├── core/
│   ├── entities/
│   │   ├── student.entity.ts
|   |   └── teacher.entity.ts
│   ├── services/
│   │   ├── auth.student.service.ts
|   |   ├── auth.teacher.service.ts
|   |   ├── students.service.ts
|   |   └── teahcers.service.ts
│   ├── modules/
│   │   ├── teacher.module.ts
│   │   ├── student.module.ts
│   │   ├── persistence.student.module.ts
│   │   ├── auth.module.ts
│   │   └── utils.module.ts
├── infrastructure/
│   ├── persistence/
│   │   ├── db_config.ts
│   │   └── export.ts
│   ├── auth/
│   │   ├── guards/
│   │   │   └── jwt.guard.ts
│   │   └── strategies/
│   │       └── jwt.strategy.ts
│   ├── decorators/
│   │   ├── index.ts
│   │   ├── private.decorator.ts
│   │   ├── public.decorator.ts
│   │   └── roles.decorator.ts
│   └── types/
│   │   ├── export.ts
│   │   ├── jwtPayload.ts
│   │   └── tokens.type.ts
├── app.module.ts
├── main.ts
└── utils/
    └── hash.util.ts
```

## 🛠 Skills
Javascript, HTML, CSS, Nestjs, TypeScript

## Tablero Trello
[Trello](https://trello.com/b/Mi2JmiGh/riwi-mindset-2)

## Documentacion en Notion
[Notion](https://www.notion.so/Documentacion-riwi-mindset-1475ada2cc154617b6aedf6176fe9ed5) pasos para levantar las 3 aplicaciones 

## Authors

Manuela Giraldo Arango
- [@Arangog20](https://github.com/Arangog20)
  
Juan Jaramillo
- [@Juanja1712](https://github.com/Juanja1712)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
