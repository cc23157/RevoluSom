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


function temaEscuro() {

    let cor = document.getElementById("body")
    cor.style.backgroundColor = "#1b1e1e"
    cor.style.color = "#fff6e7"


    let cont1 = document.getElementById("cont1")
    cont1.style.backgroundColor = "#111313"
    cont1.style.color = "#fff6e7"


    let cont2 = document.getElementById("cont2")
    cont2.style.backgroundColor = "#111313"
    cont2.style.color = "#fff6e7"


    let cont3 = document.getElementById("cont3")
    cont3.style.backgroundColor = "#111313"
    cont3.style.color = "#fff6e7"

}


function temaRosa() {
    let cor = document.getElementById("body")
    cor.style.backgroundColor = "#f9b4ab"
    cor.style.color = "white"
}

async function getPlaylists() {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id');

    const resposta = await fetch(`http://localhost:3000/playlistsusuario?id=${id}`, {
        method: 'GET'
    })        
    const res = await resposta.json()
    console.log(res)

    for (playlist in res) {
        console.log(playlist)
        nome = res[playlist]['nome']
        window.alert(nome)
    }

    const response = await fetch(`http://localhost:3000/foto?id=${id}`, {
        method: 'GET'
    })        

    const foto = await response.blob()
    console.log(foto)
    let reader = new FileReader();
    string = reader.readAsDataURL(foto);
    string = reader.result
    console.log(string)
    let base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    imageBase64Stringsep = base64String;
    console.log(base64String);


    let image = document.createElement('img')
    image.src = imageBase64Stringsep

    document.body.appendChild(image)
}