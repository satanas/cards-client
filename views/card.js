var CardView = Backbone.View.extend({
  tagName: 'li',
  className: 'card',
  events: {
    'dblclick': 'draw',
    'click': 'action',
    'dragstart': 'dragStart',
    'dragend': 'dragEnd',
  },
  initialize: function(options) {
    this.reversed = options.reversed;
    this.model.on('change', this.render, this);
    this.opponent = options.opponent;
  },
  render: function() {
    var html = '';
    this.$el.attr('data-player-id', this.model.get('playerId'));
    this.$el.attr('data-card-id', this.model.get('id'));
    if (!this.reversed) {
      var sick = this.model.get('sick');
      var drawed = this.model.get('drawed');

      if (!drawed) {
        this.$el.attr('draggable', true);
      } else {
        if (sick) {
          this.$el.removeAttr('draggable');
        } else {
          this.$el.attr('draggable', true);
        }
      }
      this.$el.attr('data-sick', sick);
      this.$el.attr('data-drawed', drawed);
      this.$el.attr('data-attacker', this.model.get('attacker'));
      this.$el.attr('data-defender', this.model.get('defender'));
      this.$el.attr('data-used', this.model.get('used'));
      var playerId = this.model.get('playerId');
      if (playerId) {
        this.$el.attr('id', playerId + "-" + this.model.get('id'));
        this.$el.attr('data-player-id', playerId);
      }

      html = '<div class="mana">' + this.model.get('mana') + '</div>' +
        '<div class="name">' + this.model.get('name') + '</div>' +
        '<div class="stats">' +  this.model.get('attack') + '/' + this.model.get('health') + '</div>';
    }
    this.$el.html(html);
    return this;
  },
  draw: function() {
    var reversed = this.model.get('reversed');
    var drawed = this.model.get('drawed');

    if (reversed) return;
    if (drawed) return;
    if (!inTurn) return;

    socket.emit('draw', this.model.get('id'));
  },
  action: function() {
    var drawed = this.model.get('drawed');
    var used = this.model.get('used');
    if (!drawed) return;
    if (used) return;

    var cardId = this.$el.attr('data-card-id');
    var playerId = this.$el.attr('data-player-id');
    if (playerId === ownId) {
      battlefield[ownId].each(function(card) {
        card.setAttacker(false);
      });

      if (attacker !== null && attacker.cardId === cardId) {
        attacker = null;
      } else {
        attacker = {'playerId': ownId, 'cardId': cardId};
        this.model.setAttacker(true);
      }
    } else {
      battlefield[ownId].each(function(card) {
        card.setDefender(false);
      });

      if (defender !== null && defender.cardId === cardId) {
        defender = null;
      } else {
        defender = {'playerId': playerId, 'cardId': cardId}
        this.model.setDefender(true);
      }
    }
    if (attacker !== null && defender !== null) {
      turnView.enableAction(true);
    } else {
      turnView.enableAction(false);
    }
    console.log('battle', attacker, defender);
  },
  dragStart: function(e) {
    var event = e.originalEvent;
    var data = {
      'id': this.model.get('id'),
      'drawed': this.model.get('drawed'),
      'sick': this.model.get('sick')
    };
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData("text/plain", JSON.stringify(data));
  },
  dragEnd: function(e) {
  }
});