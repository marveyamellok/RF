var page = "save_and_multiply";

$(function(){
  
  // console.log('#Menu-inner: inited');
  var $element = $(".menu-inner");

  var data;

  $(window).on( "main:ready", function( e, _data ) {
    
    console.log("#Menu-inner: on event(main:ready)", e, _data );
    data = _data;

    var $menu_items = $(".menu-inner__items", $element );
    var $menu_buttons = $(".menu-inner__buttons", $element );
    var $download_button = $(".menu-inner__download-button-text", $element );
    var $footer_button = $(".menu-inner__footer", $element );
    var content;
    var title;
    var text;
    var $menu_item;


    data.menu.list_2.forEach(function(item,index){
      
      var $item;

      if (item.text)
        content = item.text.ru;
        page = item.page;
      addContent(content, item);

      $menu_item = $(".menu-inner__item", $element );

    });

    $(window).on( "language:changed", function(e, language_name){
      $($menu_items).html("");

      data.menu.list_2.forEach(function(item,index){

        if (item.text)
          content = item.text[language_name];
          page = item.page;
        addContent(content, item);

      log(item);
      $menu_item = item;
      });

      $menu_item = $($element ).children();

      //log($menu_item)

    });


    $($menu_item).on('click', function(){
      $this = this;
      page = $($this).data("page");

      $.each(data.content, function(item,index){
        if (item == page){
          $(".inner-part-content").html("");

          title = index.title;
          text = index.text.ru;
          $item = $('<div class="inner-part-content" ><h2 class="inner-part__title" >' + title + '</h2>'+ text + '</div>' ).appendTo(".inner-part-content");
        }

      });

      log($menu_item)

    });

    $($element ).on("click", function(){
      log($(".menu-inner__items").children())
    })

    function addContent(content, item){
      if( item.type == 'separator' ){
        $item = $('<li class="menu-inner__item menu-inner__item-line"></li>' ).appendTo( $menu_items );
      }else{
        $item = $('<li class="menu-inner__item" data-page="' + page +  '"><a href="#" data-use-city="true" >'+ content + '</a></li>' ).appendTo( $menu_items );
      }
    }

  });


});