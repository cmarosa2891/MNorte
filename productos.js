window.addEventListener( 'DOMContentLoaded', ( event ) => {
    console.log( 'DOM cargado' );


    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector( '#items' );
    const DOMcarrito = document.querySelector( '#carrito' );
    const DOMcompra = document.querySelector( '#listaDeCompras' );
    const DOMtotal = document.querySelector( '#total' );
    const DOMbotonVaciar = document.querySelector( '#boton-vaciar' );
    const miLocalStorage = window.localStorage;





    // Variables
    // const baseDeDatos = JSON.parse(productosBD);  
    // import baseDeDatos from './basededatos.json' ; 
    // console.log(baseDeDatos);
    // let objDB
    // fetch( "./basededatos.json" )
    // .then( response => {
    //     return response.json();
    // } )
    // .then( data => console.log(data))
    // .then(data => objDB=data)
    
    // console.log(objDB);
    // const baseDeDatos = objDB;
    // const baseDeDatos = JSON.parse(productosBD);
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Wichi - Aislante',
            precio: 3500,
            imagen: '/imagenes/cart/aislante_pro.webp'
        },
        {
            id: 2,
            nombre: 'Aislante - Nacional',
            precio: 2700,
            imagen: '/imagenes/cart/aislante.webp'
        },
        {
            id: 3,
            nombre: 'Cerco de Obra - Altura 1,50m x 2m',
            precio: 2000,
            imagen: '/imagenes/cart/cerco_verde_obra.webp'
        },
        {
            id: 4,
            nombre: 'Verde Foresta',
            precio: 1800,
            imagen: '/imagenes/cart/Pintura_verde_obra.webp'
        },
        {
            id: 5,
            nombre: 'Placa Telgopor 1m2 5cm espesor',
            precio: 176,
            imagen: '/imagenes/cart/placa_telgopor.webp'
        },
        {
            id: 6,
            nombre: 'Listón Kiri [ml]',
            precio: 350,
            imagen: '/imagenes/cart/liston_kiri.webp'
        },
        {
            id: 7,
            nombre: 'Liston Eucalipto [m2]',
            precio: 260,
            imagen: '/imagenes/cart/liston_eucalipto.webp'
        },
        {
            id: 8,
            nombre: 'Tirante Saligna [ml]',
            precio: 218,
            imagen: '/imagenes/cart/Tirante_Saligna.webp'
        }
    ];

    // let carrito = [];
    // const divisa = '$';
    // const DOMitems = document.querySelector('#items');
    // const DOMcarrito = document.querySelector('#carrito');
    // const DOMcompra = document.querySelector('#compra');
    // const DOMtotal = document.querySelector('#total');
    // const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    // const miLocalStorage = window.localStorage;

    // Funciones

    /**
    * Dibuja la Lista de Productos a partir de la base de datos.
    */

    const renderizarProductos = () => {               //     function renderizarProductos () {

        baseDeDatos.forEach( ( info ) => { // base de datos de productos

            // Estructura
            const miNodo = document.createElement( 'div' );
            miNodo.classList.add( 'cards', 'col-sm-3' );    // agregado de clase   cambiado a clase cards
            // Body
            const miNodoCardBody = document.createElement( 'div' );
            miNodoCardBody.classList.add( 'card-body' ); // agregado de clase
            miNodoCardBody.classList.add( 'card' ); // agregado de clase

            // Titulo
            const miNodoTitle = document.createElement( 'h5' );
            miNodoTitle.classList.add( 'card-title' ); // agregado de clase
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement( 'img' );
            miNodoImagen.classList.add( 'img-fluid' ); // agregado de clase
            miNodoImagen.setAttribute( 'src', info.imagen );
            // Precio
            const miNodoPrecio = document.createElement( 'p' );
            miNodoPrecio.classList.add( 'card-text' );
            miNodoPrecio.textContent = `${ info.precio }${ divisa }`;
            // Boton 
            const miNodoBoton = document.createElement( 'button' );
            miNodoBoton.classList.add( 'btn', 'btn-primary' );
            miNodoBoton.textContent = 'Agregar';
            miNodoBoton.setAttribute( 'marcador', info.id );
            miNodoBoton.addEventListener( 'click', anyadirProductoAlCarrito );
            // Insertamos
            miNodoCardBody.appendChild( miNodoImagen );
            miNodoCardBody.appendChild( miNodoTitle );
            miNodoCardBody.appendChild( miNodoPrecio );
            miNodoCardBody.appendChild( miNodoBoton );
            miNodo.appendChild( miNodoCardBody );
            DOMitems.appendChild( miNodo ); // = document.querySelector('#items');

        } );
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    const anyadirProductoAlCarrito = ( evento ) => { //  function anyadirProductoAlCarrito ( evento ) { 
        // Anyadimos el Nodo a nuestro carrito
        carrito.push( evento.target.getAttribute( 'marcador' ) );
        // Actualizamos el carrito 
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
    }

    /**
    * Dibuja todos los productos guardados en el carrito
    */
    const renderizarCarrito = () => { //    function renderizarCarrito () {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';  //document.querySelector('#carrito');
        // Quitamos los duplicados
        const carritoSinDuplicados = [ ...new Set( carrito ) ];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach( ( item ) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter( ( itemBaseDatos ) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt( item );
            } );
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce( ( total, itemId ) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0 );
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement( 'li' );
            miNodo.classList.add( 'list-group-item', 'text-right', 'mx-2' );
            miNodo.textContent = `${ numeroUnidadesItem } x ${ miItem[ 0 ].nombre } - ${ miItem[ 0 ].precio }${ divisa }`;

            // Boton de borrar
            const miBoton = document.createElement( 'button' );
            miBoton.classList.add( 'btn', 'btn-danger', 'mx-5' );
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener( 'click', borrarItemCarrito );
            // Mezclamos nodos
            miNodo.appendChild( miBoton );
            DOMcarrito.appendChild( miNodo ); //DOMcarrito = document.querySelector('#carrito');
        } );
        // Renderizamos el precio total en el HTML
        DOMtotal.textContent = calcularTotal();
    }

    /**
    * Evento para borrar un elemento del carrito
    */
    function borrarItemCarrito ( evento ) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter( ( carritoId ) => {
            return carritoId !== id;
        } );
        // volvemos a renderizar
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();

    }

    /**
     * Calcula el precio total teniendo en cuenta los productos repetidos
     */
    function calcularTotal () {
        // Recorremos el array del carrito 
        return carrito.reduce( ( total, item ) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter( ( itemBaseDatos ) => {
                return itemBaseDatos.id === parseInt( item );
            } );
            // Los sumamos al total
            return total + miItem[ 0 ].precio;
        }, 0 ).toFixed( 2 );
    }

    /**
    * Vacia el carrito y vuelve a dibujarlo desde localStorage
    */
    function vaciarCarrito () {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        // Borra LocalStorage
        localStorage.clear();
    }

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem( 'carrito', JSON.stringify( carrito ) );
    }

    function cargarCarritoDeLocalStorage () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if ( miLocalStorage.getItem( 'carrito' ) !== null ) {
            // Carga la información
            carrito = JSON.parse( miLocalStorage.getItem( 'carrito' ) );
            console.log( `Ítems en Carrito LS: ${ carrito }` );
        }
    }


    /**
    * ListaDeCompras desde localStorage
    */

    function cargarListadeComprasDeLocalStorage () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if ( miLocalStorage.getItem( 'carrito' ) !== null ) {
            // Carga la información
            carrito = JSON.parse( miLocalStorage.getItem( 'carrito' ) );
        }
    }


    // Eventos
    if ( DOMbotonVaciar ) {
        DOMbotonVaciar.addEventListener( 'click', vaciarCarrito );
    }
    // DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    let busqueda = document.getElementById( 'search-input' );


    //Filtro
    const d = document;
    function searchFilters ( input, selector ) {
        d.addEventListener( "keyup", ( e ) => {
            if ( e.target.matches( input ) ) {
                console.log( e.target.value );

                if ( e.key === "Escape" ) e.target.value = "";

                d.querySelectorAll( selector ).forEach( ( el ) =>
                    el.textContent.toLowerCase().includes( e.target.value )
                        ? el.classList.remove( "filter" )
                        : el.classList.add( "filter" ) )
                renderizarCarrito( 'reload' )
            }
        } )
    }

    // Inicio
    cargarCarritoDeLocalStorage();
    cargarListadeComprasDeLocalStorage()
    renderizarProductos();
    searchFilters( ".card-filter", ".cards" );
    renderizarCarrito();
    console.log('Hola');
} );




 
