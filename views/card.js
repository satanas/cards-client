var CardView = Backbone.View.extend({
  tagName: 'li',
  className: 'card',
  events: {
    //'click': 'draw',
    'dragstart': 'dragStart',
    'dragend': 'dragEnd',
    'dragenter': 'dragEnter',
    'dragover': 'dragOver',
    'drop': 'dropAttack'
  },
  initialize: function(options) {
    this.reversed = options.reversed;
    this.model.on('change', this.render, this);
    this.opponent = options.opponent;
  },
  render: function() {
    var html = '';
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
      this.$el.attr('data-card-id', this.model.get('id'));
      this.$el.attr('id', ownId + "-" + this.model.get('id'));

      html = '<div class="mana">' + this.model.get('mana') + '</div>' +
        '<div class="name">' + this.model.get('name') + '</div>' +
        '<div class="stats">' +  this.model.get('attack') + '/' + this.model.get('health') + '</div>';
    }
    this.$el.html(html);
    return this;
  },
  draw: function() {
    if (this.reversed) return;
    if (this.drawed) return;
    if (!inTurn) return;

    socket.emit('draw', this.model.get('id'));
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
  },
  dragEnter: function(e) {
    if (!this.opponent) return true;

    var event = e.originalEvent;
    var data = JSON.parse(event.dataTransfer.getData("text/plain"));
    console.log('drag enter in card', data);
    this.$el.addClass('attackable');
    e.preventDefault();
    return false;
  },
  dragOver: function(e) {
    if (!this.opponent) return true;
    e.preventDefault();
    return false;
  },
  dragLeave: function(e) {
    console.log('leeeeave');
    if (!this.opponent) return true;
    this.$el.removeClass('attackable');
    e.preventDefault();
    return false;
  },
  dropAttack: function(e) {
    if (!this.opponent) return true;
    var event = e.originalEvent;
    var data = JSON.parse(event.dataTransfer.getData("text/plain"));
    console.log('drop', data);
    this.$el.removeClass('attackable');
    if (!data.drawed) {
      e.preventDefault();
      return false;
    }
  }
});
