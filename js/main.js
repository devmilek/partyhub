var players_list = [];

html_players = document.querySelector('.players');
html_add_player = $('.add-player');
add_player_input = document.querySelector('#add-player-input');

var pytania = [];
var numer_gracza = 0;

$(document).ready(function() {
    odswiezGraczy();
    $.getJSON('js/pytania.json', function(pyt) {
        pytania = pyt;
     });
});

function odswiezGraczy() {
    html_players.innerHTML = "";
    if(players_list == "") {
        html_players.innerHTML = '<h4>Dodaj graczy</h4>';
    } else {
        for (let index = 0; index < players_list.length; index++) {
            inner_player = '<li><p>'+ players_list[index] +'</p><h3 onclick="usunGracza('+index+')">-</h3></li>';
            html_players.innerHTML += inner_player;
        }
    }
}

// DODAWANIE GRACZY

$('.add-player-btn').click(function() {
    html_add_player.toggleClass('show');
    // document.querySelector("#add-player-input").autofocus;
    $('#add-player-input').focus();
});

$('.add-player-close').click(function() {
    html_add_player.toggleClass('show');
});

$('.notifi-close').click(function() {
    $('.notifi').toggleClass('visible');
});

$('.game-new-question').click(function(){
    losujPytanie();
    // console.log(randomUniqueNum(players_list.length, players_list.length));
});

$('.game-next').click(function(){
    gameDalej();
});

$('.add-player-add').click(function(){
    if(add_player_input.value != "") {
        players_list.push(add_player_input.value);
        odswiezGraczy();
        add_player_input.value = "";
        html_add_player.toggleClass('show');
    }
});

function usunGracza(nr) {
    players_list.splice(nr, 1);
    odswiezGraczy();
}

// START GRY

$('.game-start-btn').click(function() {
    if(players_list.length >= 2) {
        $('.container').toggleClass('game');
        gameDalej();
    } else {
        $('.notifi').toggleClass('visible');
    }
});

function gameDalej() {
    losujGracza();
    losujPytanie();
}

function losujPytanie() {
    liczba = losujLiczbe(0, pytania.length);
    if(pytania[liczba].hardkor == true) {
        $('.container').addClass('hardkor');
        document.querySelector('.question-text').innerHTML = pytania[liczba].pytanie;
    } else if(pytania[liczba].all == true) {
        $('.container').addClass('wszyscy');
        $('.container').removeClass('hardkor');
        $('.title').html("WSZYSCY");
        document.querySelector('.question-text').innerHTML = pytania[liczba].pytanie;
        if(numer_gracza <= 0) {
            numer_gracza = 0;
        } else {
            numer_gracza--;
        }
    } else {
        document.querySelector('.question-text').innerHTML = pytania[liczba].pytanie;
        $('.container').removeClass('hardkor');
        $('.container').removeClass('wszyscy');
    }
}

function losujGracza() {
    document.querySelector('.title').innerHTML = players_list[numer_gracza];
    numer_gracza++;
    if(numer_gracza >= players_list.length) {
        numer_gracza = 0;
    }
}

function losujLiczbe(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }