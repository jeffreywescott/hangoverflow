var Cocktail = {
  init: function(){
    $('.delete_cocktail').on('ajax:success', this.deleteCocktail);
    $('#search_button').on('click', this.openSearchForm);

    this.initializeCocktails();
  },

  initializeCocktails: function() {
    $.get("/cocktails")
    .done(function(response){

      Grid.init();

      var $container = $('#cocktail_grid');

      $container.masonry({
        columnWidth: 1,
        itemSelector: '.cocktail'
      }).append($(response)[0]);
      debugger
      // var interval = 0;
      //  $(response).each(function(){
      //     var cocktail = this;
      //     setTimeout(function() {
      //       $('#cocktail_grid').append(cocktail);
      //     }, interval = interval + 100);
      //   });

      //  setTimeout(function(){
      //    Grid.init();
      //  }, 5000);
       
    });
  },

  searchFormCenter: function() {
    var top, left;

    top = Math.max($(window).height() - $('#modal').outerHeight(), 0) / 2;
    left = Math.max($(window).width() - $('#modal').outerWidth(), 0) / 2;

    $('#modal').css({
      top:top + $(window).scrollTop(), 
      left:left + $(window).scrollLeft()
    });
  },

  openSearchForm: function() {
    Cocktail.searchFormCenter();
    $('.search_form_wrapper').fadeIn();
    $(window).on('resize.modal', Cocktail.searchFormCenter);
    $('#close').on('click', Cocktail.closeSearchForm);
  },

  closeSearchForm: function() {
    $('.search_form_wrapper').fadeOut();
    $(window).unbind('resize.modal');
  },

  deleteCocktail: function(event, data) {
    $(this).closest('.cocktail').fadeOut(function(){
      $(this).remove();
    });
  }
}

var Grid = {
  init: function(){
    console.log("Initializing Masonry");
    
    // var $container = $('#cocktail_grid');

    // $container.masonry({
    //   columnWidth: 1,
    //   itemSelector: '.cocktail'
    // });
  }
}

$(document).ready(function(){
  Cocktail.init();
});
