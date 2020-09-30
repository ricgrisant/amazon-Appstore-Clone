//Codigo para generar información de categorias y almacenarlas en un arreglo.
var categorias = [];
(()=>{
  //Este arreglo es para generar textos de prueba
  let textosDePrueba=[
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
      "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
      "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
      "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
      "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
  ]
  
  //Genera dinamicamente los JSON de prueba para esta evaluacion,
  //Primer ciclo para las categorias y segundo ciclo para las apps de cada categoria

  
  let contador = 1;
  for (let i=0;i<5;i++){//Generar 5 categorias
      let categoria = {
          nombreCategoria:"Categoria "+i,
          descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
          aplicaciones:[]
      };
      for (let j=0;j<10;j++){//Generar 10 apps por categoria
          let aplicacion = {
              codigo:contador,
              nombre:"App "+contador,
              descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
              icono:`img/app-icons/${contador}.webp`,
              precio: (Math.random() * (5)).toFixed(2),
              instalada:contador%3==0?true:false,
              app:"app/demo.apk",
              calificacion:Math.floor(Math.random() * (5 - 1)) + 1,
              descargas:1000,
              desarrollador:`Desarrollador ${(i+1)*(j+1)}`,
              imagenes:["img/app-screenshots/1.webp","img/app-screenshots/2.webp","img/app-screenshots/3.webp"],
              comentarios:[
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Juan"},
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Pedro"},
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Maria"},
              ]
          };
          contador++;
          categoria.aplicaciones.push(aplicacion);
      }
      categorias.push(categoria);
  }
  
  console.log(categorias);
})();

/* Commienza la funcionalidad de la aplicación*/

/* Enviar datos al select*/

var ele = document.getElementById('select-categorias');

for (var i = 0; i < categorias.length; i++) {
    // Enviar la data al dropdown
    ele.innerHTML +=
        '<option value="' + categorias[i].nombreCategoria + '">' + categorias[i].nombreCategoria + '</option>';
}

/*Valor recibido */

const categoriaSeleccionada = () => {
    categoria  = document.getElementById('select-categorias').value;
    
    if (categoria != 'Categoria') {
        imprimeApps(categoria)
    } else {
        imprimeApps(null)
    }
}

/** Imprimir la categoria de apps sellecionada */
const imprimeApps = (categoria) => {
    var eleApps = document.getElementById('apps');
    /** Borramos las apps anteriores*/
    eleApps.innerHTML = '';
    var apps = infoCategoria(categoria);
    var appsMostrar = apps[0].aplicaciones
    /** creamos un array sólo de las apps de categoria seleccionada
    
    const appsModal = catSelectArray[0].aplicaciones;
    /* Imprimimos las apps en el index */
    
    appsMostrar.forEach(element => {
        return eleApps.innerHTML += 
        `<div onclick="muestraModal(${element.codigo + "," + "'" + categoria + "'"})" class="carta pr0 col-sm-6 col-md-3 col-xl-2">
            <div class="info-app">
                <img class="app-img" src="${element.icono}">
                <h5 style="margin: 0px;">${element.nombre}</h5>
                <p style="font-size: 0.9rem;">${element.desarrollador}</p>
                <div class="estrellas">
                    ${imprEstrellas(element.calificacion)}
                </div>                     
                <h5>${element.precio < 0.5 ? ('Free') : ('$' + element.precio ) }</h5>
            </div>
        </div>`
    });

}

const muestraModal = (codigo,categoria) => {
    $('.modal').modal('show')

    /* Seleccionamos las apps de la categroria correspondiente */
    var apps = infoCategoria(categoria);
    var appsInfoModal = apps[0].aplicaciones

    /* Seleccionamos la app del codigo seleccionado*/
    var infoApp = appsInfoModal.filter(function (info) {
        return info.codigo === codigo
    });

    var imagenes = infoApp[0].imagenes;
    var aux = 0
    /* Enviamos los datos a la ventana modal */

    /* Carousel */
    imagenes.forEach(element => {

        document.getElementById('imgsCarouApp').innerHTML += '';
        if (aux === 0) {
            aux++
            document.getElementById('imgsCarouApp').innerHTML += 
            `<div class="carousel-item active">
                <img src="${element}" class="d-block w-100">
            </div>`;
        }else{
            document.getElementById('imgsCarouApp').innerHTML += 
            `<div class="carousel-item">
                <img src="${element}" class="d-block w-100">
            </div>`;
        }
    });

    /* logo y detalles, precio ,estrellas */
    document.getElementById('imgModalApp').innerHTML='';
    document.getElementById('imgModalApp').innerHTML=`<img class="app-img" src="${infoApp[0].icono}">`;

    document.getElementById('detallesAppModal').innerHTML='';
    document.getElementById('detallesAppModal').innerHTML=
    `<h2>${infoApp[0].nombre}</h2>
    <p>${infoApp[0].descripcion}</p>
    <h5>$${infoApp[0].precio}</h5>`;

    document.getElementById('strModal').innerHTML= '';
    document.getElementById('strModal').innerHTML= 
    `${imprEstrellas(infoApp[0].calificacion) + ' ' + infoApp[0].calificacion+'.0'}`;

    /* Comentarios*/
    
    var comentarios = infoApp[0].comentarios;

    document.getElementById('comentariosModal').innerHTML= '';
    comentarios.forEach(element => {
        document.getElementById('comentariosModal').innerHTML += 
        `<div class="row" style="border-top: solid 1px #80808047; padding-top: 15px;">
        <div class="col-2">
            <img src="img/user.webp" style="border-radius: 24px;">
        </div>
        <div class="col-10">
            <h6>${element.usuario}</h6>
            <p style="font-size: 12px;">${element.comentario}</p>
        </div>
        </div>
        `
    });

    /* Botones Modal*/
    document.getElementById('botonModal').innerHTML= 
    infoApp[0].instalada?  
    '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>': 
    `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
    <button type="button" class="btn btn-success">Instalar</button>`;
    
}

/** Obtenemos sólo las apps se la categoria seleccionada */
const infoCategoria = (categoria) => {
        
    var catSelectArray = categorias.filter(function (cat) {
        return cat.nombreCategoria === categoria
    });

    return catSelectArray
}

const imprEstrellas = (calificacion) =>{
    var estrellasVacias = 5 - calificacion
    arrayStar = ''

    for (let index = 0; index < calificacion; index++) {
        arrayStar+='<i class="fas fa-star"></i>';  
    }

    for (let index = 0; index < estrellasVacias; index++) {
        arrayStar+='<i class="far fa-star"></i>';  
    }

    return arrayStar

}
