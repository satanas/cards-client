var OpponentGround = Backbone.View.extend({
  initialize: function() {
    this.collection.on('add', this.addCard, this);
    this.collection.on('remove', this.removeCard, this);
  },
  addCard: function(card) {
    var cardView = new CardView({model: card, reversed: false, opponent: true});
    this.$el.append(cardView.render().el);
  },
  removeCard: function(card, player) {
    console.log('removing card li[data-card-id="' + card.id + '"][data-player-id="' + player.id + '"');
    $('li[data-card-id="' + card.id + '"][data-player-id="' + player.id + '"]').remove();
  }
});
