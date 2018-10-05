$(window).on( "main:ready", function( e, data ) {

  var $element = $(".header__langs");
  if( !$element.length ) return;
  
  console.log('#langs: inited');

  var inner = $('<div class="langs"><p>' + data.header.langs.default + '</p><ul class="langs__items"></ul></div>').appendTo($element);

  data.header.current_language = data.header.langs.default;

  var obj = data.header.langs.list
  for (key in obj) {

    var $lang__item = $('<li class="langs__item">' + obj[key] + '</li>')
      .appendTo($('.langs__items', $element))
      .on("click", function(){

        var $lang_new = $(this).html();
        $(".langs p", $element).html($lang_new);
        var lang = $lang_new;

        $(window).trigger( "language:changed", lang);
      })
    ;

  }

  $(".langs", $element).on("click", function(){
    $(".langs__items", $element).toggle(".langs__items_open")
  });

  // $(window).trigger( "language:changed", data.header.langs.list[0].lang );

});