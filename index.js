

const init = function(){
    document.getElementById('button-cancel').addEventListener('click', reset);
    document.getElementById('button-send').addEventListener('click', send);
}

const reset = function(ev){
    ev.preventDefault();
    document.getElementById('form-user').reset();
}

const send = function(ev){
    ev.preventDefault(); 
    ev.stopPropagation();
    let fails = validate();
    
    if(fails.length === 0){
        
        document.getElementById('form-user').submit();
    }else{
        fails.forEach(function(obj){
            let field = document.getElementById(obj.input);
            field.parentElement.classList.add('error');
            field.parentElement.setAttribute('data-errormsg', obj.msg);
        })
    }
}

const validate = function(ev){
   
    let failures = [];
    let chk = document.getElementById('input-alive');
    
    if(!chk.checked){
        
        chk.parentElement.setAttribute('data-errormsg', 'Must be alive to submit.');
        failures.push({input: 'input-alive', msg: 'Must be alive to submit.'})
    }

    let select = document.getElementById('input-age');
    if( select.selectedIndex === 0 ){
        failures.push({input:'input-age', msg:'Too young'})
    }


    let first = document.getElementById('input-first');
    let password = document.getElementById('input-password');
    let email = document.getElementById('input-email');
    
    if( first.value === ""){
        failures.push({input:'input-first', msg:'Required Field'})
    } 
    if( password.value === "" || password.value.length < 8){
        failures.push({input:'input-password', msg:'Must be at least 8 chars'})
    } 
    if( email.value === ""){
        failures.push({input:'input-email', msg:'Required Field'})
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)==false)
    {
        failures.push({input:'input-email', msg:'You have entered an invalid email address!'})
    }
    
    
    return failures;
}


document.addEventListener('DOMContentLoaded', init);
