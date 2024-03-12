async function  retornar_jogo() {
    const resposta = await fetch("https://api.rawg.io/api/games?key=1fcb95ce1a8f4bb694fe8e75658c1db2");
    const jogos = await resposta.json();

    jogos.results.forEach((game) => {
        const gameContainer = document.createElement("div");
        gameContainer.classList.add('release');
        gameContainer.innerHTML = `
            <a href="/detalhes.html?id=${game.id}">
            <img src="${game.background_image}">
            <div class="game-information">
            <strong>${game.name}</strong>
            <span>${game.released}</span>
            <span>Rating: ${game.metacritic}</span>
            </div>
            </a>
        `

        const jogosWrap = document.querySelector(".releases");
        jogosWrap.appendChild(gameContainer)

    })
};

async function  retorna_publisher(){
    const resposta = await fetch("https://api.rawg.io/api/publishers?key=1fcb95ce1a8f4bb694fe8e75658c1db2")
    const publishers = await resposta.json()
    publishers.results.slice(-3).forEach((publisher) => {
        const publisherContainer = document.createElement("div");
        publisherContainer.classList.add('publisher');
        publisherContainer.innerHTML = `
        <h3>${publisher.name}</h3>
        <img class="publisher-image" src="${publisher.image_background}" />
        <div class="publisher-text">
            <strong>
                Número de jogos:
            </strong>
            <span>
                ${publisher.jogos_count}
            </span>
            <a class="more-details" href="#">
                Mais detalhes...
            </a>
        `

        const publishersWrap = document.querySelector("#box-publisher");
        publishersWrap.appendChild(publisherContainer)

    })
}

async function retorna_plataforma() {
    const resposta = await fetch("https://api.rawg.io/api/platforms?key=1fcb95ce1a8f4bb694fe8e75658c1db2");
    const plataforms = await resposta.json()
    plataforms.results.slice(-3).forEach((plataform) => {
        const plataformContainer = document.createElement("div");
        plataformContainer.classList.add('plataform');
        plataformContainer.innerHTML = `
        <h3>${plataform.name}</h3>
        <img class="plataform-image" src="${plataform.image_background}" />
        <div class="plataform-text">
            <strong>
                Número de jogos:
            </strong>
            <span>
                ${plataform.jogos_count}
            </span>
            <a class="more-details" href="#">
                Mais detalhes...
            </a>
        `

        const plataformsWrap = document.querySelector("#box-plataform");
        plataformsWrap.appendChild(plataformContainer)

    })
}

const apiKey = "1fcb95ce1a8f4bb694fe8e75658c1db2";
let txtSearch = document.getElementById('txtSearch')
let btnSearch = document.getElementById('btnSearch')
let gamesPlace = document.getElementById('gamesPlace')

function doSearch() {
    let textoPesquisa = txtSearch.value
    let url = `https://api.rawg.io/api/games?key=${apiKey}&search=${textoPesquisa}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            let saida = ''
            for (let i = 0; i < data.results.length; i++) {
                let game = data.results[i]
                saida +=
                    `<div class="release";">
                            <img src="${game.background_image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${game.name}</h5>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                        </div>
                    `
            }
            gamesPlace.innerHTML = saida
        })
}
    document.body.onload = () => {
    btnSearch.addEventListener('click', doSearch)
}





retorna_plataforma();
retorna_publisher();
retornar_jogo();