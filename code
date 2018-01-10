const display_shown = symbol.controllers.display.elements.shown;
const display_hidden = symbol.controllers.display.elements.hidden;
const target = symbol.nodes.target;

parent.on("show", parent_show);
function parent_show() {
    display_hidden.reset();
    display_shown.activate();
}

parent.on("hide", parent_hide);
function parent_hide() {
	// Once we're fully hidden we should emit the "hidden" signal
	display_hidden.one("complete", function() {
	    symbol.emit("hidden");
	});
	
	display_hidden.activate();
}

//play the animation timeline when the target is seen and deactivate the look for prompt

target.on("seen", seen);

function seen(){
    symbol.controllers.main.elements.intro.play();  
    symbol.controllers.seenNotseen.elements.seen.activate();
    symbol.controllers.main.elements.jump.play();
    symbol.controllers.main.elements.lookAround.play();
    symbol.nodes.Look_For.nodes.code.deactivate();
}

//pause the animation timeline when the target is not seen and activate the look for prompt

target.on("notseen", notseen);

function notseen(){
    symbol.controllers.main.elements.intro.stop();
    symbol.controllers.seenNotseen.elements.notseen.activate();
    symbol.controllers.main.elements.jump.stop();
    symbol.controllers.main.elements.lookAround.stop();
    symbol.nodes.Look_For.nodes.code.activate();
}

//play the intro animation the first time the target is seen and deactivate the look for prompt
target.one("seen", firstseen);

function firstseen(){
    symbol.controllers.main.elements.intro.play();
    symbol.nodes.Look_For.nodes.code.deactivate();
}

//change the cat's jump animation when the intro animation cycle is complete
symbol.controllers.main.elements.intro.on("complete", () => {
    symbol.controllers.main.elements.jump.reset().play();
});

symbol.controllers.main.elements.jump.on("complete", () => {
    symbol.controllers.main.elements.lookAround.reset().play();
});

//change the cat's skin texture when the user presses the invisible hotspot plane above the cat
symbol.nodes.hotspot.on("pointerdown", (e) => {
    changeCat();
});

//store the cat's skin textures in an array
let cats = [symbol.controllers.catType.elements.white,
symbol.controllers.catType.elements.black, 
symbol.controllers.catType.elements.ginger,
symbol.controllers.catType.elements.silver, 
symbol.controllers.catType.elements.tabby,
symbol.controllers.catType.elements.birman];

let cat = 5; 

function changeCat() {
    cat += 1;
    if (cat >= cats.length) {
        cat = 0;
    }
    
    if (cat < 0) {
        cat = cats.length - 1;
    }
    cats[cat].activate();
   symbol.nodes.meow.restart(); // trigger the cat's sound effect
}
