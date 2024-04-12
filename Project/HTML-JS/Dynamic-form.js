let formfield = document.getElementById('formfield');

function add() {
    let newField = document.createElement('input');
    newField.setAttribute('type', 'text');
    newField.setAttribute('name', 'location');
    newField.setAttribute('class', 'location');
    newField.setAttribute('placeholder', 'Enter Location');
    formfield.appendChild(newField);
    
    // Call initAutocomplete to enable autocomplete on the newly created input
    initAutocomplete();
}

function remove(){
    let input_tags = formfield.getElementsByTagName('input');

    if(input_tags.length >4){
        formfield.removeChild(input_tags[(input_tags.length)-1]);
    }
}