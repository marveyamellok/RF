var page = "save_and_multiply";
var pageNow = "save_and_multiply";

$(function(){
  
  var $element = $(".menu-inner");

  var data;

  $(window).on( "main:ready", function( e, _data ) {
    
    data = _data;

    var $menu_items = $(".menu-inner__items", $element );
    var content;
    var title;
    var text;
    var $menu_item;
    var $item;

    data.menu.list_2.forEach(function(item,index){

      if (item.text)
        content = item.text.ru;
        page = item.page;
        pageNow = item.page;
      addContent(content, item, page);

      $menu_item = $(".menu-inner__item", $element );

    });

    $(window).on( "language:changed", function(e, language_name){
      $($menu_items).html("");
      $menu_item = [];

      data.menu.list_2.forEach(function(item,index){

        if (item.text)
          content = item.text[language_name];
          page = item.page;

        addContent(content, item, page);
        $menu_item.push($item[0]);

      });

      menu_click($menu_item);
    });

    function menu_click(elem, lang){
      $(elem).on('click', function(){
        $this = this;
        page = $($this).data("page");
        pageNow = page;

        $.each(data.content, function(item,index){
          if (item == page){
            $(".inner-part-content").html("");
              title = index.title.ru;
              text = index.text.ru;
              
            $item = $('<h2 class="inner-part__title"  data-page="' + page +  '">' + title + '</h2><div>'+ text + '</div>' ).appendTo(".inner-part-content");
          }
        });
      });
    }

    menu_click($menu_item);

    function addContent(content, item, page){
      if( item.type == 'separator' ){
        $item = $('<li class="menu-inner__item menu-inner__item-line"></li>' ).appendTo( $menu_items );
      }else{
        $item = $('<li class="menu-inner__item" data-page="' + page +  '"><a href="#" data-use-city="true" >'+ content + '</a></li>' ).appendTo( $menu_items );
      }
    }

  });


});