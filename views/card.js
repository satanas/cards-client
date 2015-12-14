var CardView = Backbone.View.extend({
  tagName: 'li',
  className: 'card',
  events: {
    'dragstart': 'dragStart',
    'dragend': 'dragEnd',
    'damageReceived': 'doDamage',
    'dragenter': 'dragEnter',
    'dragover': 'dragOver',
    'dragleave': 'dragLeave',
    'drop': 'drop'
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
      var played = this.model.get('played');
      this.$el.attr('draggable', true);
      this.$el.attr('data-sick', sick);
      this.$el.attr('data-played', played);
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
      if (this.model.get('venom')) {
        abilities += '<span>Venom</span>';
      }

      html = '<div class="mana">' + this.model.get('mana') + '</div>' +
        '<div class="name">' + this.model.get('name') + '</div>' +
        '<div class="abilities">' + abilities + '</div>' +
        '<div class="stats">' +  this.model.get('attack') + '/' + this.model.get('health') + '</div>';
    }
    this.$el.html(html);
    return this;
  },
  /*
  action: function() {
    var played = this.model.get('played');
    var used = this.model.get('used');
    var sick = this.model.get('sick');
    var playerId = this.$el.attr('data-player-id');

    if (!played) return;
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
  },
  */
  dragStart: function(e) {
    var event = e.originalEvent;
    var data = {
      'id': this.model.get('id'),
      'playerId': this.model.get('playerId'),
      'played': this.model.get('played'),
      'sick': this.model.get('sick')
    };
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData("text/plain", JSON.stringify(data));

    if (this.model.get('played')) {
      event.dataTransfer.setData("in-field", "");
    } else {
      event.dataTransfer.setData("in-hand", "");
    }
    this.$el.addClass('dragged');
  },
  dragEnd: function(e) {
    this.$el.removeClass('dragged');
    this.$el.removeClass('dropable');
    $('.dropable').each(function(e) {
      $(this).removeClass('dropable');
    });
  },
  doDamage: function(damage) {
    this.$el.append('<div class="damage-done">-' + damage + '</div>');
    setTimeout.call(this, this.removeDamage, 600);
  },
  removeDamage: function() {
    this.$el.children('.damage-done').fadeOut(400);
  },
  dragOver: function(e) {
    var event = e.originalEvent;
    if (e.preventDefault) {
      e.preventDefault();
    }
    event.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    return false;
  },
  dragEnter: function(e) {
    var event = e.originalEvent;
    var dropTarget = event.target;
    var fromHand = (event.dataTransfer.types.indexOf("in-hand") >= 0) ? true : false;
    var fromField = (event.dataTransfer.types.indexOf("in-field") >= 0) ? true: false;
    var toField = (dropTarget.getAttribute('data-played') === 'true') ? true : false;

    //console.log('ENTER: fromHand', fromHand, "fromField", fromField, 'toField', toField);
    if (fromHand){
      console.log('playable card');
    } else if (toField) {
      console.log('attack possible');
      this.$el.addClass('dropable');
    }
  },
  dragLeave: function(e) {
    this.$el.removeClass('dropable');
  },
  drop: function(e) {
    e.preventDefault();
    var event = e.originalEvent;
    var data = JSON.parse(event.dataTransfer.getData("text/plain"));

    var dropTarget = event.target;
    var fromHand = (event.dataTransfer.types.indexOf("in-hand") >= 0) ? true : false;
    var fromField = (event.dataTransfer.types.indexOf("in-field") >= 0) ? true: false;
    var toField = (dropTarget.getAttribute('data-played') === 'true') ? true : false;

    if (fromField && toField) {
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
        'playerId': dropTarget.getAttribute('data-player-id'),
        'cardId': dropTarget.getAttribute('data-card-id')
      };
      socket.emit('attack', {
        'attacker': attacker,
        'defender': defender
      });
    }
    return false;
  }
});
