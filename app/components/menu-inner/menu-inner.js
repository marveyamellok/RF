$(function(){

  var page;
  var $element = $(".menu-inner");
  var data;
  var $menu_item;

  $(window).on( "main:ready", function( e, _data ) {
    
    data = _data;
    var $menu_items = $(".menu-inner__items", $element );

    data.menu.list.forEach(function(item,index){

      if (item.text){
        content = item.text.ru;
        page = item.page;
      }

      addContent(content, item, page);

      $menu_item = $(".menu-inner__item", $element );
      $($menu_item[0]).addClass("menu-inner__item_choosed");

    });

    $($menu_item).on('click', function(){
      $($menu_item).removeClass("menu-inner__item_choosed");
      var $this = $(this);
      $this.addClass("menu-inner__item_choosed");
      page = $this.data("page");
      data.header.current_page = page;

      $(window).trigger( "main:page_changed", data);
    });

    // $(window).on("main:page_changed", function(){
    //   changeContent();
    // })

    function addContent(content, item, page){
      if( item.type == 'separator' ){
        var $item = $('<li class="menu-inner__item menu-inner__item-line"></li>' ).appendTo( $menu_items );
      }else{
        var $item = $('<li class="menu-inner__item" data-page="' + page +  '"><a href="#" data-use-city="true" class="menu-inner__item-link">'+ content + '</a></li>' ).appendTo( $menu_items );
      }
    }

    // function changeContent(){
    //   var lang = data.header.current_language;
    //   var content = [];

    //   data.menu.list.forEach(function(item, index){
    //     if (item.text){
    //       var elem = item.text[lang]
    //       content.push(elem)
    //     }
    //   })

    //   $.each($(".menu-inner__item-link"), function(index, item ){
    //     $(item).html("")
    //     $(item).html(content[index])
    //   });
    // }


  });

});
