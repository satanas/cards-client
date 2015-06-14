var Card = Backbone.Model.extend({
  defaults: {
    id: null,
    name: 'Foo',
    mana: 1,
    attack: 0,
    health: 0,
    sick: true,
    drawed: false,
    reversed: false
  },
  unsick: function() {
    this.set({'sick': false});
  }
});
