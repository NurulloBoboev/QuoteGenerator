

// The following will add the "add and remove" functionality of the webform using JQuery

$(document) .ready(function(){
    //window input field
    var NewInputField1=`
    <div class="new-input">

    <select name="room">
        <option value="1"> Living Room </option>
        <option value="2"> Kitchen </option>
        <option value="3"> Office </option>
        <option value="4"> Dining Room </option>
        <option value="5"> Master Bedroom </option>
        <option value="6"> Bedroom </option>
        <option value="7"> Bonus Room </option>
    </select>

    <select name="window">
        <option value="Picture"> Picture </option>
        <option value="L.Casement"> Casement Left </option>
        <option value="R.Casement"> Casement Right </option>
        <option value="Awning"> Awning </option>
        <option value="Single Slider"> Single Slider </option>
        <option value="Double Slider"> Double Slider </option>
        <option value="Single Hung"> Single Hung </option>
        <option value="Double Hung"> Double Hung </option>

    </select>

        <label>Size</label>
        <input type="number" name="num1" value="" required>
        <label>x</label>
        <input type="number" name="num2" required>
        <label>Price $</label>
        <input type="number" name="price" required>

        <button class="remove"> Remove </button>
    </div>`;


    //screendoor input field
    var NewInputField2=`
    <div class="new-input">

        <select name="room">
            <option value="Patio"> Patio </option>
        </select>

        <select name="door">
            <option value="5"> 5' </option>
            <option value="6"> 6' </option>
            <option value="8"> 8' </option>
        </select>

        <label>Price $</label>
        <input type="number" name="price" required>

        <button class="remove"> Remove </button>
    </div>`;
    

    //door input field
    var NewInputField3=`
    <div class="new-input">

    <select name="room">
        <option value="Front Door"> Front Door </option>
        <option value="Back Door"> Back Door </option>
        <option value="Garage Door"> Garage Door </option>
    </select>

    <select name="door">
    <option value="Single"> Single Door </option>
    <option value="Door w/ Side Light"> Door w/ Side Light </option>
    <option value="Door w/ Double Side Light"> Door w/ Double Side Light </option>
    <option value="Double"> Double Door </option>
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

    $(document).on('click','.slidingdoor_container .add', function(e){
        e.preventDefault();
        $(this).parent().find('.new_window_info').append(NewInputField2);
    });

    $(document).on('click','.door_container .add', function(e){
        e.preventDefault();
        $(this).parent().find('.new_window_info').append(NewInputField3);
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
    var door_type = "";
    var door_size = "";
    var door_price = "";

    var total_price = 0;

    var window_query = document.querySelectorAll('.windows_container .new-input');

    let window_arr = Array.from( window_query);

    console.log("--------- ARRAY BEFORE SORT -------------\n" + window_arr);

    window_arr.forEach((e) => {
        var e_childs = e.childNodes;
        console.log(e_childs[1].value);
    });

    //time to sort
    window_arr.sort((a, b) => {
        var a_childs = a.childNodes;
        var b_childs = b.childNodes;
        //console.log("value in a and b are: " + a_childs[1].value + " " + b_childs[1].value);
        return  parseInt(a_childs[1].value) - parseInt(b_childs[1].value);
    });

    console.log("--------- ARRAY AFTER SORT -------------\n" + window_arr);

    //LOOP FOR ALL WINDOWS 
    window_arr.forEach((e) => {
        var e_childs = e.childNodes;

        var e_room_val = parseInt(e_childs[1].value);

        //room 
        console.log(e_childs[1].value + " " + (e_childs[1].options[e_childs[1].selectedIndex].text));
        //window type
        console.log("3rd index " + (e_childs[3].value));
        //first measurement
        console.log("7th index " + (e_childs[7].value));
        //2nd measurement
        console.log("11th index " + (e_childs[11].value));
        //price
        console.log("15th index " + (e_childs[15].value));


        window_room +="\n"+e_childs[1].options[e_childs[1].selectedIndex].text;
        window_type += "\n"+e_childs[3].value;
        window_size += "\n"+e_childs[7].value+"\" x " + e_childs[11].value+"\"";

        //These conditions check for user inputted price, if not, price is calculated
        if(e_childs[15].value.length == 0){
            var width = parseFloat(e_childs[7].value);
            var length = parseFloat(e_childs[11].value);

            var sq_ft = (width * length)/144;
            //ADD SWITCH STATEMENT FOR CHOOSING DIFFERENT CALCULATIONS

            var calc_price = sq_ft * 60;
            total_price += calc_price;

            calc_price = calc_price.toFixed(2);
            window_price += "\n$" + calc_price;
            

        } else{
            window_price += "\n$" + e_childs[15].value;
            total_price += parseFloat(e_childs[15].value);
        }

    });

    //loop to get sliding door info
    var slidingdoor_query = document.querySelectorAll('.slidingdoor_container .new-input');

    for( i = 0; i < slidingdoor_query.length; i++){
        var childs = slidingdoor_query[i].childNodes;
        // var child_txt = childs[1].value + "\t\t\t\t" + childs[5].value+"\" x " + childs[9].value+"\""
        //                 + "\t\t$" + childs[13].value + '\n';
        
        // Door_txt += child_txt;

        console.log(childs[1].value);
        console.log(childs[3].value);
        //price
        console.log(childs[7].value);


        var selector = parseInt(childs[3].value);
        console.log("the selector is:" + selector);

         door_location += "\n"+childs[1].value;
         door_type += "\n" + "Sliding";
         door_size += "\n"+childs[3].value + " \' ";

        if(childs[7].value.length ==0 ){
            switch(selector){
                case 5:
                    door_price+= "\n$" + 1680;
                    total_price += 1680;
                    break;
                case 6:
                    door_price+= "\n$" + 1780;
                    total_price += 1780;
                    break;
    
                case 8:
                    door_price+= "\n$" + 2200;
                    total_price += 2200;
                    break;
             }
        }
         else{
             door_price += "\n$" + parseFloat(childs[7].value);
             total_price += parseFloat(childs[7].value)
         }

        // total_price += parseFloat(childs[13].value);

    }


 
    //loop to get all Door form information
    var door_query = document.querySelectorAll('.door_container .new-input');

    for( i = 0; i < door_query.length; i++){
        var childs = door_query[i].childNodes;
        // var child_txt = childs[1].value + "\t\t\t\t" + childs[5].value+"\" x " + childs[9].value+"\""
        //                 + "\t\t$" + childs[13].value + '\n';
        // Door_txt += child_txt;


        door_location += "\n"+childs[1].value;
        door_type += "\n" + childs[3].value;
        door_size += "\n"+childs[7].value+"\" x " + childs[11].value+"\"";
        door_price += "\n$" + childs[15].value;
        total_price += parseFloat(childs[15].value);

    }

    var GST = total_price * (0.05);
    
    var grand_total = GST + total_price;

    GST = GST.toFixed(2);
    grand_total = grand_total.toFixed(2);
    total_price = total_price.toFixed(2);
    
    var doc = {
        info: {
            title: cus_name+ ' Window Quote',
        },
        content:
        [
            {
                image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEATgBOAAD/4QBWRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAABOAAAAAQAAAE4AAAAB/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/9sAQwEFBQUHBgcOCAgOHhQRFB4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4e/8AAEQgA/AUAAwEiAAIRAQMRAf/EAB0AAQACAwEBAQEAAAAAAAAAAAAHCAUGCQQDAgH/xABiEAABAwIDAwQIDwoLBQcFAQEBAAIDBAUGBxEIEiETMUFhFCI3UXF0gbIJFRYYMlJWcnWRobGztNIjNjhCYnOCkpSVFzM1U1RVk6Kj0dMkNEOkwTl2g6XC4eIlJ0Rj8cPw/8QAHAEBAAIDAQEBAAAAAAAAAAAAAAUGAwQHAQII/8QARREAAgEDAQMHBwkGBQUBAAAAAAECAwQRBSExQQYSUWFxgbEHEyIzkaHRFTI0NUJyssHwFBc2UpLhFiNTYtIkgqLi8UP/2gAMAwEAAhEDEQA/ALloiIAiIgCIiAIiIAiIgCIiAIi8N8vNosdC6uvV0orbSt55qqdsTB5XEBAe5FBGOdqjLWwl8FofW4jqm8NKOPchB65H6cOtocoIxztYZh3rfhw/BQYbpncxhZy8+nW943fKGgoC8d2udttFC+uu1wpKClZ7OepmbExvhc4gBQ3jnahyww8Hw26sqsRVbeAZQRfcweuR+jdOtu8qKYkxFfsSVxrcQXmvulRx0kq6h0hHUNTwHUOCxaAsXjHa5x5cpwMOWy2WGma7UbzeyZXDXmLnaN08DQetbLgfbGq4+TgxphWOZvAOqrXJuO8PJPJBP6YVT0QHSfA2eWWGLxHHbsU0lLVP4di157Gl17w39A4+9JUjgggEEEHmIXJFbjgfNDH+DNxuHMU3GkgYeFM6TlYP7N+rfkQHT1FTjA22JdqcMp8Z4Yp65o0BqrdIYpPCY3atcfAWhTxgXPzK7F25FR4lht1W/h2Lcx2M/XvAuO449TXFASei/kb2SMbJG5r2OGrXNOoI74X9QBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAERYfFGKcOYXo+y8RXy32qEjtXVVQ2Pe6mgnVx6hqgMwirzjra1wFZ+Ugw3RV+I6huoD2t7GpyffPG98TNOtQPjraizNxDykFtqqXDtI7hu0EespHXI/Ug9bd1AXsxFiCx4doTXX68UFrph/wAWrqGxNPUN4jU9QUJ452r8urIJIbDFX4kqW6gGCMwQa9b38fK1rgqNXe6XO8Vrq27XGruFU/2U1VM6V58LnEleRATxjjapzKvpkhszqHDlK7gBSxcpNp1yP149bQ1Qtfb1eL7XOrr3dK251TuearndK/43EleBEAREQBERAEREAREQBERAbVgnMbHGDJGnDOJrjb4wdeQbLvwk9cTtWHyhTrgbbBxDSFkGMMO0d0iGgNRQvMEo6y06tceobqrAiA6L4G2h8q8VFkUeIW2irf8A/j3VvY5HVvkmM+AOUqQSxTwsmglZLE8bzHscC1w74I51yUWx4Nx3jHB8wkwziS5WwA7xiimPJOP5UZ1Y7ygoDqWipTgba+xXQBkGLbFQ3qIcDUUzuxpvCRxYfAA1TvgXaQysxQGRPvbrHVu0+4XVnIjX85qY/jcPAgJfRfKjqqaspo6qjqIqiCQbzJYnh7HDvgjgV9UAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBEWu4yx1g/B8BlxNiO3WzhvCOaYcq4fkxjVzvICgNiRVpx1te4St/KQYSsldfJhwbPUHsaDwgHV58Ba3wqB8c7SOaeJxJDHemWOkfqORtUfInT84SZPicEBfLFmMMLYUpeycSX+3WpmmrRUTta5/vW+yceoAqDccbXWCbZykGF7Tcb/O3g2V/+ywHr1cC8/qDwqklZVVNZUyVVZUS1E8h3nyyvL3uPfJPEr5ICaMc7TWaWJDJFR3ODD9I7UclbYt1+nXK4l4PW0tUP3KvrrlWSVtxrKitqpDq+aoldI9x63OJJXnRAEREAREQBERAEREAREQGdwBhW6Y2xdQ4XsxpxX1xeITO8sZq1jnnUgHTg09Ckq4bMGcNLryNgpK0DpguMI89zVjtkT8IrCn5yo+rSrowgOa1wyNzaodeXwJd36fzDGzeYStbuGBcbW/Xs/B+IaTTn5a2zM0+Nq6mogOSk8M0EhjnifE8c7XtII8hX4XWmppqaqj5Opp4p2e1kYHD4itfuOX2BLiSa/BeHKonpltkLj8ZbqgOWyLpNcciMo6/Xl8C2xmv8wXw+Y4LW7jst5Q1WvIWi4UOv8xcJTp/aFyA5+orwXHY9y/l1NDf8SUpPQ+WGRo/wwflWt3LYxpnam3Y/lj7zZ7WHa+USD5kBUNFZm5bHGMI9fS7FdhqO9y7JYdfia9a5cdlHNel15CKy12n8xXaa/wBo1qAifCOMsV4SqeyMNYguNqcTq5tPO5rH++Z7F3lBU5YF2usaWzcgxVaaDEEA4Omj/wBln8OrQWHwbo8K0G4bPOcVCCZcFVMgHTBVQS6+RjyVrlwyuzIoNTV4DxKxo53C2Sub8YaQgLs4G2mMrcSiOKqus2H6t+g5K5x7jNfzrSWAdbiPApft9bR3CkjrLfV09XTSDVk0Egexw74cDoVykuFpulvJFfbaykI5+XgczT4wvZhbFOI8L1nZeHL5cLVMT2zqWodGH9TgDo4dR1QHVZFRnA+1tj208nDiWgt+Iqdum9IW9jVBHvmDc/uKd8D7UOWGIRHDcayqw7Vu4FlfF9z16pGat063bqAm9F5LTc7bd6JldarhSV9K/wBhPTTNlY7wOaSCvWgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAiPHOW+Z+Kt+J+cstnpH//AI9qsfY4H6fLmQ+V2iiuo2NTUTvnqMy55pZDvPkfaN5zj3yTPxKtgiAqDd9jqKgtNZXfwhPk7GgfLuek4G9utJ015bhzKp66t4t+9S7+IzeY5cpEAREQBERAEREAREQBERAEREAREQErbIn4RWFPzlR9WlXRhc59kT8IrCn5yo+rSrowgI+zVzMjwJcKClls7q9tXG5++2o5Ms3SBppunXn74WuUe0Jht+nZdkusP5vk5Pnc1a5tafy3YvFpfOChFV681CvSryjF7F1HYeTvJDStQ0qjXrQfPknlpvpa3Zx7i1FJnlgOfTlZ7hTfnaUnzSVmKTNfL6q0EeJadv52KSPzmhU/RYo6xXW9L9d5u1fJvpcvmzmu9fnEuxR4ywlV6djYms8hP4orY9fi11WXpqulqW71NUwzDvxvDvmVEF/WktIIJBHMQs0dalxh7yOq+TGi/V3DXbFP80X0RUcpL9fKTTsS83Gn05uSqnt+YrMUmYuOaX+KxTdHafzs5k87VZo61DjFkfV8mV0vV14vtTXxLlooGyDzBxbiPGjrTerr2ZSikkkDXQRtO8C3Q6taD0lSlmliOrwpgiuvtFDBPPTuiDWTA7p3pGtOuhB5ipCldwq0nVW5fkU/UOT11Y38bCbTnLGMPZ6Twt6Rs6KvdJtEXBunZeGKWXv8lVOZ87XLL0m0Panadl4brYu/yVQ2T5w1Yo6nbP7XuZvVeRGt0/8A8c9ko/HJNpAI0I1BWIuGF8M3HX0ww7aKvXn5eijfr8YK0Gjz6wTNpysN3pj08pTtI/uvKy9JnFl5UaD0+MLj0S0so+Xd0+VZo3lCW6a9pHVeTerUvnW8+6Lfhk+lwycysrtTPgHD7defkaJkPmALW7js15OVhLhhV1M4/jQV9Q35C8j5Fu9JmFgiq0EWKbSNf5yobH52izFJe7NV6diXegqNebkqljvmKzRqwluaI+rY3NL1lOS7U0RBbtmjB1lrDW4XxNjLDtT7e33MM16jqwkjqJUk4WsmJrOGwV+MH32mbw1rbfG2fT38RY0+EtJWyjiNQi+zVCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIDGYt+9S7+IzeY5cpF1bxb96l38Rm8xy5SIAiIgCIiAIiIAiIgCIiAIiIAiIgJW2RPwisKfnKj6tKujC5z7In4RWFPzlR9WlXRhAV42tP5bsXi0vnBQipu2tP5bsXi0vnBQiqjqP0mf64H6H5GfUlDsf4mEW/5P3DDkktfhTE1LC2kvLWxx1xAD6aUa7h3jzAk/HprwJWt1+GrhHi+qw1b2+mlXDUOhYaUb4k0PONObr73HXmWu6T5iknnPiS8NQj+0VKFRc3mpNN7nHi88MPY0+p8TY8lbVbrrccQx3KjhqmQ2GpmiEjddyQFmjh3iNTxWgqYMN5OZk0UM1VRV9vtUtRA6CWN1U7fdG7nYdxrhodB0rQ8ZYHxLhJ7fTq3PihedGVEZD4nHvbw5j1HQrNVoVI0o5g1jO0jdP1Syr31VU7iMudzcRT6E846c9RraLfME4KoarCNzxfierlobRBG+Kk5PTlKifQgBoPOAfjOvEAFaGtedOUEm+JMW97SuKlSnTeeY8N8M9GeLXHoJT2X+6Y7xCXzmKYdojuR3f38H0zFD2y/wB0x3iEvnMUw7RHcju/v4PpmKds/oE+/wADlnKP+LLbtp/iKloi3fLzA9Teauy3KtgE1kq7l2FOYpO3YdAe209iDroD/mNYKnTlUlzYnVLy8o2dJ1arwl79jeF17DSgxxY54aS1ump04DXmXoulvrbXWvorhSy0tSwNLo5G6OAcAR8YIK3XAl1tNpxFecKXtgOH7rKaSeR2m9A5j3CKUH8knj4dehbtn3V2GwG5UFNHDXXy9xwCole0HsWnjawNDe85xZr/APwLYjbRlSdTnbv7+Oz39BD1tbq09QhaKi2prKfSvR254YzLK6o4+cQUi2O+YWnobTZq6ldNWG4W99bKxkJ+4Na8tJJGvagAHU6LXFrSg4vDJuhcU68edTeVtXsbXii2mzsdcpLTr7ef6Z6kFR9s69yO1e/n+mepBVxtPUQ7F4H5u5QfWtz9+X4mF/HNa5pa4BzSNCCOBC/qLYIg5h5w2GswZmdiDDXLTtio6x4p9XnjC7t4j+o5qmvYExfJTY3vOEquoe6O50oqacPdr91hPEDwsc4n3i+vogWFOxMUWLGNPHpHX07qKpIHDlIjvMJ6y1xHgjUCZUYnfg7Miw4ma5wZQVrHzac5iJ3ZB5WFw8qA6jovzFIyWJssb2vY9oc1zTqCDzEL9IAiIgC587YeMZsQ53XOmpaqTsOzMbbogx5A3mamQ6Dp5Rzh+iFezHmIKfCuCrxiSq3THbqOSo3SfZua0lrfCToPKuWVwq6ivr6iuq5DLUVMrpZXnnc9xJJ8pJQGdy6xZXYUx1ZcRxzzvFvrI5ns3z28YPbt8rdR5V1GpJ4aqliqqeRssMzBJG9p4OaRqCPCFyVXRHZCxX6qcjrQ2WTfq7QXW2fjx+56cn/huj8oKAl1ERAEREBXbbyxa6z5Z0GG6aZ0dTe6wGTddoeQh0c7++YvlVKLW253K50tuo5Z5amqmZBCwPOrnucGtHlJCl/bUxV6os7Ku3wyb9JY4GULNDwMnF8h8O87dPvAvlsZYU9Umd9BVzR79JZInXCTUcN9ujYh4d9zXfolAXwwbZIMN4StOH6Z29FbqSKmD+l+40AuPWSCT4VlkRAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERARvtIuczKyqLHFp7Jh4g6fjKq/Lz/AM9J+sVafaU7ldX4zD5yqmqzq/r+74ncPJyk9Jl99+ET68vP/PSfrFOXn/npP1ip1wDkrhzEGDrZeau5XaOergEj2RPjDQdTzasJ+VZv1vmFP62vf9pF9hY46ZcSipJb+s3a/LjR6FWVKbeYtp+i962Fb+Xn/npP1inLz/z0n6xVkPW+YU/ra9/2kX2E9b5hT+tr3/aRfYXvyVc9HvMX+PtE/mf9LK38vP8Az0n6xQVFQDqJ5QfflWQ9b5hT+tr3/aRfYX8k2fMLlvaXi8tPfc6M/wDoCfJVz0e8f490T+Z/0sgO2YpxLbHh1vv1zptOhlS8NPhGuh8qknBWe9+oJo4MSwR3Wk10dLG0RztHf4aNd4CB4V7MU7P1xpqd8+HrvHXuaNRT1DOSeeoO1IJ8OnhUM3CjqrfWzUVdTyU9TC4skikbuuaR0ELG3dWb25Xh8Dcpx0HlHTkoKM+nZiS8GvAu3hi/2rElojulnq2VNM/hqODmO6WuHOCO8Vk1TvKXGtVgzE8VTyj3W2ocI62Eczma+yA9s3nHlHSrhRSMliZLE9r43tDmuadQQeYhWCxvFcwzxW85Fyo5OT0S5UU805bYvxT617z9IiLdKwEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAYzFv3qXfxGbzHLlIureLfvUu/iM3mOXKRAERZm84TxTZrZBdLxhu826gqHNbDVVVDLFFIXNLmhr3NAJIBI0PEAlAYZERAEREAREQBERAEREAREQErbIn4RWFPzlR9WlXRhc59kT8IrCn5yo+rSrowgK8bWn8t2LxaXzgoRU3bWn8t2LxaXzgozwRgy+YxqKmCyRQyPpmB8nKShgAJ0GmvgVTv4SndyjFZf9j9A8lLilbaBRq1pKMUnlvYvnM14DU6DiVN9RWQZOYHpaSjgikxheIRLPLI0HsaPoGnUeAHMXAk8AAtQtGArxYMzMNWrENNFGKurjkAZK14exrxvDh4PlXkzyuEtxzSvT5HEtglFPGNeDWsaG6DygnyleU1K3pym1iWcLq6TJeSo6xd0bWMlKjzXOWHslh4iutZy2uODXLnf75c6x1ZX3atqJydd98ziR4OPAdQW9ZdZnVVO71PYxkdeMPVg5GYVJL3wA8N4OPEtHe6NNRoRxjJFr069SnLnJ/37SYvNJtLuh5mcFjhjY49Di+DXUblmrY6/Cl7dhzs6eezbxrLc0yEsLJOG8Bza8NCenTXpWmqUMcudeskcHXmXV9VR1EttLucubx3B5Gxj4ytFuWGsR22mdVXGwXWjp2ab0s9HJGwanQakgDnX3cU8TbitmE+zJq6NeKVsoV5LzilKL3LnOLab79j7zfdl/umO8Ql85imHaI7kd39/B9MxQ9sv90x3iEvnMUw7RHcju/v4PpmKXs/oE+/wOe8o/wCLLbtp/iKlqectsbZXYWLm2+e+04qhGJ46pgfEHg8H6DXQg68R/kogwRJY4sUUTsSUz6i1FxbUNY4gtBBAfw49qSDp1L05h4VqMJ4hfQPk7Io5Wiaiqm8Wzwu9i4EcNeg9fVooq3qToLzsEn+X/wBL7rFpbanUVhXlKOVlYeFLbtXHLjsfVnK4n0zOsFXh/GNbT1JbJFUSGppZ2ewmieSWuB+TwgrK55xvlzRrIo2Oe98NK1rWjUuJgj0ACyWDZ4se4QOB7hK1t6t7XTWKoefZgDV1OT3iBw8H5IB3bG9FRYRxVcswr3FHNUiOCCyUbzryk4gYHSuHtWEHyjv7uudUFOnKUfmtp9m/Ps9+wiJarO1u6VGss1oQnFJfby6fNa6FLDz/AC4l0HumprXbsuaPCVfim0YexCbeymrHzkPkjhcXPMQ7Ybuu9xP/ALEV4vNJFQ3arooKyKtigmfGyoi9hKASA5vUedfuomuV+vb5pTLW3Gun46DV0kjjwAHhOmiy2YOHKbC11p7S24NrK5lMx1e1o7WCY6kxg9Og3f8A/uAw3FXz8cqOFHZ+usk9HsFpdZ06lXnTq5k1hYzxaeM83bhZfvLIbOvcjtXv5/pnqQVH2zr3I7V7+f6Z6kFWe09RDsXgcM5QfWtz9+X4mERFsEQRVtYYU9VeR18hij36u2tFyp+GpDotS/TrMZkHlXOZda5oo5oXwzMbJHI0te1w1DgeBBXLnNLDMmDsxL7hmQODaCtfHEXc7oidY3eVhafKgL8bK2KvVZkfYaqWTfqqCM26p46neh7VuvWWbjv0lKKpz6HzirkL7iDBs8mjKuFtfTNJ4b7CGSAdZa5h8DFcZAEREBXPb2xX6VZZ0GF4JN2e91e9K0Hngh0cf75i+Iqk9mt9VdrvR2qhj5SqrJ2U8LPbPe4NaPjIUv7Z2K/VJnbXUcMm/SWSJtvj0PDfGrpT4d9xb+gF9NivCnqizspK+aPfpLHA+ufqOBk9hGPDvO3h7xAR1mvhGfAuYl5wrNI6UUFRuxSOGhkicA6Nx6y1zT4VOGwDivsDHF4wjPLpFdaUVFOCf+NDrqB1ljnE+8C9vogmFOxsRWHGVPHpHWwOoalwHDlIyXMJ6y1zh4I1X3K/E0uDswrFiaIu0t9ZHLKG87otdJG+VhcPKgOpaL8U80VRBHPBI2SKRoex7TqHNI1BC/aALGYtvVLhzC90v9af9nt1JLUyDXTUMaXaDrOmnlWTUAbdOKvSTKKOwwybtTfqtsJAOh5GPSR5/WEYPU5AUbvNwqrtd6261snKVVbUPqJn+2e9xc4/GSrqbA2FPSzLe5Ypnj0nvVXuROI54IdWgjwvdJ+qFSWjpp6yrhpKaN0s88jY4mN53OcdAB4SupmXmHYMJYGsuGqfdLbdRxwOcPx3hvbu8rtT5UBnVFWI9oTKvD9/rrHdb9UQ11DO6CojFBM4Ne06Eahuh495SquZW0D3b8Z/DNR55QF0PXO5Oe6Op/dtR9hPXO5Oe6Op/dtR9hc9kQHQn1zuTnujqf3bUfYT1zuTnujqf3bUfYXPZEB0J9c7k57o6n921H2E9c7k57o6n921H2Fz2RAdCfXO5Oe6Op/dtR9hZLDO0FlbiPEFDYrRfaievrpmw08ZoJmBzzzDUt0HlXORb9s593TB3wrF86A6YIiIAiIgCirEe0LlTYL9W2S5YikbW0MzoKhsdFNI1r2nRzd5rSDoeHDpCyu0Fj6PLrK+5X1j2i4SN7FtzD+NUPB3Tp0hoBeeppXNSaWSaZ800jpJJHFz3uOpcSdSSekoDqvhLENoxVhyjxBYqttXbq1m/DKGluoBIIIPEEEEEHmIWUVPdgnMPse4V2XNyn+51W9WWvePNIB91jHhaN8D8l3fVwkAWHxpiaz4PwzWYjv9S6mttGGGeVsbpC3eeGDtWgk9s4cyzCifa+/BzxV72l+tRIDxeudyc90dT+7aj7Ceudyc90dT+7aj7C57IgOhPrncnPdHU/u2o+wnrncnPdHU/u2o+wueyIDoT653Jz3R1P7tqPsJ653Jz3R1P7tqPsLnsiA6E+udyc90dT+7aj7Ceudyc90dT+7aj7C57IgOhPrncnPdHU/u2o+wpkY4OaHDmI1C5JLrVTf7tH7wfMgNMzKzXwRl3V0dJiy5y0ctZG6SAMpZJd5rToT2gOnE9K1yy7RmU93vFFaaC/1ElXW1EdPAw2+dodI9wa0alug4kcSoP9EO++rCniM/ntUB5Rd1jCHw7RfTsQHUZERAEREAREQGhZj5wYDy+vEFpxVdpqOrqKcVEbGUksoMZc5oOrGkc7TwWIwztB5WYixBQ2K032omr66ZsNPGaCZgc88w1LdB5VXT0QTusWT4CZ9PMot2du7ng34Wh85AdMUREB/JHtjjc9x0a0EnwKG/XO5Oe6Op/dtR9hS/Xf7jP+bd8xXJdAdCfXO5Oe6Op/dtR9hPXO5Oe6Op/dtR9hc9kQHQn1zuTnujqf3bUfYT1zuTnujqf3bUfYXPZEB0J9c7k57o6n921H2E9c7k57o6n921H2Fz2RAdCfXO5Oe6Op/dtR9hbHl5nPl9j2/useGLvNV17YHTmN9HLGNxpAJ1c0D8YLmmp92De7hN8D1HnxIC+KIiAjG/Z/5S2O91tmumLOx6+hnfT1MXpdVO3JGEhw1bGQdCDxBIXi9cpkt7s/8Ayus/0lSDPfu140+HKv6Vy0tAdE/XKZLe7P8A8rrP9JPXKZLe7P8A8rrP9Jc7EQHRP1ymS3uz/wDK6z/ST1ymS3uz/wDK6z/SXOxEB0UZtJZLvcGjGg1PfttWB8sS2jC+aeXWJpmU9kxjZ6moedGQGoEcrj1Mfo4+QLmGiA63Iuf2Qu0LifAVwp7ZfaqpvWGS4Mkgmfvy0zfbQuPHh7QndPRoeKvtZrlQ3i00t1tlTHVUVXC2aCZh1a9jhqCPIgPWiIgCIiAjbaU7ldX4zD5yqmrWbSncrq/GYfOVU1WNX9f3L8zuPk5+qZfffhEuRk13LsP+KD5yttWpZNdy7D/ig+crbVYbf1UexHHtW+n1/vy8WERFmI8IiIAoS2pcL08tnpcVU8TW1UEjaepcB7ON2u6T1g8P0uoKbVH20TJGzKS7NfpvPfA1nh5Zh+YFal9BTt5p9GfYT/Ja5qW+r28qb3yUX2N4ZUtXAyNuT7nlZZZpXF0kUTqd2vejeWN/ugKn6tfs3xOjyooHO10kmnc3wcoR84KhdGb8+11fmjp3lIpxemQk96msd6kSMtNvGaOBbRdKi2XG+chV0zyyWPsSZ264dGoYQfIVuSptnD3T8Q+OOUtqF1O2gpQS2vic/wCSGg2+tXNSlcSaUY59HC4pcUyxn8MeXPui/wCSqPsJ/DHlz7ov+SqPsKo6KJ+Wa/Qvf8ToH7tdL/1Kntj/AMS3H8MeXPui/wCSqPsJ/DHlz7ov+SqPsKo6J8s1+he/4j92ul/6lT2x/wCJbj+GPLn3Rf8AJVH2F/W5xZck6DEQ8tHOP/QqjInyzX6F7/iP3a6X/qVPbH/iXSs2O8H3iRsVvxFb5ZXcGxulDHu8DXaErY1QpSHljmrfMJ1UVLWTS3Gzahr6eR286JvfjJ5tPa8x6ucbNDWE3iqsdaITVfJvOnTdSxqc5r7Mt77Gtme1LtLZIvLabhR3W2U9yoJ2z0tTGJIpG9IPzHqXqU2mmso5fKMoScZLDQRF+KiaKngknnlZFFG0ue97gGtaOcknmC9PEm3hH7WLxBiKx4fpxPerrS0LSNWiWQBzvet5z5AoTzPzxmfLLa8GERxDtX3F7dXO/NtPMPyjx7wHOoRr6yrr6uSrrqmapqJDq+WV5c5x6yeKiLnVoU3zaay/cdE0Tye3N3FVb2Xm4vh9rv4L3vpRZe859YOpHOZQU9yuLhzOZEI2HyuId/dWvVG0VGHEQYTc5vQX1+h+IRn51A9LTVFVMIaWCWeU8zI2Fzj5AthpcAY2qWB8WFrvunmL6VzNf1gFHfKN3U+b7l/9LguRnJ6zWK//AJTa8HElaDaLG8BNhIgdJZcNfkMf/VZ20Z+4TqXBlfQ3OgJ53bjZGDyg6/IoNqcvcb07S6TC12IHtKZz/N1Wv1tHV0UxhrKWemlHOyWMsd8RT5RvKfzveh/g7k7drFBf0zb8Wy6mGsWYcxGzesl4paxwGpja/SQDrYdHDyhZpUOgmlp5mTQSvilYd5j2OLXNPfBHMpgy0zvuVtlit+LC+40RIaKsDWeId93tx/e6zzLfttXjN82qsdfAqes+TqvbxdWxnz0vsvZLu4P3dWSyKLz2yvo7nQQ19vqY6mlnbvRyxu1a4L0KYTztRziUXFuMlhoIiL0+TGYt+9S7+IzeY5cpF1bxb96l38Rm8xy5SIArkbYv4M2CPHKH6nMqbq5G2L+DNgjxyh+pzICm6IiAIiIAiIgCIiAIiIAiIgJW2RPwisKfnKj6tKujC5z7In4RWFPzlR9WlXRhAV42tP5bsXi0vnBQzQ11bQyOkoquopXuGhdDIWEjvcCpm2tP5bsXi0vnBQiqlqLxdSx+th+huR0VLQ6CaysP8TNkwliGrgxxZLtdK+oqWUlZEXPnlc8tj3xvaEnhw1Waz9tMtrzQubnNPJVu7VQu9sHDj/eDh5FokMck0rIYY3SSPcGsY0alxPAADpKmu1RUmaGD4cLXWYW7GVjaYqd1QC0zsbwLXA8deADhzgje6SF80E61OVLjnK7eg+9TnHTbyle4/wAtJwnj7KbTUsdCex9uSEUWx3vA2LbPWOpa3D9wDgdA+OF0jHeBzdQVtmX2VdfUyeneMY3WWwUg5Wc1X3OSVo47u6eLQeknTn4alYoW1Wcuaokjc61Y29Dz8qqa4YabfUkt7fUfvGQfZci8H2yTWOqrayS5AdIaN4NPlEjStYv2YuM77Z5rRdb2+popt3lIjBG3e3XBw4hoPOAedffNnEk2K8RG7QUssFniHYlu1jLWbjO90b3bAkdAIHQtNX3XrNTcYN4wl24RqaTpsJW8at1TTqOUp7Um4uUs4T4NbFs4olPZf7pjvEJfOYph2iO5Hd/fwfTMUPbL/dMd4hL5zFMO0R3I7v7+D6ZilrP6BPv8Cg8o/wCLLbtp/iIAyYuWJKLGkVLhZtKa6vYYHGoZvMbHqHOceI5g3VSFmNnTWUF/da7BT2u4U9I3kpqmpgLhNKPZFgDho3Xh06+BQbS1FRSztnpZ5YJW67skby1w1Gh0I6iQpDpck8dztheKSjZHIGneNU3tQek6KOt61fzbp0Uy46xp2k/tsbvUZQSxhJ7Mvi2+OFhJcMvqN4yyzDveIa+ouF0s2G6CzWuMz1tcyke1zOB3WsJee3J5v/4DtObOJBTWua426x2e+i1vY24QVsG/JTtlY17Hj8kg6Hr8B0hrNC9UFst0OX2Gpd62W9+9X1DeBrar8Zx77WkaDrHUCs1jXFMuFc66yrMfZNBPSU0FfSu4tnhdAwOaQeGvSP8AIlbiu3Gm4Slnak31vPuWPErU9AhXu6dzRpc1OMpRhtWYxcFte9SkpNro9HO5n0wtm5ZIcQ0U1bgXD9BGJQH1dJTNEsIPAubw14a8dOjVYfP6oi9UzaNuHbdbiHPqWV1Jx7Pjk0LZCdBrzHv8SfL9r5k/fqy4OrsHQRXOw1TRPRTdksYQx3ENIcQdRzf++oWhYiN3hrvSm8zSuntetG2N8m+IQ1x1YCOGgOvMtSvUrxpOFVcdjwWHS7LS6t7C6sZrKi+dHnNtdGVnY1tTT2belFodnXuR2r38/wBM9SCo+2de5Havfz/TPUgqx2nqIdi8DjHKD61ufvy/EwiItgiAqVbf2FOwMb2fF0EekV1pTTVBA/40PMT1ljmge8Kuqoh2vsKeqjI67uij36u0Ftyg4cdI9eU/w3P+IICkWR+KvUZmvh7ETpOTp6esaypOv/AfqyT4muJ8IC6dggjUcQuSK6V7N+KvVhkvh26ySb9VFTCkqiTqeVh7Qk9bgA79JASGsRja/U2F8IXfEVXpyNto5KlwJ03t1pIb4SQAPCsuq77eWK/SjK2jw1BJu1F9qwHgHngh0e7++YvlQFIbpW1NyudVcayQy1NVM+eZ553Pc4ucfKSVdzYKwp6VZYV2Jpo92e+VhEbiOeCHVjf75l+RUhoKWorq6noaSN0tRUStiiY3nc9x0AHhJC6nYDw/T4VwXZ8N02hjt1HHT7wHs3NaA53hJ1PlQGj7VWFPVZkffaaKPlKu3xi403DUh0OrnadZj5RvlXONdbJWMljdFIxr2PBa5rhqCDzgrl3mzhd+Dcyb/hlzXBlDWPZDrzmE9tGfKwtPlQF7tknFfqqyOsz5Zd+rtYNtqOOpBi0DP8Mxnw6qWFS70P7FfYWML1g+ok0iuVMKunBPDlYjo4DrLHE/+GrooAqFbceKvT3OM2aGTepbDSsptAdRyz/ukh8PFjT7xXov9zpbLYq+81z9yloKaSpmd3mMaXO+QLldiW71V/xFcr5XO3qq4VUlTKdfxnuLj5OKAk7ZAwp6qM8bS+WPfpLQHXKfUcNY9OT/AMRzD5CuiCrNsAYU7AwPeMXTx6S3WqFPTkj/AIMPOR1F7nA+8CsygC5lbQPdvxn8M1HnldNVzK2ge7fjP4ZqPPKAk7YOtNru2ZF8gutto6+JloL2sqYGyta7loxqA4HQ6Eq5PqKwb7krB+7ofsqoXofHdPv3wKfp4ldtAYH1FYN9yVg/d0P2U9RWDfclYP3dD9lZ5EBgfUVg33JWD93Q/ZT1FYN9yVg/d0P2VnkQGB9RWDfclYP3dD9lfWjwnhajqo6qkw1ZqeoidvRyxUMTXsPfBDdQVmUQBERAERR3tFY/Zl3lbcbzFI1tznHYltaeczvB0dp3mgF/6OnSgKmbaWYfqtzMdh6gn37Vh7epxuntZKkn7q7yEBn6J76guKGaVkr44nvbC3fkc1pIY3UN1PeGrmjXvkd9fyR75JHSSPc97yXOc46kk85JV0dk3J23yZMXauxLSb02L6YxAOHbRUf4hbrzFzvugPVGehAU8w1ea/D2IKC+2uYw1tBUMqIH95zTqNe+DzEdI1XT7LnFVBjbBFqxRbSOQr4BIWa6mJ/M9h62uBb5FzKxzhu4YRxfdMNXRu7V2+odC86aB4HsXjqc3Rw6iFYrYMzD7Avlbl5cp9Ke4a1Vt3jwbO0fdGD3zRveFh6SgLlr+PY17S17WuaecEahf1EB8exKX+jQ/wBmE7Epf6ND/ZhfZEB8exKX+jQ/2YUDbdcEEeR7HRwxsd6bU/FrQD7GRT+oE27+4az4Xp/NkQFDF1CympaZ2VeEiaeEk2SiJJYOP3Bi5erqRlL3KsJfAdF9AxAbB2JS/wBGh/swnYlL/Rof7ML7IgPj2JS/0aH+zC+yIgKa+iHffVhTxGfz2qA8ou6xhD4dovp2KfPRDvvqwp4jP57VAeUXdYwh8O0X07EB1GREQBERAEREBSD0QTusWT4CZ9PMot2du7ng34Wh85Sl6IJ3WLJ8BM+nmUW7O3dzwb8LQ+cgOmKIiA+Nd/uM/wCbd8xXJddaK7/cZ/zbvmK5LoC4OwXYLFd8EYilu1lttwkjuTGsdU0rJS0cmOALgdArH+orBvuSsH7uh+yoB9D1+8PEvwmz6IKziAwPqKwb7krB+7ofsp6isG+5Kwfu6H7KzyIDA+orBvuSsH7uh+ynqKwb7krB+7ofsrPIgMD6isG+5Kwfu6H7K9Vrw5h61VJqrXYrXQzlpbytNSRxv3TzjVoB04BZREAREQHMXPfu140+HKv6VylfYMtNqu+Pr/DdbZRV8bLWHMZUwNla08qwagOB0KijPfu140+HKv6VymT0PbuiYi+CR9MxAW49RWDfclYP3dD9lPUVg33JWD93Q/ZWeRAYH1FYN9yVg/d0P2U9RWDfclYP3dD9lZ5EBr02BMETRmObB2HpGHna62QkH+6oWz72a8KXnDVbecEWyOzX2lidMympuEFWGgkx7nMxxA4Fug15x0ixS+NfV09BQVFdVythpqeJ0s0jjoGMaCST1AAoDkurvbAmKKi6Zc3bDdTKZDZKxroNT7CGYOcG/rskP6SpPXysnrp5o2bjJJXOa3vAkkBWv9Drp5uVxrVaEQ7tFGD0F33Y/IPnQFuUREAREQEbbSncrq/GYfOVU1azaU7ldX4zD5yqmqxq/r+5fmdx8nP1TL778IlyMmu5dh/xQfOVtqqhhzOTFlhsdJZ6KG1upqSPk4zJA4u06yHhZD+HvG39Hs/7O/7akKWqUIU4xediRUr/AJBatXuqtWHNxKTa28G2+gs+irB/D3jb+j2f9nf9tP4e8bf0ez/s7/trJ8r2/X7DU/d5rHRH+r+xZ9FWD+HvG39Hs/7O/wC2vzJnzjdzdGx2lh77aZ3/AFenyvb9fsC8nmsf7f6v7FoVXLaSx3R3iaDC9oqGz09JLytXMw6tdKAQGA9IbqdejUjvLRcS5k40xBA+muF8mFM/g6GBrYmEd47oBcOokrUVH3uqeeg6dNYTLfyY5CvTrhXV3NSlHcluT6W3jPsP1FG+WRsUbXPe8hrWgakk8wCuxgKzep/BlqszgBJTUzWy6c3KHi/+8SoS2d8uJ6qvgxfeqcx0kBD6CJ40Mr+iTT2o5x3zx5hxsQtrSLZ04upLju7Cv+ULW6d1WhZUXlQeZP8A3bsdyzntxwCptnD3T8Q+OOVyVTbOHun4h8ccvdZ9VHtHkz+n1vufmjadmCioq/HlfDXUlPVRttb3Bk0YeAeViGuh6eJ+NWM9TeHv6htf7JH/AJKveyl3Qrh8FSfSxKzCyaVGLt1lcWaXL6vVhrElGTS5seJi/U3h7+obX+yR/wCSepvD39Q2v9kj/wAllEUlzI9BS/2qv/O/azF+pvD39Q2v9kj/AMl+X4Zw29pa/D9pc084NHGR8yyyLzzceg9/aq6+2/ayKsysm8P3e1VFVh6ijtl1jYXxMg7WKYj8Qt5m68wI05+OqrAQQSCCCOBBV8pZGRROlke1jGNLnOcdAAOclUXvM8dVeK2phGkUtQ97B+SXEhQGr0KdNxlFYbOu+TrVLu7p1qNeTlGGMN7Ws52Z7tnQWB2Ur3LU4fulimeXChmbNDr0Nk11A6g5pP6SmlV62SYpDd7/ADgHk2QQsJ6y5xHmlWFUppknK2jn9bSictqMKWt1lDjh97im/bv7wqz5/wCY8t8uU2GrPUFtppX7tRIx3+8yA8ePSwHm75495S/nliZ+Gcvquemk3K2sIpaYjnaXA7zh4GhxB7+iqGtHVrpx/wAmPHeWfyeaBCs3qNZZ5rxFdfF925deeKP3BFJPMyGGN8ksjg1jGDVzieAAA5yp5y0yLjdDFcsZufvOAc23xP00/OOHHXqb8fQvZs2YChprczGN0hD6qo1FAx4/io+YyeF3HTq8Km1eafpsXFVKqzncj75X8tK0K0rKwlzVHZKS354pdGOL353dfhs1ntVmpRTWm3UtDCPxYIg3Xw6c56yvciKcSSWEcunOVSTlN5b4sLy3S22+6UrqW5UNNWQO5454g9vxFepEaTWGeQnKElKLw0QlmNkXQ1MMtfg9/YtSAXGhlfrFJ1MceLT1HUeBV+r6SqoK2airYJKepheWSRSN0c1w6CFe5RRtCYBhv1hlxFboQLrQR70m6OM8I5we+5o4jyjvaQ1/psXF1KSw1wOl8kuWteFaNpfy50ZbFJ70+GXxXW9q7CJsk8xKjB95bQ10r32OreBMwnXkHHhyrf8AqOkdYCtdG9kkbZI3texwDmuadQQeYgqhitHs1YmfesEPtVTJv1NpeIQTzmFwJj+LRzfA0LFpF08+Zl3G75QtAgoLUqKw8pT687n7dj6colJERT5yUxmLfvUu/iM3mOXKRdW8W/epd/EZvMcuUiAK5G2L+DNgjxyh+pzKm6uRti/gzYI8cofqcyApuiIgCIiAIiIAiIgCIiAIiICVtkT8IrCn5yo+rSrowuc+yJ+EVhT85UfVpV0YQFeNrT+W7F4tL5wUIqbtrT+W7F4tL5wUIqo6j9Jn+uB+h+Rn1JQ7H+Jm+5SXvC+GRcsQ3aN9VeaRjRaqUsO457tQX69BHDn5gTpqdNNSul5uVxv098qKl4r5pjM6WM7ha7XgW6c2nQsei1nVk4KHBfrJNUtPpQuKly8uU8LbwS4LoWdr6WyU8IZnZoVcNRSW2dl1NJTOqJXTwsc9kTdNXF3AnTUc+pWnYuxtifFRAvd1lnhadWwNAZE09/dboCes6lZnJu82yzV2IZLnVspm1NiqKeEuB7eRxZo0adJ0K0RZqlao6UczbznZkjbLTrSnfVXC3jHm83ElHDeU87fh3kgYKxXZpcE3HBmLWv8AS/cfUW6ojj3pKeoAJAHU4/OQeB1EfoiwzqOaSfAlLayp21SpOnn03lrhni0uGePS9vSSnsv90x3iEvnMUw7RHcju/v4PpmKHtl/umO8Ql85imHaI7kd39/B9MxTln9An3+By3lH/ABZbdtP8RUtTHkPim3WuahtsJqKm+XS4Np5nTEmOnpgAe0487jw8nUNYcX0pp56aoZUU00kM0Z3mSRuLXNPfBHEFQtvWdGamjperabDUrWVvN7/Hhnqzh444M/HY6/EeYFTZrbHv1FRXStBPMwb51ce8AOJW47SOG6+24wbenjlKGuhijjlaODXxxhpae8SG7w74PUVp+FsXVmHrZeoKKBnZ10ibD2cXHlYWakvDffajj1ArYsb5kem5vtupaU1FpuUdMYmVQ0fTTRsY10jQCdCd0jn7x74OeMqPmZJv0m8+P67yKrUtSjqdKdOK83CLj1tPmZeeHSlx5r6UbHc8TUFDlPY8PXQVEcdVZn1NFUUxIkiqmSPDQePsXcx/9+EMSPfJI6SR7nvcSXOcdST3yV+pJppWRsklke2Nu7GHOJDRrroO8NSV81grV3VxngsEppmlwsFPmvLnJyfa234Yz2ZLabOvcjtXv5/pnqQVH2zr3I7V7+f6Z6kFW209RDsXgfnvlB9a3P35fiYREWwRAXyq6eGrpJqSpjbLBNG6ORjuZzSNCD4QV9UQHK/MTDk2EsdXrDU+8XW6skga53O9gcdx3lbunyqy/oe+KtH4jwVPJzhlypWk+COX/wDy+Va3t84U9LMxbbiqCPSG9UnJzOA554dGknwsdGP0Sou2dcVeo7OXDt4kk5OldVClqiTw5KX7m4nqbvB36KA6XLn/ALauK/VFnXVW+GXfpLHAyhZoeBk4vlPh3nbp94r14vvdLhvCl1xBWn/Z7dSSVLxrpvBjSdB1nTQeFcsLxcKq63asulbJylVWTvqJn+2e9xc4/GSgJY2OsKeqbPG2TSx79JZmOuU2o4bzNBH5eUcw/oldDFWrYCwp6X4Bu2LJ49JrvViCBxH/AAYdRqPC9zwfeBWVQBUu9EAwp2FjCy4vgj0iuVMaSoIHDlYjq0nrLHAf+GroqJtrbCnqqyOvTYo9+rtYFyp+HEGLXf8A8MyeXRAURyoxO/BuZFhxMxzgyhrGPm3ed0JO7I3ysLh5V1FikZLEyWJ7XxvaHNc06gg8xC5Jro1so4r9VmR9jnlk36u3MNtqeOpDotA3XrMZjPlQGA23MVekGS81qhk3aq+1LKNoB4iIdvIfBo0NPv1QeCKSeZkMLHSSSODWNaNS4k6ABWC278VenGa1Nh2GTep7FSBjxrwE8uj3/wBzkh4QVp+yfhT1V542SGWPfpLa43Ko4agNi0LNeoyGMeVAX1ytwzHg7LuxYZjDQ6gomRylvM6XTWR3leXHyrZERAFzK2ge7fjP4ZqPPK6armVtA92/GfwzUeeUB/cmMz71lbf6y82Oht9ZPV0vYz21jXlobvtdqN1zTrq0dKlX14eYHudwv/ZT/wCqoYy3wBijMK7VFrwrQx1lVTQdkSsfOyIBm8G66vIB4uHBb762LOP3OU37yp/toDavXh5ge53C/wDZT/6qevDzA9zuF/7Kf/VWq+tizj9zlN+8qf7aetizj9zlN+8qf7aA2r14eYHudwv/AGU/+qrJbNeYd2zMy8kxHeqOhpKllfJTBlI1wZutawg9s5x17Y9KqH62LOP3OU37yp/tq12yfgnEWAsr5bHiejZSVzrlLOI2TMkG45rADq0kc7SgJbREQBERAFQLbMzD9WOZ77LQz79pw/vUsW6e1kn1+7P+MBg95r0q2e0lmC3LvKy4XSnlDLrVjsO2jXjyzwe3/QaC7wgDpXNx7nPcXOcXOJ1JJ1JKA3nIfAc2YmZlsw6Gv7C3uXuEjf8Ah07CC/j0E8Gg99wXTClghpaWKlpomQwQsEccbBo1jQNAAOgAKBtibLz1K5cHE9wg3LpiENmbvDto6UfxTf0tS/rDm95T6gKn7e2XnK0tDmNboO3h3aK6bo52EnkpD4CSwn8pg6FU6w3Susl6orxbJ3QVtFOyeCQfivaQQfjC6nYrsdvxLhq44fusXK0Vwp3wTN6dHDTUd4jnB6CAuYGPsM3DB2Mrphi5t0qrfUOic7TQSN52vHU5pDh1FAdLcr8X0OOsBWrFNButZWwB0sYOvJSjhIw+BwI6xoelbKqWbB+YfpVierwBcZ9KO7a1FBvHgypa3tmj37B8bAOlXTQBERAFAm3f3DWfC9P5sintQJt39w1nwvT+bIgKGLqRlL3KsJfAdF9Axct11Iyl7lWEvgOi+gYgNmREQBERAU19EO++rCniM/ntVaLDc6my32gvNFudlUFTHUw77dW78bg5uo6RqArL+iHffVhTxGfz2qs9htlVer5QWehDDVV9THTQB7tGl73BrdT0DUhATX66/Nf+csn7D/8AJPXX5r/zlk/Yf/kvx61PNn+jWf8Abx/knrU82f6NZ/28f5ID9+uvzX/nLJ+w/wDyT11+a/8AOWT9h/8Akvx61PNn+jWf9vH+SetTzZ/o1n/bx/kgP366/Nf+csn7D/8AJPXX5r/zlk/Yf/kvx61PNn+jWf8Abx/knrU82f6NZ/28f5ICOc1MxMRZk32mvOJXUhqqemFNH2PDybdwOc7iNTx1eV79nbu54N+FofOWPzSy8xHlxfKez4mjpWVVRTCpjEE3KN3C5zeJ059WFZDZ27ueDfhaHzkB0xREQHxrv9xn/Nu+YrkuutFd/uM/5t3zFcl0BKWS+eGJcrLPX2yx2y0VkVbUCeR1YyQua4NDdBuvbw4LffXh5ge53C/9lP8A6qirLbKXHOYduqq/ClrirKeklEMzn1UcW64jXTR7hrwW1+tizj9zlN+8qf7aA2r14eYHudwv/ZT/AOqnrw8wPc7hf+yn/wBVar62LOP3OU37yp/tp62LOP3OU37yp/toDavXh5ge53C/9lP/AKqtzlTiKrxZlxYcS18MENVcaNk8scIIY1x6G6knTwkqjnrYs4/c5TfvKn+2rt5MWS44byqw5YbvC2CvoaBkNRG14eGvHONRqD5EBtyIiAIiIDmLnv3a8afDlX9K5bNsxZpWjKvFF0u14t9dXRVlEKdjKXc3mu32u1O8Rw4LWc9+7XjT4cq/pXLUqKirK57mUVJUVL2jVzYYy8gd86IC6XrxcEe5fEX+D9tPXi4I9y+Iv8H7apx6n79/Uly/ZX/5J6n79/Uly/ZX/wCSAuP68XBHuXxF/g/bT14uCPcviL/B+2qcep+/f1Jcv2V/+S+Fba7nRRCWst1ZTRl26HywOYCe9qRz8CgLly7Y2DBGTFhW/uf0BzoWg+XePzKHc7tpPEuYNomw/bKCOwWWfhURsmMs9Q32rn6ABp6WgceYkhQWtuwRlnjzGnJvw3he41tPISG1XJcnT8DofurtGcCD0oDUmNc94Yxpc5x0AA1JK6LbKuXs+X2VNNS3KIxXe5SGurmEcYnOADYz1taBqPbFy0zZ52aqLBdfT4mxlPT3W+QkPpaaIE09I7odqR27x0HQBp5tToRYpAEREAREQEbbSncrq/GYfOVU1azaU7ldX4zD5yqmqxq/r+5fmdx8nP1TL778Im5WbK/HN4tdPc7dY+XpKhm/FJ2XC3eb39HPBHlC9n8DmY3ud/52n+2rFZNdy7D/AIoPnK21btLSKM4KTb2rq+BWr7yh6lb3NSjGEMRk0tkuDa/mKkfwOZje53/naf7afwOZje53/naf7atuiyfI1Dpfu+BqfvK1T/Tp+yX/ACKkfwOZje53/naf7aDJzMb3O/8AO0/21bdE+RqHS/d8B+8rVP8ATp+yX/IqzbMjMdVUgFTDQUDel01SHaeRgcpOwJkdYLLNHW3uc3qqYQWxuZuQNPveJd5Tp1KWEWejplvSecZ7SL1Dlvq97B03NQT/AJVj37X7z+NAa0NaAABoAOhf1EW+VIKm2cPdPxD445XJVNs4e6fiHxxyh9Z9VHtOkeTP6fW+5+aPXkzjKhwRieputfS1FTFNROpw2Dd3gS9jteJHDtD8alr1wmG/6lu3+H9pVzpqeoqXllPBLM8DUtjYXEDv8F6PSq6f1bWf2Dv8lE0L2vRhzYbuw6BqvJjStRuHXul6WEvnY3FhPXCYb/qW7f4f2k9cJhv+pbt/h/aVe/Sq6f1bWf2Dv8k9Krp/VtZ/YO/yWb5Tuv0iN/wNoPQ/6mWE9cJhv+pbt/h/aX8ftCYdDTuWO6k9AJjA85V4qKGtp4+UqKOoiZrpvPiLRr4SF5l49UuVx9xkjyD0SW1Qb/7mSnmPnPeMT26W026jbaaCYbs2km/LK3paXaAAHpAHHm10UWjjwCzmG8IYmxEWmzWWsq43Hd5YR7sQPW86NHxqdsp8l4LFVQ3nE0kNZXxkOhpmcYoXdDiT7Jw+IdfAj4hRub2fOl7eBnuNS0bkxbOlSwn/ACp5k31733v+xsGQWEpsL4Ia+uiMdwuLxUTMI0MbdNGMPWBxPeLiFISIrRRpRpQUI7kcK1C9qX9zO5q/Ok8/27txX3a0r3OuNitYcQ2OGWocO+XENB/un41C1po33C60lBGdH1M7IWnrc4AfOpX2rmuGOLY8+xNtaB4RLJr84UdZevZHj7D0kmm426Uxdr3uVaqve+ldyT6Ud25L/wDT8n6Uob1GT78tl07fSwUNBT0VMwRwU8TYo2j8VrRoB8QX2RFbEsH5+lJybb3hERDwIiIAjgHNLXAEEaEHpREBSbH1qZZMa3i1RjdipquRsQ7zNSW/3SFv2yzXup8wKmiLjydXQvG733Nc1wPxb3xrW883sfmxfnM00EzB5RG0H5QVktm1rjmrRlvM2nmLvBuEfPoqlRXMvEo/zY95+g9Sk7rk1KdXe6Sb7ean4lrURFbT8+GMxb96l38Rm8xy5SLq3i371Lv4jN5jlykQBXI2xfwZsEeOUP1OZU3VyNsX8GbBHjlD9TmQFN0REAREQBERAEREAREQBERAStsifhFYU/OVH1aVdGFzn2RPwisKfnKj6tKujCArxtafy3YvFpfOChFXbxFhTD2IZoZr1aqeukhaWxmUE7oJ1I514Y8u8Dx+xwtaj76AO+dQl1pdStWlNNYZ0/QuXVppun07WdOTlHO7GNrb6espkiurHgjBsfscKWPwmgiPztXpjwthmP8Ai8O2hnvaKMf9FhWiz4yRJS8pttwoS9qKQorzR2Wzx/xdqoGe9p2D/ovTHSUsf8XTQs97GAvpaI+M/d/cwy8p8OFs/wCr/wBSiccUkn8XG9/vRqvRHbLlJ/F2+rf72Fx/6K9XMi+loi4z939zDLyny4W3/n/6ladmm1XSkzEdPVW2sgh7BlbyksDmt13m8NSNFL2e9DW3LK+6Uduo6isqZHQ7kMEZe92kzCdAOJ4DVbwikaNmqVB0c78+8p+o8pJ3uqU9R82k4c3ZnPzXneUvjwBjaT2OFbwPfUj2/OF6Y8tMeSexwvcB75gb85Vx0WktFpcZMskvKZfcKMff8SoEeU+YL/Y4anHvpom/O5emPJvMV/PYAwflVkH21bZF9LRqHS/d8DBLylam91OHsl/yKox5J5gO9lbqVnvquP8A6Er0x5FY6d7JltZ76q/yBVpV8pqmnh/jp4o/fvA+dfXyRbri/aYn5RNXlsjGH9L+JrOUuHq/C+A6GyXJ0LqqB0peYXFze2kc4aEgdBC2tfiCaGoiEsEscsZ10cxwcDp1hftSVOChBRjuRSru4qXNedap86Tbfa3lhERfZrhERAQztlYU9UuSFxqoY9+rssjbjFoOO63Vsvk3HOd+iFz3XWe5UdPcbdU2+sjEtNVRPhmYeZzHAhw8oJXLDG9gqML4xu+HKvUzW2skpi4jTeDXEB3gI0PlQFnc+M1fTrZNws2Op3rjiTcp6zjxPYx+7nyyNj8jlU2nhlqJ44II3SSyODGMaNS5xOgAX1mrquagp6GWokfTUznuhiJ7WMv03tO9ruj4lJ+yXhX1VZ42WOWPfpbW43Ko4cAItCz45DGPKgL65ZYaiwfl9Y8MxBv/ANPoo4pC3mdJprI7yvLj5VsSIgC/FRDFUU8lPPG2SKVhY9jhqHNI0IPkX7RAcs8zMNS4QzAvmGZQ7/6fWyRRl3O6PXWN3lYWnyqd9hDHFNYrrifD90qRFQy0JubHOPBjoB9006yw6+CNfjb8wp6X49tOLYI9IbvSmCdwH/Gh4anwscwD3hVcKKsqqKZ0tJPJBI+KSFzmHQlj2Fj2+AtcQeooDIY0vtTifF12xFV68tcayWpcCdd3fcSG+AAgeRW19D8wp2Lhe+4xnj0kr6htFTEjjycY3nkdRc4DwxqmjGue4MY0ucToABqSV1Bycws3BmWGH8NbgbLR0bOyNOmZ3byn9dzkBtiIiALmVtA92/GfwzUeeV01XMraB7t+M/hmo88oCWvQ+O6ffvgU/TxK7apJ6Hx3T798Cn6eJXbQBERAEREAREQBEUYbTeYQy9yrrq+lmDLvX/7HbgD2wkcDrIPeN1dr3w0dKAqZti5h+rTNGW2UM/KWiwb1JBuntZJtfu0n6wDQekMB6VDNDLFBWwTT07amKORrnwucQJGg6lpI4gEcOC+JJJJJJJ4klTfhLZezJxHhm336mmsdJBXwNniiq6mRkoY7i0uAjIGo0PPzFAbPDthYuhhZDDhHD0ccbQ1jGmUBoHAADe4Bfr142MvcrYP1pvtLFetEzP8A6xwv+2Tf6SetEzP/AKxwv+2Tf6SAyvrxsZe5WwfrTfaUQ505kVOZ2I6e/XCyW+21sdOKeR1IXaTNBJaXbxPEaka97TvBST60TM/+scL/ALZN/pJ60TM/+scL/tk3+kgIGtFwrLTdaS6W+d0FZRzMnglbzse0hzSPAQF05ykxnR4+y9tWKKTda6qhAqImn+JmbwkZ5HA6d8aHpXNnH2FLvgnFtdhm+xMZXUTw15jJLHggFrmkgatIII4BTrsK5h+keMqnA1xn3aC9nlKTePBlU0c36bRp4WtHSgLuIiIAoE27+4az4Xp/NkU9qBNu/uGs+F6fzZEBQxdSMpe5VhL4DovoGLluupGUvcqwl8B0X0DEBsyIiAIiICmvoh331YU8Rn89qgPKLusYQ+HaL6dinz0Q776sKeIz+e1QHlF3WMIfDtF9OxAdRkREAREQBERAUg9EE7rFk+AmfTzKLdnbu54N+FofOUpeiCd1iyfATPp5lFuzt3c8G/C0PnIDpiiIgPjXf7jP+bd8xXJddaK7/cZ/zbvmK5LoC6Xoev3h4l+E2fRBWcVY/Q9fvDxL8Js+iCs4gCIiAIiIAiIgCIiA5i5792vGnw5V/SuUyeh7d0TEXwSPpmKG89+7XjT4cq/pXKZPQ9u6JiL4JH0zEBdZERAFruZOD7XjrBdxwxd2f7PWR6MkA1dDIOLJG9bToeviOYlbEiA5VY4wzdMH4suOG7zDyVbQTGN+nsXjna9vfa4aOB7xCnnYjzT9T2JXYCvNTu2u7y71C97uEFUeG71CTQD3wb3yVKe2plV6qcKjG1lpt682aI9lMY3tqilGpPhczi4dRdz8FRyJ74pGyRPcx7CHNc06FpHMQUB1sRRPsvZoMzJy9jfWzNN/te7T3JnS86dpNp3ngHX8oOHNopYQBERAEREBG20p3K6vxmHzlVNWs2lO5XV+Mw+cqpqsav6/uX5ncfJz9Uy++/CJcjJruXYf8UHzlbatSya7l2H/ABQfOVtqsNv6qPYjj2rfT6/35eLCIizEeEREAREQBERAFTbOHun4h8ccrkqm2cPdPxD445Q+s+qj2nSPJn9Prfc/NG47KXdCuHwVJ9LErMKs+yl3Qrh8FSfSxKzCzaT9HXayN8oH1zL7sQiIpIpJjcUWShxFYKuzXGPfp6mMtJ6WnnDh1g6EeBUyxdYa7DWIquy3Buk1M/QOA4SN52vHURoVd9RZtDYG9UeHfTu3w710trCSGjjNDxLm9ZHFw8o6VF6naeep8+O9eBeuQ3KD5Ouv2as/8uo/ZLg+/c+58CNtnLHHpFfzh64TbtuuTwIi48Ip+YHwO4NPXu9as4qFgkHUHQhWyyJxuMW4VEFZLvXa3hsVTqeMjfxZPLpoesHvha+kXeV5mXd8CZ8oXJ/mS+UqK2PZPt4S79z7ukkJERThywgraztT3UdkvTGndjfJTSnT2wDm+a9QHTzSU9RHPC4tkjcHscOgg6gq6OYmHI8VYOr7I8tbJNHvQPP4kreLT4NRoeolUwrqWooa2ajq4Xw1EDzHLG4aFrgdCCqzq1Fwrc9bmdw8nupQudNdrJ+lTb2dTeU/blF3MJ3mnxBhugvVKQY6uBsmgOu678ZvhB1HkWTVY8gcx48M1brBepi201Um9FM48KaQ9J/IPT3jx76s3G9kkbZI3NexwBa5p1BB6Qpuzuo3FNS48Tl3KPQ6uj3kqTXoPbF9K+K3P+5/URFtkAEREAXwuFXT0FBUV1XIIqenjdLK88zWtGpPxBfdV72hcyoLhHJhKwVAkpw4dn1MZ1bIQeEbT0gHiT0kad/XXurmNvTcn3EzoWjVtXu40Ka2fafQun4dLIexJc5LziC4XaUEPrKmSYj2u84nTya6KV9lC1vmxRdbw5v3OlpBCDp+PI4H5mH41DLWuc4Na0ucToABqSVb/JbCbsJYGpqSpZu19SeyasdLXuA0Z+iAB4dVX9MpOrcc98Np17lxf09P0h28NjniKXUt/u2d6N1REVoOEGMxb96l38Rm8xy5SLq3i371Lv4jN5jlykQBXI2xfwZsEeOUP1OZU3VyNsX8GbBHjlD9TmQFN0REAREQBERAEREAREQBERAStsifhFYU/OVH1aVdGFzn2RPwisKfnKj6tKujCAwWJ8X4cwzJDHfbpFRPmaXRtc1zi4DgT2oK16bOPLuMHS/mQjobRzfY0UbbWn8t2LxaXzgoRUHd6nVo1ZU4pbP10nVOT3Iaw1HT6d1WnPMs7E1jY2uMX0Fqps8MBR+xqq6X3lK7/rovDPn9gxgPJ0V6lPRuwRgfLIqxotN6vcPo9hYIeTvSI7+c/wDu+CRY6baFw+P4mxXR/v3Rt+YleKbaKpR/E4Vmf7+uDfmYVC+HsLYhxAyR9ls9ZXRxnR74oyWg97Xm16lja+jq6Csko66mmpqmI7skUrC1zT1g8V5LUrvGc4XYZaXIvk+6jpqPOkt657yu1Jk3TbRVUf4nCsLPf1xd8zAvDNtC4gOvI2K1s72+6R3zEKGEWJ6jcv7fgb0ORmiQ3UF7ZPxZY/JzNXEOMsZOtNypLZBTClfKOx43h28C0Di554cT0LeM4b7ccOZe3G8WqVsVZA6IRvcwOA3pGtPA8OYlQXsv90x3iEvnMUw7RHcju/v4PpmKXtq1SdnOcnt2+BzvW9MtLblLb21KmlBuGVweZbfaQTNnHmJJqPT8MB6G0cI/9Gq8c2aOPpfZYmrB7wMb8wC01FBO5rPfN+1nWIaHpsPm28F/2x+Bsk+Pcazah+KryNfa1j2/MV4ZsTYjm/jsQXaT39ZIfnK+OHLVUXu/UNopR92q52xNOnNqdCT1AcfItwzrwrasP3ejq8PEPs1bE5kTg4uAlicY5RqefiAfCTpwXqVWdN1M7F1/r9MxSlp9vdQtPNpSmm1iKxs/N7cdj6DSJq+um15asqJNfbyuPzleZEWu3kl4xUdiRbTZ17kdq9/P9M9SCo+2de5Havfz/TPUgq52nqIdi8D808oPrW5+/L8TCIi2CICIiAKjO3lhT0ozSo8SwR7tPfaQGRwHPPDox39wxfKrzKENtbCnqhyUqrjDHvVdjnZXM0HEx+wkHg3Xbx94gKAK53ofmFOxMKXzGE8eklwqG0dMSOPJRDVxHUXO0/8ADVMmNc94Yxpc5x0AA1JK6hZP4XbgzLGwYaDA2Wio2CfTmMzu3lPle5yA2tERAEREBD+2FhT1T5HXWSGPfq7O5tyh0HHSPUSeTk3PPkC54rrTW00FbRz0dVG2WCeN0UrHczmuBBB8IK5Z5g4dnwnji9YaqN4vt1ZJAHH8docd13lbofKgNv2X8Keq7O2wUMse/SUk3Z9VqNRuQ9sAeov3G/pLpEqp+h8YU5G04hxpPH29RI23UriOO4zR8mnUSYx4WFWsQBERAFzK2ge7fjP4ZqPPK6armVtA92/GfwzUeeUBtOyhmRh3LTGl0u2JBWGmqrcaaPsaISO3+UY7iCRw0aVZL12WVXtb/wDsLftqhaIC+nrssqva3/8AYW/bT12WVXtb/wDsLftqhaIC+nrssqva3/8AYW/bT12WVXtb/wDsLftqhaIC+nrssqva3/8AYW/bT12WVXtb/wDsLftqhaIDqlgLFNsxphKhxPZuX7ArmudDyzNx+jXuYdRqdOLT0qie17mH6uM056Kin5Sz2Leo6XdOrZJNfusg8Lhug9IY0qYLZmF/B9sRWCppJuTvFyiqKK36HtmvdPLvSD3jdTr7bd76pygJH2cMv3ZiZpW+0zxOda6U9l3J2nDkWEdp+mS1vlJ6F0mY1rGNYxoa1o0a0DQAd5QlsbZeeozK6O7V0G5d7/u1c28O2jh0+4s+Ilx636dCm5AEREAREQFYdvHLz0yw5R5g26DWqtmlNcN0cXU7ndo8+8edPA/qVNrdWVVuuFPX0U74KqmlbNDKw6OY9p1a4dYIBXVy9W2ivFnrLTcYG1FFWwPgnidzPY4EOHxFcw81cHVuA8f3bC1bvONHMRDKRpy0J4xv8rSNe8dR0IDotkxjelzBy4tWJ4Nxs08fJ1kTT/FVDeEjfBrxHUQelbiqNbDeYfqdx3Ng24T7tuvxHY+8eEdW0dr+u3teshivKgCgTbv7hrPhen82RT2oE27+4az4Xp/NkQFDF1Iyl7lWEvgOi+gYuW66kZS9yrCXwHRfQMQGzIiIAiIgKa+iHffVhTxGfz2qA8ou6xhD4dovp2KfPRDvvqwp4jP57VAeUXdYwh8O0X07EB1GREQBERAEREBSD0QTusWT4CZ9PMot2du7ng34Wh85Sl6IJ3WLJ8BM+nmUW7O3dzwb8LQ+cgOmKIiA+Nd/uM/5t3zFcl11orv9xn/Nu+YrkugLGbJuc2Dss8L3m3YlFyM9ZWtni7GpxIN0MDeJLhodQpo9dllV7W//ALC37aoWiAvp67LKr2t//YW/bT12WVXtb/8AsLftqhaIC+nrssqva3/9hb9tPXZZVe1v/wCwt+2qFogL6euyyq9rf/2Fv209dllV7W//ALC37aoWiA6z26qirrfT1sG9yVRE2Vm8NDuuGo18hX3WKwb96Fm8Qg+jCyqA5i5792vGnw5V/SuUyeh7d0TEXwSPpmKG89+7XjT4cq/pXKZPQ9u6JiL4JH0zEBdZERAEREAcA5pa4AgjQg9K57bWGVZy7x46ttlOW4dvDnTUW6O1gfzvh6tCdW/kkDjoV0JWpZvYFtuYmAq/DFx0YZm79LPpqaeduu5IPAToR0gkdKA58ZF5h1uWuYVFiCDlJKJx5C4U7T/HU7iN4e+GgcOsDo1XSq0XCiu1rpbpbqiOpo6uFs0EzDq17HDUEeEFcrMT2S5YcxDXWG8U7qevoZnQzxnocDzg9IPOD0ggq0uwtmnoX5ZXqp4dtPZnvPhdJB872/p9QQFuEREAREQEbbSncrq/GYfOVU1azaU7ldX4zD5yqmqxq/r+5fmdx8nP1TL778IlyMmu5dh/xQfOVtq1LJruXYf8UHzlbarDb+qj2I49q30+v9+XiwiIsxHhERAEREAREQBU2zh7p+IfHHK5KptnD3T8Q+OOUPrPqo9p0jyZ/T633PzRuOyl3Qrh8FSfSxKzCrPspd0K4fBUn0sSsws2k/R12sjfKB9cy+7EIiKSKSEREBVbP/A3qXxL6Z0EO7abi4vjDRwhl53M6h0jq1HQtUy7xRV4QxVS3mm3nMYdyoiB/jYj7Jv/AFHWArd41w7RYpw1V2WvGjJ29pJpqYnj2Lx1g/GNR0qmeIbRW2K91douMXJ1VLIWPHQe8R3wRoQe8VWdQt3bVVUhufuZ3HkhrNPW9PlZXW2cVh5+1Hcn+T68PiXctNfSXS2U9xoZmzU1TG2SJ46WkahelV82Zccdj1LsG3KbSGYmS3ucfYv53R+XnHXr31YNTtpcK4pqa7zk+vaPU0i9lbz3b4vpXB/k+sKHs+ssH35r8S4fhBukbP8Aaado41LQODm/lgdHSOscZhRfdehCvBwma+lapcaXcxuLd7V7Guh9X/0oY9jmPcx7S1zTo5pGhB7y33LjNXEOD2MotW3K1g/7rO4gxjp3Hc7fBxHUpzzNynseL3SV8B9LbuRxqI26tlP/AOxvT4RofDzKvmMMt8XYYe91fa5JqVp4VVMDJER3yRxb+kAq3Utbizlzobulfmdqsdf0flJb+YuElJ74S6f9r49TW3qRP2HM6sEXWNoqqya1Tnnjqozu69T26jTw6Lb6XFmF6pgdTYjtEo/JrYz/ANVSNFnhrNVL0opkbdeTawqSzRqyj1bH8H7y71TinDNM0uqMRWiJo6X1sY/6rVcQZx4FtMbuTub7lMOaKjjL9f0jo35VUtEnrNVr0YpHzbeTWxhLNarKXUsL4kmZi5xX/E8MlvoG+lFteC18cT9ZZR3nP4cOoadeqjNbJhPA2KcTyNFptFRJC48aiRu5CP0zwPgGp6lPmWeTFpw5LFcr5JHdbmwhzG7v3CE98A+yPWfiB4rXp29zez50vayXutX0XkzbujSxlfZjtbfW/wA33ZNZyCytlZPBizEdMWbmj6ClkHHXolcOj8keXvaz2iKyW1vC3hzInF9Z1m41e5dxXfYuCXQv1tCIizkSYzFv3qXfxGbzHLlIureLfvUu/iM3mOXKRAFcjbF/BmwR45Q/U5lTdXI2xfwZsEeOUP1OZAU3REQBERAEREAREQBERAEREBK2yJ+EVhT85UfVpV0YXOfZE/CKwp+cqPq0q6MICvG1p/Ldi8Wl84KEVN21p/Ldi8Wl84KEVUdR+kz/AFwP0PyM+pKHY/xM9NtoK25VjKO3Uk9XUv8AYxQxl7j5AvTe7FebJUsp7vbKuhlkGrBPEWbw7415/IpMsVyfl7k3R320xxi+YhqHsFS9gcYIWEjQa8PxddPyuPMF68E4hrMz8O3bBeJZGVdzZA6rtVW5jWvEjfxToAOkeQu6kjbQaUG/TayujqXaxW1y5hKdxGmv2eEnFvL52x4lJLGObF9eWk2fjNjFd5wRX2/BWFqs2yjttJEZHxNG9PI4alxJHl6yTrrw0/GPLbccwbPgO6U9NGb7dop6eocBuh4icByjtOYDtnHw8OhfPNKz1eNLXhbGFohdPPcIo7dWRt52VIJA172p3hqegN763PEdbT4VwdeDbZQZMPW2GzUszecVM266ZwPf05M9RBW64ucqim/Q2Y7N+zuTKxCtTtqVpK2iv2nMlJ8ec8wfO4tOcovbwWw0e4ZP0T6Gshw9jChvF7oIy+ot8bQHHTnDdHE6jm4jn4HRRNzcFIWz7R1smYtNdInOiordHLPXVB4MZHuOGjj1k/IT0LR7zPFVXitqoG7kU1RJIxunM0uJA+IqPrKDpxqRjzc5Xs4lx0upc07qra1qvnOaovOEmnLOYvGzhlccPsJI2X+6Y7xCXzmKYdojuR3f38H0zFD2y/3THeIS+cxTDtEdyO7+/g+mYpaz+gT7/A5/yj/iy27af4ipaLMYOw7X4pxBBZLa6BtTOHFpmeWtAa0uOpAJ5h3lKGE8nXW19zmx6aeloDTiClqY6nUMnke1jH8NDwJ/GGnHioaja1K22K2dPA6PqOuWWnPm1p+lhNRXznl42LieiSqwLg3DdkxLRUlRT4lnsINIIwTFJM9m46R2vM5p3tebUHpPNg8ncS2aeKhwjiSzy3Yuusc1tOoLI5H9q7f1PsRrvaaHU66hfDNS0VtrwBhejuEe7WWupraCY9Dhvh8ZHUWnUdRWIyMg5fNOzasLxE6WbdHOSyJ7gB16gLcdScbiMEkt2zHTjOf1wK3Ts7erpFe5lOUn6bUuc8+g583mveljPdJmJzElbVY6v9VDGGwG4zBha3Rum+4D4wNVr6m6srcvbVh6fA+KZat9VSzx19bNRDedPWOD+UjB00AYC1upI148xBWnZzUmHqKvsceHbWbdBPaYqp8bnFz9ZC4t3ySe23dNePSsFe3wnPnLrXHJLaVq/PlTtfMySxiMmvRcUlh537ex447Sd9nXuR2r38/0z1IKj7Z17kdq9/P9M9SCrPaeoh2LwOGcoPrW5+/L8TCIi2CICIiAIi8V/uUVnsVfd54Z54qGmkqJI4Gh0j2saXENBI1cQOA1QHtRR3kvnJg7NllzOFXV7X2wxiojrIRG7STe3SAHHUdo5SIgCLA5hYts+BcG3HFd+klZbrexrpeSbvPO84NaGgkakucBz9KwWTObGFM1rTXXHCzqwMoJxBPHVxCORpLd5rtA49qeIB152lAb2iLWM0MdWHLrBtTirEb5xQU744y2BgfI9z3BoDWkjU8defmBQGzotXytxzaMxMHU+KrFBXQ26pkkZCauIRvfuOLXOABPDeBHP0FbQgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCItZzQxxZsvMGVeK7+2qdb6V8bJBTRh8mr3hg0BI6SOlAbMirp68rKP8AmMS/sDP9RPXlZR/zGJf2Bn+ogLFooawhtO5N4jqmUjMUelVQ86NZc6d1O0+GQ6xjyuCmKCaKogZPBKyWKRocx7HBzXNPEEEc4QH7REQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAYK84NwreHOfcsP22okd7KQwNDz+kND8q12oyby8lcXCxuiJ9pVzAfFvLf0WGVvSntlFPuJGhq9/brm0q84rqk1+ZH0GTOXkbgTZJJdPb1k3/Ryz9owLg+1OD6HDltjkbxbI6APePA52pHxrYkSNvSj82KXce1tY1CuubVrza65P4gAAaDgERFmI0IiIAiIgMZi371Lv4jN5jlykXVvFv3qXfxGbzHLlIgCuRti/gzYI8cofqcypupczazvrswMubNg2osFPQRWuaGVtQyoc90nJwviALSBprv6+RARGiIgCIiAIiIAiIgCIiAIiICVtkT8IrCn5yo+rSrowuc+yJ+EVhT85UfVpV0YQFeNrT+W7F4tL5wUIqbtrT+W7F4tL5wWoZI2K2XK/V93vkQmtdjon100RGokLeZpHSOBOnTppzFVW8pupeSguPwO+cmryFlycpV5rKinsW9+k0ku17DP5f1lkxJl23BeLzUW2CnmdNbLqYyIoySSWuce1HFzuc6EHnBAWwZd5S33DmObZiChvNpuNugkdvSRSOD3Mc0tOg0I5ne2WtOz5xULi58VBam2/XdbSGI6Bne3gdddOnm6llL5Y8NY5wLW44sEDsL1tICauN+rKaYgakNcBoSdeBA4ngRqQVsU5UZJOPpSj3PC9qfuIe9p6jQlONb/JpV2091SKlPY/5ZRz0rKyY6gx5V5c40xhaGU3ZNHLV1D6WI80U28eTd4NNAR1DvL74QvOCarK2eixtep+yKq8SV80FPq6ed26B22gOgJ48dObnUOuc5zi5zi5x5yTqStwyebhY44pDi2Tco28Yg8DkXS6jd5Q9Defq1014arUo3U5TUdmNqWdyyWDUNDtqVrKv6XPXNlJw+dJwWFjfjJKc9K274L5CA0uX2CJCDvz6Grrx0EjXmOnSSTp0hRzj/AADQ2jD8GJcNX2O+WaSXkJJA3dfDJ0Bw7x69CNR31ls8LBj2qxLLcbpTS3C3akUUtExz4I4ugaDXdPNrrznpK+UdBW4cyHuzLzDJSy3u4QCip5Wlr9IyHOk3TxAIGnxd8LPWxNyjKG5b+zq3YZFaY521KjXoV0/OTWYLDT5z25k/Tcora23wxhI+my/3THeIS+cxTDtEdyO7+/g+mYoe2X+6Y7xCXzmKYdojuR3f38H0zFt2f0Cff4EDyj/iy27af4iuuUdXNRZl2CeCOSR3ZjI3NY0k7r+1cdB+S4lfHMJlZbcW3myGrqHUlPXSiOIyksDd4lvDXTmIXoyqxf6i8Vsuz6NtVA+MwTt/HDHEElh6HDQeHiOGuoy+Z2DGwwHGWHK2S74er3mQzucXy073Hi2UnjznTU8deB46ExUY8639Ha08vqRfKtVUdYTrLmxlFRi+EpJt4zway8Ljl43YNdxFjK+3+xW60XWpbUQW/Xknlv3R2oAG878bQDQfLqsRarjXWqvjr7bVS0lVFruSxO3XN1BB0PgJHlXlRazqSk+c3tJqla0KVN0oQSi87MbNu/Z1n6c58khc4ue951JJ1JJUl5/UlvjudmuEL6inr6y3xmpt0+6XUjWsa1g4c2oB4Hjw14a6Ly4AoKHDVhdmDfoGz7khjstE/wD/ACZx/wAQ/kMPy9YGukXm5Vt4utTc7jO6eqqXl8r3dJPzDoA6As/q6TUt8sd3X3kXHN5qEalJ4hR5yb/mbxmK6o4Tb6di3SLUbOvcjtXv5/pnqQVH2zr3I7V7+f6Z6kFWq09RDsXgcD5QfWtz9+X4mERFsEQEREAX8c1rmlrgHNI0II4EL+ogKJ5Cl2UG2nd8DzEw225TTW+IOPDck0mpT4SAxv6ZV7FSr0Qaw1eHcwcI5nWgclO7dgfK0ewqKd/KROPWQSPBGrf4MvtJifCNpxHQn/ZrnRxVUY113Q9odoesa6HrCArH6I7i51LhPD+BqSQma51Jraljefkou1Y0jvOe4kdcaj7Ypr7plvtGXbLnELexprlC+kli3u17JhBkjdr3izlAO/vheu6n+GTb1ipR/tFnsNWIz0tENHq5wPfa+feHgeF9tuO2VeA8/MLZo2mPddVclO4jgHVNK5uoJ7zozENOnQoC8Sp16IziaesqsJ5cW3elqKiQ3CaFnO5xJhgHlJl+RW5sVzpL1ZKG8UEnKUddTR1MD/bRvaHNPxEKkuCP/vFt4Vl7P3e0WKpfUxnnbyVJpHCR1Ol3H/pFAWooJ8NZK5K2xl9rOxLRYqKnpqioZC+TWRxawu3WAk70jteA/GWby6xvhvH+HG4hwpXOrra6V8IldA+I77dNRuvAPSOhRttx/gzYm/OUf1qJYn0P38HqH4UqfnagJbzHx/hPLy1Ut0xhdfSyjqqkUsUpgkkBkLXOAO40kDRrjqeHBbFSVFPV0sVXSzxz08zBJFLG4OY9pGocCOBBHHVVk9Ei7j1h+H2fV51GOxzn5PgytpcvceTyRWGq3TbKyo1HYRfxa1xP/BfqCDzNJ19iSQBe5aHcs38vrfmVHl1V310eJpJYoW0fYc5BfIwPYOUDNzi1wPsuGvFb4CCAQQQeYhUYzE/7R2h+FLb9ViQF51EN62lsmLPeK20XHFz4a2hqJKaoj9LKp25Ixxa4aiMg6EHiDopeXPDKjA+HMwNr7FuHcVUT6y3OuF1mMbJnxHfbO7Q7zCD0lAWnbtT5GEgerR46zaqz/SW54GzZy4xtO2mwxjC119U7XdpuUMU7tOfSN4a8/EtDOyhkiQQMM1Y6xdKj7aijO3ZAprbZ58RZWXC4Cuohy/pXUSb7pA3j9xkADg8acGu11PSDpqBchFWbYgztuWO7bV4KxZVOqb9aoBNTVch+6VVOCGnf772EtBPO4OBPEEna9r7OKbKvAsMNlcz1SXlz4qFzgHCnY0DlJiDwJG80NB4au14gEEDecyM18v8AL1oGLcTUdBUObvMpW6y1Dh0ERsBdoe+QB1qKptsjKKOfk2RYklbr/GMoGbvyyA/Ioq2d9mWozBomZh5q3K4yQ3Q9k09IJjy9W13ESzSHVwa7nAHEgg6jmNjqXZ5yYpqUU0eX9qcwDTWQySP/AFnOLvlQHzy+2hspsa1kdBa8URUlfKQ1lLcI3Uz3k8waXdo4nvBxKlVVazn2PcJ3S0VFflwZbHd42l8dFLO6WlqDxO7q8l0bj0HUtHeHOMHsT5yX9mJ5cnseS1D6uDlI7ZLVE8tDJFrv0ryeJ0DXFuvEbpbxG6ABYXFWcGXuF8c0mCr9fXUN8rHQtp4H0c5a/lXbrDygYWAE8NSdBoddNFviqL6I7hF77PhrMCha5k9BObfUyM9kGP1kidr0BrmvHheFY3JrFrMc5W4dxU1zXSV9Cx8+7zNmb2so8j2uHkQH3zIx7hTLywx3zGF1FtoJKhtOyTkZJS6Rwc4NDWNLuZrjzdCyGDsSWXF2GqLEeHq1tda65hfTzhjm74Di08HAEEEEaEA8FT7btudyxznDhPKbDwE9TCGvfHvaN7JqDo0O7wbG0O16BIVtnodOLpKnB1/wFXucyqs1X2TBG/g4RS8HtA/JkaSeuRAWnqp4aWllqqmRsUELDJI9x0DWgaknqAC0zLDNjAmZU1dFgu8yXN1A1jqkminhEYfru8ZGNBJ3XcB3itP20MY+pHIK9CGXcrLzu2un0PH7rryn+E2TykLDbBeDvU3kbDeJ4tysxDUvrXEjthCO0iHg0aXj84gJazCx9g/AFqbcsX36ktUDyREJCXSSkc4ZG0Fz9OnQHTXiocqdsjKKKpMUceJJ2a6crHQMDT19tIHfIq/3O3Nzn21rnhzGl2npbfFdKuiijbIGu5GmLwyGPXg0u3NTp0ucRxKt1Q7PmTVJQto48AWl8YGm9MHySHwvcS75UB5MEbR+T+LKiOlpMWQW+rk4NgucbqU697ff2hPUHEqWWOa9jXscHNcNQQdQR31XDMjY9y4vtLLLhSSswvcNCWcnK6opnO/KY8lwHvXDTvFSRs4Zd3HLLLClw1d7xJdK8SvlmeJnvhi1OjY4Q72LAADpoNXFx6UBJCIiAIiIDBY8xfh3A+Gp8R4puTLfbIHMa+Ysc87znBrQGsBc4knmAPDU8wK+2DMTWTGGGqPEeHK9lfa6xpdBO1rm72ji0ghwBBBBBBAPBU4218V3LMbN2x5N4Ud2R2JUsbO1ru0krZBoN4jXtY2HiejefrzL3bBuNq/CuNb7kzifepp+yJZKKKQ/xdVFwmiHvmt3h0do72yAugtYzHx/hPLy0U12xhdfS2iqqptLFKYJJQZS1zgCGNJHBjjqeHBbOqw+iQ9xqxf94Y/q9QgLM0dTT1lJDV0k8dRTzsbJFLG4OY9hGocCOBBHHVfVUP2Os/KjBVbS5fY7nliw/VFpttXUajsFz+LQSf8Agv11B5mk68xJF8AQ4Aggg8QQgNDueb+X1tzJiy7rb66LE0ssULKPsOcgvkaHMHKBm5xDgfZcNeK3xUYzL/7Rm2/Cls+rxK86AiG97S2TNmvNdZ7ji18NbQ1ElNUx+llU7ckY4tcNRGQdCDxB0XlbtT5GEgerR46zaqz/AElVjK/BGHMwNsTFuHcU0b6y2vuV2ldGyZ8R3mzvLTvMIPSrPHZQyRIIGGasdYulR9tAb3gbNrLfG1Q2mwxjC119U72NNyhindpz6RyBrz5At2VOM7Nj+lt1nnxDlZcLgK6jHL+ldTLvmTd4/cZAA4PGnAO11PSOnbNh/O2545oKvBGLap1TfbXAJqWrkP3SqpwQ0h56XsJbx53B2p4gkgWbREQBQft0/g1X/wAYo/rEanBQft0/g1X/AMYo/rEaAjPY0ygy3xnkrDe8UYUo7ncXXCoiM8r5A4taW6DtXAcNVM52c8lSCDgG38e9NN9tal6H/wDg8wfClV87VYJAVzzD2Pssr5QTHC4rcMXDd1idFO+ogLvy2SEnT3rm/wDRQflDmJjbZyzRdl3mA6WTDb5Q2WMuL44GPPa1VOT+IedzRz9twDgr+KqfokGGKWqy/sGLWRNFbQXDsJ7wOLoZWOdoT06OjGne3j30BaqKRksTZYntfG9oc1zTqHA8xB7y/NTPDTU8lRUzRwwxNL5JJHBrWNHEkk8AB31FuyJfp8RbO2E62qeXzwUz6J5J1OkEjom/3GNVYs98fYwz8zhGVeA5nNsEFS6Boa8tjqTGTylTM4c8bdCWjjwAIBcQEBYjF21Lk3h6sfSDEM13mjOjxbKZ0zB4JDox36LisLbNsTJ+rnbHO+/0DSdDJUW8Fo6/ub3H5F9ct9krK7Dlti9UFFNii57oMs9XK+OIO6dyJhADffFx61s982b8l7tRup5MD0VKSNGy0cskD2HvgtcAfKCEBvOBsbYUxvbDcsJ36hu9M3QPMEmroyeYPYe2YepwBWwLn7nNlRjDZvxRRY+wBfayayunETZ36cpA48eRqGjRsjHac+gB00IB0JuXkbmFRZnZa23FlJG2CWYGKspwdeQqGcHs8HMR+S4IDd1E2PdozKTB1ZJQ1+KI66uiJa+ntsbqktI5wXN7QEd4u1UHbZmb2I7xjVmS+X8lQJZXx09xfSu0lqppNN2ma7oYA4b3fJIOgB123J7Y/wAFWW1QVeYHKYivD2h0tOyZ8VJAfatDCHPI77jofahAZSm2yMopZ+TfHiSBuunKSUDS3w9rIT8iljLnNHAWYULnYRxLRXGVjd6Sm1Mc7B3zE8B4HXpp1rXq7Z4yYrKQ00uALWxhGm9C6SJ/6zXB3yqtO0Ns31+V0H8I+Vt2uTaO2vE88HK/7TQjX+NjkGhcwdIPEDiS4a6AXoWp5l5kYMy4oaStxnefSunrJTFA/sWabfcBqRpG1xHDvrR9kvN5+a+Xr5rpybcQ2l7ae5BgAEuoJZMAOYPAdqPbNdpoNFGHolX3j4S+Epvo0BJvrpcivdz/AOU1v+inrpcivdz/AOU1v+itJyi2ZcosQ5V4Vv11sVZLX3G0UtVUvbcZmh0j4mucQA7QcSeAW0+tNyT9z1d+85/tIDa8HZ75SYtuUdtsWN7fLWSuDYoahklM6Rx5mtEzW7xPeGpUkKkW1xs6YHwHlu7GWD31tBJS1UUU9LNUGWOVkjt0Fpd2wcDoecjTXgp+2OsVXTFuQVjr71PJU11M6WjfPISXStjeQxxJ5zu7oJ6SCUBIeNcXYawXZXXnFV6pLTQtO6JJ36F7vataO2e7qaCVClw2xcoKaqMMPqhrWA6ctBQAMPX272u+RQTtCmfMrbNgwNiO7yW+ywVlPboO2AEMbo2vcW68N+RztASOloOoACtTZtnbJq125tFHgS21IDdHS1ZfNI498ucSQfBoO8gMfg7adybxJUMpWYo9KqiQ6NjukDqdvlkOsY8rlMFLPBVU8dTTTRzwStDo5I3BzXtPMQRwIUA5gbI2VeIaaR1ip6zC9cQSyWkmdLFvflRSEjTqaW+FbLst5TXTKbB1fabxfnXWpqqx0jGRSvNNBENQzcY72LnalziBzkDjugkCXUREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAYzFv3qXfxGbzHLlIureLfvUu/iM3mOXKRAEREAREQBERAEREAREQBERAEREBK2yJ+EVhT85UfVpV0YXOfZE/CKwp+cqPq0q6MICvG1p/Ldi8Wl84LUMksRWmzXu4Wy/v5O03mjdRzy9EevMT3hoXDXo1B6Ft+1p/Ldi8Wl84KEVVbyo6V5Ka4fA75ybs4XvJylb1MpST3b16Taa609pMTcusvLJUemF8x7TXKhDtYaOi3TNMOhvaOcePNwA8IWxX3C2J8c0tHSStpcF4Tgc1lDRTactITwa50YI7Y68GkjTXpJ1Om5Xw2/CuCrhmPcaSOsq4qgUdpgk9iJtNS8+Dj+q7pIK8+W9yvmN84bPVXiumq3QzmpO8e0ibGC/RreZo1AHDvrNCVNKMObjncF0db39yI25oXjnVuPP87zCfpyS2SSy1CCxHPBzll52JbzD3HANykxresO2Bklx9KmOkkkLd0ua1oJ4d8k6AdK2bLW34IiyvuWJMUYeluctFcRA8xTPa8RuawN4b7R7IlbLf8AFnqBt8V5ooo5bpie6Puc+8OaiDzycevRvNI0PRq5ZF9otdZdr7YqB7I7bje1NuNtLuDW1LNXFunhLXkdGhHQvadvCM247Xt2Pcs/N/L2mO61i6r20Y1sxh6OJRbUpcxpVd27ZzmuqLGDr/ZbtQvteW+IrhZLgxhdT2u6ATQv0Gu63fLi39F3Did0qDsbX/EV+vUj8S1cs1XTudCY3ANbCQdC0NHAcRx8C2bKrCOImZmUAqKCqoWWqqE9bNKwsZExh1ILjw7bTQd/XXm4rVMb3CC7YxvNzpv4iqrZpY+HO0vJB8o4rXuKs50U5bNuMcPZ1E1o9hbWupVFRaqeipc54ck22sc5LL5yWdu3uZvey/3THeIS+cxTDtEdyO7+/g+mYoe2X+6Y7xCXzmKYdojuR3f38H0zFIWf0Cff4FQ5R/xZbdtP8RUtSJkJd7nDjanw/Du1NtuxdFW0ko3o3s3CXO074APhHAqO16rXcK6110ddbquakqo9dyaF5a9uoIOhHNwJHlUHRqebqKXQdQ1KzV5aVKGzMk0s7k+D7ntJNqMnpqWvnqcQX214btj539jMnmEk5ZvHdAaCATpp+MT1L3Ymy6y0w3cRa73jW40lbybZN00bngtOuh1awjoPDVRXQz1NwxBSy1lRLUTS1EYfJK8uc7thzk8VI21KGjMiDdIJNti3tDzHfkW7GVHzUpxgtjW/PHPRgrNWjqKv6NrVun6UZN8xRWObzcfOUm9+3L9hi83azDEtnwxbcOXt91Fup5YJXmF0ejS4OZwIHHi7m7wUeIi0qtTzkudjBaLCzVlQVFScsZeXjLy23uSW99BbTZ17kdq9/P8ATPUgqPtnXuR2r38/0z1IKt9p6iHYvA/OfKD61ufvy/EwiItgiAiIgCIiAiPa/wAH+rHILEFNFFylZbYxc6XhqQ6HVz9OsxmRvlUR7LWbUdl2SMT1NVO01mDRMyna867wm1dTg9Rlc5ngaFbaaOOaF8MrGvje0te1w1DgeBBXKXNG3XbLrGuM8vIKiWK3Pr2sliP/AB4Y3mSncf0Xtd5UBZ30ODCkhocUZgVzXPmq5m26nlf7IgaSTHXp1c6Lj32lSZtx4P8AVTkHcqyGLfrLDKy5RaDjuN1bKPBybnO/QC3XZ4wh6hsmMNYdki5Oqio2zVY048vLrJID4HOLfAAt1ulDS3O2VVtrYhLS1cL4JozzPY9pa4eUEoCqGR2b/pXsTXy4SVOl1wxHLbKcl3bb0pApneAGUDwRFe30OPCHpfgK+Y0qYtJrvVilp3EceRh5yOovc4H82FUDFtDiDCF+xJlsJpjELs2KogaP94kgdIyF2nTqJCQOneHUuoOUWFI8EZY4ewrGGh1uoY45i3mdMRvSu8ry4+VAR5tx/gzYm/OUf1qJYn0P38HqH4Uqfnasttx/gzYm/OUf1qJYn0P38HqH4UqfnagMD6JF3HrD8Ps+rzrG1GRlBmvsr4Jrra2GlxZb7LH2FUntRUN4nkJD7Un2J/FJ7xOuS9Ei7j1h+H2fV51LOy/+D5gn4Ji/6oCBdkHPKvtF0bk9mY+ajrqSXsS2VNX2r43tOnYspPT0MJ977VazmJ/2jtD8KW36rEpd2vsgY8w7W/F2FadkWLqKPt42dr6YxtHBh/8A2Aexd0+xPDQtqhkrfL7iHaiwdccS1E9RdW3Olpp5J26SnkWCJofrx3g1gBJ4kgk8dUB05VFNmH8OPFnjV3+nKvWqE7O9zttp22MWVd1uFJQUwrLu0zVMzYmamd2g3nEDVAX2Ra4/H2BmNLn4zw41o5ybpCAP7yinOzaewBgyw1UWGrxRYlxC9hbSwUUglgjfx0fJI3td0H8UEuPNw11AEBZKxx230QW40NqAbRm8XeJzGcGtZyc7t3wBzQPIF+vRCHuqM/MOUVa9zKAWan6eADqmYPd4dAPiC2jYEy6vVbiW55vYjjm3ahssVvkmGjqmWR2s046hxbrzEud3luO3vlVcMX4SocZ2ClfVXKwse2rgjbq+Wkd2xcB0lhBOnec49CAsvTQw09NFT08bY4YmBkbGjQNaBoAOrRfRVi2WtpfDd+wxQYVx1dYLRiCiibTx1dW8MgrmNADXb54Nk00BDtNTxGupAszTVEFTA2op5o5oXjVskbg5rh3wRwKA+ioPm/HHbPRBbW+0AMllvtpfM1nt5BCJB+k06n3xVo85s+sA5b2modU3alut6DSKe1UczXyvf0b5Gojbrzl3RzAngq2bIeDsR5o531uc2KYndg0tXJUskLdGVFW4EMZHr+LGCD1brBx4oC2meWEG47ykxHhcMD56yicaXXonZ28X99rfJqq++h3Y3iGB8TYQutQIfSSb0wjMp03IHjSQdQa5mp/OK2y5tbQ0F3yiz7xtR2N3YtHiShmDdBoHUlX20jR3gHte0e9QEobIVNPmdtMYvzauETjT0TpH0u+PYSTkxxN/Rga5vxL8Tf8A2b29mv8A93suKpOPQ0sqzoeoBtS3XqDVNexLgz1JZC2qeeLcrb4510n1HHdkAEQ8HJtYfC4rRPRFcIPrcC2THVE1zaqyVfITyM4EQzabrifyZGtA/OFAadt0XOrxznbhDKm0Sbz4TG2QDiG1FU8Abw/JjDXa955VzLBa6SyWKgs1vj5OjoKaOmgZ7WNjQ1o+IBUg2MaS6ZnbR96zMxFpPLboXVL3hvaiolHJRNA7wjEmne3Qr1vc1jC97g1rRqSToAEBW/aA2WKDH2K58Y4Xv3pBeqlwkqY5Ii+CaQDQSAtIdG7gNSNdSNdAdSY9GRm1TagIbdmm+eFg0Y2PEdXugd7dewAKVMJbWeV94xTcbJc6meyxQVT4aK4VALqarYDoH7zRrHrz9sNNNO214CcbJebRe6MVllutDcqY801JUMlYf0mkhAUpvU21/lfRyXyvuFXeLVTAvqHmSGvjDBxJc0/dWtAGpcNNB0hWB2Xs8KTODD1W2qo47diC27vZtNG4mN7Xa7ssevHdJBBB1LTpxOoJ3LNbMbB+XuGqq54oudLFuxOMVEXtM9UdDoxkfO7Xm100HOSAqkehv2i4T5kYnxHHA6K1xWs0jiAdzlZJo3taD06Njd4NR30BehERAFpmduO6PLjLK8Ysqtx0tLDuUkLj/HVDu1jZ4N7QnTmaCehbmqQbZGJblmlnbYsm8LScrHRVLY5906sdWPHbOdp+LFHrqejWTvIDL7AOA6y8Xy9ZxYk36iqmmlgoJZRq6SZ51qJ/Dx3AfypB0Lw7dODrhgrMaxZzYW1ppJqiJtVIwcI6yLjG89T2N0I/IOvsl749h+ojYGR5sSsaOYNsZA+sL+T7D9TJEWuzWkk6Q19jOhP7QgLRZV4yt+P8vrPi22kCG4U4e+MHUwyjtZIz1tcCPJqoH9Eh7jVi/wC8Mf1eoWj7DGMbhgjMi+5MYpJp5JamR1Kx54R1kXCRgPeexuoPTuDT2S3j0SHuNWL/ALwx/V6hAYp+RtBmxsq4Jrbc2GlxXb7MzsGpPATt1ceQkPtSddD+KTrzEg+DZCzyr7Ldm5PZmOmo62kl7EtlTV9q+J7Tp2LKT8TCfe+1U87Lf4PWCfguP5ytA2vcgYsxLU/FmFqdkWLqKLtmN0aLjG0cGE/zgHsXdPsTw0LQIgzL/wC0ZtvwpbPq8SvOuYmTN8v2INp/BtfiaonqLqy6UlLPJO3SU8iGxND9eO8AwAk8SRx46rp2gKKbNP4dWK/Hbx9M5XrVCdn652607b2LKy63CkoKYV94aZqmZsbATM7QbziBqrpvx9gZjS5+M8ONaOcm6QgD+8gNjVCcnI47Z6IRX0VpAbSOvF2jexnBobyU7i3wBwHDqCn7Ovaey/wZYaqLDd4osS4gewtpYKGQTQRv46Plkad3dB/FBLjzcOcRVsDZd3q4Ypueb+JI5d2dssdvkmbo6pmldrNOOocW68xLne1QFzUREAUH7dP4NV/8Yo/rEanBQft0/g1X/wAYo/rEaAxvof8A+DzB8KVXztVglV/Yaxrg6x5EQ0F7xZYbZVi5VLzBWXGKGQNJbod1zgdCp0OZ2WwBJzBwkAOc+nNP9tAbYqv+iOX2no8p7LYOUHZdxuwmazXjyUMb94/rSR/Gt/zA2lco8J0EsrMUU1+rGt+5UlocKgyHvco37m0dZd8aqnY7Zjfatzq9OLlTyUGHKNzY53x6mGhpgdeRY4jtpX6nj3zqQGgAAWX2ZaCvw9se2+RjXx10lrrq6IDn1e6V8RHhaWHyqE/Q06WjfjDGFbIGmtioKeKEnnEb5HF+nlZH8iuzQUFHQWyntlJTxw0VPC2CGFo7VkbW7rWgd4AALn/cIsQbK20Y+5RUE1XhmuMjYQDo2roXuBMYceAljIbz9LR+K7iB0JRadlxmhgbMC2xVmF8Q0VVI9oLqR0gZUxHvPiJ3gevmPQStlvF1tdnon1t3uVHb6Vg1dNVTtiY3wucQEBoe0/SUVZs+Y2irw0xNtMsrd7+cZ28fl32tUL+hqz1LsBYspnF3Y0d0ifGOjfdFo75GsWp7Xuf9DjmgblhluZrrBWVEbK6sgjJFU4OBZBCOdwLw0lwHHQAagnWw+ytlrNlhlHR2a4NaLxWSOrrkGnUMleGgR69O61rWnThqCRzoCrmzcyO5bc16qruA6rjuF2mjD+ibekb8jS7wadSvwqI7UeFcSZOZ/wBLnBhinLrbXVvZgk3SWR1LgRNDJpzCQF514ah7gOLVaDJ/PLAGZNqglt14pqC6uaOXtVZM2OeN/SGg6co3Xmc3Xo10PAAScvNdqWkrrVV0Vexj6OogfFUNf7ExuaQ4Hq0JX0q6mmpKd9TV1EVPAwavkleGtaOsngFVvav2lcOW/CtxwZgK5w3a8XCJ1NU11K8OgpInAh+68cHyEagbuobrrrqACBHXobk07M0cT0sTnGkfZt9/QC5s8YYfDo5/yre/RKvvHwl8JTfRrZdhHKu4YHwLW4mv9K+lu2IOTdHTyN0fBTM1LA4dDnFxcR3g3XjqFrXolX3j4S+Epvo0BHeA8Z7WFJgmyUuGLFXy2OGghZbnts8Lw6nDAIyHFup7XTiV7L9mltd2Kz1N4vFpraOgpWb888lkh3Y266anteA61bPZ97hWBf8Au9Q/QMW5V1LTV1FPRVkEdRTVEbopopG7zZGOBDmkHnBBI0QHO6ynPbaenZbKm8xVVmt1Qx1S9/I09PSucDo90bAHPdpvacHdOmnFXxyrwXbcvsAWnCFqc6Snt8O6ZXjR00jiXPkI6C5xJ06NdOhUsqI7nsrbSrJ4xUTYMu+ug4u5Wjc7i3rlhdp1kAcwer5W+spbhQU9fQzx1FLUxNmhmjdq2Rjhq1wPSCCCgIJ2kNmq0ZqXkYmtl3NjxByTYppHQ8pDVBo0bvgEFrgNBvDXgANOCilmQe1BZGCms2am/SsGkbIsQ1jGtHvHM0HkUsnary1pcy7vg+7y1NBTUFR2PFd90y00z28Hgho3mAP1AdoQQNdQFM2HMR4fxHSCrw/e7bdqcgHlKOpZMB4d0nRAU1uVr2yMBU77sLvX3ulgG/KI6iGv7Uc/3N4Lz+iNVMWyjtBNzYZVWG/UUFvxNQw8u4QaiGqi1DS9gJJa4Et1bqecEdIEuY6xphfBFllu+KL1SWyljYXDlZAHyafisZ7J7uoAlUm2MYqnFW1XecX2mhfSWmPs6tlYBo2Fk7nCKIkcNdXjQfkHvIC/KIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgMZi371Lv4jN5jlykXVvFv3qXfxGbzHLlIgCIiAIiIAiIgCIiAIiIAiIgCIiAlbZE/CKwp+cqPq0q6MLnPsifhFYU/OVH1aVdGEBXja0/luxeLS+cFCKm7a0/luxeLS+cFCKqOo/SZ/rgfofkZ9SUOx/iZLWWc1hxXl1V5f3i6RWqsjq+zLfUSkBjnEaacSAT7Lhrro7hzL0VcVhysw5cqWivdPd8U3WI03KU+m5Rwn2R4E6E9fHXd4aA6w6i+Vd4ivR9JLGeozVNA59aT86/NSlznDCw5du/Day1x7GSbtJRyxZgxRbhbSR26BlJ7UxjXm8u8vtmLNW2PL/AC8pnyy0t4pYp6lpBLZIWue0s6xwA/VX5sGctwobFSW652C23iahYGUlVUjt4wObXgdSNBxBB4d/itExXiC6Ynvc13u8/K1Mug0A0axo5mtHQB/786y1q1P05we2Xu25NLTdOvf8i3uaaUKGduc8981xWzgmm288dhsOJM1MaX+ym0V1yY2me3dm5GJsbph3nEdHfA0BWkIi0qlWdR5m8lltLK3s4OFvBQT24SwSnsv90x3iEvnMUw7RHcju/v4PpmKHtl4H+Et504Cgl85inLOay3LEGXdxtNop+yayd0PJx77W66StceLiBzAlT1inKxml1+ByjlPUhS5VW85vCTptt7kudxKdIpZtOQeMKnR1dV2ygb0h0rpHjyNGnyrb7Ts82qPQ3XENZUd9tNC2L5Xbyi4adcz+zjtLxc8s9Ft9jrJv/am/elj3leF+pZJJpDJK98j3c7nHUlWytOTmAKDQutD6x4/GqZ3u+QEN+RbbasP2K1aellmt9GR0wUzGH4wNVuQ0aq/nSS95XrnylWUPUUZSfXiPx8CnFpwjii66G3YfudQ08z20ztz9YjT5Vt1pySx7W6GaipLe09NTUt+Zm8VaxFtQ0akvnSbIC58pV/PZRpxj25b8UvcazldhypwngmisVZPDPPTmQufFrunee53DXQ9K2ZEUtCChFRW5FAubidzWnWqfOk232vawiIvowBERAEREAUKZp7OuGsfZs23H9fc6mmkpux+yqJkLXR1fIv1G84nUat0YeoBTWiAIiICFcX7OuGsR550eaNRc6iKeGenqZre2FpinlhADXF2uo13WajTjp1qakRAafnNgOmzKy6uODau4S2+GudC51RFGHubycrZBoDw47unlXkyLy3pMq8BswpRXOe5xNqZKjl5Ygx2r9OGgJ5tFvaICN9oLKaizewpQ2CuvFRao6SuFYJYYRIXERvZu6Ejh2+vkW0Zb4XhwXgSz4Up6uSritdK2nZO9oa6QDpIHMtgRAFEeJ8g8LXbOiz5o0VRNarpRVDairggjaYq2Rp4Pd7V2nAkc/A8+pMuIgCq3i3Y1sOIMVXe/S42uUElyrpqx0TaJhDDI9zy0He4gb2itIiAqSzYew4HDfx3di3pAoowfnW64D2RcqsOVsVdco7liSeM7zWXGZvIa9H3NjW7w6nFw6lYFEB+KeGGnp46enijhhiaGRxxtDWsaBoAAOAAHQv2iICA83tlTLzHNfPd7Y6fC91ncXSyULGup5XHnc6E6DX3pbrxJ1PFRBLsQX9khjp8w6B1O49sXW97Sf0Q8j5VdtEBVnL3YtwfaayOsxfiGtxGWEO7Fhi7Egd1O0c57h4HNVnLPbbfZ7XT2u1UVPQ0NMwRwU8EYZHG0cwDRwC9SIAoe2gsgrDm/drNc7jdqq11FtjfC91PE15nic4ODSTzaHe0P5ZUwogPlR00FHRw0dLE2KCCNscUbRoGNaNAB1ABYbMTC1BjbA14wpc3OZS3OldA6RoBdGTxa8A9LXAOHWFnkQEbbPuUNpygwzXWe23Ca5S11X2TNVTRBjiA0NazQdA0J8LipJREBDmaWzXldj2olr57TJZbpKS59ZanCEvd33sILHEnnO7vHvqE7tsQV0FWZcP5isaz8UVNvcx7f0mPOvxBXPRAU6wvsQxdntqMW48lqoN7WSGgo9x7/APxXuOn6pVqMB4Qw7gfDVPh3C9sit9ug1IYzUue4873uPFzjpxJ483QFnUQBERAfiobK+nkZDIIpXMIY8t3g12nA6dOneUK5KbO9my5x9X42qMQ12IrxVxyNE1XC1hjfI7ekk4E6udza94u76m1EAREQEH5q7OlpxnmnS5i27Eldhy8wcjI51LTteHzRHtJTqR22ga09BDR1raM/8p6TN3B9Dh64Xme2NpK5tZy0EIeXuEb2buhPAfdCfIpIRAa9lrhaHBWA7PhSnq5KyK10zadk72BrpANeJA5udbCiICI8VZB4WvGc1nzQo6ia1XShqWVFXDBG0xVr2Hg53tXacCRz8OnUmXERAVcxfsbWHEWLLxiCXG1ygkuddPWOibRsIYZJHPLQd7iBvaLGM2HsOBw38d3Yt6QKKMH51bZEBX3AeyLlVhytirbky5YknjO8GXCZog16PubGt3h1OLge8p+poIaanjp6aKOGGJoZHHG0NaxoGgAA4AAdC+iIAiIgC03OnANNmZl5XYOq7jNboax8TzURRh7m8nI144Hhx3dFuSICpHrHcPe726fsMf2kbsO4d17bHl1I6qKMf+pW3RAVvwlsbZX2mpZUXisvl/LTryM9Q2GE+ERtDv7ysBh6yWjD1ogtFittJbaCAaRU9NEI2N8g6T0nnKyCIAsFjrB+G8b4fmsOKbTT3Ogl48nKNCx3Q5jh2zHDU8QQVnUQFQsX7ENpnrHz4UxtVUEBOopq+kE+74JGubw8LSetYeg2H7tNUtN2zEpWxA8TDbnSOI7w3njT5VdVEBE+S2z9l/ldK24WukmuV63dPTKvIfKzXnEbQA2Mc/EDXQ6ElSwiIDxXy02y+WiptN5oKevoKphjnp6iMPZI3vEFVhx/sVYTudZJV4PxLW2APO92JUQ9lwt6mnea8DwlxVq0QFJYNiC/SStjq8xKFsDTo0st73kD3peB8qmTJ7Zby8wDXw3isE+JbxCQ6Keva0QwuHM5kI4A9ILi4g8Rop2RAFF+0Nk5QZw2a122uvdTam26ofO18MLZC8ubu6HUjRSgiAw2BbBFhXBVlwzDUPqYrVQQ0bJntDXSCNgaHEDmJ01WZREBoGeuVdizZwcLBeJZKSWGZs9JWxMDpKd44O0B5w5uoI8B5wF6slcCVGXOBoMJvxDU3ympJHGklqIQx8MZ48nwJ1aDqR3tdOYBbqiAizNbZ/yzzGmlrbxZTQ3WTi6425wgnce+7gWvPW5pPWoIvmw++Op5bDmYRjaD2rKy39s39Nj+P6oVykQFM7FsQ1Ete2bE+YXKw6jfZR0JMjx3g97tG/qlWiyvy9wrlvhtthwpbhSU+u/NK4781Q/TTfkfzuPyDmAAW1IgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgPjXU0VZRT0c4JinjdG8A6HdcCD8hVcr/se4Iqt51lxFfLa88wm5OoYPAN1p+NysmiApRiDY7xjTbzrHiey3Fo5hUMkpnuHgAeNfKo7xDs85u2bfdLhCorIm80lDNHPveBrSXfIujaIDlHe8P32xy8le7LcrZJrpu1lK+E/E4BY1dbJY45Y3RSsbIxw0c1w1BHWFpuIMpstb7vG54Iscj3eykjpGxSHwvZo75UBzFRX2xDsoZWXEONvZeLM4+xFNWco0eSUPJHlUd4g2NKhu8+wY3if7WKuoi343scfNQFTUU3Yg2Ws27XqaW2228NHTRVzRw8Eu4fiCjvEOXGPrBvOvGDr7SRt55X0TzH+uAW/KgNVRCCCQRoQiAIiIAiIgJW2RPwisKfnKj6tKujC5z7In4RWFPzlR9WlXRhAV42tP5bsXi0vnBQirc5m5a0eOrnQVVbdJ6SOkjczk4YwS/Ug67x5ubvFeC05H4DoiDPS1twI/pNSQPiZuqAutOrVq8pLGGdc0HlnpumaVSoVHJzinlJdbe94RVVZG1WK9XUgWy0V9br/MU73j5Arj2nBuFLVum34dtkD280gpml/6xBPyrOgAAAAADmAXsNFf25+xHzc+U2K2W9v3yf5JPxKkWjJ7H1w0PpMKNh/HqpmM/u6l3yLbbTs83mQg3TEFBTDpFPE+Y/LuqxSLbhpFvHfl/rqK9c+ULV6vq+bDsWfxZIjtOQOFKfddcLhc6545wHtiYfIBr8q2205Y4EtmnY+GqKQjpqQZz/fJW3otuFpQh82CK/c8otUuvW15PvwvYsI+FHR0lFFyVHSwU0ftYowwfEF90RbCWCHlJyeWwiIh4EREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREBhcQYRwtiBrhfcN2i573OaqjjlPxuBKjvEOzZlDdy54w063Su/HoaqSPTwNJLP7ql5EBV3EOxth2bU2DGN0oj0NraZlQPBq3k1HeINkTMSi3n2m6WK6xj2LRM+GQ+Rzd0frK8yIDmriHI7Nex75rcD3WVred1GwVQ07/wByLlolxt9dbqg01woqmjnHPHPE6Nw8hAK6yrz3ChorhTmnr6Onq4TzxzxB7T5DwQHO/ZE/CKwp+cqPq0q6MLUbfljl/bsS0uI7bhK02+60rnOhqKSAQlpc0tJ3WaNOocRxB51tyAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiID/2Q==',
                width: 300
            },
            {text: "customer: " + cus_name, fontSize: 16},
            {text: "email: " + cus_email, fontSize: 16},
            {text: "\n\nWindows", style: "subheader"},
            {
                table: {
                    widths: [100, 150, '*', 80],
                    body: [
                        ['Room', 'Window Type', 'Size', 'Price'],
                        [window_room, window_type, window_size, window_price]
                    ]
                }
            },

            {text: "\n\n Doors", style: "subheader"},
            {
                table: {
                    widths: [100, 150, '*', 80],
                    body: [
                        ['Location','Door Type', 'Size', 'Price'],
                        [door_location, door_type, door_size, door_price]
                    ]
                }
            },
            {text: "\n\nPrice: $" + total_price, style: "price"},
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

