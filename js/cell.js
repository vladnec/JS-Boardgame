function Cell(height,width,) {
    this.height = height;
    this.width = width;
}
Cell.prototype = {
    constructor: Cell,
    isDisabled: function(el){
      return el.hasClass("disabled")
    },

}