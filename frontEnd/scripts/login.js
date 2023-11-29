async function postUsuario() {
    let id = window.document.getElementById('id').value 
    let nome = window.document.getElementById('nome').value 
    let sobrenome = window.document.getElementById('sobrenome').value 
    let senha = window.document.getElementById('senha').value 
    let image = window.document.getElementById('arquivo').files[0]

    try {
        const formData = new FormData();
        formData.append('file', image);
        

        const foto = await fetch(`http://localhost:3000/postfile?id=${id}&type=${image.type}&parent=1`, {
            method: 'POST',
            body: formData
        })
        const fotores = await foto.json()


        const data = {
            id: id,
            nome: nome,
            sobrenome: sobrenome,
            senha: senha,
            foto: fotores.id
        }

        const resposta = await fetch(`http://localhost:3000/login/usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })        
        const res = await resposta.json()
        
        if (res.erro == null || res.erro == undefined) {
            window.alert('Cadastrado!')
            window.location.href = `http://localhost:3000/revolusom?id=${id}`
        }
        else {
            window.alert(res.erro)
        }
    }
    catch (error) {
        window.alert('Erro ao cadastrar: ' + error)
    }
}

async function loginUsuario() {
    try {
        let id = window.document.getElementById('usuariologin').value
        let senha = window.document.getElementById('senhalogin').value
        

        const resposta = await fetch(`http://localhost:3000/loginusuario?id=${id}&senha=${senha}`, {
            method: 'GET',
        })        
        
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
