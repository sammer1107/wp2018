function toggle_nav(){
	var elem = document.getElementById("extend_nav");
	var bar = document.getElementById("bar_btn");
	if (elem.style.marginTop != "0px" ){
		elem.style.marginTop = "0px";
		bar.style.visibility = "hidden";
	}
	else{
		elem.style.marginTop = "-100%";
		bar.style.visibility = "visible";
	}
}

