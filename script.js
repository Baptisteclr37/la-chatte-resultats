const BASE_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSuc-XJn1YmTCl-5WtrYeOKBS8nfTnRsFCfeNMRvzJcbavfGIX9SUSQdlZnVNPQtapcgr2m4tAwYznB/pub?gid=363948896&single=true&output=csv";
const proxy = "https://api.allorigins.win/raw?url=";

const journeeSelect = document.getElementById("journee-select");
const journeeNum = document.getElementById("journee-num");
const container = document.getElementById("matches-container");

journeeSelect.addEventListener("change", () => {
  const journee = journeeSelect.value;
  journeeNum.textContent = journee.slice(1);
  fetchAndDisplay(journee);
});

async function fetchAndDisplay(journee) {
  container.innerHTML = "";
  const res = await fetch(proxy + encodeURIComponent(BASE_URL));

  if (!res.ok) {
    container.innerHTML = `<p>Erreur chargement données (${res.status})</p>`;
    return;
  }

  const text = await res.text();
  const rows = text.split("\n").map(row => row.split(/[,;]/));

  // On affiche les 9 matchs (chaque bloc fait 5 lignes)
  for (let i = 0; i < 9; i++) {
    const base = i * 5;

    const matchInfo = rows[base + 2] || [];  // Ligne des équipes + score
    const pronos = rows[base + 5] || [];     // Ligne des pronos

    const homeTeam = matchInfo[0] || "";
    const score = matchInfo[1] || "";
    const awayTeam = matchInfo[2] || "";

    const prono1 = pronos[0] || "";
    const pronoN = pronos[1] || "";
    const prono2 = pronos[2] || "";

    const html = `
      <div class="match-card">
        <div class="teams">${homeTeam} <strong>${score}</strong> ${awayTeam}</div>
        <div class="pronos">
          <div><strong>1</strong><br>${prono1}</div>
          <div><strong>N</strong><br>${pronoN}</div>
          <div><strong>2</strong><br>${prono2}</div>
        </div>
      </div>`;
    container.innerHTML += html;
  }
}

fetchAndDisplay("J1");
