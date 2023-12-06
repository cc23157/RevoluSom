const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id');

async function criar() {
    let nome = window.document.getElementById('nome').value 
    let image = window.document.getElementById('arquivo').files[0]

    if (image == null || image  == undefined) {
        window.alert('Escolha uma capa')
    } else {

        if (nome.length == 0) {
            window.alert('Escolha um nome')

        } else {
            
            const formData = new FormData();
            formData.append('file', image);
            
       
            try {
                const foto = await fetch(`http://localhost:3000/postfile?id=${id}&type=${image.type}&parent=4`, {
                    method: 'POST',
                    body: formData
                })
                const fotores = await foto.json()
                let idFoto = fotores.id
        
                const data = {
                    nome: nome,
                    foto: idFoto,
                    usuario: id
                }
        
                const resposta = await fetch(`http://localhost:3000/postplaylist`, {
                    method: 'POST',
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
                console.log(error)
                window.alert('Erro ao criar: ' + error)
            }


        }
    }   
}


function telaInicial() {
    window.location.href = `http://localhost:3000/revolusom?id=${id}`
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

function Perfil() {
    window.location.href = `http://localhost:3000/perfil?id=${id}`
}

function Sair() {
    window.location.href = 'http://localhost:3000'
}

function Generos() {
    window.location.href = `http://localhost:3000/generos?id=${id}`
}