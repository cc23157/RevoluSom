const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id');

async function associar() {
    let generos = window.document.getElementsByTagName('input')

    for (indice in generos) {
        let genero = generos[indice]

        if (genero.checked) {
            let idGenero = genero.id

            const data = {
                idusuario: id,
                idgenero: idGenero
            }
    
            const resposta = await fetch(`http://localhost:3000/curtirgenero`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            console.log('Gênero adicionado!')
        }
    }

    window.alert("Gêneros adicionados")
    window.location.href = `http://localhost:3000/revolusom?id=${id}`

}