/*
This sub-symbol is an animated prompt that appears on the left hand side of the screen and directs the user to look at the target image.

1. Drag and drop it into your symbol definitions
2. Drag and drop it into your hierarchy at the end.
3. In the references of the Look For, change the target_image to be a small thumbnail jpg of the poster.
*/

//if the target is not seen after the delay timeline has been completed(500 miliseconds), activate the prompt 
Z.node("root").on("ready",function(){
	Z.controller("X:delay").timeline("delay").time(0);
	Z.controller("X:delay").timeline("delay").play();
});

Z.controller("X:delay").timeline("delay").on("complete",function(){
	Z.controller("X:loop").timeline("loop").play();
	Z.controller("main").state("active").activate();
	});


//use the activate function in the "notseen" part of the main script to trigger the prompt - play the animation
export function activate(){
	Z.controller("X:delay").timeline("delay").time(0);
	Z.controller("X:delay").timeline("delay").play();
};

//use the deactivate function in the "seen" part of the main script to fade out the prompt - stop the timelines and hide the animation
export function deactivate(){
	Z.controller("X:loop").timeline("loop").stop();
	Z.controller("X:delay").timeline("delay").stop();
	Z.controller("main").state("inactive").activate();
};
