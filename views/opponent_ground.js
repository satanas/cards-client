var OpponentGround = Backbone.View.extend({
  initialize: function() {
    this.collection.on('add', this.addCard, this);
    this.collection.on('remove', this.removeCard, this);
  },
  addCard: function(card) {
    var cardView = new CardView({model: card, reversed: false, opponent: true});
    this.$el.append(cardView.render().el);
  },
  removeCard: function(card) {
    this.$el[0].remove('li[data-card-id="' + card.id + '"]');
  }
});
