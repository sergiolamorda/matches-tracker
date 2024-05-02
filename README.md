# Match Tracker

Este proyecto está creado con arquitectura hexagonal (Ports and Adapters) aplicada al frontend, facilitando así la escalabilidad del código, la mantebilidad y el testing del proyecto. Además, permite aislar y proteger nuestra lógica de negocio y abstraerse para no contaminar el 'core' del proyecto con librerías externas.

La arquitectura hexagonal junto al patrón "repository", permite testear el código mockeando los datos del adaptador de forma muy sencilla. Tanto para los test e2e (cypress) cómo para los test unitarios (jest) he utilizado "testing-library" para testear siempre desde el punto de vista del usuario y no desde el punto de vista de la programación.

Además de la arquitectura hexagonal, he utilizado react con Typescript para aumentar la robustez del código y minimizar futuros bugs y errores.

Para manejar y compartir el estado entre los distintos componentes he decidido no utilizar ninguna librería de control de store cómo redux ya que está cada vez más en desuso por la complejidad que añade a la lógica y la alta cohesión con el código. En su lugar he utilizado el contexto nativo que proporciona React.

## Producción

https://matches-tracker-1je.pages.dev/

## Paso para probar el proyecto

1. Clonar el repositorio
2. Clonar .env.example a .env y establecer la API KEY
3. Instalar dependencias y ejecutar el servicio

```bash
npm install
npm run dev
```

### Pasos para ejecutar los tests

**Test unitarios (jest)**:

```bash
npm run test
```

**Test de aceptación** (con la aplicación levantada):

```bash
npm run cy:run
```

## Estructura de archivos

- **/src**:
  - **/assets**: Aquí se encuentra los recursos del proyecto (imágenes, svgs, etc...).
  - **/components**: En components he introducido todos los componentes genericos y reutilizables de la aplicación, dónde en un futuro se acabaría construyendo un 'Design System' propio.
  - **/modules**: Dentro de modules están encapsuladas las tres capas del proyecto (dominio, aplicación e infraestructura). Para mejorar la estructura de ficheros, he aplicado 'vertical slicing' por lo que dentro de modules se encuentras las entidades del proyecto ([matches](#entidades-del-proyecto) y [matches-widgets](#entidades-del-proyecto)) y dentro de cada entidad, sus 3 respectivas capas.
  - **/sections**: En sections están los componentes que son más específicos de cada caso de uso.
- **/tests**:
  - **/e2e**: En esta carpeta se encuentran los test de adaptación (e2e), dónde se testea también las integraciones. Para los e2e he utilizado cypress.
  - **/modules**: Esta carpeta (replica la estructura de src/modules) están definidos los Mother Objects para poder instanciar y mockear facilemente nuestros tests unitarios. Para los test unitarios he utilizado jest.
  - **/sections**: Aquí están los test unitarios, dónde se testea cada caso de uso de nuestra capa de aplicación.

## Entidades del proyecto y documentación

Entidades del proyecto:

- **Matches**: La entidad de matches, hace referencia a un partido. Dentro de src/matches están definidos sus casos de uso, juntos a la estructura y las implementaciones necesarias en la capa de infraestructura.

- **Matches widgets**: Un matchWidget, hace referencia a un partido que el usuario quiere guardarse para ver su estado. En /src/matches-widgets están definidos sus casos de uso junto a sus implementaciones.

Cada entidad tiene su propio contexto nativo de React. Esto facilita la inyección de dependencias de los repositorios y no tener que hacer prop drilling entre todos los componentes. Además, el contexto wrappea las llamadas a los casos de uso, de esta forma está todo mucho más modularizado.

Otra ventaja de utilizar los Ports and Adapters, es que si, por ejemplo, queremos hacer que los Widgets de los usuarios se guarden en el servidor en vez de guardarlos en el Local Storage, solo tendríamos que crear la implementación en la capa de infraestructura firmando la interface de nuestra capa de dominio. De esta forma nuestra lógica de la aplicación no tendría que tocarse y simplemente instanciaríamos el repositorio de la llamada a la API y listo.