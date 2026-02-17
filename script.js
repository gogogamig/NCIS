/* -----------------------------------------
   NAVIGATION ENTRE SECTIONS
----------------------------------------- */
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
        document.getElementById("section-" + item.dataset.section).classList.add('active');
    });
});

/* -----------------------------------------
   GESTION DES AFFAIRES
----------------------------------------- */
let cases = [];
let selectedCaseIndex = null;

// Ouvrir formulaire d'ajout
function openCaseForm() {
    document.getElementById('caseForm').classList.remove('hidden');
}

// Ajouter une affaire
function addCase() {
    const ref = document.getElementById('caseRef').value;
    const type = document.getElementById('caseType').value;
    const priority = document.getElementById('casePriority').value;
    const status = document.getElementById('caseStatus').value;
    const agent = document.getElementById('caseAgent').value;

    if (!ref || !type || !agent) {
        alert("Merci de remplir tous les champs obligatoires.");
        return;
    }

    const newCase = {
        ref,
        type,
        priority,
        status,
        agent,
        desc: "",
        location: "",
        date: "",
        victims: "",
        suspects: "",
        evidence: "",
        notes: "",
        class: ""
    };

    cases.push(newCase);
    updateCasesTable();
    document.getElementById('caseForm').classList.add('hidden');
}

// Mettre à jour le tableau
function updateCasesTable() {
    const tbody = document.querySelector('#casesTable tbody');
    tbody.innerHTML = "";

    cases.forEach((c, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${c.ref}</td>
            <td>${c.type}</td>
            <td>${c.priority}</td>
            <td>${c.agent}</td>
        `;
        row.addEventListener('click', () => openCasePanel(index));
        tbody.appendChild(row);
    });
}

/* -----------------------------------------
   PANNEAU LATÉRAL (FICHE AFFAIRE)
----------------------------------------- */
function openCasePanel(index) {
    selectedCaseIndex = index;
    const c = cases[index];

    // Remplir les champs
    document.getElementById('panelRef').value = c.ref;
    document.getElementById('panelType').value = c.type;
    document.getElementById('panelPriority').value = c.priority;
    document.getElementById('panelStatus').value = c.status;
    document.getElementById('panelAgent').value = c.agent;
    document.getElementById('panelDesc').value = c.desc;
    document.getElementById('panelLocation').value = c.location;
    document.getElementById('panelDate').value = c.date;
    document.getElementById('panelVictims').value = c.victims;
    document.getElementById('panelSuspects').value = c.suspects;
    document.getElementById('panelEvidence').value = c.evidence;
    document.getElementById('panelNotes').value = c.notes;
    document.getElementById('panelClass').value = c.class;

    // Ouvrir panneau
    document.getElementById('casePanel').classList.add('open');
}

// Sauvegarder modifications
function saveCase() {
    if (selectedCaseIndex === null) return;

    const c = cases[selectedCaseIndex];

    c.ref = document.getElementById('panelRef').value;
    c.type = document.getElementById('panelType').value;
    c.priority = document.getElementById('panelPriority').value;
    c.status = document.getElementById('panelStatus').value;
    c.agent = document.getElementById('panelAgent').value;
    c.desc = document.getElementById('panelDesc').value;
    c.location = document.getElementById('panelLocation').value;
    c.date = document.getElementById('panelDate').value;
    c.victims = document.getElementById('panelVictims').value;
    c.suspects = document.getElementById('panelSuspects').value;
    c.evidence = document.getElementById('panelEvidence').value;
    c.notes = document.getElementById('panelNotes').value;
    c.class = document.getElementById('panelClass').value;

    updateCasesTable();
    closeCasePanel();
}

// Fermer panneau
function closeCasePanel() {
    document.getElementById('casePanel').classList.remove('open');
}

/* -----------------------------------------
   GESTION DES AGENTS
----------------------------------------- */
let agents = [];

// Ouvrir formulaire agent
function openAgentForm() {
    document.getElementById('agentForm').classList.remove('hidden');
}

// Ajouter un agent
function addAgent() {
    const name = document.getElementById('agentName').value;
    const role = document.getElementById('agentRole').value;

    if (!name || !role) {
        alert("Merci de remplir tous les champs.");
        return;
    }

    agents.push({ name, role });
    updateAgentsTable();
    document.getElementById('agentForm').classList.add('hidden');
}

// Mettre à jour tableau agents
function updateAgentsTable() {
    const tbody = document.querySelector('#agentsTable tbody');
    tbody.innerHTML = "";

    agents.forEach(a => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${a.name}</td><td>${a.role}</td>`;
        tbody.appendChild(row);
    });
}
