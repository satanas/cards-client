var CardPopupView = Backbone.View.extend({
  initialize: function(options) {
    this.abilities = ['rush', 'overwhelm', 'firstStrike', 'deathtouch', 'venom', 'transfusion', 'vampirism', 'berserker'];
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
    this.abilities.forEach(function(a) {
      if (model.get(a)) {
        abilities += '<div><strong>' + a + '</strong>: ' + abilitiesDescription[a] + '</div>';
      }
    })

    var fText = model.get('flavorText'),
        flavorText = '';
    if (fText !== null && fText !== '') {
      flavorText = '"' + model.get('flavorText') + '"';
    }

    cardType = '';
    if (model.get('type') === 1) {
      cardType = 'Creature';
    }

    html = '<div class="mana">' + model.get('mana') + '</div>' +
      '<div class="image">' + model.get('image') + '</div>' +
      '<div class="name">' + model.get('name') + '</div>' +
      '<div class="information">' +
      '  <div class="description">' + model.get('description') + '</div>' +
      abilities +
      '</div>' +
      '<div class="flavor-text">' + flavorText + '</div>' +
      '<div class="footer">' +
      '  <div class="stats">' +  model.get('attack') + '/' + model.get('health') + '</div>' +
      '  <div class="type">' + cardType + '</div>' +
      '  <div class="clearfix"></div>' +
      '</div>';

    this.$el.html(html);
    return html;
  },
});
