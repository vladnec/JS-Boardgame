function Board(row, column, container) {
    this.row = row;
    this.col = column;
    this.cells = [];
    this.table = $(container);
    this.battle = false;
}

Board.prototype = {
    constructor: Board,
    render: function () {
        for (let i = 0; i < this.row; i++) {
            let createdRow = $('<tr>')
            for (let j = 0; j < this.col; j++) {
                let createdCol = $('<td>');
                createdCol.attr("data-number", ((i * this.row) + j + 1))
                createdRow.append(createdCol)
            }
            this.table.append(createdRow)
        }
        $("#activePlayer").text("Player 1 is Active")
        $("#playerOneHealth").text("100%")
         $("#playerTwoHealth").text("100%")
        this.cells = $("td");
    },
    addDisabledBlocks: function (blockNr) {
        let i = 0;
        while (i < blockNr) {
            let randomNumber = this.getEmptyTile(this.cells);
            $(this.cells[randomNumber]).addClass("disabled");
            i++;
        }
    },
    addWeapons: function (weaponNr) {
        for (weapon of weapons) {
            let randomNumber = this.getEmptyTile(this.cells);
            $(this.cells[randomNumber]).addClass("weapon");
            $(this.cells[randomNumber]).addClass(weapon.type);
        }
    },
    addPlayers: function (player1, player2) {
        let randomNumber = this.getEmptyTile(this.cells);
        $(this.cells[randomNumber]).addClass('player1');
        player1.position = randomNumber + 1;

        randomNumber = this.getEmptyTile(this.cells);
        $(this.cells[randomNumber]).addClass('player2');
        player2.position = randomNumber + 1;
    },
    getEmptyTile: function (grid) {
        while (true) {
            x = grid.length;
            let randomNumber = Math.floor(Math.random() * x)
            if (grid[randomNumber].hasAttribute("class")) {
                continue;
            } else {
                return randomNumber;
            }
        }
    },
    setActivePlayer : function (player1, player2) {
        if (player1.isActive) {
            player1.isActive = false;
            player2.isActive = true
        } else {
            player1.isActive = true;
            player2.isActive = false;
        }
        updatePlayerInfo()
    },
    checkAndEquipWeapon : function (currentTile, activePlayer) {
        if (currentTile.hasClass("weapon")) {
            currentTile.removeClass("weapon")
            let weaponType = currentTile.attr("class")
            weapons.forEach(function (wp) {
                if (wp.type === weaponType) {
                    activePlayer.equipWeapon(wp)
                    let weaponTextContainer = $("span[id='" + "player" + activePlayer.playerNumber + "Weapon" + "']");
                    let weaponDamage = Number(wp.damage) + 5
                    let weaponText = "Weapon: " + wp.type + " - Damage: " + weaponDamage
                    weaponTextContainer.text(weaponText)
                }
            })
            currentTile.removeClass(weaponType)
        }
    },
    checkAndStartBattle : function (player1, player2, board) {
        let absDiff = Math.abs(player1.position - player2.position)
        if (absDiff === 1 || absDiff % 10 === 0 && absDiff <= 10) {
            this.startBattle()
        }
    },
    startBattle : function () {
        $("#infor").css("display", "block");
        $("#infor").delay(3000).fadeOut("slow");
        this.battle = true;

    },
    attack: function (playerNumber, player1, player2) {
        if (!this.battle) {
            return;
        }
        if (player1.playerNumber === playerNumber) {
            player1.attack(player2);
        } else if (player2.playerNumber === playerNumber) {
            player2.attack(player1)
        }
    },
    defend: function (playerNumber, player1, player2) {
        if (!this.battle) {
            return;
        }
        if (player1.playerNumber === playerNumber) {
            player1.defending = true;
            player1.isActive = false;
            player2.isActive = true;
        } else if (player2.playerNumber === playerNumber) {
            player2.defending = true;
            player2.isActive = false;
            player1.isActive = true;
        }
    },
    clearBoard: function () {
        $("#app").empty();
        $("#gameover").css("display","none");
        $("#gameover").text("")
        $("#playerOneHealth").text("")
        $("#playerTwoHealth").text("")
        $("#player1Weapon").text("")
        $("#player2Weapon").text("")
    }
}
