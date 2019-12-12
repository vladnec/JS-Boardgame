function Player(name, health, isActive , playerNumber) {
    this.name = name;
    this.health = health;
    this.isActive = isActive;
    this.playerNumber = playerNumber
    this.position;
}

Player.prototype = {
    constructor: Player,
    move: function(clickedElement){
        let nextPosition = clickedElement.target.getAttribute("data-number");
        let currentPositionElement = $('td[data-number="'+this.position+'"]');
        this.position = nextPosition;
        let nextPositionElement = $('td[data-number="'+nextPosition+'"]');
        nextPositionElement.addClass(("player" + this.playerNumber))
        currentPositionElement.removeClass(("player" + this.playerNumber)); 
        this.isActive = false;
    }
}

