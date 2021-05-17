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

    //Strings to hold each type of window
    var Casement_txt = "";
    var Awning_txt = "";
    var Singles_txt ="";
    var Doubles_txt ="";
    var Singleh_txt = "";
    var Doubleh_txt = "";

    //loop to get all casement form information
    for( i = 0; i < case_length; i++){
        var childs = case_query[i].childNodes;
        console.log("This is the text in child[1]:" + childs[1].value);
        console.log("This is the text in child[3]:" + childs[3].value);
        console.log("This is the text in child[5]:" + childs[5].value);
        console.log("This is the text in child[7]:" + childs[7].value);

        var child_txt = childs[1].value + "\t\t Casement \t\t" + childs[3].value+"\" x " + childs[5].value+"\""
                        + "\t\t$" + childs[7].value + '\n';
        Casement_txt += child_txt;

    }

    //loop to get all awning form information
    var awn_query = document.querySelectorAll('.Awning_container .new-input');
    for( i = 0; i < awn_query.length; i++){
        var childs = awn_query[i].childNodes;
        var child_txt = childs[1].value + "\t\t Awning \t\t" + childs[3].value+"\" x " + childs[5].value+"\""
                        + "\t\t$" + childs[7].value + '\n';
        Awning_txt += child_txt;

    }

    //loop to get all Single Slider form information
    var singles_query = document.querySelectorAll('.singles_container .new-input');
    for( i = 0; i < singles_query.length; i++){
        var childs = singles_query[i].childNodes;
        var child_txt = childs[1].value + "\t\t Single Slider \t\t" + childs[3].value+"\" x " + childs[5].value+"\""
                        + "\t\t$" + childs[7].value + '\n';
        Singles_txt += child_txt;

    }

        //loop to get all Double Slider form information
    var doubles_query = document.querySelectorAll('.doubles_container .new-input');
    for( i = 0; i < doubles_query.length; i++){
        var childs = doubles_query[i].childNodes;
        var child_txt = childs[1].value + "\t\t Double Slider \t\t" + childs[3].value+"\" x " + childs[5].value+"\""
                        + "\t\t$" + childs[7].value + '\n';
        Doubles_txt += child_txt;

    }

    //loop to get all Double Slider form information
    var singleh_query = document.querySelectorAll('.singleh_container .new-input');
    for( i = 0; i < singleh_query.length; i++){
        var childs = singleh_query[i].childNodes;
        var child_txt = childs[1].value + "\t\t Single Hung \t\t" + childs[3].value+"\" x " + childs[5].value+"\""
                        + "\t\t$" + childs[7].value + '\n';
        Singleh_txt += child_txt;

    }

    //loop to get all Double Slider form information
    var doubleh_query = document.querySelectorAll('.doubleh_container .new-input');
    for( i = 0; i < doubleh_query.length; i++){
        var childs = doubleh_query[i].childNodes;
        var child_txt = childs[1].value + "\t\t Double Hung \t\t" + childs[3].value+"\" x " + childs[5].value+"\""
                        + "\t\t$" + childs[7].value + '\n';
        Doubleh_txt += child_txt;

    }
    //Loop to get all Awning stuff


    console.log(case_length);
    console.log(Casement_txt);


    var doc = {
        info: {
            title: cus_name+ ' Window Quote'
        },
        content:[
            {text: "WINDOW QUOTE", style: "header"},
            {text: "customer: " + cus_name, fontSize: 16},
            {text: "email: " + cus_email, fontSize: 16},
            {text: "\n\n\n"+Casement_txt, fontSize: 12},
            {text: "\n\n\n"+Awning_txt, fontSize: 12},
            {text: "\n\n\n"+Singles_txt, fontSize: 12},
            {text: "\n\n\n"+Doubles_txt, fontSize: 12},
            {text: "\n\n\n"+Singleh_txt, fontSize: 12},
            {text: "\n\n\n"+Doubleh_txt, fontSize: 12}

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

