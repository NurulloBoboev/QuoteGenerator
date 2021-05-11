
// The following will add the "add and remove" functionality of the webform

$(document) .ready(function(){
    var NewInputField=`
    <div class="new-input">
        Size
        <input type="number" name="num1" value="">
        x
        <input type="number" name="num2" >
        Price $
        <input type="number" name="price" >

        <button class="remove"> remove </button>
    </div>`;

    $(document).on('click','.add', function(e){
        e.preventDefault();
        $(this).parent().find('.new_window_info').append(NewInputField);
    });

    $(document).on('click','.remove', function(e){
        e.preventDefault();
        $(this).parent().remove();
    });

});