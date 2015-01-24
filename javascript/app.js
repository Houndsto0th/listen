"use strict";
$.fn.extend({
  cousins: function (parentSelector, childSelector) {
    return this.parent(parentSelector).siblings().find(childSelector);
  }
});


$(document).on('click', '.trackName', function(){
  var audioElement = document.getElementById('audioPlayer');
  audioElement.src = "";
  var trackURL = $(this).data('info');
  audioElement.src = trackURL;
  $('.visible_menu').removeClass('visible_menu');
  $('.player.btn').removeClass('stop').addClass('play');
  $('.dropdown.btn').removeClass('x').addClass('menu')
  var selectedSong = document.getElementsByClassName('dropdown');
  console.log($(selectedSong).get(0))


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

$('.container').on('click', '.player.btn', function(){
  var track = $(this).find('audio').get(0);
  $(this).toggleClass('play').toggleClass('stop');

   if (track.paused) {

    track.play();
  } else {
    var trackSource = track.src
    track.src = ''
    track.src = trackSource
  }
});
