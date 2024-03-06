let age = document.getElementsByClassName("level")

localStorage.setItem("age", age);

function putLevel1() {
    localStorage.setItem("age", 3);
}
function putLevel2() {
    localStorage.setItem("age", 2);
}
function putLevel3() {
    localStorage.setItem("age", 1);
}


document.querySelector("#wellcomImg").addEventListener("click",function(){
    document.getElementById("myForm").style.display = "block"
})
document.querySelector("#instruction").addEventListener("mouseover",function(){
    document.getElementById("myPre").style.display = "block"
})
document.querySelector("#instruction").addEventListener("mouseout",function(){
    document.getElementById("myPre").style.display = "none"
})

