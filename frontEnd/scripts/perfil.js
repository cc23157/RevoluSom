const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id');

async function getPerfil() {

    let eFoto = window.document.getElementById('foto')
    let eNome = window.document.getElementById('nome')
    let eId = window.document.getElementById('usuario')


    const resposta = await fetch(`http://localhost:3000/telausuario?id=${id}`, {
        method: 'GET'
    })   
    const res = await resposta.json()
    console.log(res)

    let nome = res.nome
    let idPfp = res.idPfp
    
    eFoto.src = `https://drive.google.com/uc?export=view&id=${idPfp}`
    eNome.innerHTML = nome

    eId.innerHTML = '@' + id
}

function telainicial() {
    window.location.href = `http://localhost:3000/revolusom?id=${id}`
}