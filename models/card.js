var Card = Backbone.Model.extend({
  defaults: {
    id: null,
    name: 'Foo',
    mana: 1,
    attack: 0,
    health: 0,
    sick: true,
    played: false,
    reversed: false,
    used: false,
    attacker: false,
    defender: false,
    invenomed: false,
    transfusion: false,
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
  setInvenomed: function(value) {
    this.set({'invenomed': value});
  },
  update: function(card) {
    if (card.hasOwnProperty('sick')) {
      this.set({'sick': card.sick});
    }
    if (card.hasOwnProperty('used')) {
      this.set({'used': card.used});
    }
    if (card.hasOwnProperty('invenomed')) {
      this.set({'invenomed': card.invenomed});
    }
  },
  receiveDamage: function(value) {
    var health = this.get('health');
    this.set({'health': health - value});
    this.trigger('damageReceived', {damage: value});
  }
});
