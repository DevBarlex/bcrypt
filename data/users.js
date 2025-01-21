const bcrypt = require('bcryptjs');

const users = [
    {
        id: 1,
        username: 'usuario1',
        password: bcrypt.hashSync('password1', 10),  // Contraseña pre-hasheada
        name: 'Juan Pérez'
    },
    {
        id: 2,
        username: 'usuario2',
        password: bcrypt.hashSync('password2', 10),  // Contraseña pre-hasheada
        name: 'María Gómez'
    }
];

module.exports = users;
