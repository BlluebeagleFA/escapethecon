Game.ItemMixins = {};

// Edible mixins
Game.ItemMixins.Edible = {
    name: 'Edible',
    init: function(template) {
        // Number of points to add to hunger
        this._foodValue = template['foodValue'] || 5;
        // Number of times the item can be consumed
        this._maxConsumptions = template['consumptions'] || 1;
        this._remainingConsumptions = this._maxConsumptions;
        this._onEat = template['onEat'] || null;
    },
    eat: function(entity) {
        if (entity.hasMixin('FoodConsumer')) {
            if (this.hasRemainingConsumptions()) {
                entity.modifyFullnessBy(this._foodValue);
                this._remainingConsumptions--;
                if (this._onEat) {
                	this._onEat(entity);
                }
            }
        }
    },
    hasRemainingConsumptions: function() {
        return this._remainingConsumptions > 0;
    },
    describe: function() {
        if (this._maxConsumptions != this._remainingConsumptions) {
            return 'partly eaten ' + Game.Item.prototype.describe.call(this);
        } else {
            return this._name;
        }
    },
    listeners: {
        'details': function() {
            return [{key: 'food', value: this._foodValue}];
        }
    }
};

Game.ItemMixins.WaterContainer = {
    name: 'WaterContainer',
    init: function(template) {
        this._full = template['full'] || false;
    },
    getFull: function() {
        return this._full;
    },
    listeners: {
        'details': function() {
            var results = [];
            if (this._full) {
                results.push({key: 'full', value: this.getFull()});
            }
            return results;
        }
    }
};

Game.ItemMixins.Activateable = {
    name: 'Activateable',
    init: function(template) {
        this._activate = template['activate'] || function() {console.log("Activated")};
    },
    activate: function(player, item) {
        this._activate(player, item);
    }
};

// Equipment mixins
Game.ItemMixins.Equippable = {
    name: 'Equippable',
    init: function(template) {
        this._attackValue = template['attackValue'] || 0;
        this._defenseValue = template['defenseValue'] || 0;
        this._wieldable = template['wieldable'] || false;
        this._wearable = template['wearable'] || false;
        this._slot = template['slot'] || 'cloak';
        this._covers = template['covers'] || [];
    },
    getSlot: function() {
    	return this._slot;
    },
    covers: function(slot) {
    	result = false;
    	for (var i = 0; i < this._covers.length; i++) {
    		if (this._covers[i] == slot) {
    			result = true;
    		}
    	}
    	return result;
    },
    getAttackValue: function() {
        return this._attackValue;
    },
    getDefenseValue: function() {
        return this._defenseValue;
    },
    isWieldable: function() {
        return this._wieldable;
    },
    isWearable: function() {
        return this._wearable;
    },
    listeners: {
        'details': function() {
            var results = [];
            if (this._wieldable) {
                results.push({key: 'attack', value: this.getAttackValue()});
            }
            if (this._wearable) {
                results.push({key: 'defense', value: this.getDefenseValue()});
            }
            return results;
        }
    }
};