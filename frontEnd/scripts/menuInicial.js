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
        let nomePlay = playlists[p].nome
        let idCapa = playlists[p].idCapa
        criarPlay(nomePlay, idCapa)
    }
    
}

function criarPlay(nome, capa) {
    let container = window.document.getElementById('cont1')
    let elemento = document.createElement('div')
    let url = `https://drive.google.com/uc?export=view&id=${capa}`
    elemento.innerHTML = `<h1>${nome}<h1><br><img src=${url}>`
    container.appendChild(elemento)
}

function Perfil() {
    window.location.href = `http://localhost:3000/perfil?id=${id}`
}

function Sair() {
    window.location.href = 'http://localhost:3000'
}