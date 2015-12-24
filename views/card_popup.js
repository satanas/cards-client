var CardPopupView = Backbone.View.extend({
  tagName: 'div',
  className: 'card',
  initialize: function(options) {
    this.popup = $('#card-details');
    this.popup.hide();
  },
  show: function(x, y, card) {
    this.render(card);
    this.popup.css('top', (y - 360) + 'px');
    this.popup.css('left', (x + 32.5 - 120) + 'px');
    this.popup.html(this.render(card));
    this.popup.show();
  },
  hide: function() {
    //this.popup.hide();
    //this.popup.html('');
  },
  render: function(model) {
    var html = '';
    this.$el.attr('data-card-id', model.get('id'));

    var abilities = ''
    if (model.get('rush')) {
      abilities += '<span>Rush</span>';
    }
    if (model.get('overwhelm')) {
      abilities += '<span>Overwhelm</span>';
    }
    if (model.get('firstStrike')) {
      abilities += '<span>First strike</span>';
    }
    if (model.get('deathtouch')) {
      abilities += '<span>Deathtouch</span>';
    }
    if (model.get('venom')) {
      abilities += '<span>Venom</span>';
    }
    if (model.get('transfusion')) {
      abilities += '<span>Transfusion</span>';
    }
    if (model.get('vampirism')) {
      abilities += '<span>Vampirism</span>';
    }
    if (model.get('berserker')) {
      abilities += '<span>Berserker</span>';
    }

    html = '<div class="mana">' + model.get('mana') + '</div>' +
      '<div class="image">' + model.get('image') + '</div>' +
      '<div class="name">' + model.get('name') + '</div>' +
      '<div class="information">' +
      '  <div class="description">' + model.get('description') + '</div>' +
      abilities +
      '  <div class="flavor-text">' + model.get('flavorText') + '</div>' +
      '</div>' +
      '<div class="footer">' +
      '  <div class="type">' + model.get('type') + '</div>' +
      '  <div class="stats">' +  model.get('attack') + '/' + model.get('health') + '</div>' +
      '</div>';

    this.$el.html(html);
    return html;
  },
});
