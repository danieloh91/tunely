/************
 * DATABASE *
 ************/
 var db = require('../models');

/* hard-coded data */

// GET /api/albums
function index(req, res) {
  // FILL ME IN !
  db.Album.find({}, function (err, albums) {
      if (err) {
        res.sendStatus(500);
      }
      res.json(albums);
    });
}

function create(req, res) {
  // FILL ME IN !
  // console.log(req);
  var genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  req.body.genres = genres;
  db.Album.create(req.body, function(err, album) {
    if (err) {
      res.sendStatus(500);
    }
    res.json(album);
  });
}

function show(req, res) {
  // FILL ME IN !
  db.Album.findById(req.params.albumId,  function (err, album) {
    if (err) {
      res.sendStatus(500);
    }
    res.json(album);
  });
}

function destroy(req, res) {
  // FILL ME IN !
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
