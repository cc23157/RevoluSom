function temaClaro() {

    let cor = document.getElementById("body")
    cor.style.backgroundColor = "#ffe9ca7a"
    cor.style.color = "#1b1e1e"


    let cont1 = document.getElementById("cont1")
    cont1.style.backgroundColor = "#ffedd9"
    cont1.style.color = "#1b1e1e"


    let cont2 = document.getElementById("cont2")
    cont2.style.backgroundColor = "#ffedd9"
    cont2.style.color = "#1b1e1e"


    let cont3 = document.getElementById("cont3")
    cont3.style.backgroundColor = "#ffedd9"
    cont3.style.color = "#1b1e1e"


    // let album = document.getElementsByClassName(".album")
    // album.style.backgroundColor = "#fff6e7"
    // album.style.color = "#1b1e1e"

}

const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id');

async function getTela() {

    const resposta = await fetch(`http://localhost:3000/telausuario?id=${id}`, {
        method: 'GET'
    })   
    const res = await resposta.json()
    console.log(res)

    let nome = res.nome
    let idPfp = res.idPfp
    
    let pfp = window.document.getElementById('pfp')
    pfp.src = `https://drive.google.com/uc?export=view&id=${idPfp}`

    let titulo = window.document.getElementById('nomeUsuario')
    titulo.innerHTML = "Olá, " + nome

    let playlists = res.playlists

    for (p in playlists) {
        console.log(p)
        let idPlay = playlists[p].idPlaylist
        let nomePlay = playlists[p].nome
        let idCapa = playlists[p].idCapa
        criarPlay(idPlay, nomePlay, idCapa)
    }
    
    if (playlists.length == 0) {
        let container = window.document.getElementById('cont1')
        container.innerHTML = 'Você ainda não tem playlists'
    }
}

function criarPlaylist() {
    window.location.href = `http://localhost:3000/criarPlaylist?id=${id}`
}

function criarPlay(idPlay, nome, capa) {
    let container = window.document.getElementById('cont1')
    let elemento = document.createElement('div')
    elemento.setAttribute('id', idPlay)
    elemento.classList.add('album')

    let url = `https://drive.google.com/uc?export=view&id=${capa}`
    elemento.innerHTML = `<h3>${nome}<h3><br><img onclick="Playlist(${idPlay})" src=${url}>`
    container.appendChild(elemento)
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

function Playlist(idPlaylist) {
    window.location.href = `http://localhost:3000/playlist?idplaylist=${idPlaylist}&id=${id}`
}

function telainicial() {
    window.location.href = `http://localhost:3000/revolusom?id=${id}`
}
