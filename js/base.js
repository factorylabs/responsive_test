/**
 * Created with IntelliJ IDEA.
 * User: aaroncongleton
 * Date: 4/14/13
 * Time: 11:02 AM
 * To change this template use File | Settings | File Templates.
 */
(function(){
    window.openClass = new function(){
        var scrollStatus = function(){
            var anchors=[],
                scrollPos,
                header = ($('header').height()+53),
                navElem;
            $('.js-anchor').each(function(){
                var position = $(this).position();
                //alert (position.top)
                anchorPos = position.top;

                anchors.push(anchorPos);
            });

            $(window).scroll(function(){
                scrollPos = $(window).scrollTop();
                if  ((scrollPos + header) < anchors[1]){
                    $('.js-interior-nav .active').removeClass('active');

                }
                if  ((scrollPos + header) > anchors[1] && (scrollPos + header) < anchors[2]){
                    if ($('.creatingACourse').hasClass('active')){
                        return true
                    }else {
                        $('.js-interior-nav .active').removeClass('active');
                        $('.creatingACourse').addClass('active')
                    };

                }
                if  ((scrollPos + header) > anchors[2] && (scrollPos + header) < anchors[3]){
                    if ($('.scocialLearning').hasClass('active')){
                        return true
                    }else {
                        $('.js-interior-nav .active').removeClass('active');
                        $('.scocialLearning').addClass('active')
                    };

                }
                if  ((scrollPos + header) > anchors[3] && (scrollPos + header) < anchors[4]){
                    if ($('.openclassExchange').hasClass('active')){
                        return true
                    }else {
                        $('.js-interior-nav .active').removeClass('active');
                        $('.openclassExchange').addClass('active')
                    };

                }
                if  ((scrollPos + header) > anchors[4]){
                    if ($('.evaluation').hasClass('active')){
                        return true
                    }else {
                        $('.js-interior-nav .active').removeClass('active');
                        $('.evaluation').addClass('active')
                    };

                }
            });
        };
        var headHeight= $('header').height();
        var scrollToAnchor = function (targetElem){
            var anchor = $("a[name='"+ targetElem +"']");
            $('html,body').animate({scrollTop: (anchor.offset().top)-headHeight},'slow');

        };
        var navUp = function(){
            var winPosition = window.pageYOffset+headHeight,
                elems = $('.js-anchor'),
                prevElemVal;
            elems.each(function(){
                if(winPosition > this.offsetTop){
                    prevElemVal = this.offsetTop;
                }
            });
            $('html,body').animate({scrollTop: prevElemVal - headHeight},'slow');
        };
        var navDn = function(){
            var winPosition = window.pageYOffset+headHeight,
                elems = $('.js-anchor'),
                postElemVal;
            elems.each(function(){
                if(winPosition < this.offsetTop){
                    postElemVal = this.offsetTop;
                    return false;
                }
            });
            if(postElemVal > 0){
                $('html,body').animate({scrollTop: postElemVal - headHeight},'slow');
            }
        };
        var scrollToLink = function(){
            $('.js-interior-nav a').click(function(){
                var $this= $(this),
                    linkVal = $this.attr('rel');
                if(linkVal == 'up'){
                    navUp();
                }else if(linkVal == 'down'){
                    navDn();
                }else {
                    scrollToAnchor(linkVal);
                }
                return false;
            });
        };
        var fixNavToTop = function(){
            var navPosition = $('.js-nav-set').offset().top;
            $(window).scroll(function (){
                var winPosition = window.pageYOffset;
                //console.log(winPosition);
                if(navPosition-80 < winPosition){
                    //console.log('true');
                    $('.js-nav-set').css('position', 'fixed').css('top' , '77px');
                }else{
                    $('.js-nav-set').css('position', 'relative').css('top' , '');
                }
            });
        };
        var setAnchorNavContainer = function(){
            $('body').find('.js-anchor-nav-container').animate({right:'0%'});
            $('body').find('.js-nav-control').animate({width:'100%'});
            $('body').find('.js-close-nav').fadeIn();
        };
        var removeAnchorNavContainer = function(){
            $('body').find('.js-anchor-nav-container').animate({right:'100%'});
            $('body').find('.js-nav-control').animate({width:'46px'});
            $('body').find('.js-close-nav').fadeOut();
        };
        var kickBurger = function(){
            $('.js-hamburger').click(function(){
                setAnchorNavContainer();
                return false
            });
            $('.js-close-nav, .js-interior-nav a').click(function(){
                removeAnchorNavContainer();
                return false
            })
        };
        var fixNav = function(){
            var winWidth = $(window).width();
            if (winWidth>767){
                fixNavToTop();
            }else{
                kickBurger();
            }
        };


        var galleryBuild = function(){
            var applyCarousel = function(el,section){

                function mycarousel_initCallback(carousel) {
                    $('.jcarousel-control a').bind('click', function() {
                        carousel.scroll(jQuery.jcarousel.intval(jQuery(this).attr('href')));
                        return false;
                    });
                    $('.js-forward-'+section).bind('click', function() {
                        carousel.next();
                        //checkPosition();
                        return false;
                    });

                    $('.js-back-'+section).bind('click', function() {
                        carousel.prev();
                        //checkPosition();
                        return false;
                    });
                    $('body').on('swipeleft', function() {
                        carousel.next();
                        //checkPosition();
                        return false;
                    });

                    $('body').on( 'swiperight', function() {
                        carousel.prev();
                        //checkPosition();
                        return false;
                    });

                };
                function mycarousel_itemFirstOutCallback(carousel, item, idx, state) {
                    if (state != 'init'){
                        var listPos = idx- 1,
                            el = $(item).parentsUntil('.oc-features-list').find('.oc-carousel-control a').get(listPos);
                        $(item).parentsUntil('.oc-features-list').find('.oc-carousel-control a').removeClass('js-control-active')
                        $(el).addClass('js-control-active');
                        return false
                    };
                };
                function mycarousel_buttonNextCallback(carousel, button, enabled) {
                    var navEl = el.parentsUntil('section').find('.oc-forward');
                    if(!enabled){
                        navEl.addClass('oc-disabled')
                    }else{
                        navEl.removeClass('oc-disabled')
                    }
                };


                function mycarousel_buttonPrevCallback(carousel, button, enabled) {
                    var navEl = el.parentsUntil('section').find('.oc-back');
                    if(!enabled){
                        navEl.addClass('oc-disabled')
                    }else{
                        navEl.removeClass('oc-disabled')
                    }
                };
                el.jcarousel({
                    scroll: 1,
                    visible: 1,
                    initCallback: mycarousel_initCallback,
                    buttonNextCallback:   mycarousel_buttonNextCallback,
                    buttonPrevCallback:   mycarousel_buttonPrevCallback,
                    //itemFallbackDimension: 480,
                    itemLastInCallback: mycarousel_itemFirstOutCallback
                    // This tells jCarousel NOT to autobuild prev/next buttons
                    //buttonNextHTML: null,
                    //buttonPrevHTML: null
                });
            };
            var carouselMarkupBuild = function(el){
                var markup = $(el).find('.js-image-gallery'),
                    thisSection = el.parentsUntil('section'),
                    galleryElems = thisSection.find('.js-image-gallery-container'),  //this populates both standard and detail carousels
                    position = $('section').index($(el).parents('section'));
                $(galleryElems).empty();
                $(markup).clone().appendTo(galleryElems);

                $.each(galleryElems,function(){
                    var newGallery = $(this).find('div');
                    applyCarousel(newGallery, position);
                });
                //applyCarousel(newGallery, position);
            };
            var featureContentSet = function(el){
                var contentElem = $(el).parentsUntil('section').find('.js-listing-info div');
                $(contentElem).fadeOut(function(){
                    $(contentElem).empty();
                    var headerText = $(el).find('h4').text(),
                        bodyText   = $(el).find(' .js-gallery-text').text(),
                        markup =  "<h3>"+headerText+"</h3><p>"+bodyText+"</p>";
                    $(contentElem).append(markup).fadeIn();
                })
            };
            var closeDetailNode = function(el){
                var section = el.parentsUntil('section');
                section.find('.js-info-node').fadeIn();
                section.find('.js-info-detail-node').css('margin-left', '1500px');

            };
            var setDetailView = function(el){
                var detailNode = el.parentsUntil('section').find('.js-info-detail-node');
                el.parentsUntil('section').find('.js-info-node').fadeOut();
                detailNode.fadeOut('fast').animate({'margin': '0 0 0 -10px'}, 'fast', function(){
                    detailNode.fadeIn();
                });
                $('.js-detail-close').click(function(){
                    closeDetailNode(el);
                    return false;
                });
            };
            $('.js-detail, .js-image-gallery-container').click(function () {
                var el = $(this);
                setDetailView(el);
                return false
            });
            $('.js-listing-info a').click(function(){
                return false
            });
            var setFeatureSelect = function(el){
                var winWidth = $('body').width(),
                    navOffset;
                if (winWidth > 767){
                    navOffset = 80;
                }else if(winWidth < 768){
                    navOffset = 40;
                }
                featureContentSet(el);
                el.css('background','#ccc');
                el.find('.js-control-primary').fadeOut(function(){
                    el.find('.js-listing-controls').animate({'width': navOffset+'px'}, 'fast', function(){
                        el.find('.js-controls-second').fadeIn();
                    });
                });
                return true;
            };
            var setMobileFeature = function(el){
                var position = $('section').index($(el).parents('section'));
                var newGallery = el.find('.js-gallery-list');

                el.find('.js-image-gallery').show();
                applyCarousel(newGallery, position);
                el.find('p').fadeIn();
            };
            var showFeatures = function(el){

                var winWidth = $(window).width();
                if (winWidth > 959){
                    el.parentsUntil('section').find('.js-info-node').animate({'left': '340px'},'slow').fadeIn();
                }else if(winWidth < 959 && winWidth > 768){
                    el.parentsUntil('section').find('.js-info-node').animate({'left': '372px'},'slow').fadeIn();
                }else{
                    setMobileFeature(el);
                }

            };
            // reset the flag element to the non clicked state
            var tearDownFeatureSelect = function(){
                var winWidth = $(window).width();
                if(winWidth < 768 ){
                    $('.js-control p').hide();
                    $('.js-image-gallery').hide();
                }else{

                    $('.js-features li').css('background','');
                    $('.js-controls-second').hide();
                    $('.js-listing-controls').css('width', '40px');
                    $('.js-control-primary').show();
                }
            };

            $('.js-control').click(function() {
                var el = $(this);
                var winWidth = $('body').width();
                $(el).removeClass('js-control');
                tearDownFeatureSelect();
                setFeatureSelect(el);
                showFeatures(el);
                if (winWidth > 768){
                    carouselMarkupBuild(el);
                    return false
                }


            });
            $('.js-listing-controls .js-close').click(function(event){
                var thisSection = $(this).parentsUntil('section'),
                    galleryElems = thisSection.find('.js-image-gallery-container');
                    $(galleryElems).empty();
                thisSection.find('.js-info-node').fadeOut();
                tearDownFeatureSelect();
                event.stopPropagation();
                event.preventDefault();
                return false
            });
        };
        var initScreenView = function(){
           $('section').each(function(){
               var section = $(this),
                   winWidth = $('body').width(),
                   image = $(this).find('.js-control-1 .js-gallery-list img')[0],
                   image = $(image).attr('src'),
                   container = $(section).find('.js-image-gallery-container');
               if (winWidth > 768){
                   $(container).css('background','url('+image+')');
                   $(container).css('-moz-background-size','100%');
                   $(container).css('-webkit-background-size','100%');
                   $(container).css('filter','progid:DXImageTransform.Microsoft.AlphaImageLoader( sizingMethod="scale")');
                   $(container).css('-ms-filter','url("progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod="scale")")');
               }
           })
        };
        var hoverScreen = function(){
            $('.js-control').hover(function(){
                var $this = $(this),
                    winWidth = $('body').width(),
                    section = $($this).parentsUntil('section'),
                    image = $($this).find('.js-gallery-list img')[0]  ,
                    image = $(image).attr('src'),
                    container = $(section).find('.js-image-gallery-container');
                if (winWidth > 768){
                    $(container).css('background','url('+image+')');
                    $(container).css('-moz-background-size','100%');
                    $(container).css('-webkit-background-size','100%');
                    $(container).css('filter','progid:DXImageTransform.Microsoft.AlphaImageLoader( sizingMethod="scale")');
                    $(container).css('-ms-filter','url("progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod="scale")")');
                    }

            })
        };
        var vidTeardown = function(){
            $('.js-vid-close').click(function(){
                $('.js-overlay-wrap').fadeOut(function(){
                    $('#player').empty();
                })
            });
        };

        var vidLaunch = function(){
            $('.js-vid-launch').click(function(){
                $('.oc-overlay-wrap').fadeIn();
                var currentVid = $(this).attr('href'),
                    winWidth = $(window).width(),
                    videoWidth, videoHeight,marginVals;
                if (winWidth > 767){
                    videoWidth = 700;
                    videoHeight = 450;
                    marginVals = '-225px 0 0 -350px';
                } else{
                    videoWidth = 325;
                    videoHeight = 240;
                    marginVals = '-120px 0 0 -180px';
                }
                $('#player').append('<iframe width="'+videoWidth+'px" height="'+videoHeight+'px" src="http://www.youtube.com/embed/'+currentVid+'" frameborder="0" allowfullscreen></iframe>')
                $('.oc-modal').css('margin',marginVals).css('width',videoWidth).css('height',videoHeight);
                vidTeardown();
                return false
            });
        };

        return{
            init : function(){
                scrollToLink();
                scrollStatus();
                fixNav();
                initScreenView();
                hoverScreen();
                galleryBuild();
                vidLaunch();
            }
        }
    }();
    window.onload = window.openClass.init;
})();

