const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = 3306;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configura la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost', // Cambia según tu configuración
    user: 'root', 
    password: '1033490372',
    database: 'tu_base_de_datos'
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos.');
    }
});

// Rutas
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length > 0) {
            res.status(200).json({ message: 'Login exitoso' });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    });
});

app.post('/register', (req, res) => {
    const { name, email, username, password } = req.body;
    const query = 'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, username, password], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({ message: 'Usuario registrado con éxito' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

