  var db = require('../models');

  function create (req, res) {
    db.Album.findById(req.params.albumId, function (err, foundAlbum) {
      var newSong = new db.Song(req.body);
      foundAlbum.songs.push(newSong);
      foundAlbum.save(function(err, savedAlbum) {
        console.log('newSong created: ' + newSong);
        res.json(newSong);
      });
    });
  }

  module.exports = {
    create: create
  };
