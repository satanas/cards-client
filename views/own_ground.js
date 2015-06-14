var OwnGround = Backbone.View.extend({
  initialize: function() {
    this.collection.on('add', this.addCard, this);
    this.collection.on('remove', this.removeCard, this);
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
  removeCard: function(card) {
    this.$el.remove('li[data-card-id="' + card.id + '"]');
    console.log('removing card', 'li[data-card-id="' + card.id + '"]');
  }
});
