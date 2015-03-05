var $form = $('form');
var $input = $('#the-items');
var $theList = $('.list');
var $li = $('<li>');

$form.on('submit', function (eventObject) {
    eventObject.preventDefault();
    
    
    var $li = $('<li>');
    $li.html($input.val());
    
    var $inputRemove = $('<button class="remove xbutton">x</button>');
    
    $inputRemove.on('click', function () {
        $li.remove('li');
    });
    
    $li.click(function() {
        $(this).addClass('done');
    });
    
    $li.append($inputRemove);
    $theList.append($li);
    $input.val('');
});