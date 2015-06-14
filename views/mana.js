var ManaView = Backbone.View.extend({
  setMana: function(total, used, own) {
    var element = (own) ? '#you' : '#opponent';
    for (var i=1; i <= total; i++) {
      $(element + ' > .util > .mana > span[name="' + String(i) + '"]').removeClass('used');
      $(element + ' > .util > .mana > span[name="' + String(i) + '"]').addClass('available');
    }
    for (var i=1; i <= used; i++) {
      $(element + ' > .util > .mana > span[name="' + String(i) + '"]').removeClass('available');
      $(element + ' > .util > .mana > span[name="' + String(i) + '"]').addClass('used');
    }
    $(element + ' > .util > .mana > label').html(String(total - used) + "/" + String(total));
  }
});
