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


// function temaEscuro() {

//     let cor = document.getElementById("body")
//     cor.style.backgroundColor = "#1b1e1e"
//     cor.style.color = "#fff6e7"


//     let cont1 = document.getElementById("cont1")
//     cont1.style.backgroundColor = "#111313"
//     cont1.style.color = "#fff6e7"


//     let cont2 = document.getElementById("cont2")
//     cont2.style.backgroundColor = "#111313"
//     cont2.style.color = "#fff6e7"


//     let cont3 = document.getElementById("cont3")
//     cont3.style.backgroundColor = "#111313"
//     cont3.style.color = "#fff6e7"

//     let menu = document.getElementById("sidebar")
//     menu.style.background = "#111313"

//     let escritoMenu = document.getElementsByTagName("span")
//     escritoMenu.style.color = "#fff6e7"

// }



async function getPlaylists() {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id');

    const foto = await fetch(`http://localhost:3000/getfile?id=${id}`, {
        method: 'GET'
    })
    const f = await foto.json()
    
    let element = window.document.createElement('img')
    element.src = f.url
    document.body.append(element)



    const resposta = await fetch(`http://localhost:3000/playlistsusuario?id=${id}`, {
        method: 'GET'
    })        
    const res = await resposta.json()
    console.log(res)

    for (playlist in res) {
        console.log(playlist)
        nome = res[playlist]['nome']
        idCapa = res[playlist]['idCapa']
        url = `https://drive.google.com/uc?export=view&id=${idCapa}`
        window.alert(nome)
    }
}

async function getTela() {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id');

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
    
    window.alert('esperando')
}

function criarPlay(nome, capa) {
    let container = window.document.getElementById('cont1')
    let elemento = document.createElement('div')
    let url = `https://drive.google.com/uc?export=view&id=${capa}`
    elemento.innerHTML = `<h1>${nome}<h1><br><img src=${url}>`
    container.appendChild(elemento)
}