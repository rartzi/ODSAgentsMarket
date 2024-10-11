const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let agents = [
    { id: uuidv4(), name: 'Scientific Paper Critique', creator: '@ResearchPro', executions: 15200, azcoins: 2, tools: ['NLP', 'Academic Database Access'] },
    { id: uuidv4(), name: 'Data Analysis Assistant', creator: '@DataGenius', executions: 22400, azcoins: 3, tools: ['Python', 'R', 'SQL'] },
    { id: uuidv4(), name: 'Literature Review Synthesizer', creator: '@LitExpert', executions: 18300, azcoins: 2, tools: ['Text Mining', 'Summarization'] },
    { id: uuidv4(), name: 'Experiment Design Optimizer', creator: '@LabMaster', executions: 20100, azcoins: 2, tools: ['Statistical Analysis', 'Experimental Design'] }
];

let teams = [
    { id: uuidv4(), name: 'Data Science Squad', members: 4, tools: 7 },
    { id: uuidv4(), name: 'Innovation Task Force', members: 5, tools: 8 }
];

app.get('/api/agents', (req, res) => {
    const featured = req.query.featured === 'true';
    if (featured) {
        res.json(agents.slice(0, 4)); // Return first 4 agents as featured
    } else {
        res.json(agents);
    }
});

app.get('/api/teams', (req, res) => {
    const featured = req.query.featured === 'true';
    if (featured) {
        res.json(teams.slice(0, 2)); // Return first 2 teams as featured
    } else {
        res.json(teams);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});