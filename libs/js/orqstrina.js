// Global Variables
var adminPass = "orQstrina"

var songsArray
var playlistArray

var radio1 = document.getElementById('btnradio1')
var radio2 = document.getElementById('btnradio2')
var radio3 = document.getElementById('btnradio3')

var controlsModal = $('#controls')
var loginModal = $('#loginModal')

var collectionModal = $('#collection')
var playlistModal = $('#playlist')
var uploadModal = $('#upload') 

var audioControls = $('#audioControls')

var adminButton = $("#admin")
var cancelAdminButton = $("#cancelAdmin")
var loginButton = $("#login")
var logoutButton = $('#logout')
var resetButton = $('#reset')


var listado = document.getElementById('listadoMusica')
var listadoCola = document.getElementById('cola')

// Modals initial configuration

//audioControls.hide()

collectionModal.show()
playlistModal.hide()
uploadModal.hide()

loginModal.hide()

cancelAdminButton.hide()
logoutButton.hide()
resetButton.hide()

// Init secuence



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

// Evento para añadir cancion a la cola al hacer click en la lista coleccion
listado.addEventListener("click", addSongToQueue)

// Funcion añade cancion a la tabla queuelist
function addSongToQueue(e) {
	const itemClick = e.target

    songTitle = itemClick.innerText

    // Ajax call to add song to queuelist in database
    $.ajax({
        url: './libs/php/queue_song.php',
        method: 'POST',
        dataType: 'text',
        data: {
            songTitle: songTitle
        },
        success: function(response) {
            console.log(response)
            if (response == "inserted") {
                console.log("Song inserted successfully")
            } else if (response == "error") {
                console.log("Error")
            }
        }
    })

    // Update playlist
    populatePlaylistArray()
    createPlaylist()
	
}

// Function to populate array containing queued songs in the playlist
function populatePlaylistArray() {
    $.ajax({
        async: false,
        url: './libs/php/populate_playlist.php',
        method: 'POST',
        dataType: 'json',
        success: function(response) {
            if(response) {
                playlistArray = response
            } else if (response == "0") {
                console.log("No queued songs. Playing random")
            }
        }
    })
}

function createPlaylist() {
    
    for (let i = 0; i < playlistArray.length; i++){
		const item = document.createElement('li')
		item.appendChild(document.createTextNode(playlistArray[i][0])) 
		item.setAttribute("id", playlistArray.indexOf(playlistArray[i]))
		listadoCola.appendChild(item)
	}
    console.log("listado cola--_>", listadoCola)
	collection.appendChild(listado)
    console.log(collection)
}

function loadNextSong(song) {

}

function playSong() {
    
}



// Funcion para autenticar admin
function authAdmin(pass) {
    if (pass == "orQstrina") {
        loginModal.hide()
        controlsModal.show()
        audioControls.show()
        cancelAdminButton.hide()
        adminButton.hide()
        logoutButton.show()
        resetButton.show()
    } else {
        alert("Sorry wrong password. Try again")
    }
}

// Funcion para reinicializar base de datos
function resetOrqstrina() {
    initializeDatabase()
    populateDatabase()
}



//Funcion para pausar o darle play 
function togglePlay() {
	if (player.paused){
		toggleIcon();
		return player.play();
	} else {
		toggleIcon();
		return player.pause();
	}
}

//Funcion para cambiar el icono play o pause
function toggleIcon() {
    var element = document.getElementById("iconPlay");
    element.classList.toggle("fa-play-circle");
    element.classList.toggle("fa-pause-circle");
 }



// Event listeners for admin login

adminButton.on('click', function() {
    controlsModal.hide()
    loginModal.show()
    adminButton.hide()
    cancelAdminButton.show()
    // show init_database button
})

logoutButton.on('click', function() {
    controlsModal.show()
    audioControls.hide()
    loginModal.hide()
    adminButton.show()
    logoutButton.hide()
    resetButton.hide()
})

cancelAdminButton.on('click', function() {
    controlsModal.show()
    audioControls.hide()
    loginModal.hide()
    adminButton.show()
    cancelAdminButton.hide()
})

loginButton.on('click', function() {
    authAdmin($('#pass').val())
})

resetButton.on('click', function() {
    resetOrqstrina()
})


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
