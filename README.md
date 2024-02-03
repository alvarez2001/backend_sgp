
# SISTEMA GESTION DE PROYECTO



## Configuración Inicial

Para comenzar a trabajar con este proyecto, debes configurar el entorno de desarrollo siguiendo estos pasos:

### Configurar Variables de Entorno

1. Copia el archivo `.env.example` incluido en este repositorio:

   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` con tus propias credenciales de prueba y configuraciones. Este archivo contendrá todas las configuraciones necesarias para el proyecto, incluyendo credenciales de bases de datos, puertos, y cualquier otra variable de entorno requerida.

   Asegúrate de revisar y, si es necesario, cambiar las claves de passwords, usuarios de base de datos, y cualquier otra configuración sensible antes de proceder.

### Levantar el Proyecto con Docker

Una vez configurado el archivo `.env`, puedes levantar el proyecto utilizando Docker Compose. Este paso construirá y levantará todos los contenedores necesarios para el proyecto:

```bash
docker compose up --build -d
```

Este comando construirá las imágenes si es la primera vez que se levanta el proyecto, o si se han realizado cambios en las dependencias, y luego iniciará los contenedores en modo detached.

### Bajar el Proyecto con Docker

Para detener y remover todos los contenedores creados por el comando `up`, puedes utilizar:

```bash
docker compose down
```

Este comando detiene y remueve los contenedores, redes, y la configuración predeterminada de volumen asociada con tu composición de Docker.

## Documentación de la API

Para ver la documentación de las APIs y probar los endpoints disponibles, visita la siguiente URL después de levantar el proyecto:

[http://localhost:3000/swagger-documentation](http://localhost:3000/swagger-documentation)

La documentación de Swagger te proporcionará una interfaz interactiva para probar los endpoints, ver los parámetros esperados, y revisar los posibles códigos de respuesta.
