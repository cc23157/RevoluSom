const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id');
const idAlbum = urlParams.get('album')

async function album() {

    const resposta = await fetch(`http://localhost:3000/musicasalbum?idalbum=${idAlbum}`, {
        method: 'GET'
    })   
    const res = await resposta.json()
    console.log(res)

    let nome = res.nome
    let artista = res.artista
    let idCapa = res.idCapa
    
    let capa = window.document.getElementById('capa')
    capa.src = `https://drive.google.com/uc?export=view&id=${idCapa}`

    let titulo = window.document.getElementById('nome')
    titulo.innerHTML = nome

    let nomeArtista = window.document.getElementById('artista')
    nomeArtista.innerHTML = artista

    let musicas = res.musicas

    for (i in musicas) {
        let nome = musicas[i].nome
        let idArquivo = musicas[i].idArquivo
        criar(nome, idArquivo)
    }
    
    function criar(nome, idArquivo) {
        let elemento = window.document.getElementById('alinhar')
        let audio  = window.document.createElement('div')
        audio.classList.add('divMusic')
        audio.innerHTML = `${nome} <audio controls><source src="https://docs.google.com/uc?export=download&id=${idArquivo}" type="audio/mpeg"></audio>`
        
        elemento.appendChild(audio)
    }
}