// TODO-JW: consider another literal to handle this kind of stuff
var ViewController = {
  loadCocktails: function() {},
  centerSearchForm: function() {}
};

// TODO-JW: It seems to me that a Cocktail literal should only have things related
// to an individual cocktail
var Cocktail = {
  init: function(){
    $('.delete_cocktail').on('ajax:success', this.deleteCocktail);
    $('#search_button').on('click', this.openSearchForm);
    $('#modal form').on('ajax:success', this.renderCocktails);
    this.bindHover();
    this.getCocktails();
  },

  bindHover: function() {
    $('#cocktail_grid').on('mouseenter','.cocktail',function(){
      $(this).find('.options').slideDown();
    });

    $('#cocktail_grid').on('mouseleave','.cocktail',function(){
      $(this).find('.options').slideUp();
    });
  },

  renderCocktails: function(event, response) {
    $('.search_form_wrapper').fadeOut();
    $('#modal form')[0].reset();

    Cocktail.container.children().remove();

    var fragment = document.createDocumentFragment();
    var elems = [];
    $.each($(response), function(index,elem) {
      if (index%2 == 0) {
        fragment.appendChild(elem);
        elems.push(elem);
      }
    });

    Cocktail.container.prepend( fragment );
    Cocktail.mason.prepended( elems );
  },

  getCocktails: function() {
    $.get("/cocktails")
    .done(function(response){
      Cocktail.renderCocktails("",response);
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
    $('.search_form_wrapper').show();
    $('#overlay').fadeIn();
    $('#modal').show();
    $(window).on('resize.modal', Cocktail.searchFormCenter);
    $('#close').on('click', Cocktail.closeSearchForm);
  },

  closeSearchForm: function() {
    $('.search_form_wrapper').fadeOut();
    $('#overlay').hide();
    $('#modal').hide();
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
    Cocktail.container = $('#cocktail_grid');
    Cocktail.container.masonry({
      columnWidth: 1,
      itemSelector: '.cocktail',
      isFitWidth: true
    });
    Cocktail.mason = Cocktail.container.data('masonry');

    this.bindRemoveEvent();
    this.bindEnlargeEvent();
  },

  bindRemoveEvent: function() {
    $('#cocktail_grid').on('click', '.hide', function( event ) {
      Cocktail.mason.remove( $(event.target).closest('.cocktail'));
      Cocktail.mason.layout();
    });
  },

  bindEnlargeEvent: function() {
    $('#cocktail_grid').on('click', '.name', function( event ) {
      console.log('click');
      $('.gigante').removeClass('gigante');
      $(this).closest('.cocktail').addClass("gigante");
      var img = $(this).closest('.cocktail').find('img');

      var src = img.attr('src');
      img.attr('src', src.replace(/(c_fill,h_)\d{1,}(,w_)\d{1,}/,"$1500$2500"))
    
      Cocktail.mason.layout();
    });
  }
}

$(document).ready(function(){
  Cocktail.init();
  Grid.init();
});
