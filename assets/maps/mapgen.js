Game.Map.HotelFloor = function(width, height, totalfloors) {

var map = [];

var floors = [];
var floor = 0;
var maxfloor = 0;

var generateBuilding = function(startwidth, startheight, floorNo) {
    width = startwidth;
    height = startheight;
    maxfloor = floorNo;
    
    var elevatorx = 0
    while (elevatorx < 4 || width-elevatorx < 4) {
        elevatorx = Math.floor(Math.random()*width/3);
    }
    
    var elevatory = 0;
    while (elevatory < 4 || height-elevatory < 4) {
        elevatory = Math.floor(Math.random()*height);
    }
    
    var elevator = {x: elevatorx, y: elevatory};
    
    var restaurantFloorNum = 0;
    
    if (floorNo > 3) {
        restaurantFloorNum = Math.floor(floorNo/2);
    }
    
    for (var i = 0; i < floorNo; i++) {
        floor = i;
        if (floor == 0) {
            floors.push(generateGroundMap(elevator));
        } else if (floor == restaurantFloorNum) {
            floors.push(generateRestaurantMap(elevator));
        } else {
            floors.push(generateFloorMap(elevator));
        }
//        printMap(i);
    }
    
    return(floors);
}

var generateGroundMap = function(elevator) {
    map = [];
    for (var i = 0; i < width; i++) {
        var y = [];
        for (var j = 0; j < height; j++) {
            y.push("");
        }
        map.push(y);
    }
   
    generateGroundFloor(elevator);
    fillSpace();
    return clone(map);
}

var generateRestaurantMap = function(elevator) {
    map = [];
    for (var i = 0; i < width; i++) {
        var y = [];
        for (var j = 0; j < height; j++) {
            y.push("");
        }
        map.push(y);
    }
   
    generateRestaurant(elevator);
    fillSpace();
    return clone(map);
}

var generateFloorMap = function(elevator) {
    map = [];
    for (var i = 0; i < width; i++) {
        var y = [];
        for (var j = 0; j < height; j++) {
            y.push("");
        }
        map.push(y);
    }
   
    generateFloor(elevator);
    fillSpace();
    return clone(map);
}

function clone (existingArray) {
   var newObj = (existingArray instanceof Array) ? [] : {};
   for (i in existingArray) {
      if (i == 'clone') continue;
      if (existingArray[i] && typeof existingArray[i] == "object") {
         newObj[i] = clone(existingArray[i]);
      } else {
         newObj[i] = existingArray[i]
      }
   }
   return newObj;
}

var printMap = function() {
    for (var i = 0; i < width; i++) {
        var line = "";
        for (var j = 0; j < height; j++) {
            line += map[i][j];
        }
        console.log(line);
    }
}

var generateFloor = function(elevator) {
    var ecorridor;
    map[elevator.x][elevator.y] = "e"
    drawElevatorShaft(elevator, "x", "y", 1);
    ecorridor = elevator.y+2;
    
    surroundMapWithWalls();
    drawHorizontalLine(0, 1, width, "."); //Passage corridor
    drawHorizontalLine(0, height-2, width, "."); //Passage corridor
    if (floor < maxfloor-1) {
        map[1][height-2] = ">";
    }
    map[1][1] = "<";
    drawRooms(ecorridor, 1, 18);
    drawRooms(ecorridor, -1, -18);
    drawVerticalLine(width-2, 0, height, "."); //Passage corridor
    drawSecurityRoom();
    drawLibrary();
    drawRestroom();
    drawRestroom();
    drawWaitingRoom();
    drawCloset();
    drawCloset();
    drawCloset();
    drawCloset();
    drawPotPlant();
    drawPotPlant();
    drawPotPlant();
    drawPotPlant();
    drawPotPlant();
};

var generateRestaurant = function(elevator) {
    var ecorridor;
    map[elevator.x][elevator.y] = "e"
    drawElevatorShaft(elevator, "x", "y", 1);
    surroundMapWithWalls();
    drawHorizontalLine(elevator.x, elevator.y+2, 4, ".");
    map[1][height-2] = ">";
    map[1][1] = "<";
    
    var restaurantWall = Math.floor(width*0.75);
    
    draw(6, 4, "+");
    draw(restaurantWall-1, 4, "+");
    drawHorizontalLine(0, 4, restaurantWall, "#");
    draw(6, height-5, "+");
    
    
    draw(restaurantWall-1, height-5, "+");
    drawHorizontalLine(0, height-5, restaurantWall, "#");
    
    draw(restaurantWall, 5, "+");
    
    draw(restaurantWall, height-6, "+");
    drawVerticalLine(restaurantWall, 0, height, "#");
    
    for (var i = 2; (i+restaurantWall) < width-3; i++) {
        drawVerticalLineInSteps(i+restaurantWall, 2, height, 3, ".");
        drawVerticalLine(i+restaurantWall, 2, height-4, "k"); //kitchen counter or ovens or such.
    }
    
    drawVerticalLine(width-2, 2, height-4, "f"); //fridge
    
    for (var i = 0; i < 50; i++) {
        drawRandomly(1, restaurantWall, 1, height, "l");//table
        drawRandomly(1, restaurantWall, 1, height, "x");//chair
        drawRandomly(1, restaurantWall, 1, height, "x");//
    }
    
}

var drawRandomly = function(minx, maxx, miny, maxy, char) {
    var x;
    var y;
    if (minx == maxx || miny == maxy) {
        return;
    }
    while (!(x > minx && x < maxx)) {
        x = Math.floor(Math.random()*width);
    }
    while (!(y > miny && y < maxy)) {
        y = Math.floor(Math.random()*height);
    }
    draw(x, y, char);
}

var generateGroundFloor = function(elevator) {
    var ecorridor;
    map[elevator.x][elevator.y] = "e"
    drawElevatorShaft(elevator, "x", "y", 1);
    
    drawVerticalLineInSteps(width-1, 0, height, 3, "+");
    
    surroundMapWithWalls();
    drawHorizontalLine(elevator.x, elevator.y+2, 4, ".");
    map[1][height-2] = ">";
    
    var finalWall = Math.floor(height*0.8);
    
    draw(finalWall, 5, "+");
    draw(finalWall, 6, "+");
    draw(finalWall, height-6, "+");
    draw(finalWall, height-7, "+");
    drawVerticalLine(finalWall, 0, height, "#");
    
    drawVerticalLineInSteps(finalWall+1, 9, height-20, 3, "p"); //computers
    
    for (var i = 0; i < 100; i++) {
        drawRandomly(1, finalWall, 1, height, "r");//rubble that blocks field of vision 
    }
    
    for (var i = 0; i < 50; i++) {
        drawRandomly(1, finalWall, 1, height, "l");//table
        drawRandomly(1, finalWall, 1, height, "x");//chair
        drawRandomly(1, finalWall, 1, height, "x");//
    }
}

var drawElevatorShaft = function(elevator, x, y, tb) {
    map[elevator[x]][elevator[y]+(1*tb)] = "+";
    surroundWithWalls(elevator[x], elevator[y]);
    if (floor > 0) {
        map[elevator[x]+(2*tb)][elevator[y]] = "<";
    } else {
        map[elevator[x]+(2*tb)][elevator[y]] = ".";
    }
    if (floor < maxfloor-1) {
        map[elevator[x]+(3*tb)][elevator[y]] = ">";
    } else {
        map[elevator[x]+(3*tb)][elevator[y]] = ".";
    }
    map[elevator[x]+(2*tb)][elevator[y]+(1*tb)] = "+";
    surroundWithWalls(elevator[x]+(2*tb), elevator[y]);
    surroundWithWalls(elevator[x]+(3*tb), elevator[y]);
}

var drawHorizontalLineInSteps = function(x1, y1, length, stepsize, char) {
    var step = 0;
    for (var x in map) {
        for (var y in map[x]) {
            step++;
            if (y == y1 && x >= x1 && x < (length+x1) && step == stepsize) {
                map[x][y] = map[x][y] || char; 
                step = 0;
            }
        }
    }
}

var drawVerticalLineInSteps = function(x1, y1, length, stepsize, char) {
    var step = 0;
    for (var x in map) {
        for (var y in map[x]) {
            step++;
            if (x == x1 && y >= y1 && y < (length+y1) && step > stepsize) {
                map[x][y] = map[x][y] || char;
                step = 0;
            }
        }
    }
}

var surroundWithWalls = function(x1, y1) {
    for (var x in map) {
        for (var y in map[x]) {
            if (Math.abs(x1-x) <= 1 && Math.abs(y1-y) <= 1) {
                map[x][y] = map[x][y] || "#"; 
            }
        }
    }
}

var surroundMapWithWalls = function() {
    for (var x in map) {
        for (var y in map[x]) {
            if (x == 0 || y == 0 || x == (width-1) || y == (height-1)) {
                map[x][y] = map[x][y] || "#"; 
            }
        }
    }
}

var drawRooms = function(y, o, inc) {
    var x;
    if (y <= height && y>= 0) {
        if ((o == 1 && height - y > 11) || (o == -1 && y > 10)) {
            for (x = 0; x < width; x++) {
                if (width-x <= 10) {
//                    drawVerticalLine(x+1, y+1, 8, ".");
                } else if (width-x < 10) {
                    map[x+7][y+1] = ".";
                    x = drawSmallRoom(x, y, o);
                    x++;
                    //a small room, then a carpet corridor
                } else  {
                    if (Math.random() < 0.75) {
                        x = drawSmallRoom(x, y, o);
                    } else {
                        x = drawBigRoom(x, y, o);
                    }
                    //either room type
                }
            }
            
            drawHorizontalLine(0, y, width, "."); //Passage corridor

            var readyForMoreRooms = false;
            if (o == 1 && height - (y + inc) > 1) {
                readyForMoreRooms = true;
            }
            if (o == -1 && y + inc > 0) {
                readyForMoreRooms = true;
            }
            if (readyForMoreRooms) {
                if (o == 1 && inc > 0) {
                    y = y+inc;
                } else if (o == -1 && inc < 0) {
                    y = y+inc;
                }
             
                o = o*(-1);
                drawRooms(y, o, inc);
            }
        }
        //then move to the end of two rooms worth and do it again facing south then recurse until there is nothing left to fill
    }
}

var drawSmallRoom = function(x, y, o) {
    draw(x+5,y+(1*o),"+");
//    map[x+5][y+(1*o)] = "+";
    draw(x+3,y+(2*o),"s");
    draw(x+2,y+(2*o),"t");
    draw(x+1,y+(4*o),"#");
    draw(x+2,y+(4*o),"#");
    draw(x+3,y+(4*o),"#");
    draw(x+4,y+(4*o),"#");
    draw(x+4,y+(2*o),"#");
    draw(x+4,y+(3*o),"+");
//    map[x+4][y+(3*o)] = "+";
    draw(x+5,y+(7*o),"w");
    draw(x+5,y+(8*o),"w");
    
    if (o == 1) {
    	draw(x+1,y+(7*o),"b");
        draw(x+1,y+(8*o),"B");
        draw(x+1,y+(2*o),"h");
        draw(x+1,y+(3*o),"H");
    } else {
    	draw(x+1,y+(7*o),"B");
        draw(x+1,y+(8*o),"b");
        draw(x+1,y+(2*o),"H");
        draw(x+1,y+(3*o),"h");
    }
    draw(x+2,y+(7*o),"d");
    
    draw(x+1,y+(5*o),"c");
    draw(x+2,y+(5*o),"c");
    drawHorizontalLine(x, y+(1*o), 5, "#");
    drawHorizontalLine(x, y+(9*o), 6, "#");
    if (o == 1) {
        drawVerticalLine(x, y+1, 9, "#");
        drawVerticalLine(x+6, y+1, 9, "#");
        drawBlock(x+1, y+2, 5, 7, ".");
    } else {
        drawVerticalLine(x, y-9, 9, "#");
        drawVerticalLine(x+6, y-9, 9, "#");
        drawBlock(x+1, y-8, 5, 7, ".");
    }
    return x + 5;
}

var drawBigRoom = function(x, y, o) {
    draw(x+7,y+(1*o),"+");
//    map[x+7][y+(1*o)] = "+";
    
    draw(x+4,y+(2*o),"s");//sink
    draw(x+3,y+(2*o),"t");//toilet
    
    draw(x+1,y+(4*o),"#");
    draw(x+2,y+(4*o),"#");
    draw(x+3,y+(4*o),"#");
    draw(x+4,y+(4*o),"#");
    draw(x+5,y+(4*o),"#");
    draw(x+5,y+(2*o),"#");
    draw(x+5,y+(3*o),"+");
//    map[x+5][y+(3*o)] = "+";
    draw(x+1,y+(7*o),"w");//wardrobe
    draw(x+1,y+(8*o),"w");
    
    if (o == 1) {
    	draw(x+1,y+(2*o),"h");//bath
        draw(x+1,y+(3*o),"H");
    	draw(x+7,y+(7*o),"2");//bed
        draw(x+6,y+(7*o),"1");
        draw(x+7,y+(8*o),"4");
        draw(x+6,y+(8*o),"3");
    } else {
    	draw(x+1,y+(2*o),"H");//bath
        draw(x+1,y+(3*o),"h");
    	draw(x+7,y+(7*o),"4");//bed
        draw(x+6,y+(7*o),"3");
        draw(x+7,y+(8*o),"2");
        draw(x+6,y+(8*o),"1");
    }
    
    draw(x+5,y+(8*o),"d");//dresser
    
    draw(x+1,y+(5*o),"c");//closet
    draw(x+2,y+(5*o),"c");
    draw(x+3,y+(5*o),"c");
    draw(x+4,y+(5*o),"c");
    drawHorizontalLine(x, y+(1*o), 8, "#");
    drawHorizontalLine(x, y+(9*o), 8, "#");
    if (o == 1) {
        drawVerticalLine(x, y+(1*o), 9, "#");
        drawVerticalLine(x+8, y+(1*o), 9, "#");
        drawBlock(x+1, y+2, 7, 7, ".");
    } else {
        drawVerticalLine(x, y-9, 9, "#");
        drawVerticalLine(x+8, y-9, 9, "#");
        drawBlock(x+1, y-8, 7, 7, ".");
    }
    return x + 7;
}

var drawLibrary = function() {
    var pos = getRandomSpace(7,7);
    if (pos) {
        draw(pos.x+6, pos.y+1, "+");
        draw(pos.x+6, pos.y+5, "+");
        drawVerticalLine(pos.x, pos.y, 7, "#");
        drawVerticalLine(pos.x+6, pos.y, 7, "#");
        drawHorizontalLine(pos.x, pos.y, 7, "#");
        drawHorizontalLine(pos.x, pos.y+6, 7, "#");
        drawVerticalLine(pos.x+1, pos.y, 5, "z");//bookshelf
        drawVerticalLine(pos.x+3, pos.y, 5, "z");//bookshelf
        draw(pos.x+5, pos.y+4, "x");//chair
        draw(pos.x+5, pos.y+3, "l");//table
        draw(pos.x+5, pos.y+2, "x");//chair
        drawBlock(pos.x, pos.y, 7, 7, "L");
    }
}

var drawRestroom = function() {
    var pos = getRandomSpace(5,6);
    if (pos) {
        draw(pos.x+4, pos.y+1, "+");
        drawVerticalLine(pos.x, pos.y, 6, "#");
        drawVerticalLine(pos.x+4, pos.y, 6, "#");
        drawHorizontalLine(pos.x, pos.y, 5, "#");
        drawHorizontalLine(pos.x, pos.y+5, 5, "#");
        draw(pos.x+3, pos.y+4, "t");
        draw(pos.x+3, pos.y+3, "+");
        draw(pos.x+1, pos.y+4, "t");
        draw(pos.x+1, pos.y+3, "+");
        draw(pos.x+2, pos.y+3, "#");
        draw(pos.x+2, pos.y+4, "#");
        draw(pos.x+1, pos.y+1, "s");
        draw(pos.x+2, pos.y+1, "s");
        drawBlock(pos.x, pos.y, 5, 5, "R");
    }
}

var drawCloset = function() {
    var pos = getRandomSpace(3,4);
    if (pos) {
        draw(pos.x+2, pos.y+1, "+");
        drawVerticalLine(pos.x, pos.y, 4, "#");
        drawVerticalLine(pos.x+2, pos.y, 4, "#");
        drawHorizontalLine(pos.x, pos.y, 3, "#");
        drawHorizontalLine(pos.x, pos.y+3, 3, "#");
        draw(pos.x+1, pos.y+2, "C"); //closet
    }
}

var drawSecurityRoom = function() {
    var pos = getRandomSpace(5,9);
    if (pos) {
        draw(pos.x+4, pos.y+1, "+");
        drawVerticalLine(pos.x, pos.y, 9, "#");
        drawVerticalLine(pos.x+4, pos.y, 9, "#");
        drawHorizontalLine(pos.x, pos.y, 5, "#");
        drawHorizontalLine(pos.x, pos.y+8, 5, "#");
        drawVerticalLine(pos.x+1, pos.y, 9, "p"); //computer
        drawHorizontalLine(pos.x+1, pos.y+7, 5, "p");
        draw(pos.x+3, pos.y+6, "x");//chair
        draw(pos.x+2, pos.y+4, "x");//chair
        draw(pos.x+2, pos.y+2, "x");//chair
        drawBlock(pos.x, pos.y, 5, 9, "S");
    }
}

var drawWaitingRoom = function() {
    var pos = getRandomSpace(5,5);
    if (pos) {
        draw(pos.x+4, pos.y+1, "+");
        drawVerticalLine(pos.x, pos.y, 5, "#")
        drawVerticalLine(pos.x+4, pos.y, 5, "#")
        drawHorizontalLine(pos.x, pos.y, 5, "#")
        drawHorizontalLine(pos.x, pos.y+4, 5, "#")
        drawHorizontalLine(pos.x, pos.y+3, 5, "x")//chair
        draw(pos.x+1, pos.y+1, "x");//chair
        draw(pos.x+2, pos.y+1, "l");//table
        drawBlock(pos.x, pos.y, 5, 5, "W");
    }
}

var drawPotPlant = function() {
    var pos = getRandomSpace(2,1);
    if (pos) {
        draw(pos.x+1, pos.y, "P");
    }
}

draw = function(x, y, c) {
//    if (map[x] && map[x][y]) {
    	map[x][y] = map[x][y] || c;
//    }
}

var drawHorizontalLine = function(x1, y1, length, char) {
    for (var x in map) {
        for (var y in map[x]) {
            if (y == y1 && x >= x1 && x < (length+x1)) {
                map[x][y] = map[x][y] || char; 
            }
        }
    }
}

var drawVerticalLine = function(x1, y1, length, char) {
    for (var x in map) {
        for (var y in map[x]) {
            if (x == x1 && y >= y1 && y < (length+y1)) {
                map[x][y] = map[x][y] || char; 
            }
        }
    }
}

var drawBlock = function(x1, y1, width, length, char) {
    for (var x in map) {
        for (var y in map[x]) {
            if (x >= x1 && y >= y1 && (x-x1) < width && (y-y1) < length) {
                map[x][y] = map[x][y] || char; 
            }
        }
    }
}

var getRandomSpace = function(w1, h1) {
    var eligibleSpaces = [];
    for (var x = 0; x < map.length; x++) {
        for (var y=0; y < map[x].length; y++) {
            var valid = true;
            for (var w = 0; w < w1; w++) {
                for (var h = 0; h < h1; h++) {
                    if (x+w >= width) {
                        valid = false;
                    } else if (y+h >= height) {
                        valid = false
                    } else if ((map[(x+w)][(y+h)])) {
                        valid = false;
                    }
                }
            }
            if (valid) {
                eligibleSpaces.push({x: x, y: y});
            }
        }
    }
    if (eligibleSpaces.length) {
        var index = Math.floor(Math.random()*eligibleSpaces.length);
        return eligibleSpaces[index];
    } else {
        return null;
    }
}

var fillSpace = function() {
    for (var x in map) {
        for (var y in map[x]) {
            map[x][y] = map[x][y] || ","; 
        }
    }
}

return generateBuilding(width,height, totalfloors);
};
Game.Map.HotelFloor.extend(Game.Map);