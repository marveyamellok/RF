$(window).on( "main:ready", function( e, data ) {

  var $element = $(".header__langs");
  if( !$element.length ) return;
  
  console.log('#langs: inited');

  if(localStorage.getItem("langNow") !== null){

    var langNow = localStorage.getItem('langNow');
    data.header.current_language = langNow;

    var inner = $('<div class="langs"><p>' + data.header.current_language + '</p><ul class="langs__items"></ul></div>').appendTo($element);

  } else {

    var inner = $('<div class="langs"><p>' + data.header.langs.default + '</p><ul class="langs__items"></ul></div>').appendTo($element);
    data.header.current_language = data.header.langs.default;

  }

  var obj = data.header.langs.list
  for (key in obj) {

    var $lang__item = $('<li class="langs__item">' + obj[key] + '</li>')
      .appendTo($('.langs__items', $element))
      .on("click", function(){

        var $lang_new = $(this).html();
        $(".langs p", $element).html($lang_new);
        var lang = $lang_new;
        localStorage.setItem('langNow', lang)

        $(window).trigger( "language:changed", lang);
      })
    ;

  }

  $(".langs", $element).on("click", function(){
    $(".langs__items", $element).toggle(".langs__items_open");
  });

});