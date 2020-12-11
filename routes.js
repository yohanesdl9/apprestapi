'use strict';

module.exports = function(app) {
  var json = require('./controller');

  app.route('/').get(json.index);
  app.route('/tampil').get(json.tampilsemuamahasiswa);
  app.route('/tampil/:id').get(json.tampilbasedonid);
  app.route('/tambah').post(json.tambahmahasiswa);
  app.route('/ubah').put(json.ubahmahasiswa);
  app.route('/hapus').delete(json.hapusmahasiswa);
  app.route('/groupmk').get(json.tampilgroupmk);
};