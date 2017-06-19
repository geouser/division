// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


/**
     *
     * Check if element exist on page
     *
     * @param el {string} jQuery object (#popup)
     *
     * @return {bool}
     *
*/
function exist(el){
    if ( $(el).length > 0 ) {
        return true;
    } else {
        return false;
    }
}


jQuery(document).ready(function($) {

    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.toggle-menu'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });


    /*---------------------------
                                  File input logic
    ---------------------------*/
    $('input[type=file]').each(function(index, el) {
        $(this).on('change', function(event) {
            event.preventDefault();
            var placeholder = $(this).siblings('.placeholder');
        
            if ( this.files.length > 0 ) {
                if ( this.files[0].size < 5000000 ) {
                    var filename = $(this).val().split('/').pop().split('\\').pop();
                    if ( filename == '' ) {
                        filename = placeholder.attr('data-label');
                    }
                    placeholder.text(filename);
                } else {
                    alert('Maximum file size is 5Mb');
                }    
            } else {
                placeholder.text( placeholder.attr('data-label') );
            }
            
        });
    });
    
    /*---------------------------
                                PAGE ANCHORS
    ---------------------------*/
    $('.mainNav a, .anchor').click(function() {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50
        }, 800);
        return false;
    });

    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.js-toggle-menu').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('is-active');
        $(this).siblings('header').toggleClass('open');
    });


    $('.js-toggle-products-menu').on('click', function(event) {
        event.preventDefault();
        $(this).parent().toggleClass('open');
    });

    $(document).mouseup(function(e) {
        var container = $('.catalog-button, .products-menu')
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.catalog-menu').removeClass('open');
        }
    });

    $(".content-scroll").mCustomScrollbar({
        theme: "dark" 
    });

    /*---------------------------
                                  Filters
    ---------------------------*/
    /* toggle filters form */
    $('.js-toggle-sidebar-filters').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('open');
        $(this).siblings('.filter-form').slideToggle();
    });



    /* toggle filters */
    $('.js-toggle-filter').on('click', function(event) {
        event.preventDefault();
        $(this).siblings('.filter-content').slideToggle();
        $(this).parent().toggleClass('open');
        $(this).toggleClass('hidden');
    });


    /* reset form */
    $('.js-reset-filter-form').on('click', function(event) {
        event.preventDefault();
        $('.filter-form')[0].reset();
        var slider = $('.filter-form').find('.range-slider');
        slider.slider( "option", "values", [ slider.data('min-price') * 1, slider.data('max-price') * 1 ] );
    });

    /* sort dropdown */
    $('.js-toggle-sort-dropdown').on('click', function(event) {
        event.preventDefault();
        $(this).parent().toggleClass('open');
    });

    $(document).mouseup(function(e) {
        var container = $('.sort-by')
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.removeClass('open');
        }
    });


    $('.js-sort').on('click', function(event) {
        event.preventDefault();
        $(this).parent().siblings().removeClass('active')
        $(this).parent().addClass('active');

        $('input[name="sort-by"]').val( $(this).data('sort') );
        $('.sort-by').removeClass('open');

        $('.js-toggle-sort-dropdown').find('span').text( $(this).text() );
    });




    /* range sliders initialization*/
    $( ".range-slider" ).each(function(index, el) {
        var slider = $(this);

        var min = slider.data('min-price') * 1;
        var max = slider.data('max-price') * 1;
        var minInput = slider.siblings('.range-inputs').find('input[name="min-price"]');
        var maxInput = slider.siblings('.range-inputs').find('input[name="max-price"]');

        slider.slider({
            range: true,
            min: min,
            max: max,
            values: [ min, max ],
            step: 100,
            slide: function( event, ui ) {
                minInput.val( ui.values[ 0 ] );
                maxInput.val( ui.values[ 1 ] );
            }
        });

        slider.siblings('.range-inputs').find('input').on('change', function(event) {
            event.preventDefault();
            slider.slider( "option", "values", [ minInput.val(), maxInput.val() ] );
        });
    });



    /*---------------------------
                                  Languages dropdown TOGGLE
    ---------------------------*/
    $('.js-toggle-languages').on('click', function(event) {
        event.preventDefault();
        $(this).parent().toggleClass('open');
    });

    $(document).mouseup(function(e) {
        var container = $('.language-switcher')
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.removeClass('open');
        }
    });


    /*---------------------------
                                  JQuery UI Tabs
    ---------------------------*/
    $( ".tabs, .tabs-light" ).tabs({
        activate: function( event, ui ) {
            ui.newPanel.find('.slick-slider').slick('setPosition');
        }
    });


    /*---------------------------
                                  Countdown js
    ---------------------------*/
    $.countdown.setDefaults($.countdown.regionalOptions[localization]);
    $('.countdown').each(function(index, el) {
        $(this).countdown({
            until: new Date( $(this).data('end').replace(/\s/, 'T') ),
            format: 'DHMS',
            padZeroes: true
        });
    });


    /*---------------------------
                                  Slick sliders
    ---------------------------*/
    $('.special-products-slider').slick({
        fade: true,
        dots: true,
        arrows: false
    })


    $('.offer-slider').slick({
        fade: true,
        dots: true,
        arrows: false
    })

    $('.photo-slider').slick({
        arrows: false,
        dots: true
    })


    $('.productSlider').slick({
        arrows: false,
        dots: false,
        fade: true,
        asNavFor: '.productSliderNav'
    });

    $('.productSliderNav').slick({
        arrows: false,
        dots: false,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        focusOnSelect: true,
        asNavFor: '.productSlider',
        responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4
          }
        }
      ]
    });


    /*---------------------------
                                  Fancybox
    ---------------------------*/
    $('.fancybox').fancybox({
        
    });


    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.fancybox.open([
            {
                src  : popup,
                type: 'inline',
                opts : {}
            }
        ], {
            loop : false
        });
    }



    /*---------------------------
                                  Form submit
    ---------------------------*/
    $('.ajax-form').on('submit', function(event) {
        event.preventDefault();
        var data = new FormData(this);
        $(this).find('button').prop('disabled', true);
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(result) {
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        }).always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
                $(this).find('button').prop('disabled', false);
            });
        });
    });



    /*---------------------------
                                  Google map init
    ---------------------------*/
    var map;
    function googleMap_initialize() {
        var lat = $('#map_canvas').data('lat');
        var long = $('#map_canvas').data('lng');
        var marker = $('#map_canvas').data('marker');
        var zoom = $('#map_canvas').data('zoom');

        var mapCenterCoord = new google.maps.LatLng(lat, long);
        var mapMarkerCoord = new google.maps.LatLng(lat, long);

        var styles = [];

        var mapOptions = {
            center: mapCenterCoord,
            zoom: zoom,
            //draggable: false,
            disableDefaultUI: true,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

        var styledMapType=new google.maps.StyledMapType(styles,{name:'Styled'});
        map.mapTypes.set('Styled',styledMapType);
        map.setMapTypeId('Styled');

        var markerImage = new google.maps.MarkerImage(marker);
        var marker = new google.maps.Marker({
            icon: markerImage,
            position: mapMarkerCoord, 
            map: map,
            title:"Site Title"
        });
        
        $(window).resize(function (){
            map.setCenter(mapCenterCoord);
        });
    }

    if ( exist( '#map_canvas' ) ) {
        googleMap_initialize();
    }


     // This button will increment the value
    $('.plus-num__input').click(function(e){
        e.preventDefault();
        fieldName = $(this).attr('field');
        var currentVal = parseInt($('input[name="'+fieldName+'"]').val());
        if (!isNaN(currentVal)) {
            $('input[name="' + fieldName + '"]').val(currentVal + 1);
        } else {
            $('input[name="'+fieldName+'"]').val(0);
        }
    });

    // This button will decrement the value till 0
    $(".minus-num__input").click(function(e) {
        console.log('dcs')
        e.preventDefault();
        fieldName = $(this).attr('field');
        var currentVal = parseInt($('input[name="'+fieldName+'"]').val());
        if (!isNaN(currentVal) && currentVal > 0) {
            $('input[name="'+fieldName+'"]').val(currentVal - 1);
        } else {
            $('input[name="'+fieldName+'"]').val(0);
        }
    });

}); // end file