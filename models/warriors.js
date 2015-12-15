var Warriors = Backbone.Collection.extend({
  model: Card,
  prepareTurn: function() {
    this.each(function(card) {
      card.setUsed(false);
    });
  }
});
