Game.ItemRepository = new Game.Repository('items', Game.Item);

Game.ItemRepository.define('purge', {
    name: 'purge medicine',
    character: '%',
    foreground: 'white',
    foodValue: 1,
    onEat: function(target) {
    	if (target.getCorruption() > 5) {
    		target.addCorruption(-5);
    	}
    	target.setHp(Math.floor(target.getHp()/2)+1);
    	Game.sendMessage(target, "You feel horribly ill as the pills purge your body of corruption!");
    },
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('speedpoison', {
    name: 'corrupted speed toxin',
    character: '%',
    foreground: 'white',
    foodValue: 1,
    onEat: function(target) {
    	if (target.getCorruption() < 80) {
    		target.addCorruption(20);
    		target.increaseSpeed();
    		Game.sendMessage(target, "You feel sick and twisted as the corrupted pills corrode your mind, but enhance your agility.");
    	} else {
    		Game.sendMessage(target, "The pills have no effect on your heavily corrupted body.");
    	}
    },
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('strengthpoison', {
    name: 'corrupted strength toxin',
    character: '%',
    foreground: 'white',
    foodValue: 1,
    onEat: function(target) {
    	if (target.getCorruption() < 80) {
    		target.addCorruption(20);
    		target.increaseAttackValue();
    		Game.sendMessage(target, "You feel sick and twisted as the corrupted pills corrode your mind, but enhance your strength.");
    	} else {
    		Game.sendMessage(target, "The pills have no effect on your heavily corrupted body.");
    	}
    },
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('dexteritypoison', {
    name: 'corrupted dexterity toxin',
    character: '%',
    foreground: 'white',
    foodValue: 1,
    onEat: function(target) {
    	if (target.getCorruption() < 80) {
    		target.addCorruption(20);
    		target.increaseDexterity();
    		Game.sendMessage(target, "You feel sick and twisted as the corrupted pills corrode your mind, but enhance your dexterity.");
    	} else {
    		Game.sendMessage(target, "The pills have no effect on your heavily corrupted body.");
    	}
    },
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('perceptionpoison', {
    name: 'corrupted perception toxin',
    character: '%',
    foreground: 'white',
    foodValue: 1,
    onEat: function(target) {
    	if (target.getCorruption() < 80) {
    		target.addCorruption(20);
    		target.increaseSightRadius();
    		Game.sendMessage(target, "You feel sick and twisted as the corrupted pills corrode your mind, but enhance your perception.");
    	} else {
    		Game.sendMessage(target, "The pills have no effect on your heavily corrupted body.");
    	}
    },
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('constitutionpoison', {
    name: 'corrupted constitution toxin',
    character: '%',
    foreground: 'white',
    foodValue: 1,
    onEat: function(target) {
    	if (target.getCorruption() < 80) {
    		target.addCorruption(20);
    		target.increaseMaxHp();
    		Game.sendMessage(target, "You feel sick and twisted as the corrupted pills corrode your mind, but enhance your constitution.");
    	} else {
    		Game.sendMessage(target, "The pills have no effect on your heavily corrupted body.");
    	}
    },
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('deadly mutagen virus', {
    name: 'deadly mutagen virus',
    character: '%',
    foreground: 'white',
    foodValue: 1,
    onEat: function(target) {
    	target.addCorruption(100);
    	target.setBodyPartDescription("head", "robot", "Your body feels terribly wrong and unnatural. You've made a terrible mistake.");
    	target.setBodyPartDescription("chest", "robot", "Your body feels terribly wrong and unnatural. You've made a terrible mistake.");
    	target.setBodyPartDescription("arms", "robot", "Your body feels terribly wrong and unnatural. You've made a terrible mistake.");
    	target.setBodyPartDescription("tail", "robot", "Your body feels terribly wrong and unnatural. You've made a terrible mistake.");
    	target.setBodyPartDescription("feet", "robot", "Your body feels terribly wrong and unnatural. You've made a terrible mistake.");
    	target.setBodyPartDescription("hands", "robot", "Your body feels terribly wrong and unnatural. You've made a terrible mistake.");
    	target.setBodyPartDescription("legs", "robot", "Your body feels terribly wrong and unnatural. You've made a terrible mistake.");
    	target.setBodyPartDescription("genitals", "robot", "Your body feels terribly wrong and unnatural. You've made a terrible mistake.");
    	Game.sendMessage(target, "You feel sick and wrong as the lethal, monstrous pure energy of the mutagen explodes inside you!");
    },
    mixins: [Game.ItemMixins.Edible, Game.ItemMixins.Activateable],
    activate: function(player, item) {
    	var target = player.getRandomAdjacentEnemy();
    	if (target) {
    		player.removeItemByName('deadly mutagen virus');
    		Game.sendMessage(player, "You throw the strange glowing disc right in the monster's face. It explodes with light, and glowing lines engulf the beast, before suddenly it disintegrates into dust!");
    		target.takeDamage(player, 100);
    	} else {
    		Game.sendMessage(player, "You should do this when there's an enemy nearby.");
    	}
    }
});

Game.ItemRepository.define('painkillers', {
    name: 'painkillers',
    character: '%',
    foreground: 'white',
    foodValue: 1,
    onEat: function(target) {
    	target.setHp(target.getHp()+10);
    	if (target.getMaxHp() < target.getHp()) {
    		target.setHp(target.getMaxHp());
    	}
    	Game.sendMessage(target, "You feel a little better.");
    },
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('apple', {
    name: 'apple',
    character: '%',
    foreground: 'red',
    foodValue: 50,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('salmon', {
    name: 'salmon',
    character: '%',
    foreground: 'red',
    foodValue: 50,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('chocolate', {
    name: 'chocolate',
    character: '%',
    foreground: 'red',
    foodValue: 50,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('cookies', {
    name: 'cookies',
    character: '%',
    foreground: 'red',
    foodValue: 50,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('ice tea', {
    name: 'ice tea',
    character: '%',
    foreground: 'blue',
    foodValue: 25,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('wine', {
    name: 'wine',
    character: '%',
    foreground: 'blue',
    foodValue: 40,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('soda', {
    name: 'soda',
    character: '%',
    foreground: 'blue',
    foodValue: 10,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('blitz energy drink', {
    name: 'blitz energy drink',
    character: '%',
    foreground: 'blue',
    foodValue: 100,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('bottled water', {
    name: 'bottled water',
    character: '%',
    foreground: 'blue',
    foodValue: 20,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('melon', {
    name: 'melon',
    character: '%',
    foreground: 'lightGreen',
    foodValue: 35,
    consumptions: 4,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('cum', {
    name: 'cum',
    character: '%',
    foodValue: 5,
    consumptions: 1,
    mixins: [Game.ItemMixins.Edible]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('rock', {
    name: 'rock',
    character: '*',
    foreground: 'white'
});

Game.ItemRepository.define('book', {
    name: 'book',
    character: '*',
    foreground: 'white'
});

Game.ItemRepository.define('weird fetish book', {
    name: 'weird fetish book',
    character: '*',
    foreground: 'white',
    mixins: [Game.ItemMixins.Activateable],
    activate: function(player, item) {
    	player._kinky = true;
		Game.sendMessage(player, "This book is full of the weirdest fetishes you've ever seen. You think you're into inanimate transformation and body part transformation now.");
    }
});

Game.ItemRepository.define('bucket', {
    name: 'bucket',
    character: '*',
    foreground: 'grey'
});

// Weapons
Game.ItemRepository.define('mop', {
    name: 'mop',
    character: ')',
    foreground: 'brown',
    attackValue: 2,
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('knife', {
    name: 'knife',
    character: ')',
    foreground: 'brown',
    attackValue: 5,
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('electric carver', {
    name: 'electric carver',
    character: ')',
    foreground: 'brown',
    attackValue: 20,
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('kettle', {
    name: 'kettle',
    character: 'k',
    foreground: 'gray',
    attackValue: 1,
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable, Game.ItemMixins.WaterContainer, Game.ItemMixins.Activateable],
    activate: function(player, item) {
    	if (player.hasWater()) {
    		player.removeItemByName('kettle');
    		player.addItem(Game.ItemRepository.create('full kettle'));
    		Game.sendMessage(player, "You fill up the kettle.");
    	} else {
    		Game.sendMessage(player, "The kettle is empty. You should try this when you're next to a water source.");
    	}
    }
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('full kettle', {
    name: 'full kettle',
    character: 'k',
    foreground: 'gray',
    attackValue: 1,
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable, Game.ItemMixins.WaterContainer, Game.ItemMixins.Activateable],
    activate: function(player, item) {
    	if (player.hasElectricity()) {
    		player.removeItemByName('full kettle');
    		player.addItem(Game.ItemRepository.create('boiling kettle'));
    		Game.sendMessage(player, "You boil the kettle. It makes a lot of noise, you should watch out for enemies");
    		Game.sendSoundNearby(player.getMap(), player.getX(), player.getY(), player.getZ());
    	} else {
    		Game.sendMessage(player, "The kettle is cold. You should try this next to a power outlet. There was one in each food closet in the hotel bedrooms.");
    	}
    }
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('boiling kettle', {
    name: 'boiling kettle',
    character: 'k',
    foreground: 'gray',
    attackValue: 1,
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable, Game.ItemMixins.WaterContainer, Game.ItemMixins.Activateable],
    activate: function(player, item) {
    	var target = player.getRandomAdjacentEnemy();
    	if (target) {
    		player.removeItemByName('boiling kettle');
    		player.addItem(Game.ItemRepository.create('kettle'));
    		Game.sendMessage(player, "You throw the boiling water right in the monster's face for massive damage!");
    		target.takeDamage(player, 20);
    	} else {
    		Game.sendMessage(player, "You should do this when there's an enemy nearby.");
    	}
    }
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('spray', {
    name: 'spraybottle',
    character: 's',
    foreground: 'gray',
    attackValue: 1,
    wieldable: true,
    activate: function(player, item) {
    	var target = player.getRandomAdjacentEnemy();
    	if (target) {
    		Game.sendMessage(player, "You empty the cleaning spray into the monster's face, and it runs away for now!");
    		var position = player.getMap().getRandomFloorPosition(target.getZ());
    		var oldx = target.getX();
    		var oldy = target.getY();
    		target.setX(position.x);
    		target.setY(position.y);
    		player.getMap().updateEntityPosition(target, oldx, oldy, target.getZ());
    		player.removeItemByName('spraybottle');
    	} else {
    		Game.sendMessage(player, "You should do this when there's an enemy nearby.");
    	}
    },
    mixins: [Game.ItemMixins.Equippable, Game.ItemMixins.WaterContainer, Game.ItemMixins.Activateable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('pillow', {
    name: 'pillow',
    character: ')',
    foreground: 'white',
    attackValue: -1,
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

// Wearables
Game.ItemRepository.define('blanket', {
    name: 'blanket',
    character: '[',
    foreground: 'white',
    defenseValue: 1,
    attackValue: -3,
    slot: 'cloak',
    covers: ['head', 'chest', 'legs', 'genitals', 'tail', 'arms', 'hands'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('shorts', {
    name: 'shorts',
    character: '[',
    foreground: 'white',
    defenseValue: 1,
    slot: 'pants',
    covers: ['genitals', 'tail'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('pants', {
    name: 'pants',
    character: '[',
    foreground: 'white',
    defenseValue: 1,
    slot: 'pants',
    covers: ['legs', 'genitals', 'tail'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('jeans', {
    name: 'jeans',
    character: '[',
    foreground: 'white',
    defenseValue: 2,
    slot: 'pants',
    covers: ['legs', 'genitals', 'tail'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('dress', {
    name: 'dress',
    character: '[',
    foreground: 'white',
    defenseValue: 1,
    slot: 'pants',
    covers: ['legs', 'genitals', 'tail'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('leather pants', {
    name: 'leather pants',
    character: '[',
    foreground: 'white',
    defenseValue: 4,
    slot: 'pants',
    covers: ['legs', 'genitals', 'tail'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('long sleeved shirt', {
    name: 'long sleeved shirt',
    character: '[',
    foreground: 'grey',
    defenseValue: 2,
    slot: 'shirt',
    covers: ['chest', 'arms'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('blouse', {
    name: 'blouse',
    character: '[',
    foreground: 'grey',
    defenseValue: 2,
    slot: 'shirt',
    covers: ['chest', 'arms'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('t shirt', {
    name: 't shirt',
    character: '[',
    foreground: 'grey',
    defenseValue: 1,
    slot: 'shirt',
    covers: ['chest'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('vest', {
    name: 'vest',
    character: '[',
    foreground: 'grey',
    defenseValue: 1,
    slot: 'shirt',
    covers: ['chest'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('waistcoat', {
    name: 'waistcoat',
    character: '[',
    foreground: 'grey',
    defenseValue: 2,
    slot: 'shirt',
    covers: ['chest'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('leather jacket', {
    name: 'leather jacket',
    character: '[',
    foreground: 'grey',
    defenseValue: 5,
    slot: 'shirt',
    covers: ['chest', 'arms'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('mittens', {
    name: 'mittens',
    character: '[',
    foreground: 'red',
    defenseValue: 1,
    attackValue: -1,
    slot: 'gloves',
    covers: ['hands'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('leather gloves', {
    name: 'leather gloves',
    character: '[',
    foreground: 'red',
    defenseValue: 2,
    slot: 'gloves',
    covers: ['hands'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('long gloves', {
    name: 'long gloves',
    character: '[',
    foreground: 'red',
    defenseValue: 1,
    slot: 'gloves',
    covers: ['hands', 'arms'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('scarf', {
    name: 'scarf',
    character: '[',
    foreground: 'blue',
    defenseValue: 1,
    slot: 'scarf',
    covers: ['head'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('thick scarf', {
    name: 'scarf',
    character: '[',
    foreground: 'blue',
    defenseValue: 2,
    slot: 'scarf',
    covers: ['head'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('cough mask', {
    name: 'cough mask',
    character: '[',
    foreground: 'blue',
    defenseValue: 1,
    slot: 'mask',
    covers: ['head'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('gas mask', {
    name: 'gas mask',
    character: '[',
    foreground: 'blue',
    defenseValue: 5,
    slot: 'mask',
    covers: ['head'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('beanie', {
    name: 'beanie',
    character: '[',
    foreground: 'green',
    defenseValue: 1,
    slot: 'hat',
    covers: ['head'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('fedora', {
    name: 'beanie',
    character: '[',
    foreground: 'green',
    defenseValue: 2,
    slot: 'hat',
    covers: ['head'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('crown', {
    name: 'beanie',
    character: '[',
    foreground: 'green',
    defenseValue: 2,
    slot: 'hat',
    covers: ['head'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('boxers', {
    name: 'boxers',
    character: '[',
    foreground: 'white',
    defenseValue: 1,
    slot: 'underwear',
    covers: ['genitals', 'tail'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('panties', {
    name: 'panties',
    character: '[',
    foreground: 'white',
    defenseValue: 1,
    slot: 'underwear',
    covers: ['genitals', 'tail'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('briefs', {
    name: 'briefs',
    character: '[',
    foreground: 'white',
    defenseValue: 1,
    slot: 'underwear',
    covers: ['genitals', 'tail'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('jockstrap', {
    name: 'jockstrap',
    character: '[',
    foreground: 'white',
    defenseValue: 1,
    slot: 'underwear',
    covers: ['genitals'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('leatherundies', {
    name: 'leather underwear',
    character: '[',
    foreground: 'grey',
    defenseValue: 2,
    slot: 'underwear',
    covers: ['genitals', 'tail'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('socks', {
    name: 'socks',
    character: '[',
    foreground: 'white',
    defenseValue: 1,
    slot: 'socks',
    covers: ['feet'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('smelly socks', {
    name: 'smelly socks',
    character: '[',
    foreground: 'white',
    defenseValue: 1,
    slot: 'socks',
    covers: ['feet'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('stockings', {
    name: 'stockings',
    character: '[',
    foreground: 'white',
    defenseValue: 1,
    slot: 'socks',
    covers: ['feet'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('sport socks', {
    name: 'sport socks',
    character: '[',
    foreground: 'white',
    defenseValue: 2,
    slot: 'socks',
    covers: ['feet'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('boots', {
    name: 'boots',
    character: '[',
    foreground: 'black',
    defenseValue: 4,
    slot: 'shoes',
    covers: ['feet'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('sneakers', {
    name: 'sneakers',
    character: '[',
    foreground: 'black',
    defenseValue: 3,
    slot: 'shoes',
    covers: ['feet'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('dress shoes', {
    name: 'dress shoes',
    character: '[',
    foreground: 'black',
    defenseValue: 2,
    slot: 'shoes',
    covers: ['feet'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('roller skates', {
    name: 'roller skates',
    character: '[',
    foreground: 'black',
    defenseValue: 4,
    slot: 'shoes',
    covers: ['feet'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('slippers', {
    name: 'slippers',
    character: '[',
    foreground: 'black',
    defenseValue: 1,
    slot: 'shoes',
    covers: ['feet'],
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});