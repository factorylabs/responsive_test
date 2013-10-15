/**
 * Created with IntelliJ IDEA.
 * User: aaroncongleton
 * Date: 4/14/13
 * Time: 11:02 AM
 * To change this template use File | Settings | File Templates.
 */
(function(){
    window.openClass = new function(){
        var headHeight=75;
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
        return{
            init : function(){
                scrollToLink();
                fixNavToTop()
            }
        }
    }();
    window.onload = window.openClass.init;
})();

