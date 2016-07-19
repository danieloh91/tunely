/* hard-coded data! */

/* end of hard-coded data */

var albumsTemplate;

$(document).ready(function() {
  // console.log('app.js loaded!');
  // sampleAlbums.forEach(function(album) {
  //   console.log(album);
  //
  // });
  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: handleSuccess,
    error: handleError
  });

  $('.form-horizontal').on("submit", function(e) {
    e.preventDefault(e);
    console.log($(this).serialize());
    $('.input-md').val('');
  });
});


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
