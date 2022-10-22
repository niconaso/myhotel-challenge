# <img src="src/assets/images/myhotel.png" width="100">


Este proyecto consiste en el challenge técnico de [myHotel](https://myhotel.cl) donde la consigna era la siguiente:

[Prueba Frontend MyHotel](https://gitlab.com/myhotel-enunciados/front-engineer-test/-/blob/master/front1.md).

Para el desarrollo de la misma se se utilizó [Angular CLI](https://github.com/angular/angular-cli) version 14.1.1.


## Requisitos

Es necesario contar con las siguientes dependencias:

- Node v14.17.6 (https://github.com/nvm-sh/nvm)
- Npm v6.14.15 (https://github.com/nvm-sh/nvm)
- Angular CLI: `npm i -g @angular/cli`


## Pasos para realizar la prueba del projecto:

Dentro de la carpeta del projecto ejecutar los siguientes comandos desde una terminal: 

1. Instalar las dependencias del proyecto: `npm i`
2. Levantar app: `npm run start:all`
3. En un browser navegar a `http://localhost:4200/`.


# Detalles funcionales y técnicos

## Negocio

Con el fin de desarrollar diferentes aspectos tecnicos opté por crear un CRUD muy simple que permita listar, crear, editar y eliminar Reviews (ej: Reviews de un hotel).

## Estructura de proyecto

La organización de carpetas y archivos elegida se basa en módulos funcionales, donde cada módulo encapsula la lógica propia de ese módulo.

A medida que el proyecto crece y es posible identificar mas módulos funcionales, es necesario reagrupar funcionalidades y componentes en común, moviendolos a las carpetas correspondientes.

Las carpetas `core` y `shared` representan funcionalidades compartidas por los diferentes modulos siendo `core` un modulo que se instancia una unica vez y el cual no debe contener componentes visuales. Y `shared` un modulo donde si van los componentes visuales y demas estructuras compartidas el resto de los módulos.

Por otro lado se incluye un modulo `utils` con el fin de incluir funciones de ayuda utiles en cualquier parte de la app.

## Herramientas y conceptos utilizados

Como puede verse en el codigo fuente se aplicaron diferentes librerias y conceptos a fin de demostrar los conocimientos sobre los mismos:

* [Angular Material](https://material.angular.io/): Para mostrar la grilla de reviews y manejo de dialogo (creación/edición/confirmación).
* [Bootstrap](https://getbootstrap.com/): Creación de layout y clases utilitarias.
* [FortAwesome](https://fortawesome.com/): Utilizo Emojis y otras WebFonts.
* [Ngx-Validators](https://github.com/Nightapes/ngx-validators): Validación de formularios.
* [Json-Server](https://github.com/typicode/json-server): Para crear una base de datos en memoria que permita ejecutar las acciones del CRUD.
* RxJs: Para el manejo reactivo de los objetos (Review).
* ReactiveForms: Para el manejo del formulario de creación/edición de las Reviews.
* Custom pipes: Para la conversión de los valores del rating de una review a su respectivo Emoji.
* Directivas: Para manejar el dialogo de confirmación de eliminación, creación y edición de las reviews.

## Construcción

Para poder construir el proyecto para desplegarlo en un servidor es necesario ejecutar `ng build`. Los artefactos del proyectos se crean dentro del directorio `dist/`. 

#### **Aclaración**: En caso de querer probar la app compilada es necesario modificar el endpoint del backend y el que mismo respete la estructura de base de datos definida en `server/db`. A su vez el endpoint del backend debe estar configurado con `CORS` habilitado.
