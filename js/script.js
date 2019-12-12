

function startGame(){
    clearBoard();
    let board = new Board(10,10, "#app");
    let firstPlayerName = $("#player1Name").val() || "Player 1";
    let secondPlayerName = $("#player2Name").val() || "Player 2";
    let player1 = new Player(firstPlayerName, 100, true, 1);
    let player2 = new Player(secondPlayerName, 100, false, 2);
    board.render();
    board.addBlocks(10);
    board.addWeapons();
    board.addPlayers(player1, player2);
    board.cells.on("click", function($ev){
        if (player1.isActive){
            player1.move($ev)
            player2.isActive = true;
        } else if (player2.isActive) {
            player2.move($ev)
            player1.isActive = true;
        }
    })
}




function getEmptyTile(grid){
    while(true){
        x = grid.length;
        let randomNumber = Math.floor(Math.random() * x)
        if (grid[randomNumber].hasAttribute("class")){
            continue;
        } else {    
        return randomNumber;
        }
    }
}


function clearBoard(){
    $("#app").empty();
}