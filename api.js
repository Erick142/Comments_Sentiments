
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
        const element = new Element("div", {
            style: {
                "display": "flex",
                "flex-direction": "column",
            }
        }, "");

        comentarios.forEach((comentario) => {
            const textoComentario = comentario.snippet.topLevelComment.snippet.textDisplay;
            console.log('Comentario:', textoComentario);
            const prediction = sentiment.predict(textoComentario);

            
            const elementoTexto = new Element("div", {
                style: {
                    "color": "blue"
                }
            }, textoComentario);
            const elementoPrediction = new Element("div", {
                style: {
                }
            }, prediction.score);

            const subElement = new Element("div", "", `${elementoTexto.getElement()} ${elementoPrediction.getElement()}`)
            if(prediction.score > 0.5){
                subElement.attributes = {
                    style: {
                        "width": `${prediction.score * 100}vw`,
                        "background-color": "green"
                    }
                }
            }else{
                subElement.attributes = {
                    style: {
                        "width": `${prediction.score * 100}vw`,
                        "background-color": "red"
                    }
                }
            }
            
            element.content += `${subElement.getElement()} `
        });

        element.addToRoot();

    } catch (error) {
        console.error('Error al obtener los comentarios:', error);
    }
}

const videoId = 'SIm2W9TtzR0';
obtenerComentarios(videoId);