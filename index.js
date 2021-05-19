

// The following will add the "add and remove" functionality of the webform using JQuery

$(document) .ready(function(){
    //window input field
    var NewInputField1=`
    <div class="new-input">

    <select name="room">
        <option value="Living Room"> Living Room </option>
        <option value="Dining Room"> Dining Room </option>
        <option value="Master Bedroom"> Master Bedroom </option>
        <option value="Bedroom"> Bedroom </option>
        <option value="Bonus Room"> Bonus Room </option>
    
    </select>
        <label>Size</label>
        <input type="number" name="num1" value="" required>
        <label>x</label>
        <input type="number" name="num2" required>
        <label>Price $</label>
        <input type="number" name="price" required>

        <button class="remove"> Remove </button>
    </div>`;

    //door input field
    var NewInputField2=`
    <div class="new-input">

    <select name="room">
        <option value="Front Door"> Front Door </option>
        <option value="Back Door"> Back Door </option>
        <option value="Garage Door"> Garage Door </option>
    </select>
        <label>Size</label>
        <input type="number" name="num1" value="" required>
        <label>x</label>
        <input type="number" name="num2" required>
        <label>Price $</label>
        <input type="number" name="price" required>

        <button class="remove"> Remove </button>
    </div>`;

    $(document).on('click','.window_container .add', function(e){
        e.preventDefault();
        $(this).parent().find('.new_window_info').append(NewInputField1);
    });

    $(document).on('click','.door_container .add', function(e){
        e.preventDefault();
        $(this).parent().find('.new_window_info').append(NewInputField2);
    });

    $(document).on('click','.remove', function(e){
        e.preventDefault();
        $(this).parent().remove();
    });

});


//Following adds functionality to the "Generate Quote" button
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
    var Casement_txt = "\n";
    var Awning_txt = "\n";
    var Singles_txt ="\n";
    var Doubles_txt ="\n";
    var Singleh_txt = "\n";
    var Doubleh_txt = "\n";
    var Door_txt = "\n";


    //Strings for each column of information for Windows
    var window_room = "";
    var window_type = "";
    var window_size = "";
    var window_price = "";

    //Strings for each colun of information for Doors
    var door_location = "";
    var door_size = "";
    var door_price = "";



    var total_price = 0;

    var windows = false;

    //loop to get all casement form information
    for( i = 0; i < case_length; i++){
        windows = true;
        var childs = case_query[i].childNodes;
        console.log("This is the text in child[1]:" + childs[1].value);
        console.log("This is the text in child[3]:" + childs[3].value);
        //first dimension
        console.log("This is the text in child[5]:" + childs[5].value);
        //2nd dimension
        console.log("This is the text in child[9]:" + childs[9].value);
        //price
        console.log("This is the text in child[13]:" + childs[13].value);

        var child_txt = childs[1].value + "\t\t Casement \t\t\t\t" + childs[5].value+"\" x " + childs[9].value+"\""
                        + "\t\t$" + childs[13].value + '\n';

        window_room += "\n"+childs[1].value;
        window_type += "\nCasement";
        window_size += "\n"+childs[5].value+"\" x " + childs[9].value+"\"";
        window_price += "\n$" + childs[13].value;

        Casement_txt += child_txt;
        total_price += parseFloat(childs[13].value);

    }

    //loop to get all awning form information
    var awn_query = document.querySelectorAll('.Awning_container .new-input');
    for( i = 0; i < awn_query.length; i++){
        windows = true;
        var childs = awn_query[i].childNodes;

        var child_txt = childs[1].value + "\t\t Awning \t\t\t\t\t " + childs[5].value+"\" x " + childs[9].value+"\""
                        + "\t\t$" + childs[13].value + '\n';
        Awning_txt += child_txt;

        window_room += "\n"+childs[1].value;
        window_type += "\nAwning";
        window_size += "\n"+childs[5].value+"\" x " + childs[9].value+"\"";
        window_price += "\n$" + childs[13].value;

        total_price += parseFloat(childs[13].value);

    }

    //loop to get all Single Slider form information
    var singles_query = document.querySelectorAll('.singles_container .new-input');
    for( i = 0; i < singles_query.length; i++){
        windows = true;
        var childs = singles_query[i].childNodes;
        var child_txt = childs[1].value + "\t\t Single Slider \t\t\t" + childs[5].value+"\" x " + childs[9].value+"\""
                        + "\t\t$" + childs[13].value + '\n';
        Singles_txt += child_txt;

        window_room += "\n"+childs[1].value;
        window_type += "\nSingle Slider";
        window_size += "\n"+childs[5].value+"\" x " + childs[9].value+"\"";
        window_price += "\n$" + childs[13].value;
        total_price += parseFloat(childs[13].value);

    }

        //loop to get all Double Slider form information
    var doubles_query = document.querySelectorAll('.doubles_container .new-input');
    for( i = 0; i < doubles_query.length; i++){
        windows = true;
        var childs = doubles_query[i].childNodes;
        var child_txt = childs[1].value + "\t\t Double Slider \t\t  " + childs[5].value+"\" x " + childs[9].value+"\""
                        + "\t\t$" + childs[13].value + '\n';
        Doubles_txt += child_txt;

        window_room += "\n"+childs[1].value;
        window_type += "\nDouble Slider";
        window_size += "\n"+childs[5].value+"\" x " + childs[9].value+"\"";
        window_price += "\n$" + childs[13].value;
        total_price += parseFloat(childs[13].value);

    }

    //loop to get all Double Slider form information
    var singleh_query = document.querySelectorAll('.singleh_container .new-input');
    for( i = 0; i < singleh_query.length; i++){
        windows = true;
        var childs = singleh_query[i].childNodes;
        var child_txt = childs[1].value + "\t\t Single Hung \t\t\t" + childs[5].value+"\" x " + childs[9].value+"\""
                        + "\t\t$" + childs[13].value + '\n';
        Singleh_txt += child_txt;

        window_room += "\n"+childs[1].value;
        window_type += "\nSingle Hung";
        window_size += "\n"+childs[5].value+"\" x " + childs[9].value+"\"";
        window_price += "\n$" + childs[13].value;
        total_price += parseFloat(childs[13].value);

    }

    //loop to get all Double Slider form information
    var doubleh_query = document.querySelectorAll('.doubleh_container .new-input');
    for( i = 0; i < doubleh_query.length; i++){
        windows = true;
        var childs = doubleh_query[i].childNodes;
        var child_txt = childs[1].value + "\t\t Double Hung \t\t  " + childs[5].value+"\" x " + childs[9].value+"\""
                        + "\t\t$" + childs[13].value + '\n';
        Doubleh_txt += child_txt;

        window_room += "\n"+childs[1].value;
        window_type += "\nDouble Hung";
        window_size += "\n"+childs[5].value+"\" x " + childs[9].value+"\"";
        window_price += "\n$" + childs[13].value;
        total_price += parseFloat(childs[13].value);

    }
    //loop to get all Door form information
    var door_query = document.querySelectorAll('.doors_container .new-input');
    for( i = 0; i < door_query.length; i++){
        var childs = door_query[i].childNodes;
        var child_txt = childs[1].value + "\t\t\t\t" + childs[5].value+"\" x " + childs[9].value+"\""
                        + "\t\t$" + childs[13].value + '\n';
        Door_txt += child_txt;

        door_location += "\n"+childs[1].value;
        door_size += "\n"+childs[5].value+"\" x " + childs[9].value+"\"";
        door_price += "\n$" + childs[13].value;
        total_price += parseFloat(childs[13].value);

    }

    console.log(case_length);
    console.log(Casement_txt);

    var door="";
    var window_txt="";
    if(door_query.length > 0){
        door="\n\nDoors";
    }

    if(windows){
        window_txt="\n\nWindows";
    }

    var GST = total_price * (0.05);
    
    var grand_total = GST + total_price;
    GST = GST.toFixed(2);
    grand_total = grand_total.toFixed(2);
    var doc = {
        info: {
            title: cus_name+ ' Window Quote',
        },
        content:
        [
            {text: "WINDOW QUOTE", style: "header"},
            {text: "customer: " + cus_name, fontSize: 16},
            {text: "email: " + cus_email, fontSize: 16},
            {text: "\n\nWindows", style: "subheader"},
            {
                table: {
                    widths: [100, 100, '*', 80],
                    body: [
                        ['Room', 'Window Type', 'Size', 'Price'],
                        [window_room, window_type, window_size, window_price]
                    ]
                }
            },

            {text: "\n\n Doors", style: "subheader"},
            {
                table: {
                    widths: [200,'*', 80],
                    body: [
                        ['Location', 'Size', 'Price'],
                        [door_location, door_size, door_price]
                    ]
                }
            },
            {text: "Price: $" + total_price, style: "price"},
            {text: "GST (5%): $" + GST, style: "price"},
            {text: "Total Price: $" + grand_total, style: "price"}
        ],
        styles:{
            header: {
                fontSize: 32,
                bold:true
            },
            subheader: {
                fontSize: 24,
                bold:true
            },
            price: {
                fontSize:16,
                alignment: 'right',
                bold:true
            }


        }
    }

    var win = window.open('hello', '_blank');

    createPdf(doc).open({}, win);

}

