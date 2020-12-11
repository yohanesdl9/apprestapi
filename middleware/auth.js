var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('..//config/secret');
var ip = require('ip');

// Controller untuk register
exports.registrasi = function (req, res) {
  var post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
    tanggal_daftar: new Date()
  }
  
  var query = "SELECT email FROM ?? WHERE ??=?";
  var table = ['user', 'email', post.email];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows, fields){
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 0) {
        var query = "INSERT INTO ?? SET ?";
        var table = ['user'];
        query = mysql.format(query, table);
        connection.query(query, post, function(error, rows){
          if (error) {
            console.log(error);
          } else {
            response.ok("Berhasil menambahkan user baru", res);
          }
        });
      } else {
        response.ok("Email sudah terdaftar sebelumnya.", res);
      }
    }
  });
};

// Controller untuk login
exports.login = function(req, res) {
  var post = {
    email: req.body.email,
    password: md5(req.body.password)
  }

  var query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
  var table = ['user', 'email', post.email, 'password', post.password];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows, fields){
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 1) {
        var token = jwt.sign({rows}, config.secret, {
          expiresIn: 1440
        });
        id_user = rows[0].id;

        var data = {
          id_user: id_user,
          access_token: token,
          ip_address: ip.address()
        }

        var query = "INSERT INTO ?? SET ?";
        var table = ["akses_token"];

        query = mysql.format(query, table);
        connection.query(query, data, function(error, rows){
          if (error) {
            console.log(error);
          } else {
             res.json({
               success: true,
               message: 'Token JWT berhasil di-generate',
               token: token,
               currentUser: data.id_user
             });
          }
        });
      } else {
        res.json({
          success: false,
          message: "Email atau password salah!"
        });
      }
    }
  });
}

exports.halamanrahasia = function(req, res) {
  response.ok("Ini adalah halaman rahasia yang hanya bisa diakses user dengan role = 2", res);
}