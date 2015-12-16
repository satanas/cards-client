var Battlefield = Backbone.Collection.extend({
  model: Card,
  prepareTurn: function() {
    this.each(function(card) {
      card.setUsed(false);
    });
  },
  updateCard: function(c) {
    this.get(c.id).update(c);
  },
  removeCard: function(c) {
    setTimeout.call(this, this.remove, 600, c.id);
  }
});
