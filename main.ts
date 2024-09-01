let playlist: Cancion[] = [];

class Cancion {
    titulo: string;
    artista: string;
    duracion: string;
    portada: string;

    constructor(titulo: string, artista: string, duracion: string, portada: string) {
        this.titulo = titulo;
        this.artista = artista;
        this.duracion = duracion;
        this.portada = portada;
    }
}

fetch('/playlist.json') // Cargar datos desde un archivo JSON
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
    })
    .then(data => {
        data.forEach((cancion: any) => {
            // Accede a las propiedades del objeto `cancion` dentro de `forEach`
            const titulo: string = cancion.nombre;
            const artista: string = cancion.autor;
            const portada: string = cancion.album;
            const cancionDuracion: string = minSeg(cancion.duracion);

            // Crea una nueva instancia de `Cancion`
            const nuevaCancion = new Cancion(titulo, artista, cancionDuracion, portada);

            playlist.push(nuevaCancion);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });


function minSeg(duracion: number): string {
    const minutos: number = Math.floor(duracion / 60);
    let segundos: number = duracion % 60;

    // Si los segundos son menores a 10, agregamos un 0 al inicio
    let segundosStr: string = segundos < 10 ? "0" + segundos.toString() : segundos.toString();

    return `${minutos}:${segundosStr}`;
}


// Agregar cancion en el HTML
function agregarCancion(cancion: Cancion) {
    const musicaPlay = document.querySelector('#musicaPlay') as HTMLElement;

    if (!musicaPlay.querySelector('#CancionPlay')) {
        const cancionHTML = `
            <div id="CancionPlay" class="d-flex align-items-center justify-content-left">
                <img src=${cancion.portada} alt="" style="height: 70px;">
                <div class="ms-3">
                    <div id="songTitle" class="fw-semibold text-white">${cancion.titulo}</div>
                    <div id="artistName" class="text-white" style="font-size: 0.9em; line-height: 15px; opacity: 0.8;">
                        ${cancion.artista}
                    </div>
                </div>
            </div>
        `;

        musicaPlay.insertAdjacentHTML('afterbegin', cancionHTML);
    }

}

const buttons = document.querySelectorAll('.btn');


buttons.forEach(button => {
    button.addEventListener('click', () => {

        agregarCancion(playlist[2])
    });
});






