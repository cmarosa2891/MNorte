window.addEventListener( 'DOMContentLoaded', ( event ) => {
    console.log( 'DOM cargado' );


    let carrito = [];
    const divisa = '$';
    // const DOMitems = document.querySelector( '#items' );
    const DOMcarrito = document.querySelector( '#carrito' );
    const DOMcompra = document.querySelector( '#listaDeCompras' );
    // const DOMtotal = document.querySelector( '#total' );
    // const DOMbotonVaciar = document.querySelector( '#boton-vaciar' );
    const miLocalStorage = window.localStorage;

   // Variables
   const baseDeDatos = [
    {
        id: 1,
        nombre: 'Wichi - Aislante',
        precio: 3500,
        imagen: '/imagenes/cart/aislante_pro.jpg'
    },
    {
        id: 2,
        nombre: 'Aislante - Nacional',
        precio: 2700,
        imagen: '/imagenes/cart/aislante.jpg'
    },
    {
        id: 3,
        nombre: 'Cerco de Obra - Altura 1,50m x 2m',
        precio: 2000,
        imagen: '/imagenes/cart/cerco_verde_obra.jpg'
    },
    {
        id: 4,
        nombre: 'Verde Foresta',
        precio: 1800,
        imagen: '/imagenes/cart/Pintura_verde_obra.jpg'
    },
    {
        id: 5,
        nombre: 'Placa Telgopor 1m2 5cm espesor',
        precio: 176,
        imagen: '/imagenes/cart/placa_telgopor.jpg'
    },
    {
        id: 6,
        nombre: 'Listón Kiri [ml]',
        precio: 350,
        imagen: '/imagenes/cart/liston_kiri.jpg'
    },
    {
        id: 7,
        nombre: 'Liston Eucalipto [m2]',
        precio: 260,
        imagen: '/imagenes/cart/liston_eucalipto.jpg'
    },
    {
        id: 8,
        nombre: 'Tirante Saligna [ml]',
        precio: 218,
        imagen: '/imagenes/cart/Tirante_Saligna.jpg'
    }
];

    function renderizarListaDeCompras () {
        // Vaciamos todo el html
        DOMcompra.textContent = '';     // Vaciamos todo el html
        const listaDeComprasSinDuplicados = [ ...new Set( carrito ) ]; // Quitamos los duplicados
        // Generamos los Nodos a partir de carrito   
        listaDeComprasSinDuplicados.forEach( ( item ) => {
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
            miNodo.classList.add( 'list-group-item', "text-left", 'mx-2', "text-uppercase", "font-italic" );
            miNodo.textContent = `${ numeroUnidadesItem } x ${ miItem[ 0 ].nombre } - ${ miItem[ 0 ].precio }${ divisa }`;

            DOMcompra.appendChild( miNodo ); //const DOMcompra = document.querySelector('#listaDeCompras');
        } );
    }


    /**
    * ListaDeCompras desde localStorage
    */

     function cargarListadeComprasDeLocalStorage () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if ( miLocalStorage.getItem( 'carrito' ) !== null ) {
            const presupuesto = document.querySelector( '#presupuesto' );
            presupuesto.classList.toggle('display');
            // Carga la información
            carrito = JSON.parse( miLocalStorage.getItem( 'carrito' ) );
        } 
        
        if ( miLocalStorage.getItem( 'carrito' ) == null ){
            const presupuesto = document.querySelector( '#presupuesto' );
            presupuesto.classList.toggle('display');
        }
    }

    // Inicio

    cargarListadeComprasDeLocalStorage()
    renderizarListaDeCompras()


} );