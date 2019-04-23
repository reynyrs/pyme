var app = angular.module('furniture', [
    'ngRoute',
    'toaster',
    'ngAnimate',
]);

app.directive("showOnceBackgroundLoaded", [function () {
    return {
        restrict: "A",
        scope: false,
        link: function (scope, element, attributes) {
            element.addClass("item-loader");
            var image = new Image();
            image.onload = function () {
                // the image must have been cached by the browser, so it should load quickly
                scope.$apply(function () {
                    element.css({
                        backgroundImage: 'url("' + attributes.showOnceBackgroundLoaded + '")'
                    });
                    element.removeClass("item-loader");
                    if (element.hasClass('item')) {
                        $("#gallery").owlCarousel({
                            autoPlay: 3000, //Set AutoPlay to 3 seconds
                            items : 5,
                            lazyLoad: true,
                            itemsDesktop : [1199,3],
                            itemsDesktopSmall : [979,3]
                        });
                        $("#gallery").prop('display', true);
                    } else {
                        element.addClass("item-gallery");
                    }
                });
            };
            image.src = attributes.showOnceBackgroundLoaded;
        }
    };
}]);

app.controller('footer', function ($scope) {
    $scope.footer = function () {
        $scope.year = new Date().getFullYear();
    }
    $scope.footer();
});