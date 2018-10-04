$(window).on( "main:ready", function( e, data ) {

  var $element = $(".langs");
  var $block = $(".header__langs");
 

  var inner = $('<div class="langs"><p>' + data.header.langs.default + '</p><ul class="langs__items"></ul></div>').appendTo($block);
  data.header.current_language = data.header.langs.default;

  var obj = data.header.langs.list

  for (key in obj) {

    var $lang__item = $('<li class="langs__item">' + obj[key] + '</li>')
      .appendTo($('.langs__items'))
      .on("click", function(){
        var $lang_new = $(this).html();
        $(".langs p").html($lang_new);
        var lang = $lang_new;

        $(window).trigger( "language:changed", lang);
      })
    ;
  }

  $(".langs").on("click", function(){
    $(".langs__items").toggle(".langs__items_open")
  });
});