$(function () {
  var data;
  var $height;

  $(window).on( "main:ready", function( e, _data ) {
    data = _data;
    showContent();
  });

  $(window).on("main:page_changed", function( e, _data){

    data = _data;
    hideContent( showContent );

  });

  function hideContent(tweenComplete){

    var $elem = $('.inner-part');
    // var $height = $('.inner-part-content').height();

    // TweenMax.fromTo($elem, 1, {css: {height: $height}}, {css:{height:"0"}});

    // if( onComplete ) onComplete();

    // var tl = new TimelineLite();

    // tl.from($(".inner-part__title"), 0.1, {css: {opacity: 1}})
    //   .from($(".inner-part-column"), 0.1, {y:  0, opacity: 1})
    //   .to($(".inner-part__title"), 1, {css: {opacity: 0}})
    //   .to($(".inner-part-column"), 1, {y: 100, opacity: 0})

    var title = TweenMax.fromTo($(".inner-part__title"), 1, {opacity: 1, x: 0, ease: Power3.easeOut}, {opacity: 0, x: 150, ease: Power3.easeOut});
    var text = TweenMax.fromTo($(".inner-part-column"), 1, {y:  0, opacity: 1}, {y: 100, opacity: 0, onComplete:tweenComplete} );
    var image =  TweenMax.fromTo($(".inner-part__image"), 1.5, {rotation: 0, opacity: 1, scale: 1}, {rotation: 720, opacity: 0, scale: 0});

    text.delay(0.5);
  }

  function showContent(){

    var pageNow = data.header.current_page;
    var lang = data.header.current_language;
    var context = data.content[pageNow];
    var theTemplateScript = $("#entry-template").html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    var theCompiledHtml = theTemplate( { image: context.image, title: context.title[lang], text:context.text[lang] } );

    $('.inner-part').html(theCompiledHtml);
    TweenMax.fromTo($(".inner-part__title"), 1, {opacity: 0, x: 150, ease: Power3.easeOut}, {opacity: 1, x: 0, ease: Power3.easeOut});
    TweenMax.fromTo($(".inner-part-column"), 1, {y:  100, opacity: 0}, {y: 0, opacity: 1});
    TweenMax.fromTo($(".inner-part__image"), 1.5, {rotation: 720, opacity: 0, scale: 0}, {rotation: 0, opacity: 1, scale: 1});
  }

});
