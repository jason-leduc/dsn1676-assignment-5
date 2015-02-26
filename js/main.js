var $theCircle = $('.circle');
var $moveDownBtn = $('.move-down');
var $moveUpBtn = $('.move-up');
var $moveLeftBtn = $('.move-left');
var $moveRightBtn = $('.move-right');
var $form = $('form');
var $input = $('#the-color');

//$theCircle.remove();
//$theCircle.css('border', '3px solid black');

$moveDownBtn.on('click', function() {
  //$theCircle.addClass('highlight');
  var currentLocation = $theCircle.offset();
    
  $theCircle.css('top', '400px');
  
  $theCircle.css('top', currentLocation.top + 10);
});

$moveUpBtn.on('click', function() {
 
  var currentLocation = $theCircle.offset();
    
  $theCircle.css('top', '400px');
  
  $theCircle.css('top', currentLocation.top - 10);
});

$moveLeftBtn.on('click', function() {
  
  var currentLocation = $theCircle.offset();
    
  $theCircle.css('left', '400px');
  
  $theCircle.css('left', currentLocation.top + 10);
});

$moveRightBtn.on('click', function() {
  
  var currentLocation = $theCircle.offset();
    
  $theCircle.css('left', '400px');
  
  $theCircle.css('left', currentLocation.top - 10);
});

$form.on('submit', function(eventObject){
  // stops the form doing what it normally does
  eventObject.preventDefault();
  
  $theCircle.css('background-color', $input.val());
  
  var $theH2 = $('<h2>');
  $theH2.html($input.val());
  $theCircle.prepend($theH2);
  
  $input.val('');
});