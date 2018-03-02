Game.Map.Cave = function(tiles, player) {
    // Call the Map constructor
    Game.Map.call(this, tiles);
    
    var map = Game.Map.HotelFloor(tiles[0].length, tiles[0][0].length, tiles.length);
    
    for(var z = 0; z < map.length; z++) {
    	var doZ = map.length - (1 + z);
    	for(var x = 0; x < map[z].length; x++) {
    		for(var y = 0; y < map[z][x].length; y++) {
    			if (map[z][x][y] == "#") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.wallTile;
    			} else if (map[z][x][y] == "<") {
    				this._tiles[doZ][x][y] = 
//    			        Game.Tile.stairsUpTile;
    					Game.Tile.stairsDownTile;
    			} else if (map[z][x][y] == ">") {
    				this._tiles[doZ][x][y] = 
//    			        Game.Tile.stairsDownTile;
    					Game.Tile.stairsUpTile;
    			} else if (map[z][x][y] == "+") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.closedDoorTile;
    			} else if (map[z][x][y] == "b") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.bedTile1;
    				var blanket = Game.ItemRepository.create('blanket');
    				var bedContainer = {
						spawned: true,
    					items: [blanket]	
    				}
    				this.addContainer(x,y,doZ, bedContainer);
    			} else if (map[z][x][y] == "B") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.bedTile2;
    				var blanket = Game.ItemRepository.create('blanket');
    				var bedContainer = {
						spawned: true,
    					items: [blanket]	
    				}
    				this.addContainer(x,y,doZ, bedContainer);
    			} else if (map[z][x][y] == "1") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.bigBedTile1;
    				var blanket = Game.ItemRepository.create('blanket');
    				var bedContainer = {
						spawned: true,
    					items: [blanket]	
    				}
    				this.addContainer(x,y,doZ, bedContainer);
    			} else if (map[z][x][y] == "2") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.bigBedTile2;
    				var blanket = Game.ItemRepository.create('blanket');
    				var bedContainer = {
						spawned: true,
    					items: [blanket]	
    				}
    				this.addContainer(x,y,doZ, bedContainer);
    			} else if (map[z][x][y] == "3") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.bigBedTile3;
    				var blanket = Game.ItemRepository.create('blanket');
    				var bedContainer = {
						spawned: true,
    					items: [blanket]	
    				}
    				this.addContainer(x,y,doZ, bedContainer);
    			} else if (map[z][x][y] == "4") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.bigBedTile4;
    				var blanket = Game.ItemRepository.create('blanket');
    				var bedContainer = {
						spawned: true,
    					items: [blanket]	
    				}
    				this.addContainer(x,y,doZ, bedContainer);
    			} else if (map[z][x][y] == "t") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.toiletTile;
    			} else if (map[z][x][y] == "s") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.sinkTile;
    				var closetContainer = {
						spawnList: [
							{item: "purge", chance: 0.1},
							{item: "speedpoison", chance: 0.05},
							{item: "strengthpoison", chance: 0.05},
							{item: "dexteritypoison", chance: 0.05},
							{item: "perceptionpoison", chance: 0.05},
							{item: "constitutionpoison", chance: 0.05},
							{item: "painkillers", chance: 0.2}
						]	
    				}
    				this.addContainer(x,y,doZ, closetContainer);
    			} else if (map[z][x][y] == "e") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.elevatorTile;
    				if (z == 0) {
    					player.setX(x);
    				    player.setY(y);
    				    player.setZ(0);
    				    this.addEntity(player);
    				    console.log("Added player to " + x + " " + y + " " + z);
    				}
    			} else if (map[z][x][y] == "f") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.fridgeTile;
    					var closetContainer = {
    						spawnList: [
    							{item: "apple", chance: 0.4},
    							{item: "chocolate", chance: 0.4},
    							{item: "cookies", chance: 0.4},
    							{item: "ice tea", chance: 0.4},
    							{item: "wine", chance: 0.4},
    							{item: "soda", chance: 0.4},
    							{item: "blitz energy drink", chance: 0.1},
    							{item: "bottled water", chance: 0.4},
    							{item: "melon", chance: 0.4},
    							{item: "salmon", chance: 0.1},
    						]	
        				}
        				this.addContainer(x,y,doZ, closetContainer);
    			} else if (map[z][x][y] == "r") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.rubbleTile;
    			} else if (map[z][x][y] == "l") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.tableTile;
    			} else if (map[z][x][y] == "x") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.chairTile;
    			} else if (map[z][x][y] == "H") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.bathTile2;
    			} else if (map[z][x][y] == "h") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.bathTile;
    			} else if (map[z][x][y] == "d") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.dresserTile;
    			} else if (map[z][x][y] == "c") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.closetTile;
    				var closetContainer = {
						spawnList: [
							{item: "apple", chance: 0.1},
							{item: "salmon", chance: 0.05},
							{item: "chocolate", chance: 0.1},
							{item: "cookies", chance: 0.1},
							{item: "ice tea", chance: 0.1},
							{item: "wine", chance: 0.1},
							{item: "soda", chance: 0.1},
							{item: "blitz energy drink", chance: 0.05},
							{item: "bottled water", chance: 0.1},
							{item: "melon", chance: 0.1},
							{item: "kettle", chance: 0.2},
							{item: "knife", chance: 0.05}
						]	
    				}
    				this.addContainer(x,y,doZ, closetContainer);
    			} else if (map[z][x][y] == "C") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.closetTile;
    				var closetContainer = {
						spawnList: [
							{item: "mop", chance: 0.5},
							{item: "bucket", chance: 0.5},
							{item: "spray", chance: 0.5},
						]	
    				}
    				this.addContainer(x,y,doZ, closetContainer);
    			} else if (map[z][x][y] == "z") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.bookshelfTile;
    				var closetContainer = {
						spawnList: [
							{item: "book", chance: 0.2},
							{item: "weird fetish book", chance: 0.05}
						]	
    				}
    				this.addContainer(x,y,doZ, closetContainer);
    			} else if (map[z][x][y] == "p") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.computerTile;
    				var closetContainer = {
    						spawnList: [
    							{item: "deadly mutagen virus", chance: 0.1}
    						]	
        				}
        				this.addContainer(x,y,doZ, closetContainer);
    			} else if (map[z][x][y] == "P") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.plantTile;
    			} else if (map[z][x][y] == "w") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.wardrobeTile;
    				var closetContainer = {
						spawnList: [
							{item: "smelly socks", chance: 0.05},
							{item: "shorts", chance: 0.1},
							{item: "pants", chance: 0.1},
							{item: "dress", chance: 0.1},
							{item: "jeans", chance: 0.1},
							{item: "leather pants", chance: 0.1},
							{item: "long sleeved shirt", chance: 0.1},
							{item: "blouse", chance: 0.1},
							{item: "t shirt", chance: 0.1},
							{item: "vest", chance: 0.1},
							{item: "waistcoat", chance: 0.1},
							{item: "leather jacket", chance: 0.1},
							{item: "mittens", chance: 0.1},
							{item: "leather gloves", chance: 0.1},
							{item: "long gloves", chance: 0.1},
							{item: "scarf", chance: 0.1},
							{item: "thick scarf", chance: 0.1},
							{item: "cough mask", chance: 0.1},
							{item: "gas mask", chance: 0.1},
							{item: "beanie", chance: 0.1},
							{item: "fedora", chance: 0.1},
							{item: "crown", chance: 0.1},
							{item: "boxers", chance: 0.1},
							{item: "panties", chance: 0.1},
							{item: "briefs", chance: 0.1},
							{item: "jockstrap", chance: 0.1},
							{item: "leatherundies", chance: 0.1},
							{item: "socks", chance: 0.1},
							{item: "stockings", chance: 0.1},
							{item: "sport socks", chance: 0.1},
							{item: "sneakers", chance: 0.1},
							{item: "dress shoes", chance: 0.1},
							{item: "roller skates", chance: 0.1},
							{item: "slippers", chance: 0.1}
						]	
    				}
    				this.addContainer(x,y,doZ, closetContainer);
    			} else if (map[z][x][y] == "k") {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.countertopTile;
    					var closetContainer = {
    						spawnList: [
    							{item: "apple", chance: 0.2},
    							{item: "chocolate", chance: 0.2},
    							{item: "cookies", chance: 0.2},
    							{item: "ice tea", chance: 0.2},
    							{item: "wine", chance: 0.2},
    							{item: "soda", chance: 0.2},
    							{item: "blitz energy drink", chance: 0.1},
    							{item: "salmon", chance: 0.05},
    							{item: "bottled water", chance: 0.2},
    							{item: "melon", chance: 0.2},
    							{item: "knife", chance: 0.1},
    							{item: "electric carver", chance: 0.2}
    						]	
        				}
        				this.addContainer(x,y,doZ, closetContainer);
    			} else {
    				this._tiles[doZ][x][y] = 
    			        Game.Tile.floorTile;
    			}
    		}
    	}
    }
    
//	player.setX(1);
//    player.setY(tiles[0][0].length-2);
//    player.setZ(0);
//    this.addEntity(player);

    var restaurantFloorNum = Math.floor(this._depth/2);
    
	var dog = Game.EntityRepository.create('dog');
	this.addEntityAtRandomPosition(dog, 0);
    
    var rob = Game.EntityRepository.create('pink rabbit');
    this.addEntityAtRandomPosition(rob, 1);
    
    var cat = Game.EntityRepository.create('cat');
    this.addEntityAtRandomPosition(cat, 2);
    
    var owl = Game.EntityRepository.create('owl');
    this.addEntityAtRandomPosition(owl, 3);
    
    var raccoon = Game.EntityRepository.create('raccoon');
    this.addEntityAtRandomPosition(raccoon, 4);
    
    // Add random entities and items to each floor.
    var addMonster = function(that, monster, count, z) {
    	for (var i = 0; i < count; i++) {
            var entity = Game.EntityRepository.create(monster);
            // Add a random entity
            that.addEntityAtRandomPosition(entity, z);
        }
    }
    
    for (var z = 0; z < this._depth; z++) {
        if (z == 0) {
        	addMonster(this, "fox", 4, z);
        	addMonster(this, "rat", 9, z);
        	addMonster(this, "rabbit", 2, z);
        } else if (z == 1) {
        	addMonster(this, "rat", 5, z);
        	addMonster(this, "fox", 4, z);
        	addMonster(this, "rabbit", 4, z);
        	addMonster(this, "boar", 2, z);
        } else if (z == 2) {
        	addMonster(this, "fox", 5, z);
        	addMonster(this, "rabbit", 4, z);
        	addMonster(this, "boar", 6, z);
        	addMonster(this, "bear", 2, z);
        } else if (z == 3) {
        	addMonster(this, "rabbit", 5, z);
        	addMonster(this, "boar", 4, z);
        	addMonster(this, "bear", 4, z);
        	addMonster(this, "wolf", 2, z);
        } else if (z == 4) {
        	addMonster(this, "boar", 5, z);
        	addMonster(this, "bear", 4, z);
        	addMonster(this, "wolf", 4, z);
        	addMonster(this, "dragon", 2, z);
        } else if (z == 5) {
        	addMonster(this, "bear", 12, z);
        	addMonster(this, "wolf", 10, z);
        	addMonster(this, "dragon", 8, z);
        }
    	// 15 entities per floor
//        for (var i = 0; i < 15; i++) {
//            var entity = Game.EntityRepository.createRandom();
//            // Add a random entity
//            this.addEntityAtRandomPosition(entity, z);
//            if (z == this._depth-1) {
//            	this.addEntityAtRandomPosition(Game.EntityRepository.createRandom(), z);
//            }
//            // Level up the entity based on the floor
//            if (entity.hasMixin('ExperienceGainer')) {
//                for (var level = 0; level < z; level++) {
//                    entity.giveExperience(entity.getNextLevelExperience() -
//                        entity.getExperience());
//                }
//            }
//        }
    }
};
Game.Map.Cave.extend(Game.Map);
