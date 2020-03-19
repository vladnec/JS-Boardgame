function startGame() {
    let board = new Board(10, 10, "#app");
    let firstPlayerName = $("#player1Name").val() || "Player 1";
    let secondPlayerName = $("#player2Name").val() || "Player 2";
    let player1 = new Player(firstPlayerName, 100, true, 1);
    let player2 = new Player(secondPlayerName, 100, false, 2);
    board.clearBoard();
    board.render();
    board.addDisabledBlocks(10);
    board.addWeapons();
    board.addPlayers(player1, player2);
    board.cells.on("click", function ($ev) {
        if (board.battle) {
            return
        }
        // get original position and desired position
        let activePlayer = getActivePlayer(player1, player2)
        let fromTile = Number(activePlayer.position)
        let toTile = Number($ev.currentTarget.getAttribute("data-number"));

        // check if move is valid 
        let moveValid = Math.abs(toTile - fromTile)

        let direction;

        if (toTile - fromTile > 0) {
            direction = "ascending"
        } else if (toTile - fromTile < 0) {
            direction = "descending"
        }
        // check if player moves on X AXIS
        if (moveValid <= 3) {
            // player moves right
            if (direction === "ascending") {
                for (var i = fromTile + 1; i <= toTile; i++) {
                    let currentTile = $("td[data-number='" + i + "']");
                    if (currentTile.hasClass("disabled") || currentTile.hasClass("player1") || currentTile.hasClass("player2")) {
                        return;
                    }
                    checkAndEquipWeapon(currentTile, activePlayer)
                }
                activePlayer.move($ev.currentTarget);
                checkAndStartBattle(player1, player2, board)
                board.setActivePlayer(player1, player2);
                // player moves left
            } else if (direction === "descending") {
                for (var i = fromTile - 1; i >= toTile; i--) {
                    let currentTile = $("td[data-number='" + i + "']");
                    if (currentTile.hasClass("disabled") || currentTile.hasClass("player1") || currentTile.hasClass("player2")) {
                        return;
                    }
                    checkAndEquipWeapon(currentTile, activePlayer)
                }
                activePlayer.move($ev.currentTarget);
                checkAndStartBattle(player1, player2, board)
                board.setActivePlayer(player1, player2);
            }
            // check if player moves on Y AXIS
        } else if (moveValid <= 30 && (moveValid % 10 === 0)) {
            // player moves bottom
            if (direction === "ascending") {
                for (var i = fromTile + 10; i <= toTile; i = i + 10) {
                    let currentTile = $("td[data-number='" + i + "']");
                    if (currentTile.hasClass("disabled") || currentTile.hasClass("player1") || currentTile.hasClass("player2")) {
                        return;
                    }
                    checkAndEquipWeapon(currentTile, activePlayer)
                }

                activePlayer.move($ev.currentTarget);
                checkAndStartBattle(player1, player2, board)
                board.setActivePlayer(player1, player2);
                // player moves top
            } else if (direction === "descending") {
                for (var i = fromTile - 10; i >= toTile; i = i - 10) {
                    let currentTile = $("td[data-number='" + i + "']");
                    if (currentTile.hasClass("disabled") || currentTile.hasClass("player1") || currentTile.hasClass("player2")) {
                        return;
                    }
                    checkAndEquipWeapon(currentTile, activePlayer)
                }
                activePlayer.move($ev.currentTarget);
                checkAndStartBattle(player1, player2, board)
                board.setActivePlayer(player1, player2);
            }
        } else {
           return;
        }
    })
    window.attack = function (type) {
            board.attack(type, player1, player2);
    },
    window.defend = function (type) {
        board.defend(type, player1, player2);
    },
    window.updatePlayerInfo = function () {
        let pl1Health = player1.health;
        let pl2Health = player2.health;
        $("#playerOneHealth").text(player1.health + "%")
        $("#playerTwoHealth").text(player2.health + "%")
        let activePlayerNumber = getActivePlayer(player1, player2).playerNumber
        $("#activePlayer").text("Player " + activePlayerNumber + " is Active")
    }

}

function getActivePlayer(player1, player2) {
    if (player1.isActive) {
        return player1
    } else {
        return player2
    }
}

function checkAndEquipWeapon(currentTile, activePlayer) {
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
}

function checkAndStartBattle(player1, player2, board) {
    let absDiff = Math.abs(player1.position - player2.position)
    if (absDiff === 1 || absDiff % 10 === 0 && absDiff <= 10) {
        startBattle(board)
    }
}


function startBattle(board) {
    $("#infor").css("display", "block");
    $("#infor").delay(3000).fadeOut("slow");
    board.battle = true;

}

function gameOver(losingPlayer) {
    $("#gameover").css("display","block");
    $("#gameover").append( "<span>Game Over, Player </span>" + losingPlayer.playerNumber + " <span> Lost</span>")
}
