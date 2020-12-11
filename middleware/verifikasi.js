const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi() {
  return function (req, res, next) {
    // Check authorization header
    var role = req.body.role;
    var tokenWithBearer = req.headers.authorization;
    if (tokenWithBearer) {
      var token = tokenWithBearer.split(' ')[1];
      // Verifikasi
      jwt.verify(token, config.secret, function(error, decoded){
        if (error) {
          return res.status(401).send({auth: false, message: "Token tidak terdaftar"});
        } else {
          if (role == 2){
            req.auth = decoded;
            next();
          } else {
            return res.status(401).send({auth: false, message: "Gagal mengautorisasi role Anda"});
          }
        }
      });
    } else {
      return res.status(401).send({auth: false, message: "Token tidak tersedia"});
    }
  }
};

module.exports = verifikasi;