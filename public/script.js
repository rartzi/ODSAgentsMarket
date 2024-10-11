document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const navLinks = document.querySelectorAll('.sidebar a');
    const themeToggle = document.querySelector('.theme-toggle');

    let agents = [];
    let teams = [];

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.closest('a').getAttribute('data-page');
            loadPage(page);
        });
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.textContent = icon.textContent === 'dark_mode' ? 'light_mode' : 'dark_mode';
    });

    // Load page content
    async function loadPage(page) {
        const response = await fetch(`/pages/${page}.html`);
        const html = await response.text();
        content.innerHTML = html;

        if (page === 'home') {
            setupHomeFunctionality();
        } else if (page === 'agent-network') {
            setupAgentNetworkFunctionality();
        } else if (page === 'my-teams') {
            setupMyTeamsFunctionality();
        }
    }

    // Home page functionality
    function setupHomeFunctionality() {
        fetchFeaturedAgents();
        fetchFeaturedTeams();
    }

    // Agent Network page functionality
    function setupAgentNetworkFunctionality() {
        fetchAllAgents();
    }

    // My Teams page functionality
    function setupMyTeamsFunctionality() {
        fetchAllTeams();
    }

    async function fetchFeaturedAgents() {
        const response = await fetch('/api/agents?featured=true');
        const featuredAgents = await response.json();
        displayAgents(featuredAgents, 'featured-agents');
    }

    async function fetchFeaturedTeams() {
        const response = await fetch('/api/teams?featured=true');
        const featuredTeams = await response.json();
        displayTeams(featuredTeams, 'featured-teams');
    }

    async function fetchAllAgents() {
        const response = await fetch('/api/agents');
        agents = await response.json();
        displayAgents(agents, 'agent-list');
    }

    async function fetchAllTeams() {
        const response = await fetch('/api/teams');
        teams = await response.json();
        displayTeams(teams, 'team-list');
    }

    function displayAgents(agents, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        agents.forEach(agent => {
            const agentCard = createAgentCard(agent);
            container.appendChild(agentCard);
        });
    }

    function displayTeams(teams, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        teams.forEach(team => {
            const teamCard = createTeamCard(team);
            container.appendChild(teamCard);
        });
    }

    function createAgentCard(agent) {
        const card = document.createElement('div');
        card.className = 'agent-card';
        card.innerHTML = `
            <h4>${agent.name}</h4>
            <p>By ${agent.creator}</p>
            <div class="stats">
                <span>${agent.executions} executions</span>
                <span>${agent.azcoins} AZcoins per execution</span>
            </div>
            <div class="actions">
                <button class="recruit-btn" onclick="recruitAgent('${agent.id}')">Recruit</button>
                <button class="team-btn" onclick="addToTeam('${agent.id}')">Team</button>
            </div>
        `;
        return card;
    }

    function createTeamCard(team) {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <h4>${team.name}</h4>
            <div class="stats">
                <span>${team.members} members</span>
                <span>${team.tools} tools</span>
            </div>
            <button class="hire-btn" onclick="hireTeam('${team.id}')">Hire Team</button>
        `;
        return card;
    }

    // Load home page by default
    loadPage('home');
});

function recruitAgent(agentId) {
    alert(`Agent with ID ${agentId} recruited!`);
    // Implement recruitment logic here
}

function addToTeam(agentId) {
    alert(`Agent with ID ${agentId} added to team!`);
    // Implement team addition logic here
}

function hireTeam(teamId) {
    alert(`Team with ID ${teamId} hired!`);
    // Implement team hiring logic here
}