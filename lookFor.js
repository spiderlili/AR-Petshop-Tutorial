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
