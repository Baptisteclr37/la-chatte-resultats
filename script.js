window.addEventListener('DOMContentLoaded', init);

function init() {
  Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/19uuSNzMB2KIbtv5iq0UA3pGJqG2c1WOSMsOQ1eaKT_c/pubhtml',
    callback: showData,
    simpleSheet: true
  });
}

function showData(data) {
  console.log(data);
  const container = document.getElementById("content");
  container.innerHTML = "<h2>Données récupérées</h2><pre>" + JSON.stringify(data, null, 2) + "</pre>";
}
