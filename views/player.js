var PlayerView = Backbone.View.extend({
  events: {
    'dragenter': 'dragEnter',
    'dragleave': 'dragLeave',
    'dragover': 'dragOver',
    'dragend': 'dragEnd',
    'drop': 'drop'
  },
  initialize: function(options) {
    this.opponent = options.opponent;
  },
  setDefender: function(value) {
    this.$el.attr('data-defender', value);
  },
  setHealth: function(value) {
    this.$el.children('.health').html(value);
  },
  doDamage: function(damage) {
    this.$el.append('<div class="damage-done">-' + damage + '</div>');
    setTimeout.call(this, this.removeDamage, 600);
  },
  heal: function(value) {
    this.$el.append('<div class="damage-done">+' + value + '</div>');
    setTimeout.call(this, this.removeDamage, 600);
  },
  removeDamage: function() {
    this.$el.children('.damage-done').fadeOut(400);
  },
  dragEnter: function(e) {
    var event = e.originalEvent;
    var fromField = (event.dataTransfer.types.indexOf("in-field") >= 0) ? true: false;

    if (fromField) {
      this.$el.addClass('dropable');
    }
  },
  dragLeave: function(e) {
    this.$el.removeClass('dropable');
  },
  dragOver: function(e) {
    var event = e.originalEvent;
    e.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    return false;
  },
  dragEnd: function(e) {
    this.$el.removeClass('dropable');
    $('.player.dropable').each(function(e) {
      $(this).removeClass('dropable');
    });
  },
  drop: function(e) {
    this.dragEnd();
    e.preventDefault();
    var event = e.originalEvent;
    var data = JSON.parse(event.dataTransfer.getData("text/plain"));

    var dropTarget = event.target;
    var fromHand = (event.dataTransfer.types.indexOf("in-hand") >= 0) ? true : false;
    var fromField = (event.dataTransfer.types.indexOf("in-field") >= 0) ? true: false;
    var toField = (dropTarget.getAttribute('data-played') === 'true') ? true : false;

    if (fromField) {
      if (data.used) {
        showMessage('Card used', 'This card was already used');
        return false;
      }
      if (data.sick) {
        showMessage('Card sick', 'This card can not be used until next turn');
        return false;
      }

      attacker = {
        'playerId': data.playerId,
        'cardId': data.id
      };
      defender = {
        'playerId': opponentId
      };
      socket.emit('direct-attack', {
        'attacker': attacker,
        'defender': defender
      });
    }
    return false;
  }
});
