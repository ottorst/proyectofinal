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

## Integración de Auth0 en el Backend de NestJS
### Introducción
En este backend de NestJS, se ha integrado Auth0 para gestionar la autenticación de usuarios. Auth0 permite a los usuarios autenticarse utilizando cuentas de redes sociales, cuentas corporativas, o incluso registrarse utilizando sus direcciones de correo electrónico y contraseñas. A continuación, se detalla cómo se ha realizado esta integración y cómo funciona el flujo de autenticación.

### Configuración de Auth0

#### Instalar dependencias
Su aplicación necesitará el paquete `express-openid-connect` , que es una biblioteca compatible con OIDC mantenida por Auth0 para Express.
Primero, es necesario crear una aplicación en el panel de control de Auth0. Esto te proporcionará credenciales específicas, como el client ID y el client secret, que necesitarás para configurar la integración en tu backend.

```bash 
npm install express express-openid-connect --save
```
Una vez configurada la aplicación en Auth0, se deben definir las variables de entorno en el proyecto de NestJS. Estas variables incluyen el secret de Auth0, la URL base de tu aplicación, el client ID, y el dominio de Auth0.

```env
AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_ISSUER_BASE_URL=https://your-auth0-domain.auth0.com
```

### Configuración del Backend
El backend de NestJS se configura para utilizar estas credenciales a través de un archivo de configuración dedicado. Esta configuración se utiliza para asegurar que las rutas de autenticación estén protegidas y que el backend pueda comunicarse correctamente con Auth0 para autenticar a los usuarios.

``` typescript
// config/auth0-config.ts
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export const auth0Config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};
```

### Controlador de Autenticación
El controlador de autenticación en el backend de NestJS gestiona las rutas principales relacionadas con el inicio de sesión y el registro de usuarios. Estas rutas incluyen las que permiten a los usuarios iniciar sesión y registrarse utilizando credenciales tradicionales, así como las rutas que gestionan la autenticación con Auth0.

Para el inicio de sesión, el controlador valida las credenciales proporcionadas por el usuario (correo electrónico y contraseña) y genera un token JWT si las credenciales son correctas. Para el registro, se validan los datos del usuario, y si todo es correcto, se crea un nuevo registro en la base de datos. En caso de que un usuario ya esté registrado con el correo electrónico proporcionado, se maneja el error adecuadamente.

``` typescript
async Auth0(@Req() req: Request, @Res() res: Response) {
    try {
      if (req.oidc?.isAuthenticated()) {
        const email = req.oidc.user?.email;
        const auth0Id = req.oidc.user?.sub;
  
        if (!email || !auth0Id) {
          return res.status(HttpStatus.BAD_REQUEST).json({ message: 'No email or auth0Id found' });
        }
  
        let user = await this.authService.findUserByAuth0IdOrEmail(auth0Id, email);
  
        if (!user) {
          const newUser: SignUpAuthDto = {
            email: email,
            name: req.oidc.user.name || 'Nombre por defecto',
            password: '', // No se almacena una contraseña si el usuario usa Auth0
            passwordConfirm: '',
            auth0Id: auth0Id,
          };
  
          user = await this.authService.registerUserWithAuth0(newUser);
        }
  
        const token = await this.authService.createToken(user);
  
        // Redirige al frontend con el token en la URL
        return res.redirect(`http://localhost:3000/home?token=${token}`);
      } else {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: 'User not authenticated' });
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error auth0 user', error });
    }
  }

```

### Flujo de Autenticación con Auth0
Cuando un usuario intenta autenticarse con Auth0, se le redirige a la página de inicio de sesión de Auth0. Una vez autenticado, Auth0 redirige al usuario de vuelta a tu aplicación, pasando un "callback" al backend de NestJS.

El backend maneja este callback validando la autenticación y obteniendo los datos del usuario de Auth0. Si el usuario no existe en la base de datos, se crea un nuevo registro para él utilizando la información proporcionada por Auth0. Si el usuario ya existe, se actualiza su registro con el ID de Auth0, si es necesario.

Después de autenticar al usuario, el backend genera un token JWT que se envía al frontend para que el usuario pueda realizar solicitudes autenticadas en la aplicación.

### servicio de Autenticación
El servicio de autenticación en el backend maneja las operaciones principales relacionadas con la autenticación, como la validación de credenciales, la creación de nuevos usuarios, y la generación de tokens JWT. Además, el servicio interactúa con la base de datos para verificar si un usuario ya existe, registrar nuevos usuarios, y actualizar los registros existentes.

Este servicio también se encarga de manejar los casos en los que un usuario se autentica con Auth0. Si el usuario ya está registrado en la base de datos pero no tiene un ID de Auth0, este se actualiza en el registro del usuario.
### Manejando Errores y Excepciones

Durante todo el proceso de autenticación, se gestionan adecuadamente los errores y excepciones para garantizar una experiencia de usuario fluida. Por ejemplo, si un usuario intenta registrarse con un correo electrónico que ya está en uso, se lanza una excepción que notifica al usuario del problema. Asimismo, si ocurre un error inesperado durante el proceso de autenticación con Auth0, el sistema está diseñado para manejarlo y proporcionar una respuesta clara al usuario.


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



