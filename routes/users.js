// routes/users.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../data/users');
const { secret } = require('../crypto/config');
const authenticateJWT = require('../middlewares/authMiddleware');

const router = express.Router();

// Página de inicio
router.get('/', (req, res) => {
    if (req.user) {
        return res.redirect('/dashboard');
    }
    res.send(`
        <form action="/login" method="post">
            <input type="text" name="username" placeholder="Usuario" required>
            <input type="password" name="password" placeholder="Contraseña" required>
            <button type="submit">Iniciar sesión</button>
        </form>
    `);
});

// Endpoint para iniciar sesión y generar un token JWT
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Buscar al usuario por su nombre de usuario
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user.id, username: user.username, name: user.name }, secret, { expiresIn: '1h' });

    res.json({ message: 'Autenticación exitosa', token });
});

// Página del panel de control, accesible solo para usuarios autenticados
router.get('/dashboard', authenticateJWT, (req, res) => {
    const userId = req.user;
    const user = users.find((user) => user.id === userId);
    if (user) {
      res.send(`
        <h1>Bienvenido, ${req.user.name}</h1>
        <p>ID: ${req.user.id}</p>
        <p>UserName: ${req.user.username}</p>
        <a href="/">HOME</a>
        <form action="/logout" method="post">
          <button type="submit">Cerrar sesión</button>
        </form>
      `);
    } else {
      res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }
  });

// Endpoint para cerrar sesión
router.post('/logout', (req, res) => {
    res.json({ message: 'Has cerrado sesión' });
});

module.exports = router;
