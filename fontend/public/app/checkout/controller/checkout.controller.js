'use strict';
angular
    .module('shopnxApp')
    .controller('CheckoutCtrl', function (
        $scope,
        Cart,
        $mdDialog,
        $window,
        Auth,
        $rootScope,
        $loading,
        $location,
        Checkount
    ) {
        $rootScope.isPageProduct = false;
        $rootScope.isHomePage    = false;
        $rootScope.parmas        = {
            aheadapps      : false,
            cartapps       : true,
            customer_share : false,
            forum          : false,
            home           : false,
            productapps    : false,
            profileapps    : false,
            restricted_area: false,
            waiting_result : false
        };
        $scope.isCheckout        = true;
        $scope.cart              = Cart;
        _.size(Cart.items) === 0 && $location.path("/");
        $scope.arrListCheckout    = [];
        $scope.totalPriceCheckout = 0;
        $scope.checkout           = function () {
            $scope.isCheckout = false;
            $loading.start('lazy-checkout');
            if (_.size(Cart.items) > 0) {
                Auth.isLoggedInAsync(function (cb) {
                    $rootScope.isLoggedIn = cb;
                    !cb && $location.path('/');
                    cb && ($rootScope.getCurrentUser = Auth.getCurrentUser());
                    if ($rootScope.isLoggedIn) {
                        $rootScope.getCurrentUser = Auth.getCurrentUser();
                        var alertmsg = '', index_item = 1;
                        _.each(Cart.items, function (cart, index) {
                            Checkount
                                .checkountOne
                                .get({product_id: cart.id_ck, qty: cart.quantity})
                                .$promise
                                .then(function (result) {
                                    $scope
                                        .arrListCheckout
                                        .push({
                                            buyed : result.qty,
                                            err   : false,
                                            image : cart.image,
                                            K     : result.amountTotal,
                                            name  : cart.name,
                                            price : cart.price,
                                            slug  : cart.slug,
                                            status: "Đã mua thành công"
                                        });
                                    $scope.totalPriceCheckout += result.amountTotal * 1000;
                                    Cart.removeItem(cart);
                                    $rootScope.sizeCart = _.size(Cart.idArray);
                                    $rootScope.sizeCart === 0 && $loading.finish('lazy-checkout');
                                    if (index_item == _.size(Cart.items)) {
                                    	Auth.refreshKNumber();
                                    }
                                })
                                .catch(function (err) {
                                    if (err.data === 'Not K') {
                                        $scope
                                            .arrListCheckout
                                            .push({
                                                buyed : 0,
                                                err   : true,
                                                image : cart.image,
                                                K     : 0,
                                                name  : cart.name,
                                                price : cart.price,
                                                slug  : cart.slug,
                                                status: "Không đủ K (*)"
                                            });
                                        $scope.totalPriceCheckout += 0;
                                    } else if (err.data.messerr) {
                                        $scope
                                            .arrListCheckout
                                            .push({
                                                buyed : 0,
                                                err   : true,
                                                image : cart.image,
                                                K     : 0,
                                                name  : cart.name,
                                                price : cart.price,
                                                slug  : cart.slug,
                                                status: err.data.alertmsg
                                            });
                                        $scope.totalPriceCheckout += 0;
                                    }
                                    if (err.data === 'not_published') {
                                        $scope
                                            .arrListCheckout
                                            .push({
                                                buyed : 0,
                                                err   : true,
                                                image : cart.image,
                                                K     : 0,
                                                name  : cart.name,
                                                price : cart.price,
                                                slug  : cart.slug,
                                                status: "Sản phẩm ngưng bán (*)"
                                            });
                                        $scope.totalPriceCheckout += 0;
                                    }
                                    if (err.data === 'not_session') {
                                        $scope
                                            .arrListCheckout
                                            .push({
                                                buyed : 0,
                                                err   : true,
                                                image : cart.image,
                                                K     : 0,
                                                name  : cart.name,
                                                price : cart.price,
                                                slug  : cart.slug,
                                                status: "Sản phẩm hết phiên (*)"
                                            });
                                        $scope.totalPriceCheckout += 0;
                                    }
                                    Cart.removeItem(cart);
                                    $rootScope.sizeCart = _.size(Cart.idArray);
                                    $rootScope.sizeCart === 0 && $loading.finish('lazy-checkout');
                                });
                            index_item ++; 
                        });
                    }
                });
            }
        }
    });