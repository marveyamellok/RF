$(function(){

  console.log("#Main: is inited: ");

  var data;

  $.getJSON('assets/data.json', function(_data){
    
    data = _data;  
    console.log("#Main: data is loaded: ", data);
    
    $(window).trigger( "main:ready", data );
  });


  $(window).on('language:changed', function( e, language_name ) {
      $('[data-trnslt]').each(function(i,e){
        var $e = $(e);
        var id= $e.data('trnslt');
        var translate = data.translates[id];
        if( !translate ) {
          console.warn("there's no element whith such id", id );
          return;
        }

        translate = translate[language_name];
        $e.html( translate );

      });
  });

});
