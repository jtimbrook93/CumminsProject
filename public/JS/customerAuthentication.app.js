var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.


function validate(){
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
if ( username == "4501" || "4502" || "4503" || "4504" || "4505" || "4506" && password == "1234"){
alert ("Login successfully");
window.open("dashboard.html?customerId="+username); // Redirecting to other page.
return false;
}
else{
attempt --;// Decrementing by one.
alert("You have left "+attempt+" attempt;");
// Disabling fields after 3 attempts.
if( attempt == 0){
document.getElementById("username").disabled = true;
document.getElementById("password").disabled = true;
document.getElementById("submit").disabled = true;
return false;
}
}
}
