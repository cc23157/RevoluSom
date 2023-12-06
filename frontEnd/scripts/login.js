async function postUsuario() {
    let id = window.document.getElementById('id').value 
    let nome = window.document.getElementById('nome').value 
    let sobrenome = window.document.getElementById('sobrenome').value 
    let senha = window.document.getElementById('senha').value 
    let image = window.document.getElementById('arquivo').files[0]

    if (image == undefined || image == null) {
        window.alert('Escolha uma foto de perfil.')
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
                let idFoto = fotores.id
        
                const data = {
                    id: id,
                    nome: nome,
                    sobrenome: sobrenome,
                    senha: senha,
                    foto: idFoto
                }
        
                const resposta = await fetch(`http://localhost:3000/postusuario`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })        
                const res = await resposta.json()
                
                if (res.erro == null || res.erro == undefined) {
                    window.alert(res.message)
                    window.location.href = `http://localhost:3000/escolher?id=${id}`
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
                console.log(error)
                window.alert('Erro ao cadastrar: ' + error)
            }
        }
    
}

async function loginUsuario() {
    try {
        let id = window.document.getElementById('usuariologin').value
        let senha = window.document.getElementById('senhalogin').value
        

        const resposta = await fetch(`http://localhost:3000/loginusuario?id=${id}&senha=${senha}`, {
            method: 'GET',
        })        
        console.log(resposta)
        const res = await resposta.json()
        if (res == true) {
            window.alert('fez login')
            window.location.href = `http://localhost:3000/revolusom?id=${id}`
        }
        else {
            if (res.erro != null || res.erro != undefined) {
                window.alert(res.erro)
            }
        }
    }
    catch(error) {
        window.alert('Erro: ' + error)
    }
}