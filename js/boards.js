function Board(row, column, container) {
    this.row = row;
    this.col = column;
    this.cells = [];
    this.table = $(container);
}

Board.prototype = {
    constructor: Board,
    render: function () {
        for (let i = 0; i < this.row; i++) {
            let createdRow = $('<tr>')
            for (let j = 0; j < this.col; j++) {
                let createdCol = $('<td>');
                createdCol.attr("data-number", ((i*this.row)+j + 1) )
                createdRow.append(createdCol)
            }
            this.table.append(createdRow)
        }
        this.cells = $("td");
    },
    addBlocks: function(blockNr){
        let i = 0;
        while (i < blockNr){
            let randomNumber = getEmptyTile(this.cells);
            $(this.cells[randomNumber]).addClass("disabled");
            i++;
        }
    },
    addWeapons: function(weaponNr){
        for (weapon of weapons ) {
            let randomNumber = getEmptyTile(this.cells);
             $(this.cells[randomNumber]).addClass(weapon.type);
        }
    },
    addPlayers: function(player1, player2){
        let randomNumber = getEmptyTile(this.cells);
        $(this.cells[randomNumber]).addClass('player1');
        player1.position = randomNumber + 1 ;
        player1.turn = true;

        randomNumber = getEmptyTile(this.cells);
        $(this.cells[randomNumber]).addClass('player2');
        player2.position = randomNumber + 1 ;
        player1.turn = false;
    }
}

