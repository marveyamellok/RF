$(function(){

  var page;
  var $element = $(".menu-inner");
  var data;
  var $menu_item;

  $(window).on( "main:ready", function( e, _data ) {
    
    //
    data = _data;
    var lang;
    getCurrentLanguage();
    var $menu_items = $(".menu-inner__items", $element );
    var $elements = [];


    data.menu.list.forEach(function(item,index){

      if (item.text){
        content = item.text;
        page = item.page;
      }

      addContent( content, item, page );

      $menu_item = $(".menu-inner__item", $element );
      $($menu_item[0]).addClass("menu-inner__item_choosed");

    });



    //
    $($menu_item).on('click', function(){

      $($menu_item).removeClass("menu-inner__item_choosed");
      $(this).addClass("menu-inner__item_choosed");
      
      page = $(this).data("page");

      $(window).trigger( "menu:change_page", page );

    });

    $(window).on("main:page_changed", function(){
      
      changeContent();

    });



    //
    function changeContent(){

      getCurrentLanguage();

      $elements.forEach(function(e,i){
        var $e = $(e);
        $e.html( $e.data( "content" )[ lang ] );
      });

    }


    //
    function addContent(content, item, page){

      switch( item.type ){

        case 'separator': 
          var $item = $('<li class="menu-inner__item menu-inner__item-line"></li>' ).appendTo( $menu_items );
          break;

        default:
          var $item =
            $('<li class="menu-inner__item" data-page="' + page +  '"><a href="#" data-use-city="true" class="menu-inner__item-link">'+ content[lang] + '</a></li>' )
              .appendTo( $menu_items )
              .data('content', content )
            ;
          $elements.push( $item );
          break;

      }

    }

    //
    function getCurrentLanguage() {
      lang = data.header.current_language;
    }

  });

});
