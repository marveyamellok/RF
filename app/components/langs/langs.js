$(window).on( "main:ready", function( e, data ) {

  var $element = $(".header__langs");
  if( !$element.length ) return;
  
  console.log('#langs: inited');

  var inner = $('<div class="langs"><p>' + data.header.current_language + '</p><ul class="langs__items"></ul></div>').appendTo($element);
  var $langBlock = $(".langs p");
  $(window).trigger( "main:page_changed", data);

  

  var obj = data.header.langs.list
  for (key in obj) {

    var $lang__item = $('<li class="langs__item">' + obj[key] + '</li>')
      .appendTo($('.langs__items', $element))
      .on("click", function(){

        var $lang_new = $(this).html();
        $(".langs p", $element).html($lang_new);
        var lang = $lang_new;

        data.header.current_language = lang;

        $(window).trigger( "main:page_changed", data);
      })
    ;

  }

  $(window).on( "main:page_changed", function(e, _data){
    data = _data;
    var language = data.header.current_language;
    $($langBlock).html(language)
  });


  $(".langs", $element).on("click", function(){
    $(".langs__items", $element).toggle(".langs__items_open")
  });

});