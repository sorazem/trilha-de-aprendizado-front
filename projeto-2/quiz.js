function startQuiz(){
    //document.getElementById('quiz').innerHTML = "";
    var s = 30;
    document.getElementById('time').innerHTML = s;
    s = s - 1;
    var t = setInterval(startQuiz, 1000);
}

