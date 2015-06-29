var OwnGround = Backbone.View.extend({
  initialize: function() {
    this.collection.on('add', this.addCard, this);
    this.collection.on('remove', this.removeCard, this);
    this.collection.on('change', this.updateCard, this);
  },
  events: {
    'dragenter': 'dragEnter',
    'dragover': 'dragOver',
    'dragleave': 'dragLeave',
    'drop': 'dropCard'
  },
  dragEnter: function(e) {
    var event = e.originalEvent;
    var data = JSON.parse(event.dataTransfer.getData("text/plain"));
    if (!data.drawed) {
      this.$el.css('border', '1px dashed #000');
      e.preventDefault();
      return false;
    }
  },
  dragOver: function(e) {
    e.preventDefault();
    return false;
  },
  dragLeave: function(e) {
    this.$el.css('border', 'none');
    e.preventDefault();
    return false;
  },
  dropCard: function(e) {
    var event = e.originalEvent;
    var data = JSON.parse(event.dataTransfer.getData("text/plain"));
    this.$el.css('border', 'none');
    if (!data.drawed) {
      socket.emit('draw', data.id);
      e.preventDefault();
      return false;
    }
  },
  addCard: function(card) {
    var cardView = new CardView({model: card, reversed: false});
    this.$el.append(cardView.render().el);
  },
  removeCard: function(card, player, damage) {
    console.log('removing card li[data-card-id="' + card.id + '"][data-player-id="' + player.id + '"]');
    if (!damage) damage = 1;
    $('li[data-card-id="' + card.id + '"][data-player-id="' + player.id + '"]').append('<div class="damage-done">-' + damage + '</div>');
    setTimeout.call(this, this.removeDamage, 600, card, player);
  },
  updateCard: function(a, b) {
    console.log('updating card', a, b);
  },
  removeDamage: function(card, player) {
    $('li[data-card-id="' + card.id + '"][data-player-id="' + player.id + '"]').remove();
  }
});
