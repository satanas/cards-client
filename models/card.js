var Card = Backbone.Model.extend({
  defaults: {
    id: null,
    name: 'Foo',
    mana: 1,
    attack: 0,
    health: 0,
    sick: true,
    drawed: false,
    reversed: false,
    used: false,
    attacker: false,
    defender: false,
    playerId: null
  },
  setSick: function(value) {
    this.set({'sick': value});
  },
  setUsed: function(value) {
    this.set({'used': value});
  },
  setPlayerId: function(playerId) {
    this.set({'playerId': playerId});
  },
  setAttacker: function(value) {
    this.set({'attacker': value});
  },
  setDefender: function(value) {
    this.set({'defender': value});
  },
  setHealth: function(value) {
    this.set({'health': value});
  }
});
