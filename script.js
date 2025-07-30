window.addEventListener('DOMContentLoaded', init);

function init() {
  Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSuc-XJn1YmTCl-5WtrYeOKBS8nfTnRsFCfeNMRvzJcbavfGIX9SUSQdlZnVNPQtapcgr2m4tAwYznB/pubhtml',
    callback: showData,
    simpleSheet: true
  });
}

function showData(data) {
  console.log(data);
  const container = document.getElementById("content");
  container.innerHTML = "<h2>Données récupérées</h2><pre>" + JSON.stringify(data, null, 2) + "</pre>";
}
