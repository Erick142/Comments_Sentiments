
async function obtenerComentarios(videoId) {
    const apiKey = 'AIzaSyACTaXbw3SmkpBRPGn4zpXItbf3ATOdWbA';

    const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        const comentarios = data.items;
        comentarios.forEach((comentario) => {
            const textoComentario = comentario.snippet.topLevelComment.snippet.textDisplay;
            console.log('Comentario:', textoComentario);
        });

    } catch (error) {
        console.error('Error al obtener los comentarios:', error);
    }
}

const videoId = 'SIm2W9TtzR0';
obtenerComentarios(videoId);