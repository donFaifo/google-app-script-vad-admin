# VAD Admin

Aplicación creada durante el período de venta telefónica en la pandemia. La creé con el propósito de gestionar los pedidos telefónicos en las diferentes modalidades de envío. Las implementaciones han sido archivadas por no poder usar la *URL* de la implementación en la variable `baseUrl` que contiene la raíz de la *url* de la aplicación. En su lugar hay que usar la **implementación de prueba** que usa siempre la misma *url*.

## Motivación

Durante el período de pandemia en 2020 se produjo un parón a nivel mundial que hizo que muchas empresas tuvieran que adaptarse a una situación insólita. *Leroy Merlin* habilitó el servicio de venta telefónica, que por aquel entonces no existía, y pusieron a muchos de sus vendedores a prestar este servicio. Siendo yo uno de ellos, me encontré realizando ventas a nivel nacional desde casa con un sistema recién implantado y un equipo recién formado.

Los clientes llamaban a una centralita que pasaba la llamada a un vendedor disponible y éste, haciendo uso de la web y de algunas aplicaciones y sistemas que la empresa habilitó, debía localizar la tienda más cercana, realizar el pedido y hacer su seguimiento. También tenía que confeccionar presupuestos para los clientes que los solicitasen.

Para realizar el pago había varios métodos, cada uno con unos procedimientos diferentes que pasaban por copiar unos datos a una hoja de cálculo compartida en la nube, dar los datos bancarios para realizar una transferencia y más tarde se implantaron distintos métodos de *Phone&Sell* que permitían unos pagos más ágiles.

También había diferentes métodos de entrega de productos: En tienda, o con envío por diferentes canales internos. Cada uno con sus protocolos.

Siendo un sistema todavía en sus primeros días de vida, y con una aplicación interna que aún no estaba adaptada a esta situación resultaba complicado gestionar los pedidos, los métodos de pago y el seguimiento. Además se nos valoraba nuestro trabajo por el importe en pedidos semanales y no había una manera sencilla de ver estos datos por lo que me creé una pequeña aplicación que me ayudara a adminsitrar mi labor.

## La aplicación

Consta de un frontend realizado en *javascript/html* usando como framework *[Bootstrap v4.4.1](https://getbootstrap.com/docs/4.4/getting-started/introduction/)* y *[jQuery v3.5.1](https://api.jquery.com/)*. El backend se sustenta en una hoja de cálculo de google de la que obtiene los datos necesarios.

### Funcionalidades implementadas

Hay varias páginas para realizar la gestión de los pedidos. La página inicial es un **dashboard** donde se pueden ver los pedidos realizados, presupuestos pendientes, estadísticas semanales de pedidos y donde se pueden buscar datos de cualquier tienda. También se puede ver la disponibilidad de los artículos en las tiendas, sin embargo, esta funcionalidad se basaba en una API proporcionada por Leroy Merlin que ya no está disponible por haber quedado obsoleta.

También hay una página desde donde se pueden **introducir los datos de los pedidos** y guardarlos en la hoja de cálculo.

### Otras funcionalidades

La aplicación debía hacer también el **seguimiento de los presupuestos** y mostrar **listas de pedidos y presupuestos** que se pudieran filtrar. Así mismo, debía permitir **configurar los enlaces para las aplicaciones con los métodos de pago** proporcionados por la empresa. Sin embargo, debido a que volví a tienda para continuar con mi trabajo habitual como asesor, la aplicación quedó **discontinuada** y no se implementaron el resto de funcionalidades.

Para la aplicación se necesita una hoja de cálculo de Google con los datos necesario de las tiendas, una hoja para guardar los pedidos.
