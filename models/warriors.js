var Warriors = Backbone.Collection.extend({
  model: Card,
  prepareTurn: function() {
    this.each(function(card) {
      card.setUsed(false);
      card.setDefender(false);
      card.setAttacker(false);
    });
  },
  clearDefender: function() {
    this.each(function(card) {
      card.setDefender(false);
    });
  },
  clearAttacker: function() {
    this.each(function(card) {
      card.setAttacker(false);
    });
  }
});
