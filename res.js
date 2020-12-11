'use strict';

exports.ok = function(values, res){
  var data = {
    'status': 200,
    'values': values
  };

  res.json(data);
  res.end();
}

// Response untuk nested matakuliah
exports.oknested = function (values, res){
  // Lakukan akumulasi
  const hasil = values.reduce((akumulasikan, item) => {
    // Tentukan key group
    if (akumulasikan[item.nama]){
      // Buatlah variabel group nama mahasiswa
      const group = akumulasikan[item.nama];
      // Check jika isi array adalah matakuliah
      if (Array.isArray(group.matakuliah)){
        // Tambahkan value ke dalam group matakuliah
        group.matakuliah.push(item.matakuliah);
      } else {
        group.matakuliah = [group.matakuliah, item.matakuliah];
      }
    } else {
      akumulasikan[item.nama] = item;
    }
    return akumulasikan;
  }, {});

  var data = {
    'status': 200,
    'values': hasil
  };

  res.json(data);
  res.end();
}