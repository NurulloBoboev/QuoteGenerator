// The following will add the "add and remove" functionality of the webform



$(document) .ready(function(){
    var NewInputField=`
    <div class="new-input">

    <select name="room">
        <option value="Living Room"> Living Room </option>
        <option value="Dining Room"> Dining Room </option>
        <option value="Master Bedroom"> Master Bedroom </option>
        <option value="Bedroom"> Bedroom </option>
        <option value="Bonus Room"> Bonus Room </option>
    
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

    var Awning_txt = "";

    for( i = 0; i < case_length; i++){
        var childs = case_query[i].childNodes;
        console.log("This is the text in child[1]:" + childs[1].value);
        console.log("This is the text in child[3]:" + childs[3].value);
        console.log("This is the text in child[5]:" + childs[5].value);
        console.log("This is the text in child[7]:" + childs[7].value);

        var child_txt = childs[1].value + "\t\t\t" + childs[3].value+"\" x " + childs[5].value+"\""
                        + "\t$" + childs[7].value + '\n';
        Awning_txt += child_txt;

    }

    console.log(case_length);
    console.log(Awning_txt);


    var doc = {
        info: {
            title: cus_name+ ' Window Quote'
        },
        content:[
            {text: "WINDOW QUOTE", style: "header"},
            {text: "customer: " + cus_name, fontSize: 16},
            {text: "email: " + cus_email, fontSize: 16},
            {text: "\n\n\n"+Awning_txt, fontSize: 12}


        ],
        styles:{
            header: {
                fontSize: 32,
                bold:true
            }
        }
    }

    var win = window.open('hello', '_blank');

    createPdf(doc).open({}, win);

}

