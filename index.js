// The following will add the "add and remove" functionality of the webform



$(document) .ready(function(){
    var NewInputField=`
    <div class="new-input">

    <select name="room">
    <option value="living"> Living Room </option>
    <option value="dining"> Dining Room </option>
    <option value="master"> Master Bedroom </option>
    <option value="bed1"> Bedroom </option>
    <option value="bonus"> Bonus Room </option>
    
  </select>
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


const generate = document.querySelector('.generate');

generate.addEventListener('click', function(){
    console.log('poggers');
    createDoc();


});

function createDoc(){
    var doc = {
        content:[
            "sup guys its Thenuruljlo here"
        ]
    }

    createPdf(doc).download("quote");

}

