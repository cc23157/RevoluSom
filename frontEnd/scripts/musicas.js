const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id');
const idPlaylist = urlParams.get('idplaylist')

async function musicas() {

    const resposta = await fetch(`http://localhost:3000/todasmusicas`, {
        method: 'GET'
    })   
    const res = await resposta.json()
    console.log(res)

    for (i in res) {
        let idMusica = res[i].idMusica 
        let nome = res[i].nome
        let artista = res[i].preNome + ' ' + res[i].sobrenome
        let idCapa = res[i].idCapa
        criar(idMusica, nome, artista, idCapa)
    }
    
    function criar(id, nome, artista, idCapa) {
        let elemento = window.document.getElementById('musicas')

        let audio = window.document.createElement('div')
        audio.classList.add('musicas')
        audio.setAttribute('id', id)
        string = `<input type='checkbox'> ${nome} - ${artista} <br> <br> <img src='https://drive.google.com/uc?export=view&id=${idCapa}'>`
        console.log(string)
        audio.innerHTML = string
        
        elemento.appendChild(audio)
    }
    
}

async function adicionarMusicas() {
    let musicas = window.document.getElementsByTagName('input')

    for (indice in musicas) {
        let musica = musicas[indice]

        if (musica.checked) {
            let idMusica = musica.parentElement.id

            const data = {
                idPlaylist: idPlaylist,
                idMusica: idMusica
            }
    
            const resposta = await fetch(`http://localhost:3000/adicionarmusica`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            console.log('Música adicionada!')
        }
    }

    window.alert("Músicas adicionadas")
    window.location.href = `http://localhost:3000/playlist?idplaylist=${idPlaylist}&id=${id}`

}