// Global Variables
var adminPass = "orQstrina"

var songsArray
var playlistArray

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
let audioSource
let analyzer

var source = document.getElementById('source')
source.src = ''
var player = document.getElementById('player')

var buttonPlay = $('#buttonPlay')

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
var refreshButton = $('#refresh')


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

if(source.src === "http://localhost/orqstrina-javascript-php-mysql/" ||
   source.src === "http://localhost/orqstrina-javascript-php-mysql/index.html") playerLoad()

console.log(source.src)


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

// Evento para refrescar la lista de reproduccion
refreshButton.on('click', function() {
    // ajax to query queue_list table and refresh list
    listadoCola.innerHTML = ''
    populatePlaylistArray()
    createPlaylist()
})


// Evento para añadir cancion a la cola al hacer click en la lista coleccion
listado.addEventListener("click", addSongToQueue)

// Funcion añade cancion a la tabla queuelist
function addSongToQueue(e) {
	const itemClick = e.target

    songTitle = itemClick.innerText

    // Ajax call to add song to queuelist in database
    $.ajax({
        async: false,
        url: './libs/php/queue_song.php',
        method: 'POST',
        dataType: 'text',
        data: {
            songTitle: songTitle
        },
        success: function(response) {
            var s=response.trim()
            console.log(s)
            console.log(response)
            if (s == "inserted") {
                console.log("Song inserted successfully")
            } else if (response == "error") {
                console.log("Error")
            }
        }
    })

    // Update playlist
    listadoCola.innerHTML = ''
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
    console.log("listado cola-->", listadoCola)
	collection.appendChild(listado)
    console.log(collection)
}

//Funcion para actualizar la barra de progreso del reprodutor
const updateProgress = () => {
	if (player.currentTime > 0) {
		const barra = document.getElementById('progress')
		barra.value = (player.currentTime / player.duration) * 100
		
		var duracionSegundos= player.duration.toFixed(0);
		dura=secondsToString(duracionSegundos);
		var actualSegundos = player.currentTime.toFixed(0)
		actual=secondsToString(actualSegundos);
		
		duracion= actual +' / '+ dura
		document.getElementById('timer').innerText=duracion 
	}
	if (player.ended) {

		playerLoad()
        player.play()
	} 
}

function loadNextSong(song) {
    source.src = "audio/" + song
}

// Funcion para la carga dinamica del reproductor

function playerLoad() {
    // ajax para saber si hay pistas en la playlist. Si hay empieza a tocarlas todas por orden. Si no llama a la funcion playRandom
    
    $.ajax({
        async: false,
        url: './libs/php/load_next_song.php',
        method: 'POST',
        dataType: 'json',
        success: function(response) {
            console.log("xXxXXXxXx", response)
            if(response) {
                // cargamos reproductor con la primera cancion de la cola
                source.src = "./audio/" + response[0][0]
                player.load()
                reproduccionActual("Playing: " + response[0][0])

                // borramos registro de la base de datos con un ajax --> nueva rutina delete__current_song.php
                $.ajax({
                    async: false,
                    url: './libs/php/borrar_cancion.php',
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        qtitle: response[0][0]
                    },
                    success: function() {
                        console.log("Cancion borrada")
                    }
                })
            } else {
                // cargamos reproductor con una cancion al azar de la coleccion
                var randomIndex = Math.floor(Math.random() * songsArray.length)
                source.src = "./audio/" + songsArray[randomIndex][0]
                player.load()
                reproduccionActual("Playing: " + songsArray[randomIndex][0])
            }
        }
    })
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
		toggleIcon()
        
		return player.play()
	} else {
		toggleIcon()
		return player.pause()
	}
}

//Funcion para cambiar el icono play o pause
function toggleIcon() {
    var element = document.getElementById("iconPlay");
    element.classList.toggle("fa-play-circle");
    element.classList.toggle("fa-pause-circle");
}

 //Funcion para que al dar click sobre la barra de progeso se permita adelantar
progress.addEventListener('click', adelantar);
function adelantar(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
	player.currentTime = scrubTime;
	//console.log(e);
}

//Funcion para convertir segundos a minutos y horas
function secondsToString(seconds) {
	var hour="";
	if (seconds>3600){
		hour = Math.floor(seconds / 3600);
		hour = (hour < 10)? '0' + hour : hour;
		hour+=":"
	}
   var minute = Math.floor((seconds / 60) % 60);
  minute = (minute < 10)? '0' + minute : minute;
  var second = seconds % 60;
  second = (second < 10)? '0' + second : second;
  return hour  + minute + ':' + second;
}

//Funcion para mostrar el nombre del arhivo actual en reproduccion
function reproduccionActual(texto){
	document.getElementById('currentPlay').innerText=texto
}


// Implementando el visualizador de sonido
player.addEventListener('playing', oscillate)

function oscillate() {
	//const audio1 = document.getElementById('player')
	
	const audioContext = new AudioContext()
	audioSource = audioContext.createMediaElementSource(player)
	analyzer = audioContext.createAnalyser()
	audioSource.connect(analyzer)
	analyzer.connect(audioContext.destination)
	analyzer.fftSize = 512
	const bufferLength = analyzer.frequencyBinCount*0.42
	const dataArray = new Uint8Array(bufferLength)

	const barWidth = canvas.width / bufferLength
	let barHeight
	let x
	function animate() {
		x = 0
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		analyzer.getByteFrequencyData(dataArray)

		drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray) 

		requestAnimationFrame(animate)

	}
	animate()
}

function drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray) {
	for (let i = 0; i < bufferLength; i++) {
		barHeight = dataArray[i] -60
		
		const hue = i
		ctx.fillStyle = 'white'
		ctx.fillRect(x, canvas.height - barHeight +50, barWidth, barHeight)
		ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)'
		
		ctx.fillRect(x, canvas.height - barHeight +60, barWidth, barHeight)
		x += barWidth
	}
}





// Event listeners for buttons
/*
buttonPlay.on('click', function() { 
    console.log("Play clicked")
    source.src = "./audio/keygen_pista_22.mp3"
    player.load()
    player.currentTime = 0
    player.play()
})*/




// Event listeners for admin login

adminButton.on('click', function() {
    controlsModal.hide()
    loginModal.show()
    adminButton.hide()
    cancelAdminButton.show()
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
