$(function(){
	
	$("#userName")[0].onkeyup = function(){

		var reg1 = /^[1-9][0-9]{4,9}$/; 
			
		var str = this.value;
		if(reg1.test(str)==true){
			$("#span1")[0].innerHTML = "√";
		}else{
			$("#span1")[0].innerHTML = "×";
		}	
		
	}
	$("#userName")[0].onblur = function(){
		if(this.value==""){
			$("#span1")[0].innerHTML = "";
		}			
	}



	
	$("#userPass")[0].onkeyup = function(){
		var regLetter = /[a-zA-Z]/; 
		var regNum = /[0-9]/; 
		var regSpecial = /[\$!#]/; 

		var str = this.value;
		if(str.length>=6 && str.length<=16 && regLetter.test(str) && regNum.test(str) && regSpecial.test(str) ){
			$("#span2")[0].innerHTML = "√";
		}else{
			$("#span2")[0].innerHTML = "×";
		}								
	}
	$("#userPass")[0].onblur = function(){
		if(this.value==""){
			$("#span2")[0].innerHTML = "";
		}			
	}
	

	
})

	
	
	
	