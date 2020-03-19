function Player(name, health, isActive, playerNumber) {
    this.name = name;
    this.health = health;
    this.isActive = isActive;
    this.playerNumber = playerNumber;
}

Player.prototype = {
    constructor: Player,
    move: function (target) {

        let nextPosition = target.getAttribute("data-number");
        let currentPositionElement = $('td[data-number="' + this.position + '"]');
        this.position = nextPosition;
        let nextPositionElement = $('td[data-number="' + nextPosition + '"]');
        nextPositionElement.addClass(("player" + this.playerNumber))
        currentPositionElement.removeClass(("player" + this.playerNumber));
    },
    equipWeapon: function (weapon) {
        this.weaponDamage = Number(weapon.damage);
        this.weaponType = weapon.type;
    },
    attack: function (defender) {
        if (!this.isActive) {
            return;
        }
        var damage = 5;
        if(this.weaponDamage){
            damage += this.weaponDamage;
        }
        if(defender.defending){
            damage /= 2;
        }
        defender.health -= damage;
        if (defender.health <= 0) {
            defender.health = 0;
            window.gameOver(defender)
        }
        defender.defending = false;
        this.isActive = false;
        defender.isActive = true;
        updatePlayerInfo()
    }
}
