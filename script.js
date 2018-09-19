function shrink(){
	var elem = document.getElementById("avatar");
	var id = setInterval(_shrink_to_zero, 1);
	var original_w = elem.offsetWidth;
	var original_h = elem.offsetHeight;

	function _shrink_to_zero(){
		// console.log(elem.offsetWidth)
		// console.log(elem.style.marginTop)
		if (elem.offsetWidth <= 0 && elem.offsetHeight <= 0){
			console.log("End")
			clearInterval(id);
		}
		else{
			elem.style.width = elem.offsetWidth - Math.ceil(0.01*original_w) + "px";
			elem.style.height = elem.offsetHeight - Math.ceil(0.01*original_h) + "px";
			elem.style.marginTop = Math.ceil(-0.4*elem.offsetHeight) + "px"
			if (elem.style.width <= 0){
				elem.style.width = 0 ;
			}
			if (elem.style.height <= 0){
				elem.style.height = 0 ;
			}
			
		}
	}	
}

