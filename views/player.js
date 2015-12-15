var PlayerView = Backbone.View.extend({
  events: {
    'dragenter': 'dragEnter',
    'dragleave': 'dragLeave',
    'dragover': 'dragOver',
    'dragend': 'dragEnd',
    'drop': 'drop'
  },
  initialize: function() {
    this.model.on('change', this.render, this);
    this.render();
  },
  render: function() {
    var totalMana = this.model.get('totalMana'),
        usedMana = this.model.get('usedMana'),
        html = "<div class='mana-meter'>";
    for (var i=10; i > 0; i--) {
      if (i <= totalMana && i > usedMana) {
        html += "<span name='" + i+ "' class='available'></span>";
      } else if (i <= totalMana && i <= usedMana) {
        html += "<span name='" + i+ "' class='used'></span>";
      } else {
        html += "<span name='" + i+ "'></span>";
      }
    }

    html += "  <label>" + (totalMana - usedMana) + "/" + totalMana + "</label>" +
      "</div>" +
      "<div class='player'>" +
      "  <img src='images/unknown.png' />" +
      "  <label class='health'>" + this.model.get('health') + "</label>" +
      "</div>" +
      "<div class='popup'></div>";

    this.$el.html(html);
    return this;
  },
  receiveDamage: function(damage) {
    var popup = this.$el.children('.popup');
    popup.html('-' + damage);
    popup.addClass('damaged');
    popup.show();
    setTimeout.call(this, this.removePopup, 600);
  },
  receiveHealth: function(health) {
    var popup = this.$el.children('.popup');
    popup.html('+' + health);
    popup.addClass('healed');
    popup.show();
    setTimeout.call(this, this.removePopup, 600);
  },
  removePopup: function() {
    this.$el.children('.popup').fadeOut(400);
  },
  dragEnter: function(e) {
    var event = e.originalEvent;
    var fromField = (event.dataTransfer.types.indexOf("in-field") >= 0) ? true: false;

    if (fromField) {
      this.$el.children('.player').addClass('dropable');
    }
  },
  dragLeave: function(e) {
  },
  dragOver: function(e) {
    var event = e.originalEvent;
    e.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    return false;
  },
  dragEnd: function(e) {
    this.$el.children('.player').removeClass('dropable');
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
