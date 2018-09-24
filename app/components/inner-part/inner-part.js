
  var data;

  $(window).on( "main:ready", function( e, _data ) {
    var $element = $(".inner-part-content");
    
    console.log("#Inner-part: on event(main:ready)", e, _data );
    data = _data;

    var $inner_title = $(".inner-part__title", $element );
    // var $inner_column = $(".inner-part-column", $element );
    var $item;
    var thisTtitle;
    var thisText;

    // log(data.content.save_and_multiply.title)
    // log(data.content.save_and_multiply.text)

    // $item = $('<h2 class="inner-part__title" >' + data.content.save_and_multiply.title + '</h2>' ).appendTo( $element );
    // $item = $('<div class="inner-part-column" >' + data.content.save_and_multiply.text + '</div>' ).appendTo( $element );

    var $first = data.content.save_and_multiply;
    addContent($first.title, $first.text.ru);

    $(window).on( "language:changed", function(e, language_name){

      log(page);
      var thisTitle;
      var thisText;

      $.each(data.content, function(item,index){

        log(item);
        $(".inner-part-content").html("");

        if (item == page){
          thisTitle = index.title;
          thisText = index.text[language_name];
        }

      });

        addContent(thisTitle, thisText);

    });

    function addContent(title, text){
      $item = $('<div class="inner-part-content" ><h2 class="inner-part__title" >' + title + '</h2>'+ text + '</div>' ).appendTo( $element );
    }
});


