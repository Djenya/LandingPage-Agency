$(function() {

    var header = $("#header"),
        introH = $("#intro").innerHeight(),
        scrollOffset = $(window).scrollTop();


    /* Fixed Header */
    checkScroll(scrollOffset);

    $(window).on("scroll", function() {
        scrollOffset = $(this).scrollTop();

        checkScroll(scrollOffset);
    });

    function checkScroll(scrollOffset) {
        if( scrollOffset >= introH ) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    }


    // Cache selectors
    var lastId,
        topMenu = $("#nav"),
        topMenuHeight = topMenu.outerHeight(),
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });
    // Bind click handler to menu items so we can get a fancy scroll animation
    menuItems.click(function(event) {
        event.preventDefault();
        
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        
        $('html, body').animate({
            scrollTop: offsetTop
        }, 500);
    });
    // Bind to scroll
    $(window).scroll(function() {
      // Get container scroll position
      var fromTop = $(this).scrollTop() + topMenuHeight;

      // Get id of current scroll item
      var cur = scrollItems.map(function() {
        if ($(this).offset().top < fromTop)
          return this;
      });
      // Get the id of the current element
      cur = cur[cur.length - 1];
      var id = cur && cur.length ? cur[0].id : "";

      if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
          .parent().removeClass("active")
          .end().filter("[href='#" + id + "']").parent().addClass("active");
      }
    });


    /* Menu nav toggle */
    $("#nav_toggle").on("click", function(event) {
        event.preventDefault();

        $(this).toggleClass("active");
        $("#nav").toggleClass("active");
    });


    /* VideoPlayer */
    $("#btn_videoplay").on("click", function(event) {
        event.preventDefault();

        var myVideo = document.getElementById("video-intro"); 

        if (myVideo.paused) {
            myVideo.play(); 
            $(this).addClass("hidden");
        } else {
            myVideo.pause(); 
            $(this).removeClass("hidden");
        }

    }); 
    


    /* Gallery */
    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show(500);
        }
        else
        {
            //$('.filter').filter('.'+value).removeClass('hidden');
            //$(".filter").not('.'+value).addClass('hidden');
            $(".filter").not('.'+value).hide(500);
            $('.filter').filter('.'+value).show(500);
            
        }

        $(".filter-button").removeClass("active");
        $(this).addClass("active");
    });

});