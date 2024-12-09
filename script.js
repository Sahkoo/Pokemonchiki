let jsForm = document.querySelector(".js-search-form");
let jsCardContainer = document.querySelector(".js-card-container");

jsForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let eventTarg = event.target.elements.query.value.trim();
    if (!eventTarg) {
        console.log("Введіть коректне ім'я покемона.");
        return;
    }

    let pokemonTemplate = document.querySelector("#pokemon-template").innerHTML;
    let template = Handlebars.compile(pokemonTemplate);

    let pokemonRunner = document.querySelector(".pokemon-runner");
    let runnerImg = pokemonRunner.querySelector(".runner");

    pokemonRunner.style.opacity = 1;
    runnerImg.style.display = "block";

    setTimeout(() => {
        pokemonRunner.style.opacity = 0;
        runnerImg.style.display = "none";

        fetch(`https://pokeapi.co/api/v2/pokemon/${eventTarg.toLowerCase()}`, {
            method: "GET"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Покемона не знайдено");
                }
                return response.json();
            })
            .then(data => {
                let pokemonCard = template(data);
                jsCardContainer.innerHTML = pokemonCard;
            })
            .catch(error => {
                jsCardContainer.innerHTML = `<p class="error">Помилка: ${error.message}</p>`;
                console.log(error);
            });
    }, 2000);
});
