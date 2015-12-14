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
    'dragend': 'dragEnd',
    'drop': 'dropCard'
  },
  dragEnter: function(e) {
    var event = e.originalEvent;
    var dropTarget = event.target;
    var fromHand = (event.dataTransfer.types.indexOf("in-hand") >= 0) ? true : false;
    var toField = (dropTarget.getAttribute('data-played') === 'true') ? true : false;

    if (fromHand && !toField) {
      this.$el.addClass('dropable');
    }
    e.preventDefault();
    return false;
  },
  dragOver: function(e) {
    var event = e.originalEvent;
    e.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    return false;
  },
  dragLeave: function(e) {
    this.$el.removeClass('dropable');
    e.preventDefault();
    return false;
  },
  dragEnd: function(e) {
    this.$el.removeClass('dropable');
    $('ul.ground.dropable').each(function(e) {
      $(this).removeClass('dropable');
    });
  },
  dropCard: function(e) {
    this.dragEnd();
    e.preventDefault();
    var event = e.originalEvent;
    var data = JSON.parse(event.dataTransfer.getData("text/plain"));
    if (!data.played) {
      socket.emit('play-card', data.id);
    }
    this.$el.removeClass('dropable');
    $('.player.dropable').each(function(e) {
      $(this).removeClass('dropable');
    });
    return false;
  },
  addCard: function(card) {
    var cardView = new CardView({model: card, reversed: false});
    this.$el.append(cardView.render().el);
  },
  removeCard: function(card, player, damage) {
    //console.log('removing card li[data-card-id="' + card.id + '"][data-player-id="' + player.id + '"]');
    if (!damage) damage = 1;
    $('li[data-card-id="' + card.id + '"][data-player-id="' + player.id + '"]').append('<div class="damage-done">-' + damage + '</div>');
    setTimeout.call(this, this.removeDamage, 600, card, player);
  },
  updateCard: function(a, b) {
    //console.log('updating card', a, b);
  },
  removeDamage: function(card, player) {
    $('li[data-card-id="' + card.id + '"][data-player-id="' + player.id + '"]').remove();
  }
});
