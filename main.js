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
function minSeg(duracion) {
    var minutos = Math.floor(duracion / 60);
    var segundos = duracion % 60;
    // Si los segundos son menores a 10, agregamos un 0 al inicio
    var segundosStr = segundos < 10 ? "0" + segundos.toString() : segundos.toString();
    return "".concat(minutos, ":").concat(segundosStr);
}
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
