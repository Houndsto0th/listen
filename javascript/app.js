
$.fn.extend({
  cousins: function (parentSelector, childSelector) {
    return this.parent(parentSelector).siblings().find(childSelector);
  }
});
  var timeOut = 0
  var timeIn = 0

function pulseOut() {
  setTimeout(function () {
    $('.dropdown.btn').get(0).style.transform = ('scale(.75)');
    pulseOut();
  }, timeOut);
}

function pulseIn() {
  setTimeout(function () {
    style = $('.dropdown.btn').get(0).style;
    style.transform = ('scale(1.2)');
    pulseIn();
  }, timeIn);
}


$(document).on('click', '.trackName', function(){
  var audioElement = document.getElementById('audioPlayer');
  audioElement.src = "";
  var trackURL = $(this).data('info');
  audioElement.src = trackURL;
  $('.visible_menu').removeClass('visible_menu');
  $('.player.btn').removeClass('stop').addClass('play');
  $('.dropdown.btn').removeClass('x').addClass('menu')
  var selectedSong = document.getElementsByClassName('dropdown');
  $('.player.btn').removeClass('exclaim').addClass('play');
  timeIn = 0;
  timeOut = 0;
  $('.dropdown.btn').get(0).style.transform = ('scale(1)');

});

$(document).on('click', '.volumeUp', function(){
  var audioElement = document.getElementById('audioPlayer');
  $(audioElement).volume+=.3;
});

$(document).on('click', '.volumeDown', function(){
  var audioElement = document.getElementById('audioPlayer');
  $(audioElement).volume=0;
});

$(document).on('click', '.dropdown', function(){
  $(this).siblings().toggleClass('visible_menu');
  $(this).toggleClass('menu').toggleClass('x');
});

$(document).ready(function(){
  $.getJSON('data.json', function(tracks) {
    var template = $('#musicDropdown').html();
    var newHTML = Mustache.to_html(template, tracks);
    $('#musicDrop').html(newHTML);
  });
});

$('.centered').on('click', '.player.btn', function(){
  var track = $(this).find('audio').get(0);
  $(this).toggleClass('play').toggleClass('stop');
  if (track.src.indexOf('/listen_tracks/') >= 0){
  } else {
    $(this).removeClass('play')
    $(this).addClass('exclaim')
    timeOut = 500;
    timeIn = 750;
    pulseIn();
    pulseOut();
  };

   if (track.paused) {
    track.play();
  } else {
    var trackSource = track.src
    track.src = ''
    track.src = trackSource
  };

});
