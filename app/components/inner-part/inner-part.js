
  var data;
  var theTemplateScript;
  var theTemplate;
  var context;
  var theCompiledHtml;

//   var $item_image;

//   $(window).on( "main:ready", function( e, _data ) {
//     var $element = $(".inner-part-content");
//     var $element_image = $(".inner-part__image");
//     data = _data;
//     var $inner_title = $(".inner-part__title", $element );
//     var $item;
//     var $first = data.content.save_and_multiply;
//     addContent($first.title.ru, $first.text.ru, pageNow, $first.image);

//     $(window).on( "language:changed", function(e, language_name){

//       var thisTitle;
//       var thisText;
//       var thisImage;

//       $.each(data.content, function(item,index){
//         $($element).html(""); 
//         $($element_image).html("");

//         if (item == pageNow){
//           thisTitle = index.title[language_name];
//           thisText = index.text[language_name];
//           thisImage = index.image;
//         }

//       });
//       addContent(thisTitle, thisText, pageNow, thisImage);

//     });

//     function addContent(title, text, page, image){
//       $item = $('<h2 class="inner-part__title"  data-page="' + page +  '">' + title + '</h2><div>'+ text + '</div>').appendTo( $element );
//       $item_image = $('<image src=images/inner-illustrations-' + image + '.png></img>').appendTo( $element_image );
//     }
// });


$(function () {

  var lang = 'ru';

  $(window).on( "main:ready", function( e, _data ) {
    data = _data;
    theTemplateScript = $("#entry-template").html();
    theTemplate = Handlebars.compile(theTemplateScript);
    context = data.content.save_and_multiply;
    theCompiledHtml = theTemplate( { image: context.image, title: context.title[lang], text:context.text[lang] } );
    $('.inner-part').html(theCompiledHtml);

    $(window).on( "language:changed", function(e, language_name){
      lang = language_name;
      theCompiledHtml = theTemplate( { image: context.image, title: context.title[lang], text:context.text[lang] } );
      $('.inner-part').html(theCompiledHtml);
    });

  });

  $(window).on("content:change", function( e, pageNow ){

    $('.inner-part').fadeOut( "fast", function() {

      context = data.content[pageNow];

      theCompiledHtml = theTemplate( { image: context.image, title: context.title[lang], text:context.text[lang] } );

      $('.inner-part')
        .html(theCompiledHtml)
        .fadeIn( "slow" )
      ;

    });

  });

});
