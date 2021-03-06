$(function(){
  var $element = $(".menu-inner");
  if( !$element.length ) return;

  var page;
  var data;
  var $menu_item;

  $(window).on( "main:ready", function( e, _data ) {
    //
    data = _data;
    var lang;
    getCurrentLanguage();
    var $menu_items = $(".menu-inner__items", $element );
    var $elements = [];
    addButtons();

    data.menu.list.forEach(function(item,index){
      if (item.text){
        content = item.text;
        page = item.page;
      }

      addContent( content, item, page );

      $menu_item = $(".menu-inner__item", $element );

      getActiveClass($menu_item, index)

    });

   

    //
    $($menu_item).on('click', function(e){
      
      e.preventDefault();

      $($menu_item).removeClass("menu-inner__item_choosed");
      $(this).addClass("menu-inner__item_choosed");

      page = $(this).data("page");
      data.header.current_page = page;

      $(window).trigger( "main:page_changed", data);
      
    });

    $(window).on("main:page_changed", function(){
      
      changeContent();

      $($menu_item).removeClass("menu-inner__item_choosed");
      
      $.each($menu_item, function(index, item){
        getActiveClass($menu_item, index)
      });
      

    });

    //
    function getActiveClass(elem, i){
      if ($(elem[i]).data("page") == data.header.current_page){
        $(elem[i]).addClass("menu-inner__item_choosed");
      }
    }


    //
    function changeContent(){

      getCurrentLanguage();

      $elements.forEach(function(e,i){
        var $e = $(e);
        var link = $($e).children();
        $(link).html( $e.data( "content" )[ lang ] );
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
            // $('<li class="menu-inner__item" data-page="' + page +  '"><a href="#' + page +'" data-use-city="true" class="menu-inner__item-link">'+ content[lang] + '</a></li>' )
            $('<li class="menu-inner__item" data-page="' + page +  '"><a href="#" data-use-city="true" class="menu-inner__item-link">'+ content[lang] + '</a></li>' )
              .appendTo( $menu_items )
              .data('content', content )
            ;
          $elements.push( $item );
          break;

      }
    }

    //
    function addButtons(){
      getCurrentLanguage()

      var context = data.translates;

      var theTemplateScript = $("#entry-template_buttons").html();
      var theTemplateScriptDownload = $("#entry-template_download").html();

      var theTemplate = Handlebars.compile(theTemplateScript);
      var theTemplateDownload = Handlebars.compile(theTemplateScriptDownload);

      var theCompiled = theTemplate( { ROnline:context.ROnline[lang], RDealer:context.RDealer[lang] });
      var Compiled = theTemplateDownload( { footer_fwr:context.footer_fwr[lang], footer_copyright:context.footer_copyright[lang] });

      $('.menu-inner__buttons')
        .html(theCompiled);

      $('.menu-inner__download')
        .html(Compiled);
    }

    //
    function getCurrentLanguage() {
      lang = data.header.current_language;
    }

  });

});
