let password = "";
let password_length =0;
let check_count = 0;
let symb = "~!@#$%^&*()_+{}:<>?/.,';][\|=-`";


// Fetching the elements 
let con = document.querySelector("[slider]");
let pass_value = document.querySelector("[password_length_value]");
let checkboxes = document.querySelectorAll('.marking');
let generate = document.querySelector("[GENERATE_PASSWORD_BUTTON]");
let op_pass = document.querySelector('.output_password');
let uc = document.querySelector("[big]");
let lc = document.querySelector("[small]");
let nm = document.querySelector("[digits]");
let sgn = document.querySelector("[signs]");
let cpy = document.querySelector("[CopyButton]");
let strength = document.querySelector("[Strength]");
// start function 
function start(){
    password_length = 10;
    con.value = password_length;
    pass_value.innerHTML = password_length;
}
start();

// count the number of checkboxes
function count_check(){
    let sum = 0;
    checkboxes.forEach(function (key){
        if(key.checked){
            sum++;        
        }
    })
    return sum;
}

// event listner 
con.addEventListener('input',function (){
    password_length = con.value;
    pass_value.innerHTML = password_length;
});

checkboxes.forEach(function (key){
    key.addEventListener('change',function () {
        check_count = count_check();
        if(password_length < check_count){
            password_length = check_count;
            con.value = check_count;
            pass_value.innerHTML = password_length;
        }
    })
})


function getrandom(maxi,mini){
    return  Math.floor(Math.random()*(maxi - mini) + mini);
}

function getuppercase(){
    return String.fromCharCode(getrandom(65,90));
}

function getlowercase(){
    return String.fromCharCode(getrandom(97,122));
}

function getnum(){
    return getrandom(0,10);
}

function getsymbol(){
    return symb[getrandom(0,symb.length)];
}


function suffling(password){
    let array =password.split('');
    for(let i =0 ; i<10 ; i++){
        let first_indx = getrandom(0,array.length);
        let second_indx = getrandom(0,array.length);
    
        let temppp = array[first_indx];
        array[first_indx] = array[second_indx];
        array[second_indx] = temppp; 
    }
    password = array.join('');
    return password;
}

let funAarray = [];

generate.addEventListener('click', function(){
    funAarray = [];
    op_pass.value = "";
    check_count = count_check();
    if(!check_count){
        return;
    }
    if(password_length < check_count){
        password_length = check_count;
        con.value = check_count;
        pass_value.innerHTML = password_length;
    }
    
    if(uc.checked){
        funAarray.push(getuppercase);
    }
    if(lc.checked){
        funAarray.push(getlowercase);
    }    
    if(nm.checked){
        funAarray.push(getnum);
    }    
    if(sgn.checked){
        funAarray.push(getsymbol);
    }

    // necessary 
    for(let i = 0 ; i < funAarray.length ; i++){
        password += funAarray[i]();
    }

    // remaining 
    for(let i = 0 ; i < password_length - funAarray.length  ; i++){
        password += funAarray[getrandom(0 , funAarray.length)]();
    }


    // suffling the output password
    password = suffling(password);
    op_pass.value = password;

    password="";
    if (op_pass.value.length <= 5) {
        strength.style.backgroundColor = 'red';
    } else if (op_pass.value.length <= 10) {
        strength.style.backgroundColor = 'orange';
    } else {
        strength.style.backgroundColor = 'green';
    }
})


// copy to clipoard 

cpy.addEventListener('click',function(){
    navigator.clipboard.writeText(op_pass.value).then(function() {
        alert('Text copied to clipboard');
    })
})