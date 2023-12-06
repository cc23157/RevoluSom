const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id');

async function abrirGenero(idGenero) {
    window.location.href = `http://localhost:3000/genero?idgenero=${idGenero}&id=${id}`
}

function telaInicial() {
    window.location.href = `http://localhost:3000/revolusom?id=${id}`
}


function Perfil() {
    window.location.href = `http://localhost:3000/perfil?id=${id}`
}

async function getTela() {

    const resposta = await fetch(`http://localhost:3000/telausuario?id=${id}`, {
        method: 'GET'
    })   
    const res = await resposta.json()
    console.log(res)

    let idPfp = res.idPfp
    
    let pfp = window.document.getElementById('pfp')
    pfp.src = `https://drive.google.com/uc?export=view&id=${idPfp}`
}