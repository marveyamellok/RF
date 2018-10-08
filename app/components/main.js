
function log(n){
  console.log(n);
}

$(function(){

  console.log("#Main: is inited: ");

  var data;

  // >>> router >>>
  var _root = null;
  var useHash = true; 
  var hash = '#'; 
  var router = new Navigo(_root, useHash, hash);
  // var router = new Navigo(null, false);

  router
    .on( '/:page', function (params) {
      console.log( 'router: ', params.page );
      data.header.current_page = params.page;
      // params.action = data.header.current_page;
      $(window).trigger( "main:page_changed", data );
    });

  // router.notFound(function (query) {
  //   console.log('not found', query);
  // });

  // <<< router <<<

  $.getJSON('assets/data.json', function(_data){
    
    data = _data; 

    $(window).trigger( "main:ready", data );

    router.resolve();

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


  // $(window).on( "content:change", function(e, page_name ){
  //   data.header.current_page = page_name;

  //   $(window).trigger( "main:page_changed", data );
  // });

  $(window).on( "menu:change_page", function(e, page_name ){
    console.log('menu:change_page', page_name );
    router.navigate( '/'+page_name );
    // $(window).trigger( "main:page_changed", data );

  });

  $(window).resize(function(){
    adaptive(window.innerWidth);
  })

  function adaptive(width){

    $("body")
      .toggleClass("is_phone", width < 768 )
      .toggleClass("is_tablet", width >= 768 && width < 1024 )
      .toggleClass("is_desktop", width >= 1024 )
    ;

  }


  // $('body').data('app-data', { start_page: 'save_and_blabla' });

});
