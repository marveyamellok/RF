$(function () {
  
  var $element = $(".inner-part");
  if( !$element.length ) return;

  var data;
  var is_animated = false;
  var $title; 
  var $text; 
  var $image; 

  var theTemplateScript = $("#entry-template").html();
  var theTemplate = Handlebars.compile(theTemplateScript);

  $(window).on( "main:ready", function( e, _data ) {
    data = _data;
    // showContent();
  });

  $(window).on("main:page_changed", function( e, _data){
    data = _data;
    hideContent( showContent );

  });

  function hideContent(tweenComplete){

    if( is_animated ){
      return;
    }

    if( !$title ) {
      tweenComplete();
      return;
    }

    is_animated = true;
    TweenMax.to( $title, .4, {opacity: 0, x:20, ease: Power3.easeIn});
    TweenMax.to( $image, .5, {delay: .1, rotation: 720, opacity: 0, scale: 0});
    TweenMax.to( $text, .3, {delay: .1, y: 5, opacity: 0, onComplete:function() {
      is_animated = false;
      tweenComplete();  
      }
    });
  }

  function showContent(){

    var pageNow = data.header.current_page;
    var lang = data.header.current_language;
    var context = data.content[pageNow];
   
    var theCompiledHtml = theTemplate( { image: context.image, title: context.title[lang], text:context.text[lang] } );

    $element.html(theCompiledHtml);

    $title = $(".inner-part__title", $element);
    $text = $(".inner-part-column", $element);
    $image = $(".inner-part__image", $element);

    TweenMax.fromTo( $title, .4, { opacity: 0, x:-20 }, { x:0, opacity: 1, ease: Power3.easeOut});
    TweenMax.fromTo($text, .5, {delay: .1, y:  5, opacity: 0}, {y: 0, opacity: 1});
    TweenMax.fromTo($image, .5, {rotation: 720, opacity: 0, scale: 0}, {rotation: 0, opacity: 1, scale: 1});
  }

});
