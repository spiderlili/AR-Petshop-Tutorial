/*
This sub-symbol is a little prompt that appears on the left hand side of the screen and directs the user to look at the target image.

1. Drag and drop it into your symbol definitions
2. Drag and drop it into your hierarchy at the end.
3. In the references of the Look For, change the target_image to be a small thumbnail jpg of the poster.
*/

Z.node("root").on("ready",function(){
	Z.controller("X:delay").timeline("delay").time(0);
	Z.controller("X:delay").timeline("delay").play();
});

Z.controller("X:delay").timeline("delay").on("complete",function(){
	Z.controller("X:loop").timeline("loop").play();
	Z.controller("main").state("active").activate();
	});

export function activate(){
	Z.controller("X:delay").timeline("delay").time(0);
	Z.controller("X:delay").timeline("delay").play();
};

export function deactivate(){
	Z.controller("X:loop").timeline("loop").stop();
	Z.controller("X:delay").timeline("delay").stop();
	Z.controller("main").state("inactive").activate();
};
