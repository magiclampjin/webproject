var week = new Array("일","월","화","수","목","금","토");

function printDate(){
	var today = new Date();
	var str = today.getFullYear() + "년 "  + (today.getMonth()+1)+"월 "+ today.getDate()+"일 "+week[today.getDay()]+"요일";
	document.getElementById("date").innerHTML = str;
}


function movecontact(){
	document.getElementById("contact_href").href="#contact"
}


document.addEventListener("scroll",function(){
	var sc = window.scrollY;
	if(sc>150){
		document.getElementById("head").style.backgroundColor="#0000009c";
	}
	else {
		document.getElementById("head").style.backgroundColor="transparent";
	}
})


//퀴즈 
const questions = new Array("데이터 마이닝에 대한 설명으로 옳은 것은?","데이터 마이닝의 방법론으로 옳지 않은 것은?",);
const answer_a = new Array("채광의 기술 중 하나이다.","SEMMA");
const answer_b = new Array("의미없는 정보만 추출한다.","ABC");
const answer_c = new Array("대규모 데이터에서 규칙을 찾아내는 일련의 과정","KDD");
const answer_d = new Array("반정형 데이터에서만 사용가능한 기술이다.","CRISP-DM");
const answer_correct = new Array("3","2");

const answer_list = document.getElementsByName("answer");
var currentQuiz = 0;
var score =0;
var timerID;


function quiztimer(){	
	var sec=20;
	var time=20000;
	var timer = document.getElementById("timer");
	timer.style.color="black";
	timer.innerHTML="";
	timerID = setInterval(
		function(){
			time-=1000;
			document.getElementById("quiz_answers").style.visibility="visible";
			document.getElementById("quiz_header").style.visibility="visible";

			if(sec>=10)
				timer.innerHTML="00:"+sec;
			else if(sec>0)
				timer.innerHTML="00:0"+sec;
			else if(sec==0){
				timer.style.color="red";
				timer.innerHTML="00:00<br>5초 뒤에 다음 문제가 보여집니다.";
				clearInterval(timerID);
				currentQuiz++;
				exit();
				timerID = setTimeout(function(){loadQuiz(); timer.innerHTML="00:00";},5000);
			}
			sec--;
		},1000);
}	

function loadQuiz(){
	deselectAnswers();
 	document.getElementById("quiz_answers").style.visibility="hidden";
	document.getElementById("quiz_header").style.visibility="hidden";

	document.getElementById("question").innerText = questions[currentQuiz];
	document.getElementById("a_text").innerText = answer_a[currentQuiz];
	document.getElementById("b_text").innerText = answer_b[currentQuiz];
	document.getElementById("c_text").innerText = answer_c[currentQuiz];
	document.getElementById("d_text").innerText = answer_d[currentQuiz];

	quiztimer();
}

function deselectAnswers() {
	select = 0;
	
	for(var i=0; i<answer_list.length; i++)
		answer_list[i].checked = false;
}

function getSelected() {
    var select;

    for(var i=0; i<answer_list.length; i++)
		if(answer_list[i].checked)
			select = i+1;
    return select;
}

function exit(){
	if(currentQuiz>=questions.length){
		document.getElementById("quiz").innerHTML 
	        	= "<h2>맞춘 개수는 "+score+"/"+currentQuiz+" 개 입니다."+
	        	"</h2><br><button onclick='location.reload()'>다시하기</button>"
	}
}

function sm(){
    const btn = document.getElementById("subbtn");   
    if(!(btn.innerText=="제출")){
        btn.innerHTML="제출";
        loadQuiz();
    }
    else{
        var answer = getSelected();

        if(answer){
         	clearInterval(timerID);
         	
            if(answer==answer_correct[currentQuiz++]){
                score++;
            }
            if(currentQuiz<questions.length){
                loadQuiz();
            }else{
               exit();
            }
        }
    }
}