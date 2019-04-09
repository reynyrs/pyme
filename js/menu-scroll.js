$(document).ready(function(){
    var
        topMenu=$(".header_top").offset().top,
        heightMenu=$(".header_top").height(),
        topStartMenu=topMenu+heightMenu;

    $(window).scroll(function(){
        var windowTop = $(window).scrollTop();

        windowTop > topStartMenu ? $(".navbar").addClass("scroll-fixed") : $(".navbar").removeClass("scroll-fixed") ;
    })
})