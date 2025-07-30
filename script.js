window.addEventListener('DOMContentLoaded', init);

function init() {
Tabletop.init({
key: 'https://docs.google.com/spreadsheets/d/19uuSNzMB2KIbtv5iq0UA3pGJqG2c1WOSMsOQ1eaKT_c/pubhtml',
callback: showData,
simpleSheet: true
});
}

function showData(data) {
console.log("Données récupérées :", data);
const container = document.getElementById("content");

if (!data || data.length === 0) {
container.innerHTML = "<p>Aucune donnée reçue.</p>";
return;
}

container.innerHTML = "<h2>Données brutes :</h2><pre>" + JSON.stringify(data, null, 2) + "</pre>";
}
