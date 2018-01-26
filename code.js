const display_shown = symbol.controllers.display.elements.shown;
const display_hidden = symbol.controllers.display.elements.hidden;
const target = symbol.nodes.target;

//detect if the cat has been tapped on and whether the prompt UI should be activated
let catTapped = false;

//store the cat's skin textures in an array
let cats = [symbol.controllers.catType.elements.white,
symbol.controllers.catType.elements.black, 
symbol.controllers.catType.elements.ginger,
symbol.controllers.catType.elements.silver, 
symbol.controllers.catType.elements.tabby,
symbol.controllers.catType.elements.birman];

let cat = 5; 

//calculate a random number from the cats array 
let randomCat = Math.floor((Math.random() * cat));
Z.HeadsetManager();

//activate a random cat each time the card is scanned
parent.on("ready", ()=>{
    cats[randomCat].activate();
});

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
    symbol.controllers.main.elements.jump.play();
});

symbol.controllers.main.elements.jump.on("complete", () => {
    if(catTapped == false){
       symbol.controllers.fingerPrompt.elements.on.play();
    }
    else{
        symbol.controllers.fingerPrompt.elements.off.activate();
    }
    symbol.controllers.main.elements.lookAround.play();
});

//change the cat's skin texture when the user presses the invisible hotspot plane above the cat
symbol.nodes.hotspot.on("pointerdown", (e) => {
    changeCat();
    symbol.controllers.fingerPrompt.elements.off.activate();
    catTapped = true;
});

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


//loop hand prompt
symbol.controllers.fingerPrompt.elements.on.on("complete", () => {
	symbol.controllers.fingerPrompt.elements.on.labels.loop.play();
});
