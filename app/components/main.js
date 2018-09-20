$(function(){

  console.log("#Main: is inited: ");

  $.getJSON('assets/data.json', function(data){
    
    console.log("#Main: data is loaded: ", data);
    
    $(window).trigger( "main:ready", data );
  });

});
