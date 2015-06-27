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
      var abilities = ''
      if (this.model.get('rush')) {
        abilities += '<span>Rush</span>';
      }
      if (this.model.get('overwhelm')) {
        abilities += '<span>Overwhelm</span>';
      }
      if (this.model.get('firstStrike')) {
        abilities += '<span>First strike</span>';
      }
      if (this.model.get('deathtouch')) {
        abilities += '<span>Deathtouch</span>';
      }

      html = '<div class="mana">' + this.model.get('mana') + '</div>' +
        '<div class="name">' + this.model.get('name') + '</div>' +
        '<div class="abilities">' + abilities + '</div>' +
        '<div class="stats">' +  this.model.get('attack') + '/' + this.model.get('health') + '</div>';
    }
    this.$el.html(html);
    //this.$el.hide().fadeIn('slow');
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
    var sick = this.model.get('sick');
    var playerId = this.$el.attr('data-player-id');

    if (!drawed) return;
    if (used && playerId === ownId) return;
    if (sick && playerId === ownId) return;

    var cardId = this.$el.attr('data-card-id');
    if (playerId === ownId) {
      battlefield[ownId].clearAttacker();

      if (attacker !== null && attacker.cardId === cardId) {
        attacker = null;
      } else {
        attacker = {'playerId': ownId, 'cardId': cardId};
        this.model.setAttacker(true);
      }
    } else {
      battlefield[opponentId].clearDefender();

      if (defender !== null && defender.cardId === cardId) {
        defender = null;
      } else {
        defender = {'playerId': playerId, 'cardId': cardId}
        this.model.setDefender(true);
        opponentPlayer.setDefender(false);
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
