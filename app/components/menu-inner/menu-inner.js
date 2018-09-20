$(function(){
  
  console.log('#Menu-inner: inited');
  var $element = $(".menu-inner");

  var data;

  $(window).on( "main:ready", function( e, _data ) {
    
    console.log("#Menu-inner: on event(main:ready)", e, _data );
    data = _data;

    var $menu_items = $(".menu-inner__items", $element );
    var $menu_buttons = $(".menu-inner__buttons", $element );
    var $download_button = $(".menu-inner__download-button-text", $element );
    var $footer_button = $(".menu-inner__footer", $element );


    data.menu.list.forEach(function(item,index){
      console.log(index, item );
      
      var $item;

      if( item.type == 'separator' ){
        $item = $('<li class="menu-inner__item menu-inner__item-line"><li>' ).appendTo( $menu_items );
      }else{
        $item = $('<li class="menu-inner__item "><a href="#" data-use-city="true">'+ item.title +'</a><li>' ).appendTo( $menu_items );
      }
      
    });

    data.menu.buttons.forEach(function(item,index){
      var $button = $('<div class = "button ' + item.class + '"> <a href ="' + item.href + '" class="button__text">' + item.text + '</a></div>').appendTo($menu_buttons);
    });

    $($download_button).html(data.menu.button_text);
    $($footer_button).html(data.menu.footer_text);

  });


});