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

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
Para documentar los guards y los casos de uso en tu proyecto, especialmente en el archivo `README.md`, aquí tienes una guía de cómo puedes estructurar la información:
Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
<hr>

```markdown

# Guía del Módulo de Autenticación con JWT en NestJS

## Descripción

Este módulo de autenticación en NestJS utiliza JWT para autenticar a los usuarios. Incluye funcionalidad para registro (sign up), inicio de sesión (sign in) y protección de rutas mediante guards.

```



## Configuración de Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```bash
`JWT_SECRET=your_secret_key`
```

`JWT_SECRET` es la clave secreta utilizada para firmar los tokens JWT.

## API Referencia
#### logeo

```http
  POST /auth/signin
```
#### Body:

| Parametros | Type     | Ejemplo                     |
| :-------- | :------- | :------------------------- |
| `email`      | `string` | **requerido**. juan@mail.com |
| `password`      | `string` | **requerido**.  123@Admin |

 - #### exitoso
- Retorna un token JWT si las credenciales son correctas.
ejemplo:
```http
token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
-  #### en caso de error 

   - status: 200, description: 'Inicio de sesión exitoso'
   - status: 400, description: 'Solicitud incorrecta. Campos faltantes o inválidos.'
   - status: 401, description: 'No autorizado. Correo electrónico o contraseña incorrectos.'
   - status: 404, description: 'Usuario no encontrado.'
   - status: 500, description: 'Error interno del servidor. Ocurrió un error inesperado.'

#### Registro

```http
  POST /auth/signup
```
#### body:
| Parametros | Type     | Ejemplo                     |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **requerido**. Juan  |
| `email`      | `string` | **requerido**. juan@mail.com |
| `password`      | `string` | **requerido**.  123@Admin |
| `passwordConfirm`      | `string` |**requerido**.123@Admin |
| `address`      | `string` | **requerido**.123 Calle Principal |
| `phone`      | `string` | **requerido**. 555-1234 |
| `country`      | `string` | **requerido**. México |
| `city`      | `string` | **requerido**. Ciudad de México |
| `createdAt`      | `string` | **requerido**. 2024-07-23T17:00:00Z |
| `birthday`      | `IsDateString` | **requerido**. 1990-05-15T17:00:00Z |
| `allergies`      | `string` | leche |
| `picture`      | `string` | http://example.com/picture.jpg |
| `auth0Id`      | `string` | auth01234567890abcdef |

 - #### exitoso
  - status: 201, description: 'Usuario registrado exitosamente'

-  #### en caso de error 

   - status: 400, description: 'Solicitud incorrecta. Campos faltantes o inválidos.'
   - status: 409, description: 'Conflicto. Usuario con este correo electrónico ya existe.' 
   - status: 500, description: 'Error interno del servidor. Ocurrió un error inesperado.'

## Documentación de Guards y Casos de Uso

### Guards Implementados

1. **AuthGuard**
   - **Descripción**: Este guardia valida la autenticidad del token JWT enviado en el encabezado de autorización de la solicitud.

     - **Token no encontrado (`UnauthorizedException`)**:
       - **Causa**: Cuando el token JWT no se encuentra en el encabezado de autorización de la solicitud.
       - **Respuesta**: Devuelve un error `401 Unauthorized` con el mensaje "Token not found".

     - **Token inválido (`UnauthorizedException`)**:
       - **Causa**: Cuando el token JWT no es válido, por ejemplo, si está mal formado .
       - **Respuesta**: Devuelve un error `401 Unauthorized` con el mensaje "Invalid token".

     - **Error en la verificación del token (`UnauthorizedException`)**:
       - **Causa**: Cualquier error durante la verificación del token JWT, como un error interno del servidor al verificar la firma del token.
       - **Respuesta**: Devuelve un error `401 Unauthorized` con el mensaje "Invalid token".

     - **Éxito**:
       - Si todas las validaciones son exitosas, el guardia establece el objeto `user` en la solicitud, que contiene la información del usuario autenticado.
       - **Requisitos**:
         - El token debe estar presente en el encabezado de autorización.
         - El token debe ser válido y verificado utilizando la clave secreta JWT configurada.
       - **Cómo utilizar**:
         - Enviar el token JWT en el encabezado de autorización de la forma: `Authorization: Bearer <token>`
         - Ejemplo de uso en Thunder Client o Insomnia:
           ```
           GET /api/ruta-protegida
           Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
           ```

2. **RolesGuards**
   - **Descripción**: Este guardia valida los roles de usuario para determinadas rutas.

     - **Permiso denegado (`ForbiddenException`)**:
       - **Causa**: Cuando el usuario autenticado no tiene los roles requeridos para acceder a la ruta protegida.
       - **Respuesta**: Devuelve un error `403 Forbidden` con el mensaje "You do not have permissions to access this information".

     - **Éxito**:
       - Si el usuario tiene los roles requeridos, el guardia permite el acceso a la ruta protegida.
       - **Requisitos**:
         - El usuario debe estar autenticado (previamente validado por `AuthGuard`).
         - El usuario debe tener el rol de administrador si así se requiere para la ruta específica.

### Ejemplo de Uso en Thunder Client o Insomnia

Para enviar solicitudes a las rutas protegidas, sigue estos pasos:

1. **Obtener un Token JWT**:
   - Realiza una solicitud de inicio de sesión que devuelva un token JWT válido.

2. **Enviar Solicitudes a Rutas Protegidas**:
   - Incluye el token JWT en el encabezado de autorización de la siguiente manera:
     ```
     Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```
   - Asegúrate de enviar el token en cada solicitud a las rutas que requieren autenticación y roles específicos.
<hr>

```markdown
# Documentación del Servicio de Cloudinary en NestJS

Este documento describe cómo configurar y utilizar el servicio de **Cloudinary** en una aplicación NestJS.

## Requisitos

Asegúrate de tener las siguientes dependencias instaladas en tu proyecto:

```bash
npm install @nestjs/common dotenv cloudinary
```

## Configuración

1. **Configurar las Variables de Entorno**

   Crea un archivo de configuración de entorno en la raíz de tu proyecto, por ejemplo, `.env.development.local`, con las siguientes variables:

   ```env
   CLOUDINARY_CLOUD_NAME=tu_cloud_name
   CLOUDINARY_API_KEY=tu_api_key
   CLOUDINARY_API_SECRET=tu_api_secret
   ```

   Estas variables son necesarias para la configuración del cliente de Cloudinary.

2. **Implementar el Servicio de Cloudinary**

   Implementa el servicio `CloudinaryService` para manejar las operaciones con Cloudinary. Aquí tienes un ejemplo:

   ```typescript
   import { Injectable } from '@nestjs/common';
   import * as dotenv from 'dotenv';
   import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';

   @Injectable()
   export class CloudinaryService {
     constructor() {
       dotenv.config({
         path: '.env.development.local',
       });
       cloudinary.config({
         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
         api_key: process.env.CLOUDINARY_API_KEY,
         api_secret: process.env.CLOUDINARY_API_SECRET,
       });
     }

     async uploadFile(buffer: Buffer, orignalName?: string) {
       const options: UploadApiOptions = {
         folder: 'uploads',
         public_id: orignalName,
         resource_type: 'auto',
       };
       return new Promise((resolve, reject) => {
         const stream = cloudinary.uploader.upload_stream(
           options,
           (error, result) => {
             if (error) {
               reject(error);
             } else {
               resolve(result);
             }
           },
         ); 
         stream.write(buffer);
         stream.end();
       });
     }
   }
   ```

## Uso del Servicio

1. **Inyectar el Servicio en un Controlador**

   Puedes inyectar `CloudinaryService` en un controlador para manejar la subida de archivos. A continuación se muestra un ejemplo de cómo hacerlo:

   ```typescript
   import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
   import { FileInterceptor } from '@nestjs/platform-express';
   import { CloudinaryService } from './cloudinary.service';

   @Controller('files')
   export class FilesController {
     constructor(private readonly cloudinaryService: CloudinaryService) {}

     @Post('upload')
     @UseInterceptors(FileInterceptor('file'))
     async uploadFile(@UploadedFile() file: Express.Multer.File) {
       const { buffer, originalname } = file;
       const result = await this.cloudinaryService.uploadFile(buffer, originalname);
       return result;
     }
   }
   ```

   En este ejemplo, el archivo subido se maneja a través de `FileInterceptor` de NestJS, se obtiene el buffer del archivo y el nombre original, y luego se llama al método `uploadFile` del servicio `CloudinaryService`.

2. **Probar la Subida de Archivos**

   Para probar la subida de archivos, puedes utilizar herramientas como Postman o cURL para enviar una solicitud POST al endpoint `/files/upload` con un archivo adjunto.

   Ejemplo con cURL:

   ```bash
   curl -X POST http://localhost:3000/files/upload \
   -F "file=@path/to/your/file.jpg"
   ```


---

Esta documentación debería proporcionarte una guía completa para configurar y utilizar el servicio de Cloudinary en tu proyecto NestJS. ¡Espero que te sea útil!



