// login.js
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'votre_utilisateur',
    password: 'votre_mot_de_passe',
    database: 'votre_base_de_donnees'
});

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

// Route pour l'authentification
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM utilisateurs WHERE nom_utilisateur = ? AND mot_de_passe = ?';

    db.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur de la base de données' });
        }
        if (results.length > 0) {
            res.status(200).json({ message: 'Connexion réussie' });
        } else {
            res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});