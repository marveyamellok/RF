
function log(n){
  console.log(n);
}

$(function(){

  console.log("#Main: is inited: ");

  var data;

  $.getJSON('assets/data.json', function(_data){
    
    data = _data; 
    // console.log("#Main: data is loaded: ", data);
    
    $(window).trigger( "main:ready", data );
    showContent();
  });


  $(window).on('language:changed', function( e, language_name ) {


    data.header.current_language = language_name;
    $(window).trigger( "main:page_changed", data );

    //
    $('[data-trnslt]').each(function(i,e){
      var $e = $(e);
      var id= $e.data('trnslt');
      var translate = data.translates[id];
      
      if( !translate ) {
        console.warn("there's no element whith such id", id );
        return;
      }

      if (Array.isArray(translate))
        translate = translate[i];

      translate = translate[language_name];
      $e.html( translate );
    });

  });


  $(window).on( "content:change", function(e, page_name ){
    data.header.current_page = page_name;
    $(window).trigger( "main:page_changed", data );
  });


  // $(window).on( "main:ready", function( e, _data ) {
  //   data = _data;
  //   showContent();
  // });

  $(window).on("main:page_changed", function( e, _data){
    data = _data;
    hideContent();
    changeContent();
  });

  function hideContent(){
    $('.inner-part').fadeOut( "fast", function() {
      showContent()
    });
  }

  function showContent(){
    var pageNow = data.header.current_page;
    var lang = data.header.current_language;
    var context = data.content[pageNow];
    var theTemplateScript = $("#entry-template").html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    var theCompiledHtml = theTemplate( { image: context.image, title: context.title[lang], text:context.text[lang] } );
    log(pageNow)
    $('.inner-part')
      .html(theCompiledHtml)
      .fadeIn( "slow" )
    ;  
  }

  function changeContent(){
    var lang = data.header.current_language;
    var content = [];

    data.menu.list.forEach(function(item, index){
      if (item.text){
        var elem = item.text[lang]
        content.push(elem)
      }
    })

    $.each($(".menu-inner__item-link"), function(index, item ){
      $(item).html("")
      $(item).html(content[index])
    });
  }

  // $('body').data('app-data', { start_page: 'save_and_blabla' });

});
