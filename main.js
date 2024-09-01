var playlist = [];
var Cancion = /** @class */ (function () {
    function Cancion(titulo, artista, duracion, portada) {
        this.titulo = titulo;
        this.artista = artista;
        this.duracion = duracion;
        this.portada = portada;
    }
    return Cancion;
}());
fetch('/playlist.json') // Cargar datos desde un archivo JSON
    .then(function (response) {
    if (!response.ok) {
        throw new Error('Error al cargar el archivo JSON');
    }
    return response.json();
})
    .then(function (data) {
    data.forEach(function (cancion) {
        // Accede a las propiedades del objeto `cancion` dentro de `forEach`
        var titulo = cancion.nombre;
        var artista = cancion.autor;
        var portada = cancion.album;
        var cancionDuracion = minSeg(cancion.duracion);
        // Crea una nueva instancia de `Cancion`
        var nuevaCancion = new Cancion(titulo, artista, cancionDuracion, portada);
        playlist.push(nuevaCancion);
    });
})
    .catch(function (error) {
    console.error('Error:', error);
});
function minSeg(duracion) {
    var minutos = Math.floor(duracion / 60);
    var segundos = duracion % 60;
    // Si los segundos son menores a 10, agregamos un 0 al inicio
    var segundosStr = segundos < 10 ? "0" + segundos.toString() : segundos.toString();
    return "".concat(minutos, ":").concat(segundosStr);
}
// Agregar cancion en el HTML
function agregarCancion(cancion) {
    var musicaPlay = document.querySelector('#musicaPlay');
    if (!musicaPlay.querySelector('#CancionPlay')) {
        var cancionHTML = "\n            <div id=\"CancionPlay\" class=\"d-flex align-items-center justify-content-left\">\n                <img src=".concat(cancion.portada, " alt=\"\" style=\"height: 70px;\">\n                <div class=\"ms-3\">\n                    <div id=\"songTitle\" class=\"fw-semibold text-white\">").concat(cancion.titulo, "</div>\n                    <div id=\"artistName\" class=\"text-white\" style=\"font-size: 0.9em; line-height: 15px; opacity: 0.8;\">\n                        ").concat(cancion.artista, "\n                    </div>\n                </div>\n            </div>\n        ");
        musicaPlay.insertAdjacentHTML('afterbegin', cancionHTML);
    }
}
var buttons = document.querySelectorAll('.btn');
buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        agregarCancion(playlist[2]);
    });
});
