const journeeSelect = document.getElementById("journee-select");
const journeeNum = document.getElementById("journee-num");
const container = document.getElementById("matches-container");

// 👇 Voici l'URL publiée en CSV depuis ton Google Sheets (onglet J1)
const GID_MAP = {
  J1: "363948896"  // GID pour J1
};

const BASE_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSuc-XJn1YmTCl-5WtrYeOKBS8nfTnRsFCfeNMRvzJcbavfGIX9SUSQdlZnVNPQtapcgr2m4tAwYznB/pub";

journeeSelect.addEventListener("change", () => {
  const journee = journeeSelect.value;
  journeeNum.textContent = journee.slice(1);
  fetchAndDisplay(journee);
});

async function fetchAndDisplay(journee) {
  container.innerHTML = "";

  const gid = GID_MAP[journee];
  const url = `${BASE_URL}?gid=${gid}&single=true&output=csv`;

  const res = await fetch(url);
  const text = await res.text();
  const rows = text.split("\\n").map(row => row.split(","));

  for (let i = 0; i < 10; i++) {
    const base = i * 5;
    const matchRow = rows[base + 2];
    const pronosRow = rows[base + 5];

    const html = `
      <div class="match-card">
        <div class="teams">${matchRow[0]} ${matchRow[1]} ${matchRow[2]}</div>
        <div class="pronos">
          <div><strong>1</strong><br>${pronosRow[0]}</div>
          <div><strong>N</strong><br>${pronosRow[1]}</div>
          <div><strong>2</strong><br>${pronosRow[2]}</div>
        </div>
      </div>
    `;
    container.innerHTML += html;
  }
}

// Chargement initial
fetchAndDisplay("J1");

