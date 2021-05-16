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
        <input type="number" name="num1" value="" required>
        x
        <input type="number" name="num2" required>
        Price $
        <input type="number" name="price" required>

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
    var cus_name= document.querySelector('.cus_name input').value;
    var cus_email= document.querySelector('.cus_email input').value;

    var case_query = document.querySelectorAll('.casement_container .new-input');
    var case_length = case_query.length;

    console.log(case_length);



    var doc = {
        content:[

            {text: "WINDOW QUOTE", style: "header"},
            {text: "customer: " + cus_name, fontSize: 16},
            {text: "email: " + cus_email, fontSize: 16}



        ],
        styles:{
            header: {
                fontSize: 32,
                bold:true
            }
        }
    }

    createPdf(doc).download("quote");

}

