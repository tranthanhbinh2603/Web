/*Javascript có 2 thư viện hay: Ajax và jquery
Các thư viện sử dụng:
https://dimsemenov.com/plugins/magnific-popup/
http://ch-ny.com/content/themes/bridge-child/js/libs/maplace.js/
http://imakewebthings.com/waypoints/

*/

$(document).ready(
    function(){
        // sticky nav
        // $('.about-section').waypoint(
        //     function(direction){
        //         if(direction == "down"){
        //             $('nav').addClass('sticky');
        //         }else {
        //             $('nav').removeClass('sticky');
        //         }
        //     },{
        //         offset: '600px'
        //     }
        // )
        $('a').click(function(event){
            $('html, body').animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top
            }, 700);
            event.preventDefault();
        });
    }
)


