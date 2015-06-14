var TurnView = Backbone.View.extend({
  events: {
    'click': 'endTurn'
  },
  onTurn: function() {
    $('#end-turn').show();
    $('#enemy-turn').hide();
  },
  enemyTurn: function(id) {
    $('#end-turn').hide();
    $('#enemy-turn').show();
  },
  endTurn: function() {
    socket.emit('end-turn');
  }
});
