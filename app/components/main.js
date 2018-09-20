$(function(){
  console.log('kjfgjhvjh');

  $.getJSON('assets/data.json', function(data){
    
    console.log(data);
    
    $(window).trigger( "main:ready", data );
  });

});