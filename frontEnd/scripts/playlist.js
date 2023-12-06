const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id');
const idPlaylist = urlParams.get('idplaylist')

async function album() {
    getFoto()

    const resposta = await fetch(`http://localhost:3000/musicasplaylist?idplaylist=${idPlaylist}`, {
        method: 'GET'
    })   
    const res = await resposta.json()
    console.log(res)

    let nome = res.nome
    let idCapa = res.idCapa
    
    let capa = window.document.getElementById('capa')
    capa.src = `https://drive.google.com/uc?export=view&id=${idCapa}`

    let titulo = window.document.getElementById('nome')
    titulo.innerHTML = nome

    let musicas = res.musicas

    for (i in musicas) {
        let nomeMusica = musicas[i].nome
        console.log(musicas[i])
        let idArquivo = musicas[i].idArquivo

        criar(nomeMusica, idArquivo)
    }
    
    function criar(nome, idArquivo) {
        let elemento = window.document.getElementById('alinhar')
        let audio  = window.document.createElement('div')
        audio.classList.add('divMusic')
        audio.innerHTML = `${nome} <audio controls><source src="https://docs.google.com/uc?export=download&id=${idArquivo}" type="audio/mpeg"></audio>`
        
        elemento.appendChild(audio)
    }
}


async function getFoto() {

    const resposta = await fetch(`http://localhost:3000/telausuario?id=${id}`, {
        method: 'GET'
    })   
    const res = await resposta.json()
    console.log(res)

    let idPfp = res.idPfp
    
    let pfp = window.document.getElementById('pfp')
    pfp.src = `https://drive.google.com/uc?export=view&id=${idPfp}`
}

function telaInicial() {
    window.location.href = `http://localhost:3000/revolusom?id=${id}`
}

function Perfil() {
    window.location.href = `http://localhost:3000/perfil?id=${id}`
}

function Sair() {
    window.location.href = 'http://localhost:3000'
}

function Generos() {
    window.location.href = `http://localhost:3000/generos?id=${id}`
}