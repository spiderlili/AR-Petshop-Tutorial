# AR-Petshop-Tutorial
Follow this tutorial to create an Augmented Reality business card for a fictional petshop(selling cute cats!). You will find animation examples and learn how to implement functionalities such as changing the virtual pet's fur colour by tapping on it, linking websites, getting directions to the petshop location and calling the petshop owner. 

Hierarchy and structure:
Root > Trained tracking image target > content group with organised sub-groups(a square mask to hides parts of a scene, speech bubble graphics, buttons, title logo graphics, dog graphics, call to action graphics, tap prompt, sound effects and the cat model group), code script and "look for" prompt outside of the trained tracking image target content hierarhcy(this tells the user to look for the target image if they are looking away from it)

Controllers:
1. Main controller: contains the intro timeline to be played when the user first scans the target image, the jump timeline where the cat jumps into the scene and the lookAround timeline which is a seamless loop of the cat's idle animation.
2. Display controller: triggers the shown state with all the root content visible and enabled when the user is looking at the target, and the hidden state with all the root content invisible and disabled when the user is looking away.
3. catType controller: contains six different states of the virtual cat, the fur is changed to a different colour when the user taps on the cat model in the scene.

