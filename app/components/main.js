
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
  });


  $(window).on('language:changed', function( e, language_name ) {

    log(language_name)


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


  $(window).on( "menu:change_page", function(e, page_name ){
    data.header.current_page = page_name;
    $(window).trigger( "main:page_changed", data );
  });


  // $('body').data('app-data', { start_page: 'save_and_blabla' });

});
