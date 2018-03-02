Game.Tile = function(properties) {
    properties = properties || {};
    // Call the Glyph constructor with our properties
    Game.Glyph.call(this, properties);
    // Set up the properties. We use false by default.
    this._walkable = properties['walkable'] || false;
    this._diggable = properties['diggable'] || false;
    this._door = properties['door'] || false;
    this._blocksLight = (properties['blocksLight'] !== undefined) ?
        properties['blocksLight'] : true;
    this._description = properties['description'] || '';
    this._difficulty = properties['difficulty'] || -1;
    this._event = properties['event'] || null;
    this._electrical = properties['electrical'] || false;
    this._waterSource = properties['waterSource'] || false;
};
// Make tiles inherit all the functionality from glyphs
Game.Tile.extend(Game.Glyph);

// Standard getters

Game.Tile.prototype.hasWater = function() {
    return this._waterSource;
};
Game.Tile.prototype.hasElectricity = function() {
    return this._electrical;
};
Game.Tile.prototype.isWalkable = function() {
    return this._walkable;
};
Game.Tile.prototype.isDiggable = function() {
    return this._diggable;
};
Game.Tile.prototype.isClosedDoor = function() {
    return this._door == 'closed';
};
Game.Tile.prototype.isBlockingLight = function() {
    return this._blocksLight;
};
Game.Tile.prototype.getDescription = function() {
    return this._description;
};
Game.Tile.prototype.getDifficulty = function() {
    return this._difficulty;
};
Game.Tile.prototype.getEvent = function() {
    return this._event;
};

Game.Tile.nullTile = new Game.Tile({description: '(unknown)'});
Game.Tile.floorTile = new Game.Tile({
    character: '%',
    walkable: true,
    blocksLight: false,
    description: 'A carpeted floor'
});

Game.Tile.eventTile = new Game.Tile({
    character: '?',
    walkable: true,
    blocksLight: false,
    description: 'It looks like something might happen here.',
    diggable: true,
    event: {
        text: 'This is a random event',
        options: [
            {
                choice: 'Leave quickly',
                stop: true
            }
        ]
    }
});

Game.Tile.tileFloorTile = new Game.Tile({
    character: '^',
    walkable: true,
    blocksLight: false,
    description: 'A tile floor'
});

Game.Tile.elevatorTile = new Game.Tile({
    character: 'i',
    walkable: true,
    blocksLight: false,
    description: 'An elevator'
});

Game.Tile.wallTile = new Game.Tile({
    character: '#',
//    foreground: 'goldenrod',
    diggable: false,
    description: 'A hotel wall'
});

Game.Tile.fridgeTile = new Game.Tile({
    character: '{',
//    foreground: 'white',
    diggable: false,
    description: 'A large fridge'
});

Game.Tile.rubbleTile = new Game.Tile({
    character: '}',
//    foreground: 'grey',
    diggable: false,
    walkable: true,
    difficulty: 4,
    description: 'A pile of rubble'
});

Game.Tile.tableTile = new Game.Tile({
    character: '$',
//    foreground: 'brown',
    diggable: false,
    walkable: true,
    difficulty: 3,
    blocksLight: false,
    description: 'A table'
});

Game.Tile.chairTile = new Game.Tile({
    character: '£',
//    foreground: 'red',
    diggable: false,
    walkable: true,
    difficulty: 2,
    blocksLight: false,
    description: 'A chair'
});

Game.Tile.bathTile = new Game.Tile({
    character: '*',
//    foreground: 'white',
    diggable: false,
    blocksLight: false,
    description: 'A bathtub'
});
Game.Tile.bathTile2 = new Game.Tile({
    character: 'a',
//    foreground: 'white',
    diggable: false,
    blocksLight: false,
    description: 'A bathtub'
});

Game.Tile.countertopTile = new Game.Tile({
    character: 'e',
//    foreground: 'white',
    diggable: false,
    blocksLight: false,
    description: 'A kitchen countertop'
});

Game.Tile.dresserTile = new Game.Tile({
    character: 'h',
//    foreground: 'brown',
    diggable: false,
    blocksLight: false,
    description: 'A dresser'
});

Game.Tile.closetTile = new Game.Tile({
    character: 'g',
//    foreground: 'brown',
    diggable: false,
    blocksLight: true,
    description: 'A closet',
    electrical: true
});

Game.Tile.bookshelfTile = new Game.Tile({
    character: 'f',
//    foreground: 'brown',
    diggable: false,
    blocksLight: true,
    description: 'A bookshelf'
});

Game.Tile.plantTile = new Game.Tile({
    character: 'c',
//    foreground: 'green',
    diggable: false,
    blocksLight: true,
    description: 'A potted plant'
});

Game.Tile.wardrobeTile = new Game.Tile({
    character: 'b',
//    foreground: 'brown',
    diggable: false,
    blocksLight: true,
    description: 'A wardrobe'
});

Game.Tile.computerTile = new Game.Tile({
    character: 'd',
//    foreground: 'white',
    diggable: false,
    blocksLight: false,
    description: 'A computer terminal'
});

Game.Tile.closedDoorTile = new Game.Tile({
    character: '+',
//    foreground: 'brown',
    diggable: false,
    description: 'A closed door',
    door: 'closed'
});
Game.Tile.toiletTile = new Game.Tile({
    character: '|',
//    foreground: 'white',
    blocksLight: false,
    description: 'A toilet'
});
Game.Tile.sinkTile = new Game.Tile({
    character: '¬',
//    foreground: 'white',
    blocksLight: false,
    description: 'A sink',
    waterSource: true,
    contents: []
});
Game.Tile.bedTile1 = new Game.Tile({
    character: '&',
//    foreground: 'lightgrey',
    blocksLight: false,
    description: 'A hotel bed',
    contents: []
});
Game.Tile.bedTile2 = new Game.Tile({
    character: '`',
//    foreground: 'lightgrey',
    blocksLight: false,
    description: 'A hotel bed',
    contents: []
});
Game.Tile.bigBedTile1 = new Game.Tile({
    character: 'j',
//    foreground: 'lightgrey',
    blocksLight: false,
    description: 'A hotel bed',
    contents: []
});
Game.Tile.bigBedTile2 = new Game.Tile({
    character: 'k',
//    foreground: 'lightgrey',
    blocksLight: false,
    description: 'A hotel bed',
    contents: []
});
Game.Tile.bigBedTile3 = new Game.Tile({
    character: 'y',
//    foreground: 'lightgrey',
    blocksLight: false,
    description: 'A hotel bed',
    contents: []
});
Game.Tile.bigBedTile4 = new Game.Tile({
    character: 'z',
//    foreground: 'lightgrey',
    blocksLight: false,
    description: 'A hotel bed',
    contents: []
});
Game.Tile.openDoorTile = new Game.Tile({
    character: '-',
//    foreground: 'brown',
    walkable: true,
    blocksLight: false,
    description: 'An open door',
    door: 'open'
});
Game.Tile.stairsUpTile = new Game.Tile({
    character: '<',
//    foreground: 'white',
    walkable: true,
    blocksLight: false,
    description: 'A wooden staircase leading upwards'
});
Game.Tile.stairsDownTile = new Game.Tile({
    character: '>',
//    foreground: 'white',
    walkable: true,
    blocksLight: false,
    description: 'A wooden staircase leading downwards'
});

// Helper function
Game.getNeighborPositions = function(x, y) {
    var tiles = [];
    // Generate all possible offsets
    for (var dX = -1; dX < 2; dX ++) {
        for (var dY = -1; dY < 2; dY++) {
            // Make sure it isn't the same tile
            if (dX == 0 && dY == 0) {
                continue;
            }
            tiles.push({x: x + dX, y: y + dY});
        }
    }
    return tiles.randomize();
};