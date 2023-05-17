form.text_field_anim('text_field', 'Şu ýere tekstiňizi ýazyň', ' - - - ');
function divide_text(s){
	s = s.trim();
	var t = '';
	var r = [];
	var j = 0;
	s += ' ';
	var zeroed = 0;
	for(var i=0; i<=s.length-1; i++){
		if(t == ' '){
			t = '';
		}
		if((s[i] == ' ' || s[i] == '.' || s[i] == ',' || s[i] == '?' || s[i] == '!' || s[i] == ';') && (t !== ' ')){
			j++;
			r[j] = t.trim();
			t = '';
			if(s[i] == ' '){
				zeroed = 1;
			}else{
				j++;
				r[j] = s[i];
				zeroed = 1;
			}
		}
		if(zeroed !== 1){
			t += s[i];
		}else{
			zeroed = 0;
		}
	}
	if(j == 0){
		r[j] = s;
	}
	return r;
}
var words = [];
words['salam'] = 'hello';
words['oňatmy'] = 'how are you';
words['gowmy'] = 'how are you';

document.getElementById('btn_translate').onclick = function(){
	
	var s = document.getElementById('text_field').value;
	
	//Boşmy dälmi barlap görmeli
	if(s !== ''){ // Eger-de boş däl bolsa işi etmeli
		//funksiýasyny düzmeli
		document.getElementById('translated_text_field').innerHTML = '<img src="include/icons/loading.gif" id="loading_icon"/>';
		var counter = 0;
		var interval = setInterval(function(){
			counter++;
			if(counter == 1){
				//Esasy zatlar bashlayar
				
				var translated = '';
				
				var f = divide_text(s);
				s = '';
				var t = '';
				for(var key in f){
					if(f[key] == '.' || f[key] == ',' || f[key] == '?' || f[key] == '!' || f[key] == ';'){
						if(translated[translated.length-1] == ' '){
							s = '';
							for(var i=0; i<translated.length-1; i++){
								s += translated[i];
							}
							translated = s;
						}
						t = f[key];
					}else{
						t = f[key];
					}

					//terjime
					f[key] = f[key].trim();
					for(var j in words){
						if( j == f[key].toLowerCase() ){
							t = words[j];
						}
					}
					
					translated += t;
				}
						
				var r = translated.trim();
				var q = '';
				for(var i=0; i<r.length; i++){
					if(i == 0){
						q += r[i].toUpperCase();
					}else if((i>1) && (r[i-1] == '.' || r[i-1] == '!' || r[i-1] == '?' || r[i-1] == ';')){
						if((r[i+1] == '.' || r[i+1] == '!' || r[i+1] == '?' || r[i+1] == ';') && (r[i] == '.' || r[i] == '!' || r[i] == '?' || r[i] == ';')){
							q += r[i];
						}else if((r[i-2] == '.' || r[i-2] == '!' || r[i-2] == '?' || r[i-2] == ';') && (r[i] == '.' || r[i] == '!' || r[i] == '?' || r[i] == ';')){
							q += r[i];
						}else if(r[i] == '.' || r[i] == '!' || r[i] == '?' || r[i] == ';'){
							q += r[i];
						}
						else{
							q += (' ' + r[i].toUpperCase());
						}
					}else{
						q += r[i];
					}
				}
				document.getElementById('translated_text_field').innerHTML = q;
				
				//In sonunda intervaly posyar
				clearInterval(interval);
			}
		}, 1000);
		
		return false;
	}else{ //Eger boş bolsa
		var t = '';
		t += 'display: block;';
		t += 'width: 6cm;';
		t += 'opacity: 1;';
		document.getElementById('controller').setAttribute('style', t);
		document.getElementById('text_field').focus();
		return false;
	}
}
document.getElementById('text_field').onkeyup = function(){
	if(document.getElementById('controller').style.display == 'block' && document.getElementById('text_field').value !== ''){
		document.getElementById('controller').style.display = 'none';
	}
}
document.getElementById('first_lang').onchange = function(){
	document.getElementById('lbl_text').innerText = document.getElementById('first_lang').value + ' :';
}
document.getElementById('second_lang').onchange = function(){
	document.getElementById('translated_header').innerText = document.getElementById('second_lang').value + ' :';
}
