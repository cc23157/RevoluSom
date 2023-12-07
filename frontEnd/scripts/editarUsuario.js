const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id')

let currentPfpId

async function iniciar() {
    let nome = window.document.getElementById('nome')
    let sobrenome = window.document.getElementById('sobrenome')
    let senha = window.document.getElementById('senha')
    let image = window.document.getElementById('arquivo')

    const resposta = await fetch(`http://localhost:3000/telausuario?id=${id}`, {
        method: 'GET'
    })   
    const data = await resposta.json()
    
    nome.setAttribute('value', data.nome)
    sobrenome.setAttribute('value', data.sobrenome) 
    senha.setAttribute('value', data.senha)

    currentPfpId = data.idPfp
}



async function editarUsuario() {
    let nome = window.document.getElementById('nome').value 
    let sobrenome = window.document.getElementById('sobrenome').value 
    let senha = window.document.getElementById('senha').value 
    let image = window.document.getElementById('arquivo').files[0]
    let idFoto

    if (image == undefined || image == null) {
        idFoto = currentPfpId
    }
    else {
        const formData = new FormData();
        formData.append('file', image);
            
        
        try {
            const foto = await fetch(`http://localhost:3000/postfile?id=${id}&type=${image.type}&parent=1`, {
                method: 'POST',
                body: formData
            })
            const fotores = await foto.json()
            idFoto = fotores.id
    
        } catch (error) {
            window.alert('Erro: ' + error)
        }
    }
    
    try {
        const data = {
            id: id,
            nome: nome,
            sobrenome: sobrenome,
            senha: senha,
            foto: idFoto
        }
    
        const resposta = await fetch(`http://localhost:3000/putusuario`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })        
        const res = await resposta.json()
        
        if (res.erro == null || res.erro == undefined) {
            window.alert(res.message)
            window.location.href = `http://localhost:3000/revolusom?id=${id}`
        }
        else {
            window.alert(res.erro)
            window.alert('apagando foto')
            try {
                let fotoAPagada = await fetch(`http://localhost:3000/deletefile?id=${idFoto}`, {
                    method: 'DELETE'
                })
            }
            catch (error) {
                console.log(error)
            }
        }

    }
    catch (error) {
        window.alert('Erro ao editar: ' + error)
    }
}

async function deletar() {
    let apagado = await fetch(`http://localhost:3000/deleteusuario?id=${id}`, {
        method: 'DELETE'
    })
    const res = await apagado.json()
    window.alert(res.message)
    window.location.href = 'http://localhost:3000'
}


function telainicial() {
    window.location.href = `http://localhost:3000/revolusom?id=${id}`
}

function Sair() {
    window.location.href = 'http://localhost:3000'
}

function Generos() {
    window.location.href = `http://localhost:3000/generos?id=${id}`
}

function editar() {
    window.location.href = `http://localhost:3000/editarperfil?id=${id}`
}