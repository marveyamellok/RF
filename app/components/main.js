
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
    .on( ':language/:page', function (params) {

      data.header.current_page = params.page;
      data.header.current_language = params.language;

      $(window).trigger( "main:page_changed", data );

    });

  // router.notFound(function (query) {
  //   console.log('not found', query);
  // });

  // <<< router <<<

  $.getJSON('assets/data.json', function(_data){
    
    data = _data; 
    router.resolve();

    $(window).trigger( "main:ready", data );

  });


  $(window).on( "main:page_changed", function(e, _data ){

    data = _data;
    var language = data.header.current_language;
    var page = data.header.current_page;
    router.navigate( '/' + data.header.current_language + "/" + data.header.current_page );

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

});
