// crypto/config.js
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// Generar un secreto aleatorio para JWT
const secret = crypto.randomBytes(64).toString('hex');
// Hashear el secreto con bcrypt para mayor seguridad
const hashedSecret = bcrypt.hashSync(secret, 10);

module.exports = { secret, hashedSecret };