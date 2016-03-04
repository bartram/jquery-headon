/*
 * jquery.headon.js
 * @author: Bartram Nason
 * @version: 1.0
 */
(function($){

  $.fn.headon = function(options) {
    var settings = {
      scrollpane: window,
      header: 'h1',
      offset: 0
    }
    
    if (options) {
      $.extend(settings, options);
    }
    
    this.each(function () {
      var header = $(this).find(settings.header).first();
      var headerPosition = header.position();
      
      if (header.css('position') !== 'absolute') {
        header.width(header.width());
        header.css({position: 'absolute', top: headerPosition.top});
        
        if (settings.buffer) {
          $(settings.buffer).addClass('headon').css({paddingTop: header.outerHeight(), marginTop: header.css('marginTop')});
        }
        else {
          $('<div class="headon">&nbsp;</div>').css({
            height: header.outerHeight(),
            marginTop: header.css('marginTop'),
            marginBottom: header.css('marginBottom')
          }).insertAfter(header).width();
        }
      }
      $(this).data('header', header);
      $(this).data('headerPosition', headerPosition);
    });

    var self = this;
    
    $(settings.scrollpane).scroll(function () {

      var active = '';

      var scrollTop = $(this).scrollTop();
      var scrollpaneOffset = $(this).offset();

      self.each(function (i) {
      
        var offset = $(this).offset();
        var height = $(this).outerHeight(true);
        
        var header = $(this).data('header');
        var headerPosition = $(this).data('headerPosition');

        if (scrollpaneOffset) {
          var position = $(this).position();
          if (scrollpaneOffset.top > offset.top && scrollpaneOffset.top < offset.top + height) {
            if ((position.top * -1) + header.outerHeight() > height) {
              header.css({top: 'auto', bottom: 0 + headerPosition.top});
            }
            else {
              header.css({top: (position.top * -1) + settings.offset + headerPosition.top, bottom: 'auto'});
              
            }
            active = this;
            return false;
          }
        }
        else {
          if (scrollTop + settings.offset > offset.top && scrollTop + settings.offset < offset.top + height) {
            if (scrollTop + settings.offset + header.outerHeight() > offset.top + height) {
              header.css({top: 'auto', bottom: 0 + headerPosition.top});
            } else {
              top = scrollTop - offset.top + settings.offset + headerPosition.top;
              header.css({top: scrollTop - offset.top + settings.offset + headerPosition.top, bottom: 'auto'});
            }
            active = this;
            return false;
          }

        }

      });
      
      self.not(active).each(function () {
        var header = $(this).data('header');
        var headerPosition = $(this).data('headerPosition');
        header.css({top: headerPosition.top, bottom: 'auto'});
        
      });
      
    });
    return this;
  };
})(jQuery);