var DBOW = {};

(function () {

var page = window.location.hash;

DBOW.Util = (function () {

    var me = {},
        displayedContent = $('#about-content'),
        displayedNav = $('li.about'),
        contentColors = {'#About': '#33CCFF',
                         '#Projects': '#FFCC00',
                         '#Resume': '#D53817',
                         '#Contact': '#8265A2'};

    me.showContent = function () {
      
      displayedContent.removeClass('displayed');
      displayedNav.removeClass('displayed-nav');
      
      switch (page) {  
         case "#About":  
            displayedContent = $('#about-content');
            displayedNav = $('li.about');
            break;  
         case "#Projects":  
            displayedContent = $('#projects-content');
            displayedNav = $('li.projects');
            break;  
         case "#Resume":  
            displayedContent = $('#resume-content');
            displayedNav = $('li.resume');
            break;  
         case "#Contact":  
            displayedContent = $('#contact-content');
            displayedNav = $('li.contact');
            break;   
         default:  
            displayedContent = $('#about-content');
            displayedNav = $('li.about');
        }
        displayedContent.addClass('displayed');
        displayedNav.addClass('displayed-nav');
        var newAnchors = displayedContent.find('a');
        newAnchors.hover(
          function() {
            $(this).css('color', contentColors[page]);
          },function() {
            $(this).css('color', '#FFF');
        });
    };

    return me;

}());


DBOW.Setup = (function () {

    var me = {};

    me.interactions = function () {
      
      $('#left-nav').find('a').click(function(e) {
        page = e.currentTarget.hash;
        DBOW.Util.showContent(page);
        _gaq.push(['_trackPageview', page]);
      });
    };

    return me;

}());


$(function () {

  DBOW.Setup.interactions();
  DBOW.Util.showContent(page);
  //if (!!document.createElement('canvas').getContext) {
  //  $('#about-content').find('.content-body').append('<p>p.s. Enjoy the ball pit!</p>');
  //}

});

}());
