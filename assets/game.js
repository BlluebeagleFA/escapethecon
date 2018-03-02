var Game =  {
	_display: null,
    _currentScreen: null,
    _screenWidth: 40,
    _screenHeight: 24,
	init: function(img) {
		var calculatedScreenWidth = Math.floor((window.screen.width/16)*0.75);
		var calculatedScreenHeight = Math.floor((window.screen.height/16)*0.70)-1;
		
//		var ua = navigator.userAgent.toLowerCase();
//		var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
//		if(isAndroid) {
//			calculatedScreenWidth = Math.floor((window.innerWidth/16)*0.75);
//			calculatedScreenHeight = Math.floor((window.innerHeight/16)*0.70)-1;
//		}
//		if (calculatedScreenWidth < 40) {
//			calculatedScreenWidth = 40;
//		}
		this._screenWidth = calculatedScreenWidth;
		this._screenHeight = calculatedScreenHeight;
		var displayOptions = {
			width: calculatedScreenWidth,
			height: calculatedScreenHeight+1,
			layout: "tile",
			bg: "black",
			tileWidth: 16,
			tileHeight: 16,
			tileSet: img,
			tileColorize: true,
			tileMap: {
				"A": [16,160],
				"B": [32,160],
				"C": [48,160],
				"D": [64,160],
				"E": [80,160],
				"F": [96,160],
				"G": [112,160],
				"H": [128,160],
				"I": [144,160],
				"J": [160,160],
				"K": [176,160],
				"L": [192,160],
				"M": [208,160],
				"N": [224,160],
				"O": [240,160],
				"P": [0,176],
				"Q": [16,176],
				"R": [32,176],
				"S": [48,176],
				"T": [64,176],
				"U": [80,176],
				"V": [96,176],
				"W": [112,176],
				"X": [128,176],
				"Y": [144,176],
				"Z": [160,176],
				"!": [16,128],
				"?": [240,144],
				".": [224,128],
				",": [192,128],
				"[": [176,176],
				"]": [208,176],
				"(": [128,128],
				")": [144,128],
				":": [160,144],
				"0": [0,144],
				"1": [16,144],
				"2": [32,144],
				"3": [48,144],
				"4": [64,144],
				"5": [80,144],
				"6": [96,144],
				"7": [112,144],
				"8": [128,144],
				"9": [144,144],
				"/": [192,176],
				"£": [0,0], //chair
				"$": [16, 0], //table
				"%": [32, 0], //carpet
				"^": [48, 0], //tiles
				"j": [64, 0], //topleftbed
				"k": [80, 0], //toprightbed
				"y": [64, 16], //bottomleftbed
				"z": [80, 16], //bottomrightbed
				"&": [96, 0], //topbed
				"`": [96, 16], //bottombed
				"*": [112, 0],
				"a": [112, 16], //bathbottom
				"|": [0, 16], //toilet
				"¬": [16, 16], //sink
				"{": [32, 16], //fridge
				"}": [48, 16], //rubble
				"<": [0, 32], //upstairs
				">": [16, 32], //downstairs
				"#": [32, 32], //wall
				"b": [48, 32], //wardrobe
				"c": [64, 32], //potplant
				"d": [80, 32], //computer
				"e": [96, 32], //kitchentile
				"f": [112, 32], //bookshelf
				"g": [0, 48], //cupboard
				"h": [16, 48], //tablewithshelf
				"i": [32, 48], //elevator
				"@": [48, 48], //human male
//				"k": [64, 48], //human female
				"l": [80, 48], //rat
				"m": [96, 48], //fox
				"n": [112, 48], //wolf
				"o": [0, 64], //rabbit
				"p": [16, 64], //boar,
				"q": [32, 64], //cat,
				"r": [48, 64], //rob,
				"s": [64, 64], //owl,
				"t": [80, 64], //dog,
				"u": [96, 64], //dragon,
				"v": [112, 64], //bear,
				"+": [0, 80], //closed door
				"-": [16, 80], //open door
				"w": [32, 80],//raccoon
				"x": [48, 80],//slime
				" ": [0, 128],
				";": [176, 144],
				"'": [112, 128]
			}
		};
		
        // Any necessary initialization will go here.
        this._display = new ROT.Display(displayOptions);
        // Create a helper function for binding to an event
        // and making it send it to the screen
        var game = this; // So that we don't lose this
        
        var preventZoom = function(e) {
  		  var t2 = e.timeStamp;
  		  var t1 = e.currentTarget.dataset.lastTouch || t2;
  		  var dt = t2 - t1;
  		  var fingers = e.touches.length;
  		  e.currentTarget.dataset.lastTouch = t2;
  		
  		  if (!dt || dt > 500 || fingers > 1) return; // not double-tap
  		
  		  e.preventDefault();
  		  e.target.click();
      	}
        
        document.getElementById("commands").addEventListener('touchstart', preventZoom);
        
        var bindButtonToKey = function(element, code, shift, charCode) {
        	document.getElementById(element).addEventListener('touchstart', preventZoom);
        	document.getElementById(element).addEventListener(
    			'click', function(e) {
    				if (game._currentScreen !== null) {
                        game._currentScreen.handleInput("keydown", {
                        	keyCode: code,
                        	shiftKey: shift,
                        	charCode: charCode || "?"
                        });
                    }
    			}
    		);
        };
        bindButtonToKey('west', ROT.VK_LEFT);
        bindButtonToKey('north', ROT.VK_UP);
        bindButtonToKey('south', ROT.VK_DOWN);
        bindButtonToKey('east', ROT.VK_RIGHT);
        
        bindButtonToKey('up', ROT.VK_O);
        bindButtonToKey('down', ROT.VK_P);
        
        bindButtonToKey('ok', ROT.VK_RETURN);
        bindButtonToKey('cancel', ROT.VK_ESCAPE);
        
        bindButtonToKey('inventory', ROT.VK_I);
        bindButtonToKey('status', ROT.VK_M);
        bindButtonToKey('eat', ROT.VK_E);
        bindButtonToKey('wield', ROT.VK_W);
        bindButtonToKey('wear', ROT.VK_W, true);
        bindButtonToKey('get', ROT.VK_COMMA);
        bindButtonToKey('drop', ROT.VK_D);
        bindButtonToKey('use', ROT.VK_A);
        
        var bindEventToScreen = function(event) {
            window.addEventListener(event, function(e) {
                // When an event is received, send it to the
                // screen if there is one
                if (game._currentScreen !== null) {
                    // Send the event type and data to the screen
                    game._currentScreen.handleInput(event, e);
                }
            });
        };
        // Bind keyboard input events
        bindEventToScreen('keydown');
        //bindEventToScreen('keyup');
        bindEventToScreen('keypress');
    },
	getDisplay: function() {
		return this._display;
	},
	getScreenWidth: function() {
    return this._screenWidth;
	},
	getScreenHeight: function() {
	    return this._screenHeight;
	},
    refresh: function() {
        // Clear the screen
        if (this && this._display) {
        	this._display.clear();
        	
        	// Render the screen
            if (this._currentScreen) {
            	this._currentScreen.render(this._display);
            }
        }
    },
	switchScreen: function(screen) {
        // If we had a screen before, notify it that we exited
        if (this._currentScreen !== null) {
            this._currentScreen.exit();
        }
        // Clear the display
        this.getDisplay().clear();
        // Update our current screen, notify it we entered
        // and then render it
        this._currentScreen = screen;
        if (!this._currentScreen !== null) {
            this._currentScreen.enter();
            this.refresh();
        }
    }
};

window.onload = function() {
    // Check if rot.js can work on this browser
    if (!ROT.isSupported()) {
        alert("The rot.js library isn't supported by your browser.");
    } else {
    	var tileSet = document.createElement("img");
		tileSet.onload = function () {
			// Initialize the game
	        Game.init(tileSet);
	        // Add the container to our HTML page
	        document.body.appendChild(Game.getDisplay().getContainer());
	        // Load the start screen
	        Game.switchScreen(Game.Screen.startScreen);
		};
		tileSet.src = "assets/tileset.png";
		
//		function step() {
//			Game.refresh();
//			window.requestAnimationFrame(step);
//		}
//		step();
    }
};