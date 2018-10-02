function linksHide(){
	$("#extend_nav a").each(function(i){
		$(this).css({
		"top": -50*(i+1) + "px",
		"opacity": "0.2",
		"transform": "rotateX(-90deg)" /* translateZ(-50px) */
	})
	});
}

function initLinks(){
	$('#extend_nav a').each(function(i){
		$(this).css("transition",
		"top 0.3s linear 0s, opacity 0.2s linear " + (0.15+0.06*i) + "s, transform 0.15s ease-out " + (0.08+0.06*i) + "s");
	});
}

function linksShow(){
	$("#extend_nav a").css({
		"top":"0px",
		"opacity": "1",
		"transform": "none"
		});
}

function setAnimationEventListener(){
	
	$(".nav_toggle").on('animationend', function(){$(this).removeClass("spin")});
	$(".dot_active").on('animationend', function(){$(this).removeClass("dot_transition")});
}


function setOnClick(){
	// extend_nav toggle
	$(".nav_toggle").click(function(){
		if(document.getElementById("extend_nav").style.marginTop != "0px"){
			$("#extend_nav").animate({"marginTop":"0px"}, 250, 'easeOutSine');
			$("#bar_btn").animate({"opacity": 0}, 250);
			$("#close_btn").animate({"opacity": 1}, 300);
			$(".page").addClass("shrink");
			setTimeout(function(){ $("body > *:not(#extend_nav)").addClass("blur")}, 150);
			linksShow();
		}
		else{
			$("#extend_nav").animate({"marginTop":"-100vh"}, 250);
			$("#bar_btn").animate({"opacity": 1}, 250);
			$("#close_btn").animate({"opacity": 0}, 300);
			$(".page").removeClass("shrink");
			$("body > *:not(#extend_nav)").removeClass("blur");
			linksHide();
		}
		$("#close_btn").addClass("spin");
		$("#bar_btn").addClass("spin");
	});
	
	// nav link onclick
	$("#extend_nav a").click(function(){
			var index = $("#extend_nav a").index($(this));
			$("#close_btn").click();
			$.scrollify.move(index)
	});
}



function setWillChange(){
	var to_blur = document.querySelectorAll("body > *:not(#extend_nav)");
	for(var i=0;i<to_blur.length; i++){
		to_blur[i].style.willChange = "filter";
	}
}

var current_pos=1;
function moveIndicator(i){
	var dot = $(".dot_active");
	var total_height = $("#indicator").height();
	var time = 300;
	if (i == current_pos){
		return;
	}
	else if(i > current_pos){
		dot.animate({
			"bottom": total_height - (Math.round(total_height/3*(i-0.5)) + 4) + "px",
		}, time);
		dot.animate({
			"top": Math.round(total_height/3*(i-0.5)) - 4 + "px",
		}, time);
	}
	else if(i < current_pos){
		dot.animate({
			"top": Math.round(total_height/3*(i-0.5)) - 4 + "px",
		}, time);
		dot.animate({
			"bottom": total_height - (Math.round(total_height/3*(i-0.5)) + 4) + "px",
		}, time);
	}
	current_pos = i;
	
}

function pageTransition(i){
	bg_a = $("#background_block_a");
	albums = $("#albums_container > div");

	
	if (i != 3){
		setTimeout(function(){ albums.css("opacity", 0) }, 500);
	}
	
	switch(i){
		case 1:
			bg_a.animate({
				"left": "0",
				"top": "0",
				"bottom": "0",
				"right": "0",
			}, "fast").delay(500).animate({
				"left": "10px",
				"top": "0",
				"bottom": "0",
				"right": "67%",
			}, "fast");
			break;
		case 2:
			bg_a.animate({
				"left": "30%",
				"top": "40%",
				"bottom": "45%",
				"right": "35%",
			});
			break;
		case 3:			
			bg_a.delay(250).animate({
				"left": "30%",
				"right": "30%",
				"top": "68%",
				"bottom": "17%",
			}).delay(300).animate({
				"left": "15%",
				"right": "15%",
			}, "slow", "swing"); // => 1550 milli
			
			setTimeout(function(){
				albums.animate({
					"opacity": "1",
				}, 600, "easeOutSine");
			}, 1400);
	}
}

$(document).ready(function(){
	initLinks();
	linksHide();
	setOnClick();
	setAnimationEventListener();
	setWillChange();
	
	$.scrollify({
		section: ".page",
		setHeights: false,
		scrollbars: false,
		before: function(index, sections){
			moveIndicator(index+1);
			setTimeout(function(){ pageTransition(index+1) }, 100);
		},
	});
	
	$(".album_img").hover(function(){
			$(this).find("h2").stop().animate({
				"opacity": "1",
			}, "fast");
			$(this).find(".overlay").stop().animate({
				"opacity": "0.6",
			}, 100);
		}, function(){
			$(this).find("h2").stop().animate({
				"opacity": "0",
			});
			$(this).find(".overlay").stop().animate({
				"opacity": "0",
			}, 100);
		});
	/*
	$(".album_img h2").stop().hover(function(){
			$(this).find("h2").animate({
				"opacity": "1",
			})
		}, function(){
			$(this).find("h2").animate({
				"opacity": "0",
			})
		});
	*/
	/*
	$.scrollify.move(0);
	moveIndicator(1);
	*/
});