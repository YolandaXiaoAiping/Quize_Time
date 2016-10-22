var score = 0;
var submit_time = 0;
$(document).ready(function(){
	$(".Question_page").each(function(index,item){
		$(item).hide();
	})
	$(".explanation").each(function(){
		$(this).hide();
	})
	$("#score").hide();
	$("#end_page").hide();
	/*********************test*************************/
	//$("#start_div").hide();
	//$("#score").show();
	//$("#Q4").show();
	//reorder_Q2();
	//$("#end_page").show();
});

/***********************Start Page*******************************/
$("#start_btn").click(function(){
	$("#start_div").hide();
	$("#score").show();
	$("#Q1").show();
	$("button.Q1").hide();
	reorder();
});
/****************************Q1*********************************/
//each time reorder the element 
function reorder(){
	var order =[-1,-1,-1,-1];
	$("input:radio[name=first_house]").each(function(){
			 var rand = Math.floor((Math.random()*10))%4;
			 while(order[rand] != -1){
				 rand = Math.floor((Math.random()*10))%4;
			 }
			 order[rand] = this.parentElement;
	});
	$("#Q1_form").empty();
	for(let i = 0; i < 4; i++){
		$("#Q1_form").append(order[i]);
	}
	next();	
}

function next(){
	$("input:radio[name=first_house]").click(function(index,val){
		submit_time++;
		var answer = $(this).val();
		if(submit_time == 1 && answer == "b"){
			score++;
			$("#score_span").text(score);
			$("#this_span").text("1");
		}
		$("button.Q1").show();
		$(".explanation").each(function(){
			$(this).hide();
		})
		var className = $(this).attr("class");
		$('p.'+className).show();
	});
}


$("#show_exp").click(function(){
	
	$('P.Q1').show();
	$("#show_exp").attr('disabled','disabled');
});

$("#Q1_next").click(function(){
	submit_time = 0;
	$("#Q1").hide();
	$("#Q2").show();
	$("#this_span").text("0");
	$("#Q2_next").hide();
	reorder_Q2();
});
/***********************************Q2******************************/
//each time reorder the checkbox
function reorder_Q2(){
	var order_check = [-1,-1,-1,-1,-1,-1,-1,-1];
	$("input:checkbox[name=words]").each(function(){
		var rand = Math.floor((Math.random()*10))%8;
			 while(order_check[rand] != -1){
				 rand = Math.floor((Math.random()*10))%8;
			 }
			 order_check[rand] = this.parentElement;
	});
	$("#Q2_form").empty();
	for(let i = 0; i < 8; i++){
		$("#Q2_form").append(order_check[i]);
	}
}

$("#Q2_submit").click(function(){
	$("p.Q2").hide();
	$("#Q2_next").show();
	//check if more than two words are chosen
	if($("input:checkbox[name=words]:checked").length>2){
		$("p.Q2.more").show();
	}
	else if($("input:checkbox[name=words]:checked").length<2){
		$("p.Q2.less").show();
	}else{
		submit_time++;
		var correct = [];
		var incorrect = [];
		$("input:checkbox[name=words]:checked").each(function(){
			if($(this).hasClass("1-4")||$(this).hasClass("1-7"))
				correct.push($(this).val());
			else
				incorrect.push($(this).val());
		});
		if(submit_time == 1 && correct.length == 2){
			score++;
			$("#score_span").text(score);
			$("#this_span").text("1");
			$("p.Q2.all").show();
		}else if( correct.length == 2){
			$("p.Q2.all").show();
		}else if(correct.length == 0){
			$("p.Q2.none").show();
		}else{
			$("#correct_word").text(correct[0]);
			$("#incorrect_word").text(incorrect[0]);
			$("p.Q2.one").show();
		}
	}
});

$("#Q2_next").click(function(){
	submit_time = 0;
	$("#Q2").hide();
	$("#Q3").show();
	$("#Q3_next").hide();
	$("#this_span").text("0");
});
/*************************************Q3**********************************/
var part1 = 0;
var part2 = 0;
var removeindex = -1;
var part1_arr = []
var part2_arr = []
setInterval(checkChosen,10);
function checkChosen(){
	
	$("li.P1").each(function(){
		if(part1_arr.indexOf(this.classList[2]) != -1 ||this.classList[2] == part1){
			this.style.backgroundColor = "#6666ff";
		}else{
			this.style.backgroundColor = "#ccccff";
		}
	});
	$("li.P2").each(function(){
		if(part2_arr.indexOf(this.classList[2]) != -1){
			this.style.backgroundColor = "#6666ff";
		}else{
			this.style.backgroundColor = "#ccccff";
		}
	});
}
$("li.Q3.P1").click(function(){
	var classList = $(this).attr("class").split(' ');
	var chosen = false;
	for(let i = 0;i < part1_arr.length;i++){
		if(classList[2] == part1_arr[i]){
			//alert("You have already chosen this professor!");
			part1_arr.splice(i,1);
			part1 = classList[2];
			removeindex = i;
			chosen = true;
			break;
		}
	}
	if(!chosen){
		part1 = classList[2];
	}
	
});
$("li.Q3.P2").click(function(){
	if(removeindex != -1){
		$("span.first.Q3.P2."+part2_arr[removeindex]).text("___");
		part2_arr.splice(removeindex,1);
		removeindex = -1;
	}
	var classList = $(this).attr("class").split(' ');

	if(part1 == 0){
		alert("Please Choose a professor first!");
	}else{
		part2 = classList[2];
		for(let i = 0; i < part2_arr.length;i++){
			if(classList[2] == part2_arr[i]){
				$("span.first.Q3.P2."+classList[2]).text("___");
				part2_arr.splice(i,1);
				part1_arr.splice(i,1);
				break;
			}
		}
		part1_arr.push(part1);
		part2_arr.push(classList[2]);
		$("span.first.Q3.P2."+classList[2]).text("_"+part1+"_");
		part1 = 0;		
	}
});
$("#Q3_submit").click(function(){
	if(part1_arr.length < 8){
		alert("You haven't finish all pairs now");
	}else{
		submit_time++;
		$("#Q3_next").show();
		var correct = 8;
		for(let i = 0; i < part1_arr.length; i++){
			if(part1_arr[i] != part2_arr[i]){
				correct--;
				$("li.Q3.P2."+part2_arr[i]).css("color","red");
				$("span.first.Q3.P2."+part2_arr[i]).css("color","red");
				$("span.last.Q3.P2."+part2_arr[i]).text("----correct answer is:"+part2_arr[i]);
			}
		}
		if(submit_time == 1){
			score = score + 0.5*correct;
			$("#this_span").text(0.5*correct);
			$("#score_span").text(score);
			$("#Q3_submit").attr('disabled','disabled');
		}
	}
	
});
$("#Q3_next").click(function(){
	submit_time = 0;
	$("#Q3").hide();
	$("#Q4").show();
	$("#Q4_next").hide();
	$("#this_span").text("0");
	rand_Q4();
});
/*********************************Q4**************************************/
var dragObject = null;
function rand_Q4(){
	var arr_Q4 = [-1,-1,-1,-1,-1,-1,-1];
	$("p.Q4").each(function(){
		var rand = Math.floor((Math.random()*10))%7;
			 while(arr_Q4[rand] != -1){
				 rand = Math.floor((Math.random()*10))%7;
			 }
			 arr_Q4[rand] = this;
	});
	$("#testPlace").empty();
	for(let i = 0; i < 7; i++){
		$("#testPlace").append(arr_Q4[i]);
	}
}
function allowDrop(ev){
	ev.preventDefault();
}
function drag(ev){
	ev.dataTransfer.setData("text",ev.target.parentElement.id);
	
}
function drop(ev){
	ev.preventDefault();
	
	var data = ev.dataTransfer.getData("text");
	var p1 = document.getElementById(data);
	//alert(p1.id);
	var p2 = ev.target.parentElement;
	//swap two paragraphs
	if(ev.target.tagName == "SPAN"){
		var temp = document.createElement("p");
		p1.parentElement.insertBefore(temp,p1);
		p2.parentElement.insertBefore(p1,p2);
		temp.parentElement.insertBefore(p2,temp);
		temp.parentElement.removeChild(temp);
	}
}
$("#Q4_submit").click(function(){
	$("#Q4_next").show();
	submit_time++;
	var correct = true;
	$("p.Q4").each(function(){
		var span = $("span.Q4.explanation."+this.id)[0];
		var newSpan = document.createElement("span");
		var txt = document.createTextNode(span.innerHTML);
		newSpan.appendChild(txt);
		if(this.id != $(this).index()){
			correct = false;
			newSpan.style.color = "red";
		}
		this.appendChild(newSpan);
	});
	if(submit_time == 1 && correct){
		score++;
		$("#this_span").text("1");
		$("#score_span").text(score);
		$("#Q4_submit").attr('disabled','disabled');;
	}
	$("#Q4_submit").attr('disabled','disabled');
});
$("#Q4_next").click(function(){
	$("#Q4").hide();
	$("#end_page").show();
	$("#score").hide();
	$("#final_score").text(score);
});
/*******************************End**********************************/
$("#again_btn").click(function(){
	window.location.reload();
});