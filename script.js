function toggle_nav(){
	var elem = document.getElementById("extend_nav");
	var bar = document.getElementById("bar_btn");
	var x_btn = document.getElementById("close_btn");
	var to_blur = document.querySelectorAll("body > *:not(#extend_nav)");
	var content = document.getElementById("content");
	var links = Array.from(document.querySelectorAll("#extend_nav a"));
	
	if (elem.style.marginTop != "0px" ){
		// show navigation
		elem.style.marginTop = "0px";
		bar.style.opacity = "0";
		x_btn.style.opacity = "1";
		// blur elements
		for (var i=0; i<to_blur.length; i++){
			to_blur[i].classList.add("blur")
		} 
		// shrink content
		content.classList.add("shrink");
		// spin button
		bar.classList.add("spin");
		x_btn.classList.add("spin");
		// show link + rotate links
		links.map(function(a){
			a.style.top = "0";
			a.style.transform = "";
			a.style.opacity = 1;
		});


	}
	else{
		// hide navigation
		elem.style.marginTop = "-100vh";
		bar.style.opacity = "1";
		x_btn.style.opacity = "0";
		// remove blur effect
		for (var i=0; i<to_blur.length; i++){
			to_blur[i].classList.remove("blur")
		}
		// spin button
		bar.classList.add("spin");
		x_btn.classList.add("spin");
		// remove shrink effect
		content.classList.remove("shrink");
		// restore links position
		linksHide();
	}
}

function onLoad(){
	initLinks();
	linksHide();
	setAnimationEventListener();
}

function linksHide(){
	var links = document.querySelectorAll("#extend_nav a");
	for (var i=0; i<links.length; i++){
		links[i].style.top = -50*(i+1) + "px";
		links[i].style.opacity = 0.2;
		links[i].style.transform = "rotateX(-90deg) translateZ(-50px)";
	}
}

function initLinks(){
	var links = document.querySelectorAll("#extend_nav a");
	for (var i=0; i<links.length; i++){
		links[i].style.transition = "top 0.4s linear 0s, opacity 0.2s linear " + (0.15+0.06*i) + "s, transform 0.2s linear " + (0.08+0.08*i) + "s"
	}
}

function setAnimationEventListener(){
	var bar = document.getElementById("bar_btn");
	var x_btn = document.getElementById("close_btn");
	
	function removeAnimation(){this.classList.remove("spin")}
	bar.addEventListener('animationend', removeAnimation, false);
	x_btn.addEventListener('animationend', removeAnimation, false);
}

function setWillChange(){
	var to_blur = document.querySelectorAll("body > *:not(#extend_nav)");
	for(var i=0;i<to_blur.length; i++){
		to_blur[i].style.willChange = "filter";
	}
}