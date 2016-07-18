/************
 * DATABASE *
 ************/
 var db = require('../models');

/* hard-coded data */

// GET /api/albums
function index(req, res) {
  // FILL ME IN !
  db.Album.find(function (err, albums) {
      if (err) {
        res.sendStatus(500);
      }
      res.json(albums);
    });
}

function create(req, res) {
  // FILL ME IN !
}

function show(req, res) {
  // FILL ME IN !
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
