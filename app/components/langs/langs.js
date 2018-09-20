$(window).on( "main:ready", function( e, data ) {
  
  console.log('#langs: inited');
  var $element = $(".langs");
  var $block = $(".header__langs");
 
  console.log("#langs: on event(main:ready)", e, data );

  var inner = $('<div class="langs"><p>' + data.header.langs.default + '</p><ul class="langs__items"></ul></div>').appendTo($block);

  data.header.langs.list.forEach(function(item,index){
    var $lang__item = $('<li class="langs__item">' + item.lang + '</li>')
      .appendTo($('.langs__items'))
      .on("click", function(){

        var $lang_new = $(this).html();
        $(".langs p").html($lang_new);
        var lang = $lang_new;

        $(window).trigger( "language:changed", lang);
      })
    ;

  })

  $(".langs").on("click", function(){
    $(".langs__items").toggle(".langs__items_open")
  });

  $(window).trigger( "language:changed", data.header.langs.list[0].lang );

});