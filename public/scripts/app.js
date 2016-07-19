/* hard-coded data! */

/* end of hard-coded data */

var albumsTemplate;

$(document).ready(function() {
  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: handleSuccess,
    error: handleError
  });
  $('.form-horizontal').on("submit", function(e) {
    // e.preventDefault(e);
    console.log($(this).serialize());
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: $(this).serialize(),
      dataType: 'json',
      success: handleSuccess,
      error: handleError
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

function handleSuccess(json) {
    sampleAlbums = json;
    renderAlbum();
}


function handleError(e) {
  console.log('uh oh');
  $('#albums').text('Failed to load albums, is the server working?');
}

// this function takes a single album and renders it to the page
function renderAlbum(album) {
  var albumHtml = $('#album-template').html();
  albumsTemplate = Handlebars.compile(albumHtml);
  var html = albumsTemplate({albums: sampleAlbums});
  $('#albums').prepend(html);
}
