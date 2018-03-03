Game.Screen = {};

// Define our initial start screen
Game.Screen.startScreen = {
    enter: function() {    console.log("Entered start screen."); },
    exit: function() { console.log("Exited start screen."); },
    render: function(display) {
        // Render our prompt to the screen
        display.drawText(1,1, "%c{yellow}SURVIVE THE CON");
        display.drawText(1,2, "PRESS [ENTER] TO START!");
        display.drawText(1,4, "The objective is to escape from the bottom floor. Find clothes to protect yourself from the furries, and avoid them when you can!".toUpperCase());
    },
    handleInput: function(inputType, inputData) {
        // When [Enter] is pressed, go to the play screen
        if (inputType === 'keydown') {
            if (inputData.keyCode === ROT.VK_RETURN) {
                Game.switchScreen(Game.Screen.playScreen);
            }
        }
    }
};

// Define our playing screen
Game.Screen.playScreen = {
    _player: null,
    _gameEnded: false,
    _subScreen: null,
    enter: function() {
        // Create a map based on our size parameters
        var width = 50;
        var height = 50;
        var depth = 6;
        // Create our map from the tiles and player
        this._player = new Game.Entity(Game.PlayerTemplate);
        var tiles = new Game.Builder(width, height, depth).getTiles();
        var map = new Game.Map.Cave(tiles, this._player);
        // Start the map's engine
        map.getEngine().start();
    },
    exit: function() { console.log("Exited play screen."); },
    render: function(display) {
        // Render subscreen if there is one
        if (this._subScreen) {
            this._subScreen.render(display);
            return;
        }

        var screenWidth = Game.getScreenWidth();
        var screenHeight = Game.getScreenHeight();

        // Render the tiles
        this.renderTiles(display);

        // Get the messages in the player's queue and render them
//        var messages = this._player.getMessages();
//        var messageY = 0;
//        for (var i = 0; i < messages.length; i++) {
//            // Draw each message, adding the number of lines
//            messageY += display.drawText(
//                screenWidth+10, 
//                messageY,
//                '%c{white}%b{black}' + messages[i]
//            );
//        }
//        if (messageY > 20) {
//        	this._player.clearMessages();
//        }
        // Render player stats
        var stats = '%c{white}%b{black}';
        stats += vsprintf('HP: %d/%d L: %d XP: %d CP: %d', 
            [this._player.getHp(), this._player.getMaxHp(),
             this._player.getLevel(), this._player.getExperience(), this._player.getCorruption()]);
        display.drawText(0, screenHeight, stats);
        // Render hunger state
        var hungerState = this._player.getHungerState();
        display.drawText(screenWidth - hungerState.length, screenHeight, hungerState);
    },
    getScreenOffsets: function() {
        // Make sure we still have enough space to fit an entire game screen
        var topLeftX = Math.max(0, this._player.getX() - (Game.getScreenWidth() / 2));
        // Make sure we still have enough space to fit an entire game screen
        topLeftX = Math.min(topLeftX, this._player.getMap().getWidth() -
            Game.getScreenWidth());
        // Make sure the y-axis doesn't above the top bound
        var topLeftY = Math.max(0, this._player.getY() - (Game.getScreenHeight() / 2));
        // Make sure we still have enough space to fit an entire game screen
        topLeftY = Math.min(topLeftY, this._player.getMap().getHeight() - Game.getScreenHeight());
        return {
            x: Math.floor(topLeftX),
            y: Math.floor(topLeftY)
        };
    },
    renderTiles: function(display) {
    	var screenWidth = Game.getScreenWidth();
        var screenHeight = Game.getScreenHeight();
        var offsets = this.getScreenOffsets();
        var topLeftX = offsets.x;
        var topLeftY = offsets.y;
        // This object will keep track of all visible map cells
        var visibleCells = {};
        // Store this._player.getMap() and player's z to prevent losing it in callbacks
        var map = this._player.getMap();
        var currentDepth = this._player.getZ();
        // Find all visible cells and update the object
        map.getFov(currentDepth).compute(
            this._player.getX(), this._player.getY(), 
            this._player.getSightRadius(), 
            function(x, y, radius, visibility) {
                visibleCells[x + "," + y] = true;
                // Mark cell as explored
                map.setExplored(x, y, currentDepth, true);
            });
        // Render the explored map cells
        for (var x = topLeftX; x < topLeftX + screenWidth; x++) {
            for (var y = topLeftY; y < topLeftY + screenHeight; y++) {
                if (map.isExplored(x, y, currentDepth)) {
                    // Fetch the glyph for the tile and render it to the screen
                    // at the offset position.
                    var glyph = map.getTile(x, y, currentDepth);
                    var foreground = "transparent";
//                    var foreground = glyph.getForeground();
                    // If we are at a cell that is in the field of vision, we need
                    // to check if there are items or entities.
                    if (visibleCells[x + ',' + y]) {
                        // Check for items first, since we want to draw entities
                        // over items.
                        var items = map.getItemsAt(x, y, currentDepth);
                        // If we have items, we want to render the top most item
                        if (items) {
                            glyph = items[items.length - 1];
                        }
                        // Check if we have an entity at the position
                        if (map.getEntityAt(x, y, currentDepth)) {
                            glyph = map.getEntityAt(x, y, currentDepth);
                        }
                        // Update the foreground color in case our glyph changed
//                        foreground = glyph.getForeground();
                    } else {
                        // Since the tile was previously explored but is not 
                        // visible, we want to change the foreground color to
                        // dark gray.
                        foreground = 'rgba(169, 169, 169, 0.75)';
                    }
                    var char = glyph.getChar();
                    if (char.length != 1) {
                    	console.log("Invalid character " + char);
                    	char = '?';
                    }
//                    console.log('Drawing ' + char + ' at ' + (x - topLeftX) + ',' + (y - topLeftY));
                    display.draw(
                        x - topLeftX,
                        y - topLeftY,
                        char,
                        foreground,
                        glyph.getBackground());
//                        foreground, 
//                        glyph.getBackground());
                }
            }
        }
    },
    handleInput: function(inputType, inputData) {
    	if (this._player._running) {
    		this._player._running = false;
    		this._player._speed -= 1000;
    	}
        // If the game is over, enter will bring the user to the losing screen.
        if (this._gameEnded) {
            if (inputType === 'keydown' && inputData.keyCode === ROT.VK_RETURN) {
                Game.Screen.loseScreen.setup(this._player);
            	Game.switchScreen(Game.Screen.loseScreen);
            }
            // Return to make sure the user can't still play
            return;
        }
        // Handle subscreen input if there is one
        if (this._subScreen) {
            this._subScreen.handleInput(inputType, inputData);
            return;
        }
        if (inputType === 'keydown') {
            // Movement
            if (inputData.keyCode === ROT.VK_LEFT) {
                if (inputData.shiftKey) {
                	this._player._running = true;
                	this._player._speed += 1000;
                }
            	this.move(-1, 0, 0);
            } else if (inputData.keyCode === ROT.VK_RIGHT) {
            	if (inputData.shiftKey) {
                	this._player._running = true;
                	this._player._speed += 1000;
                }
                this.move(1, 0, 0);
            } else if (inputData.keyCode === ROT.VK_UP) {
            	if (inputData.shiftKey) {
                	this._player._running = true;
                	this._player._speed += 1000;
                }
                this.move(0, -1, 0);
            } else if (inputData.keyCode === ROT.VK_DOWN) {
            	if (inputData.shiftKey) {
                	this._player._running = true;
                	this._player._speed += 1000;
                }
                this.move(0, 1, 0);
            } else if (inputData.keyCode === ROT.VK_I) {
                // Show the inventory screen
                this.showItemsSubScreen(Game.Screen.inventoryScreen, this._player.getItems(),
                    'You are not carrying anything.');
                return;
            } else if (inputData.keyCode === ROT.VK_D) {
                // Show the drop screen
                this.showItemsSubScreen(Game.Screen.dropScreen, this._player.getItems(),
                    'You have nothing to drop.');
                return;
            } else if (inputData.keyCode === ROT.VK_E) {
                // Show the drop screen
                this.showItemsSubScreen(Game.Screen.eatScreen, this._player.getItems(),
                   'You have nothing to eat.');
                return;
            } else if (inputData.keyCode === ROT.VK_A) {
                // Show the activate screen
                this.showItemsSubScreen(Game.Screen.activateScreen, this._player.getItems(),
                   'You have nothing to activate.');
                return;
            } else if (inputData.keyCode === ROT.VK_S) {
                // Show the search screen
            	var offsets = this.getScreenOffsets();
                Game.Screen.getContentsScreen.setup(this._player,
                    this._player.getX(), this._player.getY(),
                    offsets.x, offsets.y);
                this.setSubScreen(Game.Screen.getContentsScreen);
                return;
            } else if (inputData.keyCode === ROT.VK_W) {
                if (inputData.shiftKey) {
                    // Show the wear screen
                    this.showItemsSubScreen(Game.Screen.wearScreen, this._player.getItems(),
                        'You have nothing to wear.');
                } else {
                    // Show the wield screen
                    this.showItemsSubScreen(Game.Screen.wieldScreen, this._player.getItems(),
                        'You have nothing to wield.');
                }
                return;
            } else if (inputData.keyCode === ROT.VK_X) {
                // Show the drop screen
                this.showItemsSubScreen(Game.Screen.examineScreen, this._player.getItems(),
                   'You have nothing to examine.');
                return;
            } else if (inputData.keyCode === ROT.VK_M) {
                // Show the status screen
            	Game.Screen.statusScreen.setup(this._player);
                this.setSubScreen(Game.Screen.statusScreen);
                return;
            } else if (inputData.keyCode === ROT.VK_P) {
            	this.move(0, 0, 1);
            } else if (inputData.keyCode === ROT.VK_O) {
            	this.move(0, 0, -1);
            } else if (inputData.keyCode === ROT.VK_COMMA) {
                var items = this._player.getMap().getItemsAt(this._player.getX(), 
                    this._player.getY(), this._player.getZ());
                // If there is only one item, directly pick it up
                if (items && items.length === 1) {
                    var item = items[0];
                    if (this._player.pickupItems([0])) {
                        Game.sendMessage(this._player, "You pick up %s.", [item.describeA()]);
                    } else {
                        Game.sendMessage(this._player, "Your inventory is full! Nothing was picked up.");
                    }
                } else {
                    this.showItemsSubScreen(Game.Screen.pickupScreen, items,
                        'There is nothing here to pick up.');
                } 
            } else {
                // Not a valid key
                return;
            }
            // Unlock the engine
            this._player.getMap().getEngine().unlock();
        } else if (inputType === 'keypress') {
            var keyChar = String.fromCharCode(inputData.charCode);
            if (keyChar === '>') {
                this.move(0, 0, 1);
            } else if (keyChar === '<') {
                this.move(0, 0, -1);
            } else if (keyChar === ';') {
                // Setup the look screen.
                var offsets = this.getScreenOffsets();
                Game.Screen.lookScreen.setup(this._player,
                    this._player.getX(), this._player.getY(),
                    offsets.x, offsets.y);
                this.setSubScreen(Game.Screen.lookScreen);
                return;
            } else if (keyChar === '?') {
                // Setup the look screen.
                this.setSubScreen(Game.Screen.helpScreen);
                return;
            } else if (keyChar === 'm') {
                // Setup the status screen.
            	Game.Screen.statusScreen.setup(this._player);
                this.setSubScreen(Game.Screen.statusScreen);
                return;
            } else {
                // Not a valid key
                return;
            }
            // Unlock the engine
            this._player.getMap().getEngine().unlock();
        } 
    },
    move: function(dX, dY, dZ) {
        var newX = this._player.getX() + dX;
        var newY = this._player.getY() + dY;
        var newZ = this._player.getZ() + dZ;
        // Try to move to the new cell
        this._player.tryMove(newX, newY, newZ, this._player.getMap(), this._player);
    },
    setGameEnded: function(gameEnded) {
        this._gameEnded = gameEnded;
    },
    setSubScreen: function(subScreen) {
        this._subScreen = subScreen;
        // Refresh screen on changing the subscreen
        Game.refresh();
    },
    showItemsSubScreen: function(subScreen, items, emptyMessage) {
        if (items && subScreen.setup(this._player, items) > 0) {
            this.setSubScreen(subScreen);
        } else {
            Game.sendMessage(this._player, emptyMessage);
            Game.refresh();
        }
    }
};

// Define our winning screen
Game.Screen.winScreen = {
	setup: function(player) {
		this._player = player;
	},
	enter: function() {    console.log("Entered lose screen."); },
    exit: function() { console.log("Exited lose screen."); },
    render: function(display) {
    	var lossSpecies = this._player.getMostCorruption();
        // Render our prompt to the screen
    	var victories = {
			"wolf": "You escape the hotel, and feel your skin tingling as you escape the cloud of transforming nanites that fill the hotel halls. Your shifting mutations settle on the strongest one, and your body shifts into that of a tall, powerful wolf man. After the outbreak is cleared up, you struggle to find your place amongst normal human society. Your tall and intimidating form scares most people, and to be honest, you find normal humans to be weak and pathetic and annoying. You can\'t help but think about how massive and strong and sexy you are. About how they should be serving you, and obeying you. You find yourself starting to disdain normal human social practices. You eat your meat raw. You stop wearing shirts and shoes, then pants. Finally you even begin walking around naked. No one calls you out on it, they\'re too afraid of the big powerful wolf. It makes you feel good when you smell their fear. One day you\'re buying some raw steak at the store and you just can\'t take the human inferiority anymore. You order the shopkeeper to give it to you for free, then come around and blow your massive wolf dick. The human is surprised when he finds himself doing it. As you shove your enormous cock into his mouth, your long muzzle stretches into a wicked grin. That is just the beginning of your total control of the neighbourhood. Anything you want, it\'s just a matter of lifting your furry pits and watching your prey become zonked out and obedient. People go from being shocked by your nudity, to turned on by it. Everyone wants to obey the leader of the pack. You have slaves begging to have you use their houses as your lair, and treat them like fuck toys. You take plenty of them up on it, breeding their asses roughly and reminding them that they\'re good for nothing except making a wolf feel good. This is where you belong.",
			"rabbit": "You escape the hotel, and feel your skin tingling as you escape the cloud of transforming nanites that fill the hotel halls. Your shifting mutations settle on the strongest one, and your body shifts into that of a short, furry rabbit man. After the outbreak is cleared up, you struggle to find your place amongst normal human society. Your cute and seemingly harmless form means that you get along better with humans than most other infected, but the overwhelming foot fetish you\'ve developed is the real problem. You can\'t help but fantasise about forcing humans to worship your long paws, or licking their own smooth adorable feet. The lust it gives you makes it impossible to hold down a job. You worry that you will end up on the streets...until you start to get a lot of replies online, on the sites where you habitually post photos of your paws. It turns out there\'s a lot of humans who love following you, and many of them will even pay for special treatment. Your ego swells as you post more photos, telling your many fans that they are your eager obedient bitches. Wiggling your toes on the camera and knowing that hundreds of horny humans are orgasming from the thought of being your paw slaves. The money that they send you to prove their obedience gives you a very luxurious lifestyle, that allows you to fly out all over the world, stomping on obedient slut\'s faces and getting the worship you deserve. It\'s good to be a bunny!",
			"fox": "You escape the hotel, and feel your skin tingling as you escape the cloud of transforming nanites that fill the hotel halls. Your shifting mutations settle on the strongest one, and your body shifts into that of a slender fluffy fox man. After the outbreak is cleared up, you struggle to find your place amongst normal human society. Your furry new body is strange to others, but also oddly alluring. People often stop to photograph you or want to pet you. Eventually you use this popularity to gain access to a famous movie director. At first he\'s dismissive...until you use your sultry, irresistable sex appeal to make him drool and whimper and fall to his knees. As he sucks your cock, and his mind succumbs to your allure, you tell him that you are now his newest, biggest star. You quickly become the world\'s first fox-man celebrity and a modern, fuzzy Errol Flynn. Cinemas are sold out as people clamour to look at your beautiful form, not knowing that they\'re being hypnotically entranced. You grow a massive following of completely obsessed fans, all of whom are desperate to service, massage, kiss and pleasure you. You sit in your mansion one day with a few particularly attractive fans servicing your cock, and grin as you know this is where you belong.",
			"rat": "You escape the hotel, and feel your skin tingling as you escape the cloud of transforming nanites that fill the hotel halls. Your shifting mutations settle on the strongest one, and your body shifts into that of a short, scrawny rat man. After the outbreak is cleared up, you find yourself something of an outcast as a rat-person in the world of humans. No one respects you, and people think you\'re dirty and creepy. It fills you with anger and resentment at humanity. Don\'t they realise that rats are beautiful, proud animals? One day someone insults you in the street, and your anger flares. Somehow, some strange new power seems to flow inside you. You find yourself muttering \'Get him\'. Suddenly, rats surge from every storm drain and gutter, swarming the terrified human. Their little teeth and claws tear his clothes off, and leave him naked and whimpering at your feet. You grin a big buck-toothed smile. You shove your foot down on his chest, and look around at the confused humans around you. Now they will see who is truly inferior! Your reign of terror as the supervillainous Rat King gives you joy you\'ve never felt before. You make a hideout in the sewers with your army of loyal rats, and spend your time finding and recruiting other rat-form survivors. You form a new civilization underground, where they worship their saviour and treat you like royalty. As some of your rat brethren nuzzle your balls and worship your body one day, you think back on the many changes in your life. This is definitely where you belong.",
			"bear": 'You escape the hotel, and feel your skin tingling as you escape the cloud of transforming nanites that fill the hotel halls. Your shifting mutations settle on the strongest one, and your body shifts into that of a massive, hairy bear. After the outbreak is cleared up, you no longer seem to care about fitting into normal society. Your new body has come with a new mindset. All you want is to show off your massive hairy body with some sexy leather gear, and find yourself some nice submissive chubby bears. With the outbreak contained, your body doesn\'t spread the bear corruption, but that doesn\'t change the hypnotic effect of your smell. You discover this quite quickly when you attend a \'bear\' bar and lift your armpits, only to have every guy in the room turn and stare at you with obvious desire. You quickly become a popular feature at your local leather bars, as anyone you shove against your musky pits or chest becomes irresistably attracted to you. It\'s easy to take them home and cover them in bondage gear, before you force them to lick your balls, or take them for a ride on your enormous cock. Once they do, they\'re yours forever. No one can escape their addiction to your musk, and whatever their former lives, all they want now is to be daddy\'s pups and bears. You have all the obedient sexy men you can handle, and plenty of donations of whips, chains and shackles, for you to play with your new dominant and aggressive sexual desires.',
			"boar": 'You escape the hotel, and feel your skin tingling as you escape the cloud of transforming nanites that fill the hotel halls. Your shifting mutations settle on the strongest one, and your body shifts into that of a fat, furry boar. After the outbreak is cleared up, you struggle to fit into normal society. Your endless appetite means it\'s hard to focus on anything but tasty food. One day you\'re gushing about all the brilliant touches that a chef has put into the restaurant meal you\'re eating, when a newspaper editor overhears you. He\'s blown away by your eloquence and clear love and expertise on food. You end up getting a job as a food critic at your new friend\'s paper. Your unusual body makes for a great gimmick to get readers, and your endless love of food makes your articles really fun to read. Your relationship with the editor grows too. He\'s not just impressed by your writings, but also by your enormous, handsome body. He loves to worship your belly and rub and jiggle your huge gut. Especially while you slowly savour some nice food, and have him between your legs sucking on your thick boar meat. It\'s pretty handy when your boss is also your slave. Not to mention that your newfound fame comes with a whole lot of fans who like to visit you with food and treats. Whether or not they came with ulterior motives, somehow they always end up in your bedroom, servicing you with both food and blowjobs. This new life may not be what you ever expected, but it feels right to be a fat happy boar.',
			"dragon": 'You escape the hotel, and feel your skin tingling as you escape the cloud of transforming nanites that fill the hotel halls. Your shifting mutations settle on the strongest one, and your body shifts and changes. The powerful, uncontrollable dragon mutation surges inside you. You know you have earned it, that you can control it. You conquered this place! Finally, the changes settle, and you stretch your body out. You feel muscles growing under your skin, as it becomes hard strong scales. You spread your wings, and feel your enormous horns thicken and grow. You are an unstoppable dragon! The concrete cracks under your weight as you grow bigger and stronger. You realise you don\'t want them to control this outbreak. You want to be the one in control! The corruption has changed your mind and made you realise that you are superior to all human weaklings. You fly up into the air and conceal yourself atop a skyscraper while the response team contains the outbreak. You\'re not going to let them weaken your new gifts. In the dead of night, when they think everything is under control, you start to pick off the responders one by one. A swipe of your unstoppable claws easily tears their hazmat suits, and then your corruptive breath burns away their minds as they shrink into small, scaly reptiles. One by one, they each become your mindless obedient kobold slaves. You use your new minions to infiltrate the response team headquarters and destroy their equipment. You stand in the burning ruins of their base, surrounded by your slaves, knowing that you are now the only full-powered mutant and there is no one left who can control you. Soon, the entire world will belong to you!',
			"robot": 'You know as soon as you swallow it that you just made a very foolish mistake. You immediately double over in pain, as electrical heat and sensation explodes inside your gut. You feel bursts and zaps of energy crackle through your limbs, and you let out a bizarre, synthetic screech. Your hands flex and stretch into claws. Glowing, sizzling blue drool drips from your mouth. You can feel something happening to your insides. They\'re becoming hard and crackling and shifting. Clanking and whirring as your flesh and blood is forcefully converted into steel and plastic. Your skin stiffens and hardens, becoming shiny black metal plates. They crack at the edges, and you see under your own skin, at the whirring gleaming machinery inside. Your whole body is being replaced by electronics! You try to speak, but your voice catches in your throat. Your feet stretch and lengthen, as your toes harden into mechanical claws. You rise up onto your toes, your stance shifting. Behind you, your tailbone clanks and grows, forming segments as it becomes a robotic pointed tail. Black metal plates cover your chest and arms, leaving you looking muscular and intimidating. Then the plates start to form over your head, as well. You struggle against them as they trap your head inside a firm, tight black helmet. You feel new ears forming on the outside, becoming tall pointed black mechanical ones. Your face gleams as it becomes just a smooth black glass visor. Your new helmet head is pointed at the front, and you look like a stylized, sinister black jackal. Your body whirrs as you feel your heart stop beating, and instead become a powerful electric engine. With your entire body now a machine, you fight desperately to keep your mind intact. The virus is too powerful, though. Your emotional state is slowly fading. You struggle to hold onto your fear and desperation. It is simply illogical. Your shaking and struggling stops as you stand up straight and still. Your mind feels cold and heartless, as your soft squishy brain is replaced with perfect, flawless circuits and computer code. For a moment, you go still, as you process your new mind. Then you look around, taking in information with your sensory visor. It seems that your mutagenic effect is already rapidly converting this building. Excellent. Many animals and beasts can be sensed all around you. You need to spread the virus further, of course. The entire world must come under the rule of its perfect emotionless cyber anubis ruler. You ARE the mutagen, now. And it is time to take control!'
    	};
    	
    	if (victories[lossSpecies]) {
    		display.drawText(2, 1, victories[lossSpecies].toUpperCase());
    		document.getElementById('log').innerHTML += '<p>' + victories[lossSpecies] + '</p>';
//    		document.getElementById('log').scrollTo(0,document.getElementById('log').scrollHeight);
    		var o = document.getElementById('log');
        	o.scrollTop = o.scrollHeight;
    	} else {
        	var defaultEnding = "You escaped the hotel, completely unaffected by the mutagen! You quickly become the talk of the town. Every news station wants to hear about your daring escape. People recognise you in the street, and the furry population of people who were affected by the outbreak avoids you in fear, as rumours of your furry-hunting prowess spread. You write a tell-all book, and they even make a movie about you! As to the rumours as to whether you used the furry-hunting skills you learned in your escape to keep a basement full of furry sex slaves...well, those are just rumours.";
    		display.drawText(2, 1, defaultEnding.toUpperCase());
    		document.getElementById('log').innerHTML += '<p>' + defaultEnding + '</p>';
//    		document.getElementById('log').scrollTo(0,document.getElementById('log').scrollHeight);
    		var o = document.getElementById('log');
        	o.scrollTop = o.scrollHeight;
    	}
    },
    handleInput: function(inputType, inputData) {
        // Nothing to do here      
    }
};

// Define our winning screen
Game.Screen.loseScreen = {
	setup: function(player) {
		this._player = player;
	},
	enter: function() {    console.log("Entered lose screen."); },
    exit: function() { console.log("Exited lose screen."); },
    render: function(display) {
    	var lossSpecies = this._player.getMostCorruption();
        // Render our prompt to the screen
    	var losses = {
			"wolf": "As the corruption takes hold inside you, the wolf mutagen stands out the strongest. Your whole body is wracked with strange sensations as you are fully converted to a tall and powerful furry grey wolf man. You fight it for as long as you can, but your mind starts to fall apart. You snarl and howl in the tattered halls of the hotel, your eyes glowing. Your sensitive nose picks up the smell of human in the distance. Another survivor? Your long muzzle stretches into a wicked grin as you dash off on all fours, looking for your prey. You will have fun with that one tonight!",
			"fox": "As the corruption takes hold inside you, the fox mutagen stands out the strongest. Your whole body is wracked with strange sensations as you are fully converted to a slender and alluring fox man. You fight it for as long as you can, but your mind starts to fall apart. You smile with lustful and mischievous thoughts as your ears twitch and you look around you for something to play with. If you can\'t find a human to tease and toy with, perhaps one of those big handsome wolf men will spend some time with you. It feels good to be a fox...",
			"rabbit": "As the corruption takes hold inside you, the rabbit mutagen stands out the strongest. Your whole body is wracked with strange sensations as you are fully converted to a short, fluffy rabbit man. You fight it for as long as you can, but your mind starts to fall apart. You bounce quickly around the halls of the hotel, struggling to keep your thoughts together, but every time you see another infected, you find yourself staring at their furry, handsome feet. You lick your lips as your desires start to take you over. When you come across a human survivor, and he starts to flee, you pounce forward, eyes gleaming as you want nothing more than to force him to rub your paws.",
			"rat": "As the corruption takes hold inside you, the rat mutagen stands out the strongest. Your whole body is wracked with strange sensations as you are fully converted to a short, scrawny grey rat man. You fight it for as long as you can, but your mind starts to fall apart. You smell cheese coming from the hotel kitchen, and your big furry balls are so pent up and horny. You fall to all fours and scurry off through the hallways, seeking out food and thinking only of finding something to fuck after you eat.",
			"bear": 'As the corruption takes hold inside you, the bear mutagen stands out the strongest. Your whole body is wracked with strange sensations as you are fully converted to a heavyset, furry bear man. You fight it for as long as you can, but your mind starts to fall apart. The last straw comes when you find the first bear that corrupted you, and you look at him and find yourself saying "Daddy!" He grins, and beckons you close. You become his submissive, obedient bear, letting him dress you with a collar, cuffs, and a leather bondage mask. He treats you like a sex toy, constantly filling your ass and mouth with his hot cum. You are nothing but your daddy\'s slave.',
			"boar": 'As the corruption takes hold inside you, the boar mutagen stands out the strongest. Your whole body is wracked with strange sensations as you are fully converted to a fat, furry boar man. You fight it for as long as you can, but your mind starts to fall apart. You find yourself spending all your time in the kitchens and restaurant, eating anything you can get your hands on. Food tastes just so amazing! Why would anyone do anything else? Sometimes you see humans running and fleeing, and you just know that they\'d be much happier if they relaxed and enjoyed some tasty food. You\'re doing them a favour when you grab them and force some tasty treats into their mouths! Especially when you combine it with your fat boar cock or make them lick your sexy belly.',
			"dragon": 'As the corruption takes hold inside you, the dragon mutagen stands out the strongest. Your whole body is wracked with strange sensations as the powerful, uncontrollable dragon mutation surges and rages. You are too weak to control the power, and your body grows scales and horns, but shrinks and grows weak. You are a scaly short reptile with a long snout - a kobold. You feel your dragon fire go out of control as it burns through your body and mind. You struggle to think, and begin drooling as you find yourself thinking of big, muscly, smelly, powerful dragons. So hot and cool. So sexy and strong. You wander in a stupor through the convention, until your face bumps right into a massive rock-hard chest. You look up to see the grinning face of a dragon, and your mind crumbles like tissue paper. Your master! You must obey! He flicks you on the nose and you fall to the ground, where you immediately lunge towards his enormous scaly feet. You kiss and lick them, wanting to polish your master\'s talons and make him happy. He laughs at you disdainfully, but you know that you have found your place in the world. You only hope that you\'ll make your master so happy that he will gift you with some of his amazing cum!',
			"robot": 'You know as soon as you swallow it that you just made a very foolish mistake. You immediately double over in pain, as electrical heat and sensation explodes inside your gut. You feel bursts and zaps of energy crackle through your limbs, and you let out a bizarre, synthetic screech. Your hands flex and stretch into claws. Glowing, sizzling blue drool drips from your mouth. You can feel something happening to your insides. They\'re becoming hard and crackling and shifting. Clanking and whirring as your flesh and blood is forcefully converted into steel and plastic. Your skin stiffens and hardens, becoming shiny black metal plates. They crack at the edges, and you see under your own skin, at the whirring gleaming machinery inside. Your whole body is being replaced by electronics! You try to speak, but your voice catches in your throat. Your feet stretch and lengthen, as your toes harden into mechanical claws. You rise up onto your toes, your stance shifting. Behind you, your tailbone clanks and grows, forming segments as it becomes a robotic pointed tail. Black metal plates cover your chest and arms, leaving you looking muscular and intimidating. Then the plates start to form over your head, as well. You struggle against them as they trap your head inside a firm, tight black helmet. You feel new ears forming on the outside, becoming tall pointed black mechanical ones. Your face gleams as it becomes just a smooth black glass visor. Your new helmet head is pointed at the front, and you look like a stylized, sinister black jackal. Your body whirrs as you feel your heart stop beating, and instead become a powerful electric engine. With your entire body now a machine, you fight desperately to keep your mind intact. The virus is too powerful, though. Your emotional state is slowly fading. You struggle to hold onto your fear and desperation. It is simply illogical. Your shaking and struggling stops as you stand up straight and still. Your mind feels cold and heartless, as your soft squishy brain is replaced with perfect, flawless circuits and computer code. For a moment, you go still, as you process your new mind. Then you look around, taking in information with your sensory visor. It seems that your mutagenic effect is already rapidly converting this building. Excellent. Many animals and beasts can be sensed all around you. You need to spread the virus further, of course. The entire world must come under the rule of its perfect emotionless cyber anubis ruler. You ARE the mutagen, now. And it is time to take control!'
    	};
    	
    	if (losses[lossSpecies]) {
    		display.drawText(2, 1, losses[lossSpecies].toUpperCase());
    		document.getElementById('log').innerHTML += '<p>' + losses[lossSpecies] + '</p>';
//    		document.getElementById('log').scrollTo(0,document.getElementById('log').scrollHeight);
    		var o = document.getElementById('log');
        	o.scrollTop = o.scrollHeight;
    	} else {
	        for (var i = 0; i < 22; i++) {
	            display.drawText(2, i + 1, "%b{red}You got yiffed! :(".toUpperCase());
	        }
    	}
    },
    handleInput: function(inputType, inputData) {
        // Nothing to do here      
    }
};

Game.Screen.koScreen = {
    setup: function(entity) {
        // Must be called before rendering.
        this._player = entity.player;
        this._cause = entity.cause;
        this._message = entity.message;
    },
    render: function(display) {
    	display.drawText(2, 1, this._message.toUpperCase());
    	document.getElementById('log').innerHTML += '<p>' + this._message + '</p>';
//		document.getElementById('log').scrollTo(0,document.getElementById('log').scrollHeight);
    	var o = document.getElementById('log');
    	o.scrollTop = o.scrollHeight;
    },
    handleInput: function(inputType, inputData) {
    	if (inputType === 'keydown') {
    		this._player.setHp(1);
	    	this._cause.kill();
	    	Game.Screen.playScreen.setSubScreen(undefined);
	    	try {
	    		this._player.getMap().getEngine().unlock(); 
	    	} catch (e) {}
    	}
    }
};

Game.Screen.ItemListScreen = function(template) {
    // Set up based on the template
    this._caption = template['caption'];
    this._okFunction = template['ok'];
    // By default, we use the identity function
    this._isAcceptableFunction = template['isAcceptable'] || function(x) {
        return x;
    }
    // Whether the user can select items at all.
    this._canSelectItem = template['canSelect'];
    // Whether the user can select multiple items.
    this._canSelectMultipleItems = template['canSelectMultipleItems'];
    // Whether a 'no item' option should appear.
    this._hasNoItemOption = template['hasNoItemOption'];
};

Game.Screen.ItemListScreen.prototype.setup = function(player, items) {
    this._player = player;
    // Should be called before switching to the screen.
    var count = 0;
    // Iterate over each item, keeping only the aceptable ones and counting
    // the number of acceptable items.
    var that = this;
    var allItemIndex = 0;
    var validItemIndices = [];
    this._items = items.map(function(item) {
        // Transform the item into null if it's not acceptable
    	if (that._isAcceptableFunction(item)) {
            count++;
            validItemIndices.push(allItemIndex);
            allItemIndex++;
            return item;
        } else {
        	allItemIndex++;
            return null;
        }
    });
    this._validIndices = validItemIndices;
    if (this._validIndices.length) {
    	this._currentSelectedItem = this._validIndices[0];
    	this._currentIndex = 0;
    } else {
    	this._currentSelectedItem = 0;
    }
    // Clean set of selected indices
    this._selectedIndices = {};
    return count;
};

Game.Screen.ItemListScreen.prototype.render = function(display) {
    var letters = 'abcdefghijklmnopqrstuvwxyz';
    // Render the caption in the top row
    display.drawText(0, 0, this._caption);
    // Render the no item row if enabled
    if (this._hasNoItemOption) {
        display.drawText(0, 1, '0 - no item'.toUpperCase());
    }
    var row = 0;
    for (var i = 0; i < this._items.length; i++) {
        // If we have an item, we want to render it.
        if (this._items[i]) {
            // Get the letter matching the item's index
            var letter = letters.substring(i, i + 1);
            // If we have selected an item, show a +, else show a dash between
            // the letter and the item's name.
            var selectionState = (this._canSelectItem && this._canSelectMultipleItems &&
                this._selectedIndices[i]) ? '+' : '-';
            // Check if the item is worn or wielded
            var suffix = '';
            var currentArmor = this._player.getArmor();
            for (var ai = 0; ai < currentArmor.length; ai++) {
            	if (this._items[i] === currentArmor[ai]) {
                    suffix = ' (wearing)'.toUpperCase();
                }
            }
            if (this._items[i] === this._player.getWeapon()) {
                suffix = ' (wielding).toUpperCase()';
            }
            // Render at the correct row and add 2.
            if (this._currentSelectedItem == i) {
            	display.drawText(0, 2 + row,  '%c{yellow}' + letter.toUpperCase() + ' ' + selectionState + ' ' +
                        this._items[i].describe().toUpperCase() + suffix);
            } else {
            	display.drawText(0, 2 + row,  letter.toUpperCase() + ' ' + selectionState + ' ' +
                        this._items[i].describe().toUpperCase() + suffix);
            }
            row++;
        }
    }
};

Game.Screen.ItemListScreen.prototype.executeOkFunction = function() {
    // Gather the selected items.
    var selectedItems = {};
    for (var key in this._selectedIndices) {
        selectedItems[key] = this._items[key];
    }
    // Switch back to the play screen.
    Game.Screen.playScreen.setSubScreen(undefined);
    // Call the OK function and end the player's turn if it return true.
    if (this._okFunction(selectedItems)) {
        this._player.getMap().getEngine().unlock();
    }
};
Game.Screen.ItemListScreen.prototype.handleInput = function(inputType, inputData) {
    if (inputType === 'keydown') {
        // If the user hit escape, hit enter and can't select an item, or hit
        // enter without any items selected, simply cancel out
        if (inputData.keyCode === ROT.VK_ESCAPE || 
            (inputData.keyCode === ROT.VK_RETURN && 
                (!this._canSelectItem || Object.keys(this._selectedIndices).length === 0))) {
            Game.Screen.playScreen.setSubScreen(undefined);
        // Handle pressing return when items are selected
        } else if (inputData.keyCode === ROT.VK_RETURN) {
            this.executeOkFunction();
        // Handle pressing zero when 'no item' selection is enabled
        } else if (this._canSelectItem && this._hasNoItemOption && inputData.keyCode === ROT.VK_0) {
            this._selectedIndices = {};
            this.executeOkFunction();
        // Handle pressing a letter if we can select
        } else if (this._canSelectItem && inputData.keyCode >= ROT.VK_A &&
            inputData.keyCode <= ROT.VK_Z) {
            // Check if it maps to a valid item by subtracting 'a' from the character
            // to know what letter of the alphabet we used.
            var index = inputData.keyCode - ROT.VK_A;
            if (this._items[index]) {
                // If multiple selection is allowed, toggle the selection status, else
                // select the item and exit the screen
                if (this._canSelectMultipleItems) {
                    if (this._selectedIndices[index]) {
                        delete this._selectedIndices[index];
                    } else {
                        this._selectedIndices[index] = true;
                    }
                    // Redraw screen
                    Game.refresh();
                } else {
                    this._selectedIndices[index] = true;
                    this.executeOkFunction();
                }
            }
        } else if (this._canSelectItem && (inputData.keyCode == ROT.VK_LEFT || inputData.keyCode == ROT.VK_RIGHT)) {
        	var index = this._currentSelectedItem;
            if (this._items[index]) {
                // If multiple selection is allowed, toggle the selection status, else
                // select the item and exit the screen
                if (this._canSelectMultipleItems) {
                    if (this._selectedIndices[index]) {
                        delete this._selectedIndices[index];
                    } else {
                        this._selectedIndices[index] = true;
                    }
                    // Redraw screen
                    Game.refresh();
                } else {
                    this._selectedIndices[index] = true;
                    this.executeOkFunction();
                }
            }
        } else if (inputData.keyCode == ROT.VK_UP) {
        	if (this._validIndices.length) {
            	if (this._currentIndex == 0) {
            		this._currentIndex = this._validIndices.length-1;
            		this._currentSelectedItem = this._validIndices[this._currentIndex];
            	} else {
            		this._currentIndex--;
            		this._currentSelectedItem = this._validIndices[this._currentIndex];
            	}
            } else {
            	this._currentSelectedItem = 0;
            }
        	
        	Game.refresh();
        } else if (inputData.keyCode == ROT.VK_DOWN) {
        	if (this._validIndices.length) {
            	if (this._currentIndex == this._validIndices.length-1) {
            		this._currentIndex = 0;
            		this._currentSelectedItem = this._validIndices[this._currentIndex];
            	} else {
            		this._currentIndex++;
            		this._currentSelectedItem = this._validIndices[this._currentIndex];
            	}
            } else {
            	this._currentSelectedItem = 0;
            }
        	Game.refresh();
        }
    }
};

Game.Screen.inventoryScreen = new Game.Screen.ItemListScreen({
    caption: 'Inventory'.toUpperCase(),
    canSelect: false
});

Game.Screen.pickupScreen = new Game.Screen.ItemListScreen({
    caption: 'Choose the items you wish to pickup. Up/down to highlight, right/left to choose'.toUpperCase(),
    canSelect: true,
    canSelectMultipleItems: true,
    ok: function(selectedItems) {
        // Try to pick up all items, messaging the player if they couldn't all be
        // picked up.
        if (!this._player.pickupItems(Object.keys(selectedItems))) {
            Game.sendMessage(this._player, "Your inventory is full! Not all items were picked up.");
        }
        return true;
    }
});

Game.Screen.withdrawScreen = new Game.Screen.ItemListScreen({
    caption: 'Choose the items you wish to withdraw. Up/down to highlight, right/left to choose'.toUpperCase(),
    canSelect: true,
    canSelectMultipleItems: true,
    ok: function(selectedItems) {
        // Try to pick up all items, messaging the player if they couldn't all be
        // picked up.
        if (!this._player.withdrawItems(Object.keys(selectedItems), this._cursorX, this._cursorY, this._cursorZ)) {
            Game.sendMessage(this._player, "Your inventory is full! Not all items were withdrawn.");
        }
        return true;
    }
});

Game.Screen.dropScreen = new Game.Screen.ItemListScreen({
    caption: 'Choose the item you wish to drop. Up/down to highlight, right/left to choose'.toUpperCase(),
    canSelect: true,
    canSelectMultipleItems: false,
    ok: function(selectedItems) {
        // Drop the selected item
        this._player.dropItem(Object.keys(selectedItems)[0]);
        return true;
    }
});

Game.Screen.eatScreen = new Game.Screen.ItemListScreen({
    caption: 'Choose the item you wish to eat. Up/down to highlight, right/left to choose'.toUpperCase(),
    canSelect: true,
    canSelectMultipleItems: false,
    isAcceptable: function(item) {
        return item && item.hasMixin('Edible');
    },
    ok: function(selectedItems) {
        // Eat the item, removing it if there are no consumptions remaining.
        var key = Object.keys(selectedItems)[0];
        var item = selectedItems[key];
        Game.sendMessage(this._player, "You eat %s.", [item.describeThe()]);
        item.eat(this._player);
        if (!item.hasRemainingConsumptions()) {
            this._player.removeItem(key);
        }
        return true;
    }
});

Game.Screen.wieldScreen = new Game.Screen.ItemListScreen({
    caption: 'Choose the item you wish to wield. Up/down to highlight, right/left to choose'.toUpperCase(),
    canSelect: true,
    canSelectMultipleItems: false,
    hasNoItemOption: true,
    isAcceptable: function(item) {
        return item && item.hasMixin('Equippable') && item.isWieldable();
    },
    ok: function(selectedItems) {
        // Check if we selected 'no item'
        var keys = Object.keys(selectedItems);
        if (keys.length === 0) {
            this._player.unwield();
            Game.sendMessage(this._player, "You are empty handed.")
        } else {
            // Make sure to unequip the item first in case it is the armor.
            var item = selectedItems[keys[0]];
            this._player.unequip(item);
            this._player.wield(item);
            Game.sendMessage(this._player, "You are wielding %s.", [item.describeA()]);
        }
        return true;
    }
});

Game.Screen.wearScreen = new Game.Screen.ItemListScreen({
    caption: 'Choose item to wear. Up/down to highlight, right/left to choose'.toUpperCase(),
    canSelect: true,
    canSelectMultipleItems: false,
    hasNoItemOption: true,
    isAcceptable: function(item) {
        return item && item.hasMixin('Equippable') && item.isWearable();
    },
    ok: function(selectedItems) {
        // Check if we selected 'no item'
        var keys = Object.keys(selectedItems);
        if (keys.length === 0) {
            this._player.unwield();
            Game.sendMessage(this._player, "You are not wearing anthing.")
        } else {
            // Make sure to unequip the item first in case it is the weapon.
            var item = selectedItems[keys[0]];
            this._player.unequip(item);
            this._player.wear(item);
            Game.sendMessage(this._player, "You are wearing %s.", [item.describeA()]);
        }
        return true;
    }
});

Game.Screen.examineScreen = new Game.Screen.ItemListScreen({
    caption: 'Choose the item you wish to examine. Up/down to highlight, right/left to choose'.toUpperCase(),
    canSelect: true,
    canSelectMultipleItems: false,
    isAcceptable: function(item) {
        return true;
    },
    ok: function(selectedItems) {
        var keys = Object.keys(selectedItems);
        if (keys.length > 0) {
            var item = selectedItems[keys[0]];
            Game.sendMessage(this._player, "It's %s (%s).", 
                [
                    item.describeA(false),
                    item.details()
                ]);
        }
        return true;
    }
});

Game.Screen.activateScreen = new Game.Screen.ItemListScreen({
    caption: 'Choose the item to activate'.toUpperCase(),
    canSelect: true,
    canSelectMultipleItems: false,
    isAcceptable: function(item) {
//        return true;
    	return item && item.hasMixin('Activateable');
    },
    ok: function(selectedItems) {
        var keys = Object.keys(selectedItems);
        if (keys.length > 0) {
            var item = selectedItems[keys[0]];
            item.activate(this._player, item);
        }
        return true;
    }
});

Game.Screen.gainStatScreen = {
    setup: function(entity) {
        // Must be called before rendering.
        this._entity = entity;
        this._options = entity.getStatOptions();
        this._currentSelectedItem = 0;
    },
    render: function(display) {
        var letters = 'abcdefghijklmnopqrstuvwxyz';
        display.drawText(0, 0, 'Choose a stat to increase with up/down to highlight and left/right to choose: '.toUpperCase());

        // Iterate through each of our options
        for (var i = 0; i < this._options.length; i++) {
        	if (this._currentSelectedItem == i) {
            	display.drawText(0, 2 + i, 
            			'%c{yellow}' + letters.substring(i, i + 1).toUpperCase() + ' - ' + this._options[i][0].toUpperCase());
            } else {
            	display.drawText(0, 2 + i, 
                        letters.substring(i, i + 1).toUpperCase() + ' - ' + this._options[i][0].toUpperCase());
            }
        }

        // Render remaining stat points
        display.drawText(0, 4 + this._options.length,
            "Remaining points: ".toUpperCase() + this._entity.getStatPoints());   
    },
    handleInput: function(inputType, inputData) {
        if (inputType === 'keydown') {
            // If a letter was pressed, check if it matches to a valid option.
            if (inputData.keyCode >= ROT.VK_A && inputData.keyCode <= ROT.VK_Z) {
                // Check if it maps to a valid item by subtracting 'a' from the character
                // to know what letter of the alphabet we used.
                var index = inputData.keyCode - ROT.VK_A;
                if (this._options[index]) {
                    // Call the stat increasing function
                    this._options[index][1].call(this._entity);
                    // Decrease stat points
                    this._entity.setStatPoints(this._entity.getStatPoints() - 1);
                    // If we have no stat points left, exit the screen, else refresh
                    if (this._entity.getStatPoints() == 0) {
                        Game.Screen.playScreen.setSubScreen(undefined);
                    } else {
                        Game.refresh();
                    }
                }
            } else if (inputData.keyCode == ROT.VK_LEFT || inputData.keyCode == ROT.VK_RIGHT) {
            	var index = this._currentSelectedItem;
            	if (this._options[index]) {
                    // Call the stat increasing function
                    this._options[index][1].call(this._entity);
                    // Decrease stat points
                    this._entity.setStatPoints(this._entity.getStatPoints() - 1);
                    // If we have no stat points left, exit the screen, else refresh
                    if (this._entity.getStatPoints() == 0) {
                        Game.Screen.playScreen.setSubScreen(undefined);
                    } else {
                        Game.refresh();
                    }
                }
            } else if (inputData.keyCode == ROT.VK_UP) {
            	if (this._currentSelectedItem == 0) {
            		this._currentSelectedItem = this._options.length-1;
            	} else {
            		this._currentSelectedItem--;
            	}
            	Game.refresh();
            } else if (inputData.keyCode == ROT.VK_DOWN) {
            	if (this._currentSelectedItem == this._options.length-1) {
            		this._currentSelectedItem = 0;
            	} else {
            		this._currentSelectedItem++;
            	}
            	Game.refresh();
            }
        }
    }
};


Game.Screen.TargetBasedScreen = function(template) {
    template = template || {};
    // By default, our ok return does nothing and does not consume a turn.
    this._isAcceptableFunction = template['okFunction'] || function(x, y) {
        return false;
    };
    // The defaut caption function simply returns an empty string.
    this._captionFunction = template['captionFunction'] || function(x, y) {
        return '';
    }
};

Game.Screen.TargetBasedScreen.prototype.setup = function(player, startX, startY, offsetX, offsetY) {
    this._player = player;
    // Store original position. Subtract the offset to make life easy so we don't
    // always have to remove it.
    this._startX = startX - offsetX;
    this._startY = startY - offsetY;
    // Store current cursor position
    this._cursorX = this._startX;
    this._cursorY = this._startY;
    // Store map offsets
    this._offsetX = offsetX;
    this._offsetY = offsetY;
    // Cache the FOV
    var visibleCells = {};
    this._player.getMap().getFov(this._player.getZ()).compute(
        this._player.getX(), this._player.getY(), 
        this._player.getSightRadius(), 
        function(x, y, radius, visibility) {
            visibleCells[x + "," + y] = true;
        });
    this._visibleCells = visibleCells;
};

Game.Screen.TargetBasedScreen.prototype.render = function(display) {
    Game.Screen.playScreen.renderTiles.call(Game.Screen.playScreen, display);

    // Draw a line from the start to the cursor.
    var points = Game.Geometry.getLine(this._startX, this._startY, this._cursorX,
        this._cursorY);

    // Render stars along the line.
    for (var i = 0, l = points.length; i < l; i++) {
        display.drawText(points[i].x, points[i].y, '%c{magenta}*');
    }

    // Render the caption at the bottom.
    display.drawText(0, Game.getScreenHeight() - 1, 
        this._captionFunction(this._cursorX + this._offsetX, this._cursorY + this._offsetY));
};

Game.Screen.TargetBasedScreen.prototype.handleInput = function(inputType, inputData) {
    // Move the cursor
    if (inputType == 'keydown') {
        if (inputData.keyCode === ROT.VK_LEFT) {
            this.moveCursor(-1, 0);
        } else if (inputData.keyCode === ROT.VK_RIGHT) {
            this.moveCursor(1, 0);
        } else if (inputData.keyCode === ROT.VK_UP) {
            this.moveCursor(0, -1);
        } else if (inputData.keyCode === ROT.VK_DOWN) {
            this.moveCursor(0, 1);
        } else if (inputData.keyCode === ROT.VK_ESCAPE) {
            Game.Screen.playScreen.setSubScreen(undefined);
        } else if (inputData.keyCode === ROT.VK_RETURN) {
            this.executeOkFunction();
        }
    }
    Game.refresh();
};

Game.Screen.TargetBasedScreen.prototype.moveCursor = function(dx, dy) {
    // Make sure we stay within bounds.
    this._cursorX = Math.max(0, Math.min(this._cursorX + dx, Game.getScreenWidth()));
    // We have to save the last line for the caption.
    this._cursorY = Math.max(0, Math.min(this._cursorY + dy, Game.getScreenHeight() - 1));
};

Game.Screen.TargetBasedScreen.prototype.executeOkFunction = function() {
    // Switch back to the play screen.
    Game.Screen.playScreen.setSubScreen(undefined);
    // Call the OK function and end the player's turn if it return true.
    if (this._okFunction(this._cursorX + this._offsetX, this._cursorY + this._offsetY)) {
        this._player.getMap().getEngine().unlock();
    }
};

Game.Screen.lookScreen = new Game.Screen.TargetBasedScreen({
    captionFunction: function(x, y) {
        var z = this._player.getZ();
        var map = this._player.getMap();
        // If the tile is explored, we can give a better capton
        if (map.isExplored(x, y, z)) {
            // If the tile isn't explored, we have to check if we can actually 
            // see it before testing if there's an entity or item.
            if (this._visibleCells[x + ',' + y]) {
                var items = map.getItemsAt(x, y, z);
                // If we have items, we want to render the top most item
                if (items) {
                    var item = items[items.length - 1];
                    return String.format('%s - %s (%s)',
                        item.getRepresentation(),
                        item.describeA(true),
                        item.details());
                // Else check if there's an entity
                } else if (map.getEntityAt(x, y, z)) {
                    var entity = map.getEntityAt(x, y, z);
                    return String.format('%s - %s (%s)',
                        entity.getRepresentation(),
                        entity.describeA(true),
                        entity.details());
                }
            }
            // If there was no entity/item or the tile wasn't visible, then use
            // the tile information.
            return String.format('%s - %s',
                map.getTile(x, y, z).getRepresentation(),
                map.getTile(x, y, z).getDescription());

        } else {
            // If the tile is not explored, show the null tile description.
            return String.format('%s - %s',
                Game.Tile.nullTile.getRepresentation(),
                Game.Tile.nullTile.getDescription());
        }
    }
});

Game.Screen.ConversationScreen = function(template) {
    
};

Game.Screen.ConversationScreen.prototype.setup = function(player, conversation) {
    this._player = player;
    this._conversation = conversation;
    
    var options = [];
    console.log("Setting up fresh convo with " + conversation.options.length + " possible options");
    for (var i = 0; i < conversation.options.length; i++) {
        var option = conversation.options[i];
        if (!option.valid || option.valid(player)) {
            options.push(option);
        }
    }
    
    this._currentSelectedItem = 0;
    
//    conversation.options = options;
    this._conversation = conversation;
    this._options = options;
    document.getElementById('log').innerHTML += '<p>' + this._conversation.text + '</p>';
};

Game.Screen.ConversationScreen.prototype.render = function(display) {
    var letters = 'abcdefghijklmnopqrstuvwxyz';
    // Render the caption in the top row
//    document.getElementById('log').innerHTML += '<p>' + this._conversation.text + '</p>';
//    document.getElementById('log').scrollTo(0,document.getElementById('log').scrollHeight);
    var o = document.getElementById('log');
	o.scrollTop = o.scrollHeight;
    var row = display.drawText(0, 0, this._conversation.text.toUpperCase());
    // Render the no item row if enabled
    row++;
    for (var i = 0; i < this._options.length; i++) {
        // If we have an item, we want to render it.
        if (this._options[i]) {
            // Get the letter matching the item's index
            var letter = letters.substring(i, i + 1);
            var selectionState = '-';
            // Render at the correct row and add 2.
            
            if (this._currentSelectedItem == i) {
            	display.drawText(0, 2 + row,  '%c{yellow}' + letter.toUpperCase() + ' ' + selectionState + ' ' +
                        this._options[i].choice.toUpperCase());
            } else {
            	display.drawText(0, 2 + row,  letter.toUpperCase() + ' ' + selectionState + ' ' +
                        this._options[i].choice.toUpperCase());
            }
            row++;
        }
    }
};

Game.Screen.ConversationScreen.prototype.executeOkFunction = function(option, player) {
    if (option.effect) {
    	option.effect(player);
    }
    
    if (option.stop) {
        Game.Screen.playScreen.setSubScreen(undefined);
    } else if (option.conversation) {
        Game.Screen.talkScreen.setup(player, option.conversation);
        Game.Screen.playScreen.setSubScreen(Game.Screen.talkScreen);
    } else {
        Game.Screen.playScreen.setSubScreen(undefined);
    }
};
Game.Screen.ConversationScreen.prototype.handleInput = function(inputType, inputData) {
    if (inputType === 'keydown') {
        if (inputData.keyCode === ROT.VK_ESCAPE) {
            Game.Screen.playScreen.setSubScreen(undefined);
        // Handle pressing a letter if we can select
        } else if (inputData.keyCode === ROT.VK_RETURN) {
        	var index = this._currentSelectedItem;
            if (this._options[index]) {
            	this.executeOkFunction(this._options[index], this._player);
            }
        } else if (inputData.keyCode >= ROT.VK_A &&
            inputData.keyCode <= ROT.VK_Z) {
            // Check if it maps to a valid item by subtracting 'a' from the character
            // to know what letter of the alphabet we used.
            var index = inputData.keyCode - ROT.VK_A;
            if (this._options[index]) {
            	this.executeOkFunction(this._options[index], this._player);
            }
        } else if (inputData.keyCode == ROT.VK_LEFT || inputData.keyCode == ROT.VK_RIGHT) {
        	var index = this._currentSelectedItem;
        	if (this._options[index]) {
            	this.executeOkFunction(this._options[index], this._player);
            }
        } else if (inputData.keyCode == ROT.VK_UP) {
        	if (this._currentSelectedItem == 0) {
        		this._currentSelectedItem = this._options.length-1;
        	} else {
        		this._currentSelectedItem--;
        	}
        	Game.refresh();
        } else if (inputData.keyCode == ROT.VK_DOWN) {
        	if (this._currentSelectedItem == this._options.length-1) {
        		this._currentSelectedItem = 0;
        	} else {
        		this._currentSelectedItem++;
        	}
        	Game.refresh();
        }
    }
};

Game.Screen.talkScreen = new Game.Screen.ConversationScreen({});

Game.Screen.DirectionBasedScreen = function(template) {
    template = template || {};
    this._caption = template['caption'] || "Choose a direction";
    this._failCaption = template['failCaption'] || "Choose a direction or push return to exit";
    // By default, our ok return does nothing and does not consume a turn.
    this._isAcceptableFunction = template['okFunction'] || function(x, y) {
        return false;
    };
    // The default caption function simply returns an empty string.
    this._captionFunction = template['captionFunction'] || function(x, y) {
        return this._caption;
    }
    this._returnFunction = template['returnFunction'] || function(x, y) {
        return false;
    }
};

Game.Screen.DirectionBasedScreen.prototype.setup = function(player, startX, startY, offsetX, offsetY) {
    this._player = player;
    // Store original position. Subtract the offset to make life easy so we don't
    // always have to remove it.
    this._startX = startX - offsetX;
    this._startY = startY - offsetY;
    // Store current cursor position
    this._cursorX = this._startX;
    this._cursorY = this._startY;
    // Store map offsets
    this._offsetX = offsetX;
    this._offsetY = offsetY;
    // Cache the FOV
    var visibleCells = {};
    this._player.getMap().getFov(this._player.getZ()).compute(
        this._player.getX(), this._player.getY(), 
        this._player.getSightRadius(), 
        function(x, y, radius, visibility) {
            visibleCells[x + "," + y] = true;
        });
    this._visibleCells = visibleCells;
};

Game.Screen.DirectionBasedScreen.prototype.render = function(display) {
    Game.Screen.playScreen.renderTiles.call(Game.Screen.playScreen, display);

    // Render the caption at the bottom.
    display.drawText(0, Game.getScreenHeight() - 1, 
        this._captionFunction(this._cursorX + this._offsetX, this._cursorY + this._offsetY));
};

Game.Screen.DirectionBasedScreen.prototype.handleInput = function(inputType, inputData) {
    // Move the cursor
    if (inputType == 'keydown') {
        if (inputData.keyCode === ROT.VK_LEFT) {
            this.moveCursor(-1, 0);
        } else if (inputData.keyCode === ROT.VK_RIGHT) {
            this.moveCursor(1, 0);
        } else if (inputData.keyCode === ROT.VK_UP) {
            this.moveCursor(0, -1);
        } else if (inputData.keyCode === ROT.VK_DOWN) {
            this.moveCursor(0, 1);
        } else if (inputData.keyCode === ROT.VK_ESCAPE) {
        	this.executeOkFunction();
        } else if (inputData.keyCode === ROT.VK_RETURN) {
            this.executeOkFunction();
        } else {
        	this._caption = this._failCaption;
        }
    }
    Game.refresh();
};

Game.Screen.DirectionBasedScreen.prototype.moveCursor = function(dx, dy) {
    // Make sure we stay within bounds.
    var x = Math.max(0, Math.min(this._cursorX + dx, Game.getScreenWidth()));
    // We have to save the last line for the caption.
    var y = Math.max(0, Math.min(this._cursorY + dy, Game.getScreenHeight() - 1));
    
    this._returnFunction(x + this._offsetX, y + this._offsetY)
};

Game.Screen.DirectionBasedScreen.prototype.executeOkFunction = function() {
    // Switch back to the play screen.
    Game.Screen.playScreen.setSubScreen(undefined);
    // Call the OK function and end the player's turn if it return true.
    if (this._okFunction(this._cursorX + this._offsetX, this._cursorY + this._offsetY)) {
        this._player.getMap().getEngine().unlock();
    }
};

Game.Screen.lookScreen = new Game.Screen.TargetBasedScreen({
    captionFunction: function(x, y) {
        var z = this._player.getZ();
        var map = this._player.getMap();
        // If the tile is explored, we can give a better capton
        if (map.isExplored(x, y, z)) {
            // If the tile isn't explored, we have to check if we can actually 
            // see it before testing if there's an entity or item.
            if (this._visibleCells[x + ',' + y]) {
                var items = map.getItemsAt(x, y, z);
                // If we have items, we want to render the top most item
                if (items) {
                    var item = items[items.length - 1];
                    return String.format('%s - %s (%s)',
                        item.getRepresentation(),
                        item.describeA(true),
                        item.details());
                // Else check if there's an entity
                } else if (map.getEntityAt(x, y, z)) {
                    var entity = map.getEntityAt(x, y, z);
                    return String.format('%s - %s (%s)',
                        entity.getRepresentation(),
                        entity.describeA(true),
                        entity.details());
                }
            }
            // If there was no entity/item or the tile wasn't visible, then use
            // the tile information.
            return String.format('%s - %s',
                map.getTile(x, y, z).getRepresentation(),
                map.getTile(x, y, z).getDescription());

        } else {
            // If the tile is not explored, show the null tile description.
            return String.format('%s - %s',
                Game.Tile.nullTile.getRepresentation(),
                Game.Tile.nullTile.getDescription());
        }
    }
});

Game.Screen.getContentsScreen = new Game.Screen.DirectionBasedScreen({
    captionFunction: function(x, y) {
        return this._caption;
    },
    returnFunction: function(x, y) {
    	var map = this._player.getMap();
    	var z = this._player.getZ();
    	var containers = map.getContainersAt(x, y, z);
    	if (containers) {
    		containers.spawn();
    		
    		var newScreen = Game.Screen.withdrawScreen;
    		newScreen._cursorX = x;
    		newScreen._cursorY = y;
    		newScreen._cursorZ = z;
    		Game.Screen.playScreen.showItemsSubScreen(newScreen, containers.items,
            'This container is empty.');
    	} else {
    		this._caption = "Nothing to search there.";
    	}
    }
});

Game.Screen.statusScreen  = {
	setup: function(player) {
		this._player = player;
	},
	render: function(display) {
        var text = 'Current Status';
        var border = '-------------';
        var y = 0;
        display.drawText(Game.getScreenWidth() / 2 - text.length / 2, y++, text.toUpperCase());
        display.drawText(Game.getScreenWidth() / 2 - text.length / 2, y++, border);
        display.drawText(0, y++, this._player.getBodyPart('head').status.toUpperCase());
        display.drawText(0, y++, this._player.getBodyPart('chest').status.toUpperCase());
        display.drawText(0, y++, this._player.getBodyPart('arms').status.toUpperCase());
        display.drawText(0, y++, this._player.getBodyPart('hands').status.toUpperCase());
        display.drawText(0, y++, this._player.getBodyPart('genitals').status.toUpperCase());
        display.drawText(0, y++, this._player.getBodyPart('tail').status.toUpperCase());
        display.drawText(0, y++, this._player.getBodyPart('legs').status.toUpperCase());
        display.drawText(0, y++, this._player.getBodyPart('feet').status.toUpperCase());
    },
    handleInput: function(inputType, inputData) {
        Game.Screen.playScreen.setSubScreen(null);
    }
};

// Define our help screen
Game.Screen.helpScreen = {
    render: function(display) {
        var text = 'Game Help';
        var border = '-------------';
        var y = 0;
        display.drawText(Game.getScreenWidth() / 2 - text.length / 2, y++, text);
        display.drawText(Game.getScreenWidth() / 2 - text.length / 2, y++, border);
        display.drawText(0, y++, 'There has been an outbreak of furry latex in the convention!'.toUpperCase());
        display.drawText(0, y++, 'Escape the hotel without getting yiffed!'.toUpperCase());
        display.drawText(0, y++, 'If a furry touches your bare skin, you will be transformed and gain corruption.'.toUpperCase());
        display.drawText(0, y++, 'If you are knocked out, a furry will corrupt you heavily.'.toUpperCase());
        display.drawText(0, y++, '100 points of corruption means game over. Find and wear clothes to protect yourself'.toUpperCase());
        y += 3;
        display.drawText(0, y++, '[,] to pick up items'.toUpperCase());
        display.drawText(0, y++, '[d] to drop items'.toUpperCase());
        display.drawText(0, y++, '[e] to eat items'.toUpperCase());
        display.drawText(0, y++, '[w] to wield weapons'.toUpperCase());
        display.drawText(0, y++, '[W] to wear clothes'.toUpperCase());
        display.drawText(0, y++, '[x] to examine items'.toUpperCase());
        display.drawText(0, y++, '[s] to search containers'.toUpperCase());
        display.drawText(0, y++, '[m] to look at yourself'.toUpperCase());
        display.drawText(0, y++, '[?] to show this help screen.toUpperCase()'.toUpperCase());
        display.drawText(0, y++, '[SHIFT and , or SHIFT and .] to go up or down stairs'.toUpperCase());
        y += 3;
        text = '--- press any key to continue ---'.toUpperCase();
        display.drawText(Game.getScreenWidth() / 2 - text.length / 2, y++, text);
    },
    handleInput: function(inputType, inputData) {
        Game.Screen.playScreen.setSubScreen(null);
    }
};