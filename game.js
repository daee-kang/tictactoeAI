var grid = new Array(9);
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
    grid = new Array(9);
    humanTurn = true;
    for(var i = 1; i < 10; i++){
        document.getElementById(i).style.backgroundColor = 'blue';
    }
    document.getElementById('restart').style.display = "none";
    document.getElementById('announcer').textContent = `It is your turn`;
}

function setPlayerTile(block){
    grid[block.id - 1] = "player";
    document.getElementById(block.id).style.backgroundColor = 'red';
    humanTurn = false;
}

function isFull(){
    var isFull = true;
    for(var i = 0; i < 9; i++){
        if(grid[i] == undefined)
            isFull = false;
    }
    return isFull;
}

function computerTurn(){
    var bestVal = -1000;
    var bestIndex = -1;
    for(let i = 0; i < 9; i++){
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
    document.getElementById(block + 1).style.backgroundColor = 'yellow';
    humanTurn = true;
    isHumanTurn();
}

function evaluate(){
    //check horizontal
    for(var i = 0; i < 3; i++){
        var j = i;
        if(grid[j] != undefined && grid[j] == grid[j + 3] && grid[j] == grid[j + 6]){
            if(grid[j] == "player"){
                return -10;
            } else return 10;
        }
    }

    //check vertical
    for(var i = 0; i < 9; i += 3){
        var j = i;
        if(grid[j] != undefined && grid[j] == grid[j+1] && grid[j] == grid[j+2]){
            if(grid[j] == "player"){
                return -10;
            } else return 10;
        }
    }

    //check diagonals
    if(grid[0] != undefined && grid[0] == grid[4] && grid[0] == grid[8]){
        if(grid[0] == "player"){
            return -10;
        } else return 10;
    }

    //check diagonals2
    if(grid[2] != undefined && grid[2] == grid[4] && grid[2] == grid[6]){
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
        for(var i = 0; i < 9; i++){
            if(grid[i] == undefined){
                grid[i] = "computer";
                best = Math.max(best, minimax(depth+1, !isMax));
                grid[i] = undefined;
            }
        }
        return best;
    } else {
        var best = 1000;
        for(var i = 0; i < 9; i++){
            if(grid[i] == undefined){
                grid[i] = "player";
                best = Math.min(best, minimax(depth+1, !isMax));
                grid[i] = undefined;
            }
        }
        return best;
    }
}
