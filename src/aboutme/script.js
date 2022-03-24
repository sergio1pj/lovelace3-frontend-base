function delay(fn, ms) {
    let timer = 0;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(fn.bind(this, ...args), ms || 0);
    }
}

function showResult(arr){
    const result = document.getElementById("result");
    result.innerHTML = "<table id='search-result'><tr><th>Id</th><th>Nome</th></tr></table>";
    const searchResult = document.getElementById("search-result");
    
    function addTableRows(obj){
        searchResult.innerHTML +=`<tr><td>${obj.id}</td><td>${obj.name}</td></tr>`;
    }
    if(arr.length > 0){
        arr.forEach(addTableRows);
    }else{
        searchResult.innerHTML = "[]";
    }
}

async function searchId() {
    const inId = document.getElementById("in-id");
    const result = document.getElementById("result");
    result.innerHTML="";
    const arrRickMorty = [];

    if(inId.value.length >=1){
        await fetch("https://rickandmortyapi.com/api/character/" + inId.value)
        .then(function(response) {
            return response.text().then(function(text) {
                try {
                    const jsonResult = JSON.parse(text);
                    arrRickMorty.push(jsonResult);
                } catch (error) {
                    console.log(error);
                }
            });
        })
        .catch((error) => {
            console.log(error);
        });

        await fetch(`https://rickandmortyapi.com/api/character/?name=${arrRickMorty[0]["name"]}&status=${arrRickMorty[0]["status"]}`)
        .then(function(response) {
            return response.text().then(function(text) {
                try {
                    const jsonResult = JSON.parse(text);
                    showResult(jsonResult["results"]);
                } catch (error) {
                    console.log(error);
                }
            });
        })
        .catch((error) => {
            result.innerHTML = `<p>${error}<p>`;
        });
    }
}

const inId = document.getElementById("in-id");

inId.addEventListener("keyup", delay(searchId, 2000));

