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
  $('.btn').removeClass('stop').addClass('play');
  var selectedSong = document.getElementsByClassName('dropdown');
  console.log($(selectedSong).get(0))


});

$(document).on('click', '.dropdown', function(){
  $(this).siblings().toggleClass('visible_menu');
});

$(document).ready(function(){
  $.getJSON('data.json', function(tracks) {
    var template = $('#musicDropdown').html();
    var newHTML = Mustache.to_html(template, tracks);
    $('#musicDrop').html(newHTML);
  });
});

$('.container').on('click', '.btn', function(){
  var cousins = $(this).cousins('.segment', '.player');
  var otherTracks = cousins.find('audio');
  var trackCount = otherTracks.length
  for (var i = 0; i < trackCount; i++) {
    otherTracks[i].pause();
    var srcbase = otherTracks[i].src
    otherTracks[i].src = ''
    otherTracks[i].src = srcbase
  }

  var track = $(this).find('audio').get(0);
  cousins.removeClass('stop')
  cousins.addClass('play');
  $(this).toggleClass('play').toggleClass('stop');

   if (track.paused) {

    track.play();
  } else {
    var trackSource = track.src
    track.src = ''
    track.src = trackSource
  }
});
