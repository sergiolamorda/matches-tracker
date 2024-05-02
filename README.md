# Match Tracker

Este proyecto está creado con arquitectura hexagonal (Ports and Adapters) aplicada al frontend, facilitando así la escalabilidad del código, la mantebilidad y el testing del proyecto. Además, permite aislar y proteger nuestra lógica de negocio y abstraerse para no contaminar el 'core' del proyecto con librerías externas.

La arquitectura hexagonal junto al patrón "repository", permite testear el código mockeando los datos del adaptador de forma muy sencilla. Tanto para los test e2e (cypress) cómo para los test unitarios (jest) he utilizado "testing-library" para testear siempre desde el punto de vista del usuario y no desde el punto de vista de la programación.

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

## Entidades del proyecto

- **Matches**: La entidad de matches, hace referencia a un partido. Dentro de src/matches están definidos sus casos de uso, juntos a la estructura y las implementaciones necesarias en la capa de infraestructura.

- **Matches widgets**: Un matchWidget, hace referencia a un partido que el usuario quiere guardarse para ver su estado. En /src/matches-widgets están definidos sus casos de uso junto a sus implementaciones.