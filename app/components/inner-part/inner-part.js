
  var data;

  $(window).on( "main:ready", function( e, _data ) {
    var $element = $(".inner-part-content");
    data = _data;

    var $inner_title = $(".inner-part__title", $element );
    var $item;
    var thisTtitle;
    var thisText;

    var $first = data.content.save_and_multiply;
    addContent($first.title.ru, $first.text.ru, pageNow);

    $(window).on( "language:changed", function(e, language_name){

      var thisTitle;
      var thisText;

      $.each(data.content, function(item,index){
        $($element).html(""); 

        if (item == pageNow){
          thisTitle = index.title[language_name];
          thisText = index.text[language_name];
        }

      });
      addContent(thisTitle, thisText, pageNow);

    });

    function addContent(title, text, page){
      $item = $('<h2 class="inner-part__title"  data-page="' + page +  '">' + title + '</h2><div>'+ text + '</div>').appendTo( $element );
    }
});


