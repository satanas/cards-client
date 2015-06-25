var Warriors = Backbone.Collection.extend({
  model: Card,
  prepareTurn: function() {
    this.each(function(card) {
      card.setUsed(false);
    });
  },
  clearDefender: function() {
    this.each(function(card) {
      card.setDefender(false);
    });
  }
});
