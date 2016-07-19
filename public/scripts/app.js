/* hard-coded data! */

/* end of hard-coded data */

var albumsTemplate;

$(document).ready(function() {
  var albumHtml = $('#album-template').html();
  albumsTemplate = Handlebars.compile(albumHtml);
  $.get('/api/albums').success(function(albums) {
    albums.forEach(function (album) {
      renderAlbum(album);
    });
  });

  $('.form-horizontal').on("submit", function(e) {
    e.preventDefault(e);
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/albums', formData, function(album) {
      console.log('album after POST', album);
      renderAlbum(album);
    });
    $(this).trigger("reset");
  });

  $('#albums').on('click', '.add-song', function(e) {
    console.log('add-song clicked!');
    var id= $(this).closest('.album').data('album-id');
    console.log('id',id);
    $('#songModal').data('album-id', id);
    $('#songModal').modal();
  });

  $('#albums').on('click', '.delete-song', function(e) {
    console.log('add-song clicked!');
    var id= $(this).closest('.album').data('album-id');
    console.log('id',id);
  });

  $('#saveSong').on('click', handleNewSongSubmit);
});

function handleNewSongSubmit(e) {
  e.preventDefault();
  var $modal = $('#songModal');
  var $songNameField = $modal.find('#songName');
  var $trackNumberField = $modal.find('#trackNumber');

  // get data from modal fields
  // note the server expects the keys to be 'name', 'trackNumber' so we use those.
  var dataToPost = {
    name: $songNameField.val(),
    trackNumber: $trackNumberField.val()
  };

  var albumId = $modal.data('albumId');

  //POST to the server
  var songPostToServerUrl = '/api/albums/' + albumId + '/songs';
  $.post(songPostToServerUrl, dataToPost, function(data) {
    // clear the form
    $songNameField.val('');
    $trackNumberField.val('');

    // hide the modal
    $modal.modal('hide');
    $.get('/api/albums/' + albumId, function(data) {
      $('[data-album-id=' + albumId + ']').remove();
      renderAlbum(data);
    });
  }).error(function(err) {
    console.log('post to /api/albums/:albumId/songs resulted in error', err);
  });

}

// this function takes a single album and renders it to the page
function renderAlbum(album) {
  var html = albumsTemplate(album);
  $('#albums').prepend(html);
}
