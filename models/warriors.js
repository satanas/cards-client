var Warriors = Backbone.Collection.extend({
  model: Card,
  unuseCards: function() {
    console.log(this, this.each)
  }
});
