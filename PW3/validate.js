window.onload = function() {

    //there will be one span element for each input field
    // when the page is loaded, we create them and append them to corresponding input elements 
    // they are initially empty and hidden

    var email = document.getElementById("email");
    var span1 = document.createElement("span");
    span1.style.display = "none"; //hide the span element
    email.parentNode.appendChild(span1);
    email.onfocus = function() {
        span1.textContent = "Valid email address: abc@def.xyz"
        span1.style.display = "block";
        email.classList.remove("error");
    }
    email.onblur = function() {
        span1.style.display = "none";

    }
    function emailFormat(event) {
        ///\S+@\S+\.\S+$/;
        var emexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;   
        if (!email.value.match(emexp)) {
            email.classList.add("error");
            span1.textContent = "Invalid email input";
            span1.style.display = "block";
            event.preventDefault();
        }   
    }

    var password = document.getElementById("pwd");
    var span2 = document.createElement("span");
    span2.setAttribute('style', 'white-space: pre;');
    span2.style.display = "none"; //hide the span element
    password.parentNode.appendChild(span2);
    password.onfocus = function() {
        password.classList.remove("error");
        span2.textContent = "Password should contain at least six characters\r\n";
        span2.textContent += "Password should contain at leat one uppercase letter, one number and on special character(!,@,#,$,%,^,&,*,+)";
        span2.style.display = "block";
    }

    password.onblur = function() {
        span2.style.display = "none";

    }

    function pwdFormat(event) {
        var pexp = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#^&+])[A-Za-z\d@$!%*#^&+]{6,}$/;
        if (!password.value.match(pexp)) {
            password.classList.add("error");
            //confirmP.classList.add("error");
            span2.textContent = "Invalid password input";
            span2.style.display = "block";
            event.preventDefault();
        }
    }


    var confirmP = document.getElementById("confirm");
    var span3 = document.createElement("span");
    span3.style.display = "none"; //hide the span element
    confirmP.parentNode.appendChild(span3);
    confirmP.onfocus = function() {
        password.classList.remove("error");
        confirmP.classList.remove("error");
        span3.textContent = "Password and confirm password fields should match"
        span3.style.display = "block";
    }

    confirmP.onblur = function() {
        span3.style.display = "none";

    }

    function confirmFormat(event) {
        if (!(password.value === confirmP.value)) {
            password.classList.add("error");
            confirmP.classList.add("error");
            span3.textContent = "Password and confirm password doesn't match";
            span3.style.display = "block";
            event.preventDefault();
        }
    }



    var form = document.getElementById("myForm");
    form.onsubmit = function(e) {    
        emailFormat(e);
        pwdFormat(e);
        confirmFormat(e);      
    }


}