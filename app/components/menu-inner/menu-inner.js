var page = "save_and_multiply";
var pageNow = "save_and_multiply";
var languageNow;

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

    ////////////////////////////////////заполнение меню из JSON/////////////////////////////////////////////////////////////////////

    data.menu.list_2.forEach(function(item,index){

      if (item.text)
        content = item.text.ru;
        page = item.page;
      addContent(content, item, page);

      $menu_item = $(".menu-inner__item", $element );

    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    ////////////////////////////////////заполнение меню при смене языка/////////////////////////////////////////////////////////////

    $(window).on( "language:changed", function(e, language_name){
      $($menu_items).html("");
      $menu_item = [];
      languageNow = language_name;

      data.menu.list_2.forEach(function(item,index){

        if (item.text)
          content = item.text[language_name];
          page = item.page;

        addContent(content, item, page);
        $menu_item.push($item[0]);
      });

      menu_click($menu_item);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////функуция для заполнения страницы по клику на пункте меню////////////////////////////////////

    function menu_click(elem){
      $(elem).on('click', function(){
        $this = this;
        page = $($this).data("page");
        pageNow = page;
        $(".inner-part-content").html("");
        $(".inner-part__image").html("");

        $.each(data.content, function(index, item){
          if (index == page){
              title = item.title;
              text = item.text;
              image = item.image;

              if (languageNow == "ru" || languageNow == undefined){
                title = title.ru;
                text = text.ru;
              } else if (languageNow == "en"){
                title = title.en;
                text = text.en;
              } else {
                title = title.de;
                text = text.de;
              }
              
            $item = $('<h2 class="inner-part__title"  data-page="' + page +  '">' + title + '</h2><div>'+ text + '</div>' ).appendTo(".inner-part-content");
            $item_image = $('<image src=images/inner-illustrations-' + image + '.png></img>').appendTo( ".inner-part__image" );
          }
        });
      });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    menu_click($menu_item);

    ////////////////////////////////////функуция для заполнения меню///////////////////////////////////////////////////////////////

    function addContent(content, item, page){
      if( item.type == 'separator' ){
        $item = $('<li class="menu-inner__item menu-inner__item-line"></li>' ).appendTo( $menu_items );
      }else{
        $item = $('<li class="menu-inner__item" data-page="' + page +  '"><a href="#" data-use-city="true" >'+ content + '</a></li>' ).appendTo( $menu_items );
      }
    }

  });


});