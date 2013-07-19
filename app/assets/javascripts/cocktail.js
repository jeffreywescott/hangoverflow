var Cocktail = {
  init: function(){
    $('.delete_cocktail').on('ajax:success', this.deleteCocktail);
  },

  deleteCocktail: function(event, data) {
    $(this).closest('.cocktail').fadeOut(function(){
      $(this).remove();
    });
  }
}

$(document).ready(function(){
  Cocktail.init();
});