var DBOW = {},
    processingBound = false;

function bindJavascript () {
  var pjs = Processing.getInstanceById('ball-pit-canvas');
  if (pjs != null) {
    pjs.bindJavascript(this);
    processingBound = true;
  }
  if (!processingBound) setTimeout(bindJavascript, 250);
}

function recordHit (id) {
  DBOW.Game.recordHit(id);
}

function resetGame (id) {
  DBOW.Game.resetGame(id);
}

function storeId (id) {
  DBOW.Game.storeId(id);
}

function startCountdown () {
  DBOW.Game.startCountdown();
}

(function () {

var page = window.location.hash;

DBOW.Util = (function () {

    var me = {},
        displayedContent = '#about-content',
        displayedNav = 'li.about',
        contentColors = {'#About': '#33CCFF',
                         '#Projects': '#FFCC00',
                         '#Resume': '#D53817',
                         '#Contact': '#8265A2'};

    me.showContent = function () {
      
      $(displayedContent).removeClass('displayed');
      $(displayedNav).removeClass('displayed-nav');
      $('#game-content').hide();
      
      switch (page) {  
         case "#About":  
            displayedContent = '#about-content';
            displayedNav = 'li.about';
            $('#game-content').show();
            break;  
         case "#Projects":  
            displayedContent = '#projects-content';
            displayedNav = 'li.projects';
            break;  
         case "#Resume":  
            displayedContent = '#resume-content';
            displayedNav = 'li.resume';
            break;  
         case "#Contact":  
            displayedContent = '#contact-content';
            displayedNav = 'li.contact';
            break;   
         default:  
            displayedContent = '#about-content';
            displayedNav = 'li.about';
            $('#game-content').show();
        }
        $(displayedNav).addClass('displayed-nav');
        $(displayedContent).addClass('displayed')
                           .find('a')
                           .hover(function() {
                             $(this).css('color', contentColors[page]);
                           },function() {
                             $(this).css('color', '#FFF');
                           });
    };

    return me;

}());


DBOW.Game = (function () {

    var me = {},
        lowestHighScore,
        topScore = 0,
        processingId,
        userHighScore = 0,
        gameId;

    function sendHighScore (initials, score) {
      $.post("/highscore", { initials: initials, score: score, gameId: gameId },
        function(response) {
          var responseObj;
          if (response) {
            responseObj = $.parseJSON(response);
            if (!responseObj.error) {
              me.updateHighScores(responseObj);
            }
          }
      });
    }

    me.recordHit = function (id) {

      if (id === processingId) {
        topScore++;
        $('#game-score').text(topScore);
      }

    };
    
    me.resetGame = function (id) {

      if (id === processingId) {
        if (topScore >= lowestHighScore && topScore >= userHighScore) {
          $(document).off('click', '#game-submit');
          userHighScore = topScore;
          $('#game-high-score').text(userHighScore);
          $('#game-winner').show();
          $(document).on('click', '#game-submit', function() {
            var initials = $('#game-initials').val();
            if (initials !== '' && initials.length <= 3) {
              sendHighScore(initials, userHighScore);
              $('#game-winner').hide();
              $('#game-validation').hide();
              $('#game-initials').val('');
              $(document).off('click', '#game-submit');
              userHighScore = 0;
            } else {
              $('#game-validation').show();
            }
          });
        }
        topScore = 0;
        $('#game-score').text(topScore);
      }
      
    };
    
    me.storeId = function (id) {

      if (!processingId) {
        processingId = id;
      }

    };
    
    me.updateHighScores = function (scoreArray) {

      var scoreArray,
          scoreLen = scoreArray.length,
          i,
          scoreObj,
          scoreText = '';

      $('#game-scores-list').html('');

      for (i=0; i < scoreLen; i++) {
        scoreObj = scoreArray[i];
        scoreItem = '<li><span class="game-score">' + scoreObj.score +
                    '</span><span class="game-name">' + scoreObj.initials +
                    '</span></li>';
        scoreText += scoreItem;
      }

      $('#game-scores-list').html(scoreText);

      me.setLowestHighScore(scoreArray[scoreLen - 1].score);

    };
    
    me.setLowestHighScore = function (score) {

      lowestHighScore = score;

    };
    
    me.startCountdown = function () {

      var starter = 5,
          intervalID;

      intervalID = setInterval(function () {
        me.countdownTimer(starter);
        starter -= 1;
        if (starter < 0) {
          clearInterval(intervalID);
          $('#game-countdown').hide();
        }
      }, 1000);

    };
    
    me.countdownTimer = function (num) {
      $('#game-countdown').show();
      $('#game-countdown > span').text(num);
    };
    
    me.setGameId = function (key) {

      $.get('/game', {game_key: key}, function (response) {
        var responseObj;
        if (response) {
          responseObj = $.parseJSON(response);
          if (responseObj.game_id) {
            gameId = responseObj.game_id;
          }
        }
      });

    };

    return me;

}());


DBOW.Setup = (function () {

    var me = {};

    me.interactions = function () {

      // Set up Nav click handlers.
      $(document).on('click', 'a.nav-link', function(e) {
        page = e.currentTarget.hash;
        DBOW.Util.showContent(page);
        _gaq.push(['_trackPageview', page]);
        pSUPERFLY.virtualPage(page);
      });
      // Set up Blog click handler.
      $(document).on('click', 'a.blog-link', function(e) {
        _gaq.push(['_trackPageview', '#Blog']);
      });
      // Set up outbound link click handlers.
      $(document).on('click', 'a:not(".nav-link"):not(".blog-link")', function(e) {
        _gaq.push(['_trackEvent', 'Outbound Link', $(this).attr('href')]);
      });
      // Set up Game click handlers.
      $('#game-start').one('click', function() {
        var pjs = Processing.getInstanceById('ball-pit-canvas');
        if (pjs != null) {
          pjs.startGame();
          $('#game-play').show();
          $('#game-start').hide();
        }
      });
      $('#game-content').show();


    };

    return me;

}());


$(function () {

  DBOW.Setup.interactions();
  DBOW.Util.showContent(page);
  bindJavascript();
  //if (!!document.createElement('canvas').getContext) {
  //  $('#about-content').find('.content-body').append('<p>p.s. Enjoy the ball pit!</p>');
  //}

});

}());
