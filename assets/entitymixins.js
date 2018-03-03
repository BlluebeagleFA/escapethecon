// Create our Mixins namespace
Game.EntityMixins = {};

// Main player's actor mixin
Game.EntityMixins.PlayerActor = {
    name: 'PlayerActor',
    groupName: 'Actor',
    act: function() {
        if (this._acting) {
            return;
        }
        this._acting = true;
        this.addTurnHunger();
        // Detect if the game is over
        if (!this.isAlive()) {
            Game.Screen.playScreen.setGameEnded(true);
            // Send a last message to the player
            Game.sendMessage(this, 'Press [Enter] to continue!');
        }
        // Re-render the screen
        Game.refresh();
        // Lock the engine and wait asynchronously
        // for the player to press a key.
        this.getMap().getEngine().lock();
        // Clear the message queue
//        this.clearMessages();
        this._acting = false;
    },
    increaseSpeed: function(value) {
        // If no value was passed, default to 1.
        value = value*50 || 50;
        this._speed += value;
        Game.sendMessage(this, "You feel faster!");
    },
    increaseDexterity: function(value) {
        // If no value was passed, default to 1.
        value = value || 1;
        this._dexterity += value;
        Game.sendMessage(this, "You feel more nimble!");
    }
};

Game.EntityMixins.FungusActor = {
    name: 'FungusActor',
    groupName: 'Actor',
    init: function() {
        this._growthsRemaining = 5;
    },
    act: function() { 
        // Check if we are going to try growing this turn
        if (this._growthsRemaining > 0) {
            if (Math.random() <= 0.02) {
                // Generate the coordinates of a random adjacent square by
                // generating an offset between [-1, 0, 1] for both the x and
                // y directions. To do this, we generate a number from 0-2 and then
                // subtract 1.
                var xOffset = Math.floor(Math.random() * 3) - 1;
                var yOffset = Math.floor(Math.random() * 3) - 1;
                // Make sure we aren't trying to spawn on the same tile as us
                if (xOffset != 0 || yOffset != 0) {
                    // Check if we can actually spawn at that location, and if so
                    // then we grow!
                    if (this.getMap().isEmptyFloor(this.getX() + xOffset,
                                                   this.getY() + yOffset,
                                                   this.getZ())) {
                        var entity = Game.EntityRepository.create('puddle');
                        entity.setPosition(this.getX() + xOffset, this.getY() + yOffset, 
                            this.getZ());
                        this.getMap().addEntity(entity);
                        this._growthsRemaining--;
                        // Send a message nearby!
                        Game.sendMessageNearby(this.getMap(),
                            entity.getX(), entity.getY(), entity.getZ(),
                            'The fungus is spreading!');
                    }
                }
            }
        }
    }
};

Game.EntityMixins.TaskActor = {
    name: 'TaskActor',
    groupName: 'Actor',
    init: function(template) {
        // Load tasks
        this._tasks = template['tasks'] || ['wander']; 
    },
    act: function() {
        // Iterate through all our tasks
        for (var i = 0; i < this._tasks.length; i++) {
            if (this.canDoTask(this._tasks[i])) {
                // If we can perform the task, execute the function for it.
                this[this._tasks[i]]();
                return;
            }
        }
    },
    investigate: function() {
        var sound = this.getSound();

        // If we are adjacent to the strange noise, get bored and forget the noise.
        var offsets = Math.abs(sound.x - this.getX()) + 
            Math.abs(sound.y - this.getY());
        if (offsets === 1) {
            this.getBored();
        }

        // Generate the path and move to the first tile.
        var source = this;
        var z = source.getZ();
        var path = new ROT.Path.AStar(sound.x, sound.y, function(x, y) {
            // If an entity is present at the tile, can't move there.
            var entity = source.getMap().getEntityAt(x, y, z);
            if (entity && entity !== source) {
                return false;
            }
            return source.getMap().getTile(x, y, z).isWalkable();
        }, {topology: 4});
        // Once we've gotten the path, we want to move to the second cell that is
        // passed in the callback (the first is the entity's strting point)
        var count = 0;
        path.compute(source.getX(), source.getY(), function(x, y) {
            if (count == 1) {
                source.tryMove(x, y, z);
            }
            count++;
        });
    },
    canDoTask: function(task) {
        if (task === 'hunt') {
            return this.hasMixin('Sight') && this.canSee(this.getMap().getPlayer());
        } else if (task === 'wander') {
            return true;
        } else if (task === 'investigate') {
            return this.hasMixin('Hearing') && this.getSound();
        } else {
            throw new Error('Tried to perform undefined task ' + task);
        }
    },
    hunt: function() {
        var player = this.getMap().getPlayer();

        // If we are adjacent to the player, then attack instead of hunting.
        var offsets = Math.abs(player.getX() - this.getX()) + 
            Math.abs(player.getY() - this.getY());
        if (offsets === 1) {
            if (this.hasMixin('Attacker') || this.hasMixin('Yiffer')) {
                this.attack(player);
                return;
            }
        }

        // Generate the path and move to the first tile.
        var source = this;
        var z = source.getZ();
        var path = new ROT.Path.AStar(player.getX(), player.getY(), function(x, y) {
            // If an entity is present at the tile, can't move there.
            var entity = source.getMap().getEntityAt(x, y, z);
            if (entity && entity !== player && entity !== source) {
                return false;
            }
            return source.getMap().getTile(x, y, z).isWalkable();
        }, {topology: 4});
        // Once we've gotten the path, we want to move to the second cell that is
        // passed in the callback (the first is the entity's strting point)
        var count = 0;
        path.compute(source.getX(), source.getY(), function(x, y) {
            if (count == 1) {
                source.tryMove(x, y, z);
            }
            count++;
        });
    },
    wander: function() {
        // Flip coin to determine if moving by 1 in the positive or negative direction
        var moveOffset = (Math.round(Math.random()) === 1) ? 1 : -1;
        // Flip coin to determine if moving in x direction or y direction
        if (Math.round(Math.random()) === 1) {
            this.tryMove(this.getX() + moveOffset, this.getY(), this.getZ());
        } else {
            this.tryMove(this.getX(), this.getY() + moveOffset, this.getZ());
        }
    }
};

//This signifies our entity can attack basic destructible enities
Game.EntityMixins.Yiffer = {
    name: 'Yiffer',
    groupName: 'Yiffer',
    init: function(template) {
    	this._species = template['name'] || "glitch";
    	this._killMessage = template['killMessage'] || "You are knocked out!";
    	this._attacks = {
			head : {
				attack: template['attacks']['head']['attack'] || 'The glitch bites your head!',
				description: template['attacks']['head']['description'] || "You have a fuzzy glitched head."
			},
			chest : {
				attack: template['attacks']['chest']['attack'] || 'The glitch bites your chest!',
				description: template['attacks']['chest']['description'] || "You have a fuzzy glitched chest."
			},
			arms : {
				attack: template['attacks']['arms']['attack'] || 'The glitch bites your arms!',
				description: template['attacks']['arms']['description'] || "You have fuzzy glitched arms."
			},
			tail : {
				attack: template['attacks']['tail']['attack'] || 'The glitch bites your tail!',
				description: template['attacks']['tail']['description'] || "You have a fuzzy glitched tail."
			},
			feet : {
				attack: template['attacks']['feet']['attack'] || 'The glitch bites your feet!',
				description: template['attacks']['feet']['description'] || "You have fuzzy glitched feet."
			},
			hands : {
				attack: template['attacks']['hands']['attack'] || 'The glitch bites your hands!',
				description: template['attacks']['hands']['description'] || "You have fuzzy glitched hands."
			},
			legs : {
				attack: template['attacks']['legs']['attack'] || 'The glitch bites your legs!',
				description: template['attacks']['legs']['description'] || "You have fuzzy glitched legs."
			},
			genitals : {
				attack: template['attacks']['genitals']['attack'] || 'The glitch bites your genitals!',
				description: template['attacks']['genitals']['description'] || "You have fuzzy glitched genitals."
			}
		};
    	this._attackValue = template['attackValue'] || 1;
    },
    getKillMessage: function() {
    	return this._killMessage;
    },
    getAttackValue: function() {
        var modifier = 0;
        // If we can equip items, then have to take into 
        // consideration weapon and armor
        if (this.hasMixin(Game.EntityMixins.Equipper)) {
            if (this.getWeapon()) {
                modifier += this.getWeapon().getAttackValue();
            }
            var currentArmor = this.getArmor();
            if (currentArmor) {
            	for(var ai = 0; ai < currentArmor.length; ai++) {
            		modifier += currentArmor[ai].getAttackValue();
            	}
            }
        }
        return this._attackValue + modifier;
    },
    increaseAttackValue: function(value) {
        // If no value was passed, default to 2.
        value = value || 2;
        // Add to the attack value.
        this._attackValue += value;
        Game.sendMessage(this, "You look stronger!");
    },
    attack: function(target) {
        // If the target is destructible, calculate the damage
        // based on attack and defense value
        if (target.hasMixin('Destructible') && target.hasMixin('BodyPartHaver')) {
        	var bodyPart = target.getRandomBodyPart();
        	var coveringItem = target.isCovered(bodyPart.name);
        	if (coveringItem) {
        		Game.sendMessage(target, 'The ' + this.getName() + ' tries to grab your ' + bodyPart.name + ', but just rips your ' + coveringItem._name);
        		target.damage(coveringItem.getSlot());
        	} else {
        		Game.sendMessage(target, this._attacks[bodyPart.name].attack);
        		target.setBodyPartDescription(bodyPart.name, this._species, this._attacks[bodyPart.name].description);
        		target.addCorruption(5);
        	}
            var attack = this.getAttackValue();
            var defense = target.getDefenseValue();
            var max = Math.max(0, attack - defense);
            var damage = 1 + Math.floor(Math.random() * max);

            target.takeDamage(this, damage);
        }
    },
    listeners: {
        details: function() {
            return [{key: 'attack', value: this.getAttackValue()}];
        }
    }
};

Game.EntityMixins.Talker = {
    name: 'Talker',
    groupName: 'Talker',
    init: function(template) {
        var conversationResponse = {
            text: 'This is a secondary response',
            options: [
                {
                    choice: 'End',
                    stop: true
                }
            ]
        };
        var defaultConversation = {
            text: 'This is a default response',
            options: [
                {
                    choice: 'Continue',
                    effect: function(target) {
                        console.log(target);
                    },
                    conversation: conversationResponse
                },
                {
                    choice: 'End',
                    stop: true
                }
            ]
        };
        this._conversation = template['conversation'] || defaultConversation;
    },
    getConversation: function() {
        return this._conversation;
    }
}

// This signifies our entity can attack basic destructible enities
Game.EntityMixins.Attacker = {
    name: 'Attacker',
    groupName: 'Attacker',
    init: function(template) {
        this._attackValue = template['attackValue'] || 1;
    },
    getAttackValue: function() {
        var modifier = 0;
        // If we can equip items, then have to take into 
        // consideration weapon and armor
        if (this.hasMixin(Game.EntityMixins.Equipper)) {
            if (this.getWeapon()) {
                modifier += this.getWeapon().getAttackValue();
            }
            var currentArmor = this.getArmor();
            if (currentArmor) {
            	for(var ai = 0; ai < currentArmor.length; ai++) {
            		modifier += currentArmor[ai].getAttackValue();
            	}
            }
        }
        return this._attackValue + modifier;
    },
    increaseAttackValue: function(value) {
        // If no value was passed, default to 2.
        value = value || 2;
        // Add to the attack value.
        this._attackValue += value;
        Game.sendMessage(this, "You look stronger!");
    },
    attack: function(target) {
        // If the target is destructible, calculate the damage
        // based on attack and defense value
        if (target.hasMixin('Destructible')) {
        	Game.sendSoundNearby(target.getMap(), target.getX(), target.getY(), target.getZ());
            var attack = this.getAttackValue();
            var defense = target.getDefenseValue();
            var max = Math.max(0, attack - defense);
            var damage = 1 + Math.floor(Math.random() * max);

            Game.sendMessage(this, 'You strike the %s for %d damage!', 
                [target.getName(), damage]);
            Game.sendMessage(target, 'The %s strikes you for %d damage!', 
                [this.getName(), damage]);

            target.takeDamage(this, damage);
        }
    },
    listeners: {
        details: function() {
            return [{key: 'attack', value: this.getAttackValue()}];
        }
    }
};

// This mixin signifies an entity can take damage and be destroyed
Game.EntityMixins.Destructible = {
    name: 'Destructible',
    init: function(template) {
        this._maxHp = template['maxHp'] || 10;
        // We allow taking in health from the template incase we want
        // the entity to start with a different amount of HP than the 
        // max specified.
        this._hp = template['hp'] || this._maxHp;
        this._defenseValue = template['defenseValue'] || 0;
    },
    getDefenseValue: function() {
        var modifier = 0;
        // If we can equip items, then have to take into 
        // consideration weapon and armor
        if (this.hasMixin(Game.EntityMixins.Equipper)) {
            if (this.getWeapon()) {
                modifier += this.getWeapon().getDefenseValue();
            }
            var currentArmor = this.getArmor();
            if (currentArmor) {
            	for(var ai = 0; ai < currentArmor.length; ai++) {
            		modifier += currentArmor[ai].getDefenseValue();
            	}
            }
        }
        return this._defenseValue + modifier;
    },
    getHp: function() {
        return this._hp;
    },
    getMaxHp: function() {
        return this._maxHp;
    },
    setHp: function(hp) {
        this._hp = hp;
    },
    increaseDefenseValue: function(value) {
        // If no value was passed, default to 2.
        value = value || 2;
        // Add to the defense value.
        this._defenseValue += value;
        Game.sendMessage(this, "You look tougher!");
    },
    increaseMaxHp: function(value) {
        // If no value was passed, default to 10.
        value = value || 10;
        // Add to both max HP and HP.
        this._maxHp += value;
        this._hp += value;
        Game.sendMessage(this, "You look healthier!");
    },
    takeDamage: function(attacker, damage) {
        this._hp -= damage;
        if (this._hp > this._maxHp) {
        	this._hp = this._maxHp;
        }
        var player = this.getMap().getPlayer();
        // If have 0 or less HP, then remove ourseles from the map
        if (this._hp <= 0 && damage > 0) {
        	if (this == player) {
        		var killMessage = "An unexpected error occurred";
        		if (attacker.getKillMessage) {
        			killMessage = attacker.getKillMessage();
        		}
        		Game.Screen.koScreen.setup({
        			player: player,
        			message: killMessage,
        			cause: attacker
        		});
                Game.Screen.playScreen.setSubScreen(Game.Screen.koScreen);
        	} else {
        		Game.sendMessage(attacker, 'You kill the %s!', [this.getName()]);
                // Raise events
                this.raiseEvent('onDeath', attacker);
                attacker.raiseEvent('onKill', this);
                this.kill();
        	}
        }
    },
    listeners: {
        onGainLevel: function() {
            // Heal the entity.
            this.setHp(this.getMaxHp());
        },
        details: function() {
            return [
                {key: 'defense', value: this.getDefenseValue()},
                {key: 'hp', value: this.getHp()}
            ];
        }
    }
};

Game.EntityMixins.MessageRecipient = {
    name: 'MessageRecipient',
    init: function(template) {
        this._messages = [];
    },
    receiveMessage: function(message) {
//    	document.getElementById('log').append('\<p\>' + message + '\<\/p\>');
    	document.getElementById('log').innerHTML += '<p>' + message + '</p>';
//    	document.getElementById('log').scrollTo(0,document.getElementById('log').scrollHeight);
    	var o = document.getElementById('log');
    	o.scrollTop = o.scrollHeight;
    	this._messages.push(message);
    },
    getMessages: function() {
        return this._messages;
    },
    clearMessages: function() {
		this._messages = [];	
    }
};

// This signifies our entity posseses a field of vision of a given radius.
Game.EntityMixins.Sight = {
    name: 'Sight',
    groupName: 'Sight',
    init: function(template) {
        this._sightRadius = template['sightRadius'] || 5;
    },
    getSightRadius: function() {
        return this._sightRadius;
    },
    increaseSightRadius: function(value) {
        // If no value was passed, default to 1.
        value = value || 1;
        // Add to sight radius.
        this._sightRadius += value;
        Game.sendMessage(this, "You are more aware of your surroundings!");
    },
    canSee: function(entity) {
        // If not on the same map or on different floors, then exit early
        if (!entity || this._map !== entity.getMap() || this._z !== entity.getZ()) {
            return false;
        }

        var otherX = entity.getX();
        var otherY = entity.getY();

        // If we're not in a square field of view, then we won't be in a real
        // field of view either.
        if ((otherX - this._x) * (otherX - this._x) +
            (otherY - this._y) * (otherY - this._y) >
            this._sightRadius * this._sightRadius) {
            return false;
        }

        // Compute the FOV and check if the coordinates are in there.
        var found = false;
        this.getMap().getFov(this.getZ()).compute(
            this.getX(), this.getY(), 
            this.getSightRadius(), 
            function(x, y, radius, visibility) {
                if (x === otherX && y === otherY) {
                    found = true;
                }
            });
        return found;
    }
};

Game.EntityMixins.Hearing = {
    name: 'Hearing',
    groupName: 'Hearing',
    init: function(template) {
        this._hearingRadius = template['hearingRadius'] || 8;
        this._lastSound = null;
    },
    getHearingRadius: function() {
        return this._hearingRadius;
    },
    receiveSound: function(x, y, z) {
//        console.log("Entity heard a noise at " + x + " " + y + " " + z);
        this._lastSound = {
            x: x,
            y: y,
            z: z
        }
    },
    getBored: function() {
        this._lastSound = null;
    },
    getSound: function() {
        return this._lastSound;
    },
    increaseHearingRadius: function(value) {
        // If no value was passed, default to 1.
        value = value || 1;
        // Add to sight radius.
        this._hearingRadius += value;
        Game.sendMessage(this, "Your hearing feels more acute.");
    },
    canHear: function(x, y, z) {
        // If not on the same map or on different floors, then exit early
        if (this._z !== z) {
            return false;
        }

        var xDistance = Math.abs(x - this._x);
        var yDistance = Math.abs(y - this._y);
        
        // If we're not in a square field of view, then we won't be in a real
        // field of view either.
        if (xDistance + yDistance > this._hearingRadius) {
            return false;
        } else {
            return true;
        }        
    }
};

// Message sending functions
Game.sendMessage = function(recipient, message, args) {
    // Make sure the recipient can receive the message 
    // before doing any work.
    if (recipient.hasMixin(Game.EntityMixins.MessageRecipient)) {
        // If args were passed, then we format the message, else
        // no formatting is necessary
        if (args) {
            message = vsprintf(message, args);
        }
        recipient.receiveMessage(message);
    }
};
Game.sendMessageNearby = function(map, centerX, centerY, centerZ, message, args) {
    // If args were passed, then we format the message, else
    // no formatting is necessary
    if (args) {
        message = vsprintf(message, args);
    }
    // Get the nearby entities
    entities = map.getEntitiesWithinRadius(centerX, centerY, centerZ, 5);
    // Iterate through nearby entities, sending the message if
    // they can receive it.
    for (var i = 0; i < entities.length; i++) {
        if (entities[i].hasMixin(Game.EntityMixins.MessageRecipient)) {
            entities[i].receiveMessage(message);
        }
    }
};

Game.sendSoundNearby = function(map, centerX, centerY, centerZ) {
    // Get the nearby entities - increase to maximum audio length
    entities = map.getEntitiesWithinRadius(centerX, centerY, centerZ, 5);
    // Iterate through nearby entities, sending the message if
    // they can receive it.
    for (var i = 0; i < entities.length; i++) {
        if (entities[i].hasMixin(Game.EntityMixins.Hearing) && entities[i].canHear(centerX, centerY, centerZ)) {
            entities[i].receiveSound(centerX, centerY, centerZ);
        }
    }
};

Game.EntityMixins.InventoryHolder = {
    name: 'InventoryHolder',
    init: function(template) {
        // Default to 10 inventory slots.
        var inventorySlots = template['inventorySlots'] || 10;
        // Set up an empty inventory.
        this._items = new Array(inventorySlots);
    },
    hasItem: function(itemName) {
    	var result = false;
    	for (var i = 0; i < this._items.length; i++) {
    		if (this._items[i] && this._items[i]._name == itemName) {
    			result = true;
    		}
    	}
    	return result;
    },
    removeItemByName: function(itemName) {
    	var result = -1;
    	for (var i = 0; i < this._items.length; i++) {
    		if (this._items[i] && this._items[i]._name == itemName) {
    			result = i;
    		}
    	}
    	if (result >= 0) {
    		this.removeItem(result);
    	} else {
    		console.log("Not doing it cos result is " + result);
    	}
    },
    getItems: function() {
        return this._items;
    },
    getItem: function(i) {
        return this._items[i];
    },
    addItem: function(item) {
        // Try to find a slot, returning true only if we could add the item.
        for (var i = 0; i < this._items.length; i++) {
            if (!this._items[i]) {
                this._items[i] = item;
                return true;
            }
        }
        return false;
    },
    removeItem: function(i) {
        // If we can equip items, then make sure we unequip the item we are removing.
        if (this._items[i] && this.hasMixin(Game.EntityMixins.Equipper)) {
            this.unequip(this._items[i]);
        }
        // Simply clear the inventory slot.
        this._items[i] = null;
    },
    canAddItem: function() {
        // Check if we have an empty slot.
        for (var i = 0; i < this._items.length; i++) {
            if (!this._items[i]) {
                return true;
            }
        }
        return false;
    },
    pickupItems: function(indices) {
        // Allows the user to pick up items from the map, where indices is
        // the indices for the array returned by map.getItemsAt
        var mapItems = this._map.getItemsAt(this.getX(), this.getY(), this.getZ());
        var added = 0;
        // Iterate through all indices.
        for (var i = 0; i < indices.length; i++) {
            // Try to add the item. If our inventory is not full, then splice the 
            // item out of the list of items. In order to fetch the right item, we
            // have to offset the number of items already added.
            if (this.addItem(mapItems[indices[i]  - added])) {
                mapItems.splice(indices[i] - added, 1);
                added++;
            } else {
                // Inventory is full
                break;
            }
        }
        // Update the map items
        this._map.setItemsAt(this.getX(), this.getY(), this.getZ(), mapItems);
        // Return true only if we added all items
        return added === indices.length;
    },
    withdrawItems: function(indices, x, y, z) {
        // Allows the user to pick up items from the map, where indices is
        // the indices for the array returned by map.getItemsAt
        var mapItems = this._map.getContainersAt(x, y, z).items;
        var added = 0;
        // Iterate through all indices.
        for (var i = 0; i < indices.length; i++) {
            // Try to add the item. If our inventory is not full, then splice the 
            // item out of the list of items. In order to fetch the right item, we
            // have to offset the number of items already added.
            if (this.addItem(mapItems[indices[i]  - added])) {
                mapItems.splice(indices[i] - added, 1);
                added++;
            } else {
                // Inventory is full
                break;
            }
        }
        // Update the map items
        this._map.setContainerItemsAt(x, y, z, mapItems);
        // Return true only if we added all items
        return added === indices.length;
    },
    dropItem: function(i) {
        // Drops an item to the current map tile
        if (this._items[i]) {
            if (this._map) {
                this._map.addItem(this.getX(), this.getY(), this.getZ(), this._items[i]);
            }
            this.removeItem(i);      
        }
    }
};

Game.EntityMixins.Corruptable = {
    name: 'Corruptable',
    init: function(template) {
        this._corruption = template['corruption'] || 0;
    },
    addCorruption: function(value) {
        this._corruption += value;
        if (this._corruption >= 100) {
        	this.kill("The corruption overwhelms you!");
        }
    },
    getCorruption: function() {
    	return this._corruption;
    }
};

Game.EntityMixins.FoodConsumer = {
    name: 'FoodConsumer',
    init: function(template) {
        this._maxFullness = template['maxFullness'] || 1000;
        // Start halfway to max fullness if no default value
        this._fullness = template['fullness'] || (this._maxFullness / 2);
        // Number of points to decrease fullness by every turn.
        this._fullnessDepletionRate = template['fullnessDepletionRate'] || 1;
    },
    addTurnHunger: function() {
    	if (this._fullness > 0) {
    		this.takeDamage(this, -1);
    	}
        // Remove the standard depletion points
        this.modifyFullnessBy(-this._fullnessDepletionRate);
    },
    modifyFullnessBy: function(points) {
        this._fullness = this._fullness + points;
        if (this._fullness <= 0) {
            this._fullness = 0;
        } else if (this._fullness > this._maxFullness) {
            this._fullness = this._maxFullness;
        }
    },
    getHungerState: function() {
        // Fullness points per percent of max fullness
        var perPercent = this._maxFullness / 100;
        // 5% of max fullness or less = starving
        if (this._fullness <= perPercent * 5) {
            return 'STARVING';
        // 25% of max fullness or less = hungry
        } else if (this._fullness <= perPercent * 25) {
            return 'HUNGRY';
        // 95% of max fullness or more = oversatiated
        } else if (this._fullness >= perPercent * 95) {
            return 'OVERSATIATED';
        // 75% of max fullness or more = full
        } else if (this._fullness >= perPercent * 75) {
            return 'FULL';
        // Anything else = not hungry
        } else {
            return 'NOT HUNGRY';
        }
    }
};

Game.EntityMixins.CorpseDropper = {
    name: 'CorpseDropper',
    init: function(template) {
        // Chance of dropping a cropse (out of 100).
        this._corpseDropRate = template['corpseDropRate'] || 100;
    },
    listeners: {
        onDeath: function(attacker) {
            // Check if we should drop a corpse.
            if (Math.round(Math.random() * 100) <= this._corpseDropRate) {
                // Create a new corpse item and drop it.
                this._map.addItem(this.getX(), this.getY(), this.getZ(),
                    Game.ItemRepository.create('cum', {
                        name: this._name + ' cum',
                        foreground: this._foreground
                    }));
            }    
        }
    }
};

Game.EntityMixins.BodyPartHaver = {
	name: 'BodyPartHaver',
	init: function(template) {
		this._bodyParts = {
			head : {
				species: "human",
				name: "head",
				status: "You have a normal human face."
			},
			chest : {
				species: "human",
				name: "chest",
				status: "You have a normal human chest."
			},
			arms : {
				species: "human",
				name: "arms",
				status: "You have normal human arms."
			},
			tail : {
				species: "human",
				name: "tail",
				status: "You have a normal human butt."
			},
			feet : {
				species: "human",
				name: "feet",
				status: "You have normal human feet."
			},
			hands : {
				species: "human",
				name: "hands",
				status: "You have normal human hands."
			},
			legs : {
				species: "human",
				name: "legs",
				status: "You have normal human legs."
			},
			genitals : {
				species: "human",
				name: "genitals",
				status: "You have an ordinary human male penis."
			}
		};
		this._bodyPartNames = ['head', 'chest', 'arms', 'tail', 'feet', 'hands', 'legs', 'genitals'];
	},
	getRandomBodyPart: function() {
		var bodyPartName = this._bodyPartNames[Math.floor(Math.random()*8)];
		return this._bodyParts[bodyPartName];
	},
	getBodyPart: function(name) {
		return this._bodyParts[name];
	},
	setBodyPartDescription: function(name, species, description) {
		this._bodyParts[name].species = species;
		this._bodyParts[name].status = description;
	},
	getMostCorruption: function() {
		var counts = {};
		for (var i in this._bodyParts) {
			if (this._bodyParts[i].species != "human") {
				if (counts[this._bodyParts[i].species]) {
					counts[this._bodyParts[i].species]++;
				} else {
					counts[this._bodyParts[i].species] = 1;
				}
			}
		}
		var chosenCount = 0;
		var chosen = null;
		for (var j in counts) {
			if (chosenCount < counts[j]) {
				chosenCount = counts[j];
				chosen = j;
			}
		}
		return chosen;
	}
}

Game.EntityMixins.Equipper = {
    name: 'Equipper',
    init: function(template) {
        this._weapon = null;
        this._armor = [];
    },
    isCovered: function(bodyPart) {
    	var coveringItem = null;
    	for (var i = 0; i < this._armor.length; i++) {
    		if (this._armor[i].covers(bodyPart)) {
    			coveringItem = this._armor[i];
    		}
    	}
    	return coveringItem;
    },
    wearing: function(slot) {
    	var slotIndex = null;
    	for (var i = 0; i < this._armor.length; i++) {
    		if (this._armor[i].getSlot() == slot) {
    			slotIndex = i;
    		}
    	}
    	return slotIndex;
    },
    damage: function(slot) {
    	var item = this._armor[this.wearing(slot)];
    	item._defenseValue -= 1;
    	if (item._defenseValue < 1) {
    		this.takeOff(slot);
    		return item;
    	}
    },
    bestCoverage: function(slot) {
    	var item; 
    	for (var i = 0; i < this._armor.length; i++) {
    		if (this._armor[i].slot == slot && (!item || item.defenseValue < this._armor[i].defenseValue)) {
    			item = this._armor[i];
    		}
    	}
    	return item;
    },
    wield: function(item) {
        this._weapon = item;
    },
    unwield: function() {
        this._weapon = null;
    },
    wear: function(item) {
    	var slot = this.wearing(item.getSlot());
    	if (slot || slot == 0) {
    		this._armor[slot] = item;
    	} else {
    		this._armor.push(item);
    	}
    },
    wearBestForSlot: function(slot) {
    	var slotindex = null;
    	var items = this.getMap().getPlayer().getItems();
    	for (var i = 0; i < items.length; i++) {
    		var item = items[i];
    		if (item && item.getSlot && item.getSlot() == slot) {
    			slotindex = i;
    		}
    	}
    	if (slotindex != null) {
    		this.getMap().getPlayer().wear(items[slotindex]);
    		Game.sendMessage(this.getMap().getPlayer(), "You quickly equip a new " + slot + " when you are safe.");
    	}
    },
    takeOff: function(slot) {
    	var i;
    	var armorItem;
    	var removedItemIndex = -1;
    	var newArmor = [];
    	for (i = 0; i < this._armor.length; i++) {
    		if (this._armor[i].getSlot() != slot) {
    			newArmor.push(this._armor[i]);
    		} else {
    			armorItem = this._armor[i];
    		}
    	}
    	this._armor = newArmor;
    	for (i = 0; i < this._items.length; i++) {
    		if (this._items[i] == armorItem) {
    			removedItemIndex = i;
    		}
    	}
    	if (removedItemIndex > -1) {
    		this.removeItem(removedItemIndex);
    	}
    	
    },
    getWeapon: function() {
        return this._weapon;
    },
    getArmor: function() {
        return this._armor;
    },
    unequip: function(item) {
        // Helper function to be called before getting rid of an item.
        if (this._weapon === item) {
            this.unwield();
        }
        if (this._armor.includes(item)) {
            this.takeOff(item.slot);
        }
    }
};

Game.EntityMixins.ExperienceGainer = {
    name: 'ExperienceGainer',
    init: function(template) {
        this._level = template['level'] || 1;
        this._experience = template['experience'] || 0;
        this._statPointsPerLevel = template['statPointsPerLevel'] || 1;
        this._statPoints = 0;
        // Determine what stats can be levelled up.
        this._statOptions = [];
        if (this.hasMixin('Attacker')) {
            this._statOptions.push(['Strength: Increase attack value', this.increaseAttackValue]);
        }
        if (this.hasMixin('Destructible')) {
//            this._statOptions.push(['Increase defense value', this.increaseDefenseValue]);   
            this._statOptions.push(['Constitution: Increase max health', this.increaseMaxHp]);
        }
        if (this.hasMixin('Sight')) {
            this._statOptions.push(['Perception: Increase sight range', this.increaseSightRadius]);
        }
        if (this.hasMixin('PlayerActor')) {
            this._statOptions.push(['Agility: Sometimes get extra turns', this.increaseSpeed]);
            this._statOptions.push(['Dexterity: Move over difficult terrain', this.increaseDexterity]);
        }
    },
    getLevel: function() {
        return this._level;
    },
    getExperience: function() {
        return this._experience;
    },
    getNextLevelExperience: function() {
        return (this._level * this._level) * 10;
    },
    getStatPoints: function() {
        return this._statPoints;
    },
    setStatPoints: function(statPoints) {
        this._statPoints = statPoints;
    },
    getStatOptions: function() {
        return this._statOptions;
    },
    giveExperience: function(points) {
        var statPointsGained = 0;
        var levelsGained = 0;
        // Loop until we've allocated all points.
        while (points > 0) {
            // Check if adding in the points will surpass the level threshold.
            if (this._experience + points >= this.getNextLevelExperience()) {
                // Fill our experience till the next threshold.
                var usedPoints = this.getNextLevelExperience() - this._experience;
                points -= usedPoints;
                this._experience += usedPoints;
                // Level up our entity!
                this._level++;
                levelsGained++;
                this._statPoints += this._statPointsPerLevel;
                statPointsGained += this._statPointsPerLevel;
            } else {
                // Simple case - just give the experience.
                this._experience += points;
                points = 0;
            }
        }
        // Check if we gained at least one level.
        if (levelsGained > 0) {
            Game.sendMessage(this, "You advance to level %d.", [this._level]);
            this.raiseEvent('onGainLevel');
        }
    },
    listeners: {
        onKill: function(victim) {
            var exp = victim.getMaxHp() + victim.getDefenseValue();
            if (victim.hasMixin('Attacker')) {
                exp += victim.getAttackValue();
            }
            // Account for level differences
            if (victim.hasMixin('ExperienceGainer')) {
                exp -= (this.getLevel() - victim.getLevel()) * 3;
            }
            // Only give experience if more than 0.
            if (exp > 0) {
                this.giveExperience(exp);
            }
        },
        details: function() {
            return [{key: 'level', value: this.getLevel()}];
        }
    }
};

Game.EntityMixins.RandomStatGainer = {
    name: 'RandomStatGainer',
    groupName: 'StatGainer',
    listeners: {
        onGainLevel: function() {
            var statOptions = this.getStatOptions();
            // Randomly select a stat option and execute the callback for each
            // stat point.
            while (this.getStatPoints() > 0) {
                // Call the stat increasing function with this as the context.
                statOptions.random()[1].call(this);
                this.setStatPoints(this.getStatPoints() - 1);
            }
        }
    }
};

Game.EntityMixins.PlayerStatGainer = {
    name: 'PlayerStatGainer',
    groupName: 'StatGainer',
    listeners: {
        onGainLevel: function() {
            // Setup the gain stat screen and show it.
            Game.Screen.gainStatScreen.setup(this);
            Game.Screen.playScreen.setSubScreen(Game.Screen.gainStatScreen);
        }
    }
};