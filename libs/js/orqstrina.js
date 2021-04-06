// Global Variables
var songsArray
var radio1 = document.getElementById('btnradio1')
var radio2 = document.getElementById('btnradio2')
var radio3 = document.getElementById('btnradio3')

var collectionModal = $('#collection')
var playlistModal = $('#playlist')
var uploadModal = $('#upload') 

var vol = $('#vol')
var iconPlay = $('#iconPlay')
var iconForward = $('#iconForward')


var listado = document.getElementById('listadoMusica')

// Modals initial configuration
vol.hide()
iconPlay.hide()
iconForward.hide()

collectionModal.show()
playlistModal.hide()
uploadModal.hide()

// Init secuence
initializeDatabase()
populateDatabase()
populateSongsArray()
createCollection()

// == == == Initialize Module == == == //

// Inicializamos la base de datos

function initializeDatabase() {
    $.ajax({
        async: false,
        url: './libs/php/initialize_orqstrina.php',
        method: 'POST',
        dataType: 'json',
        success: console.log('Base de datos inicializada')
    })
}


// Rellenamos los datos en la tabla full_list
function populateDatabase() {
    $.ajax({
        async: false,
        url: './libs/php/populate_full_list.php',
        method: 'POST',
        dataType: 'json',
        success: console.log('Tabla rellena')
    })
}

// Crea array con todas las canciones en la base de datos

function populateSongsArray() {
    $.ajax({
        async: false,
        url: './libs/php/listado_de_archivos.php',
        method: 'POST',
        dataType: 'json',
        success: function(response) {
            if(response) {
                songsArray = response
            } else if (response == "0") {
                console.log("There's no audio files")
            }
        }
    })
}
    
// Funcion para crear la coleccion de canciones en el modal "collection"
function createCollection() {
    console.log("songsArray --> ", songsArray)
    for (let i = 0; i < songsArray.length; i++){
		const item = document.createElement('li')
		item.appendChild(document.createTextNode(songsArray[i][0])) 
		item.setAttribute("id", songsArray.indexOf(songsArray[i]))
		listado.appendChild(item)
	}
    console.log("listadp---_>", listado)
	collection.appendChild(listado)
    console.log(collection)
}




// Event listeners for modal handling
/*
radio1.addEventListener('click', toggleModal('collection'))
radio2.addEventListener('click', toggleModal('playlist'))
radio3.addEventListener('click', toggleModal('upload'))
*/

// Modal handling

function toggleModal(key) {
    if (key == "collection") {
            collectionModal.show()
            playlistModal.hide()
            uploadModal.hide()
    } else if (key == "playlist") {
            collectionModal.hide()
            playlistModal.show()
            uploadModal.hide()
    } else if (key == "upload"){
            collectionModal.hide()
            playlistModal.hide()
            uploadModal.show()
    }
}
