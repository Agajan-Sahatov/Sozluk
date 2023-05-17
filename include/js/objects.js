var form = {};
form.text_field_anim = function(id, text1, text2){
	function spell(id, s, rate, repeat){
			var i = 0;
			var t = '';
			var j = 0;
			var timeln = setInterval(function(){
				if(i<s.length){
					t += s[i];
					document.getElementById(id).setAttribute('placeholder', t);
					i++;
				}
				if(i == s.length){
					i = 0;
					t = '';
					j++;
				}
				if(j == repeat){
					clearInterval(timeln);
				}
			}, rate);
	}
	var counter = 0;
	var interval = setInterval(function(){
		if(counter == 1){
			spell(id, text1, 50, 1);
		}
		if(counter == 5){
			spell(id, text2, 100, 4);
		}
		counter++;
		if(counter == 8){
			counter = 0;
		}
	}, 1000);
}