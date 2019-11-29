/*
0 1 2 3 4
5 6 7 8 9
10 11 12 13 14 
15 16 17 18 19 
20 21 22 23 24

*/



var grid = new Array(25);
var humanTurn = true;

function isHumanTurn(){
    if(!humanTurn){
        computerTurn();
    }
}

function makeChoice(block){
    console.log(block.id);
    if(!humanTurn) return;

    if(grid[block.id - 1] == undefined){
        setPlayerTile(block);
        var res = evaluate();
        if(res == -10){
            document.getElementById('announcer').textContent = `you won!`;
            document.getElementById('restart').style.display = "block";
        } else {
            if(isFull()){
                tie();
                return;
            } else isHumanTurn();
        }
    }
}

function tie(){
    document.getElementById('announcer').textContent = `tie`;
    document.getElementById('restart').style.display = "block";
}

function restart(){
    grid = new Array(25);
    humanTurn = true;
    for(var i = 1; i < 26; i++){
        document.getElementById(i).style.backgroundColor = 'lightgray';
    }
    document.getElementById('restart').style.display = "none";
    document.getElementById('announcer').textContent = `It is your turn`;
}

function setPlayerTile(block){
    grid[block.id - 1] = "player";
    document.getElementById(block.id).style.backgroundColor = 'lightblue';
    humanTurn = false;
}

function isFull(){
    var isFull = true;
    for(var i = 0; i < 25; i++){
        if(grid[i] == undefined)
            isFull = false;
    }
    return isFull;
}

function computerTurn(){
    var bestVal = -1000;
    var bestIndex = -1;
    for(let i = 0; i < 25; i++){
        if(grid[i] == undefined){
            grid[i] = "computer";
            var moveVal = minimax(0, false);
            grid[i] = undefined;

            if(moveVal > bestVal){
                bestIndex = i;
                bestVal = moveVal;
            }
        }
    }

    //found bestVal;
    setComputerTile(bestIndex);
    var res = evaluate();
    if(res == 10){
        document.getElementById('announcer').textContent = "I won";
        document.getElementById('restart').style.display = "block";
    }
}

function setComputerTile(block){
    grid[block] = "computer";
    document.getElementById(block + 1).style.backgroundColor = 'lightcoral';
    humanTurn = true;
    isHumanTurn();
}

function evaluate(){
    //check horizontal
    for(var i = 0; i < 5; i++){
        var j = i;
        if(grid[j] != undefined && grid[j] == grid[j + 5] && grid[j] == grid[j + 10] && grid[j] == grid[j + 15] && grid[j] == grid[j + 20]){
            if(grid[j] == "player"){
                return -10;
            } else return 10;
        }
    }

    //check vertical
    for(var i = 0; i < 9; i += 3){
        var j = i;
        if(grid[j] != undefined && grid[j] == grid[j+1] && grid[j] == grid[j+2] && grid[j] == grid[j+3] && grid[j] == grid[j+4]){
            if(grid[j] == "player"){
                return -10;
            } else return 10;
        }
    }

    //check diagonals
    if(grid[0] != undefined && grid[0] == grid[6] && grid[0] == grid[12] && grid[0] == grid[18] && grid[0] == grid[24]){
        if(grid[0] == "player"){
            return -10;
        } else return 10;
    }

    //check diagonals2
    if(grid[2] != undefined && grid[4] == grid[8] && grid[4] == grid[12] && grid[4] == grid[16] && grid[4] == grid[20]){
        if(grid[2] == "player"){
            return -10;
        } else return 10;
    }

    //no one won yet
    return 0;
}

function minimax(depth, isMax){
    let score = evaluate();
    if(score == 10) return score;
    if(score == -10) return score;
    
    if(isFull()) return 0;

    if(isMax){
        var best = -1000;
        for(var i = 0; i < 25; i++){
            console.log('im here ')
            if(grid[i] == undefined){
                grid[i] = "computer";
                best = Math.max(best, minimax(depth+1, !isMax));
                grid[i] = undefined;
            }
        }
        return best;
    } else {
        var best = 1000;
        for(var i = 0; i < 25; i++){
            console.log('im here ')

            if(grid[i] == undefined){
                grid[i] = "player";
                best = Math.min(best, minimax(depth+1, !isMax));
                grid[i] = undefined;
            }
        }
        return best;
    }
}
