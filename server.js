const express = require('express');
const cors = require('cors');
const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors());         
app.use(express.json());  // Permite ler JSON

// --- FRONTEND ---
app.use(express.static('public'));

// --- DOCUMENTAÇÃO SWAGGER ---
const swaggerDocument = yaml.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- ROTAS DA API ---
const songRoutes = require('./src/routes/Songroutes'); 

app.use('/api/songs', songRoutes);

// --- Rota de Teste  ---
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// --- Iniciar Servidor ---
app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
    console.log(`Documentação Swagger: http://localhost:${PORT}/api-docs`);
});