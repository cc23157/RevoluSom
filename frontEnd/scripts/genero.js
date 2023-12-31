const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id');
const idGenero = urlParams.get('idgenero')

async function getTela() {
    getFoto()

    const resposta = await fetch(`http://localhost:3000/albunsgenero?idgenero=${idGenero}`, {
        method: 'GET'
    })   
    const respost = await resposta.json()
    console.log(respost)

    let res = respost.albuns
    let nomeGenero = respost.nome
    let eNome = window.document.getElementById('nomeGenero')
    eNome.innerHTML = nomeGenero
    console.log(res)

    for (i in res) {
        console.log(i)
        let idAlbum = res[i].idAlbum
        let nome = res[i].nome
        let idCapa = res[i].idCapa
        criar(idAlbum, nome, idCapa)
    }
    
}

function criar(idAlbum, nome, capa) {
    let elemento = document.createElement('div')
    elemento.id = idAlbum
    elemento.classList.add('album')
    let url = `https://drive.google.com/uc?export=view&id=${capa}`
    elemento.innerHTML = `<h3>${nome}<h3><br><img onclick='album(${idAlbum})' src=${url}>`

    let corpo = window.document.getElementById('container')
    corpo.appendChild(elemento)
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

function album(idAlbum) {
    window.location.href = `http://localhost:3000/album?id=${id}&album=${idAlbum}`
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