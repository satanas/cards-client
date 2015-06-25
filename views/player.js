var PlayerView = Backbone.View.extend({
  events: {
    'click': 'action'
  },
  initialize: function(options) {
    this.opponent = options.opponent;
  },
  action: function() {
    if (this.opponent) {
      var value = false;

      if (defender !== null && defender.playerId === opponentId) {
        defender = null;
      } else {
        defender = {'playerId': opponentId};
        value = true;
        battlefield[opponentId].clearDefender();
      }
      this.setDefender(value);

      if (attacker !== null && defender !== null) {
        turnView.enableAction(true);
      } else {
        turnView.enableAction(false);
      }
    }
  },
  setDefender: function(value) {
    this.$el.attr('data-defender', value);
  },
  setHealth: function(value) {
    this.$el.children('.health').html(value);
  }
});
