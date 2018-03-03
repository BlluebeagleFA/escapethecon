Game.Entity = function(properties) {
    properties = properties || {};
    // Call the dynamic glyph's construtor with our set of properties
    Game.DynamicGlyph.call(this, properties);
    // Instantiate any properties from the passed object
    this._x = properties['x'] || 0;
    this._y = properties['y'] || 0;
    this._z = properties['z'] || 0;
    this._map = null;
    this._alive = true;
    // Acting speed
    this._speed = properties['speed'] || 1000;
    this._dexterity = properties['dexterity'] || 0;
};
// Make entities inherit all the functionality from dynamic glyphs
Game.Entity.extend(Game.DynamicGlyph);

Game.Entity.prototype.setX = function(x) {
    this._x = x;
};
Game.Entity.prototype.setY = function(y) {
    this._y = y;
};
Game.Entity.prototype.setZ = function(z) {
    this._z = z;
};
Game.Entity.prototype.setMap = function(map) {
    this._map = map;
};
Game.Entity.prototype.setSpeed = function(speed) {
    this._speed = speed;
};
Game.Entity.prototype.setPosition = function(x, y, z) {
    var oldX = this._x;
    var oldY = this._y;
    var oldZ = this._z;
    // Update position
    this._x = x;
    this._y = y;
    this._z = z;
    // If the entity is on a map, notify the map that the entity has moved.
    if (this._map) {
        this._map.updateEntityPosition(this, oldX, oldY, oldZ);
    }
};
Game.Entity.prototype.getX = function() {
    return this._x;
};
Game.Entity.prototype.getY   = function() {
    return this._y;
};
Game.Entity.prototype.getZ = function() {
    return this._z;
};
Game.Entity.prototype.getMap = function() {
    return this._map;
};
Game.Entity.prototype.getSpeed = function() {
    return this._speed;
};
Game.Entity.prototype.getDexterity = function() {
    return this._dexterity;
};

Game.Entity.prototype.hasWater = function() {
	var map = this.getMap();
	var result = false;
	for (var x = this._x-1; x < this._x+2; x++) {
		for (var y = this._y-1; y < this._y+2; y++) {
			var tile = map.getTile(x, y, this.getZ());
			if (tile && tile.hasWater()) {
				result = true;
			}
		}
	}
	return result;
};

Game.Entity.prototype.hasElectricity = function() {
	var map = this.getMap();
	var result = false;
	for (var x = this._x-1; x < this._x+2; x++) {
		for (var y = this._y-1; y < this._y+2; y++) {
			var tile = map.getTile(x, y, this.getZ());
			if (tile && tile.hasElectricity()) {
				result = true;
			}
		}
	}
	return result;
};

Game.Entity.prototype.getRandomAdjacentEnemy = function() {
	var map = this.getMap();
	var result = null;
	for (var x = this._x-1; x < this._x+2; x++) {
		for (var y = this._y-1; y < this._y+2; y++) {
			var tile = map.getTile(x, y, this.getZ());
			var entity = map.getEntityAt(x, y, this.getZ());
			if (entity && entity.hasMixin('Yiffer')) {
				result = entity;
			}
		}
	}
	return result;
}

Game.Entity.prototype.tryMove = function(x, y, z, map) {
    var map = this.getMap();
    // Must use starting z
    var tile = map.getTile(x, y, this.getZ());
    
    if (tile == Game.Tile.nullTile) {
    	Game.Screen.winScreen.setup(this);
    	Game.switchScreen(Game.Screen.winScreen);
    }
    
    var target = map.getEntityAt(x, y, this.getZ());
    
    var currentTile = map.getTile(this.getX(), this.getY(), this.getZ());
    
    var targetContainers = map.getContainersAt(x, y, this.getZ());
    
    var dexRoll = Math.floor(Math.random()*6) + this.getDexterity();
    if (dexRoll <= currentTile.getDifficulty()) {
        Game.sendMessage(this, "You stumble on the difficult terrain!");
        return false;
    }
    // If our z level changed, check if we are on stair
    if (z < this.getZ()) {
        if ((tile != Game.Tile.stairsUpTile && tile != Game.Tile.elevatorTile) || (z < 0 || z > 5)) {
            Game.sendMessage(this, "You can't go up here!");
        } else {
            Game.sendMessage(this, "You ascend to level %d!", [z+1]);
            this.setPosition(x, y, z);
        }
    } else if (z > this.getZ()) {
        if ((tile != Game.Tile.stairsDownTile && tile != Game.Tile.elevatorTile) || (z < 0 || z > 5)) {
            Game.sendMessage(this, "You can't go down here!");
        } else {
            this.setPosition(x, y, z);
            Game.sendMessage(this, "You descend to level %d!", [z+1]);
        }
    // If an entity was present at the tile
    } else if (target) {
    	if (this.hasMixin(Game.EntityMixins.PlayerActor) && target.hasMixin(Game.EntityMixins.Talker)) {
    		map.swapPositions(this, target);
    		
    		Game.Screen.talkScreen.setup(this, target.getConversation());
            Game.Screen.playScreen.setSubScreen(Game.Screen.talkScreen);
            return true;
        }
    	
    	// An entity can only attack if the entity has the Attacker mixin and 
        // either the entity or the target is the player.
        if (this.hasMixin('Attacker') && 
            (this.hasMixin(Game.EntityMixins.PlayerActor) ||
             target.hasMixin(Game.EntityMixins.PlayerActor))) {
            this.attack(target);
            return true;
        } 
        // If not nothing we can do, but we can't 
        // move to the tile
        return false;        
    // Check if we can walk on the tile
    // and if so simply walk onto it
    } else if (tile.isWalkable()) {
    	if (this.hasMixin(Game.EntityMixins.PlayerActor) && tile.getEvent()) {
            map.dig(x, y, z);
            
            Game.Screen.talkScreen.setup(this, tile.getEvent());
            Game.Screen.playScreen.setSubScreen(Game.Screen.talkScreen);
            return true;
        }
        
        if (this.hasMixin(Game.EntityMixins.PlayerActor) && this._running) {
            Game.sendSoundNearby(this.getMap(), x, y, z);
        }
        if (this.hasMixin(Game.EntityMixins.PlayerActor)) {
        	var safeToWear = true;
	        var allEntities = map.getEntities();
	        for (var i = 0; i < allEntities.length; i++) {
	            var checkEntity = allEntities[i];
	          	if (checkEntity.canSee(this)) {
	          		safeToWear = false;
	          	}
	        }
	        if (safeToWear) {
	          	if (this.hasMixin(Game.EntityMixins.PlayerActor)) {
	          		if (this.wearing("pants") == null) {
	          			this.wearBestForSlot("pants");
	          		}
	          		if (this.wearing("shirt") == null) {
	          			this.wearBestForSlot("shirt");
	          		}
	          		if (this.wearing("gloves") == null) {
	          			this.wearBestForSlot("gloves");
	          		}
	          		if (this.wearing("scarf") == null) {
	          			this.wearBestForSlot("scarf");
	          		}
	          		if (this.wearing("mask") == null) {
	          			this.wearBestForSlot("mask");
	          		}
	          		if (this.wearing("hat") == null) {
	          			this.wearBestForSlot("hat");
	          		}
	          		if (this.wearing("underwear") == null) {
	          			this.wearBestForSlot("underwear");
	          		}
	          		if (this.wearing("socks") == null) {
	          			this.wearBestForSlot("socks");
	          		}
	          		if (this.wearing("shoes") == null) {
	          			this.wearBestForSlot("shoes");
	          		}
	          	}
	        }
        }
        
    	// Update the entity's position
        this.setPosition(x, y, z);
        if (this.hasMixin(Game.EntityMixins.Talker) && z == map.getPlayer().getZ()) {
        	var delta_x = map.getPlayer().getX() - x;
			var delta_y = map.getPlayer().getY() - y;
			var theta_radians = Math.atan2(delta_y, delta_x);
			theta_radians *= 180 / Math.PI;
			if (theta_radians < 0) {
				theta_radians = 360 + theta_radians;
			}
			var ally_direction = "somewhere";
			if (Math.abs(theta_radians - 0*180) <= 22.5 || Math.abs(theta_radians - 2*180) <= 22.5) {
				ally_direction = "west";
			} else if (Math.abs(theta_radians - 0.25*180) <= 22.5) {
				ally_direction = "northwest";
			} else if (Math.abs(theta_radians - 0.5*180) <= 22.5) {
				ally_direction = "north";
			} else if (Math.abs(theta_radians - 0.75*180) <= 22.5) {
				ally_direction = "northeast";
			} else if (Math.abs(theta_radians - 1*180) <= 22.5) {
				ally_direction = "east";
			} else if (Math.abs(theta_radians - 1.25*180) <= 22.5) {
				ally_direction = "southeast";
			} else if (Math.abs(theta_radians - 1.5*180) <= 22.5) {
				ally_direction = "south";
			} else if (Math.abs(theta_radians - 1.75*180) <= 22.5) {
				ally_direction = "southwest";
			} else {
				ally_direction = "north, probably";
			}
        	if (Math.random() < 0.15) {
                Messenger.log('You think you can hear a survivor to the ' + ally_direction)
        	}
        }
        // Notify the entity that there are items at this position
        var items = this.getMap().getItemsAt(x, y, z);
        if (items) {
            if (items.length === 1) {
                Game.sendMessage(this, "You see %s.", [items[0].describeA()]);
            } else {
                Game.sendMessage(this, "There are several objects here.");
            }
        }
        return true;
    // Check if the tile is diggable
    } else if (tile.isDiggable()) {
        // Only dig if the the entity is the player
        if (this.hasMixin(Game.EntityMixins.PlayerActor)) {
            map.dig(x, y, z);
            return true;
        }
        // If not nothing we can do, but we can't 
        // move to the tile
        return false;
    } else if (tile.isClosedDoor()) {
    	// Only open if the the entity is the player
        if (this.hasMixin(Game.EntityMixins.PlayerActor)) {
            map.open(x, y, z);
            return true;
        }
        // If not nothing we can do, but we can't 
        // move to the tile
        return false;
    } else if (targetContainers && this.hasMixin(Game.EntityMixins.PlayerActor)) {
    	targetContainers.spawn();
		
		var newScreen = Game.Screen.withdrawScreen;
		newScreen._cursorX = x;
		newScreen._cursorY = y;
		newScreen._cursorZ = z;
		Game.Screen.playScreen.showItemsSubScreen(newScreen, targetContainers.items,
        'This container is empty.');
		return false;
    }
    return false;
};
Game.Entity.prototype.isAlive = function() {
    return this._alive;
};
Game.Entity.prototype.kill = function(message) {
    // Only kill once!
    if (!this._alive) {
        return;
    }
    this._alive = false;
    if (message) {
        Game.sendMessage(this, message);
    } else {
        Game.sendMessage(this, "You have died!");
    }

    // Check if the player died, and if so call their act method to prompt the user.
    if (this.hasMixin(Game.EntityMixins.PlayerActor)) {
        this.act();
    } else {
        this.getMap().removeEntity(this);
    }
};
Game.Entity.prototype.switchMap = function(newMap) {
    // If it's the same map, nothing to do!
    if (newMap === this.getMap()) {
        return;
    }
    this.getMap().removeEntity(this);
    // Clear the position
    this._x = 0;
    this._y = 0;
    this._z = 0;
    // Add to the new map
    newMap.addEntity(this);
};