'use strict';
angular
    .module('shopnxApp', [
        'ngCookies',
        'ngAlertify',
        'vcRecaptcha',
        'ngResource',
        'ngAnimate',
        'btford.socket-io',
        'ngMaterialDatePicker',
        'ui.router',
        'slick',
        'ngMaterial',
        'darthwade.dwLoading',
        'afkl.lazyImage',
        'duScroll',
        'socialLogin',
        'uiRouterStyles',
        'ngFileUpload',
        'bgf.paginateAnything',
        'countTo',
        'textAngular',
        'angularUtils.directives.dirPagination',
        'ngScrollbars',
        'angular-md5',
        'djds4rce.angular-socialshare',
        'bootstrapLightbox',
        'ngCookies'
    ])
    .config(function (
        $stateProvider,
        $urlRouterProvider,
        $locationProvider,
        $httpProvider,
        $mdAriaProvider,
        socialProvider,
        ScrollBarsProvider,
        LightboxProvider
    ) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
        $httpProvider
            .interceptors
            .push('authInterceptor');
        socialProvider.setFbKey({apiVersion: "v2.8", appId: "260653954362316"});
        // socialProvider.setGoogleKey(
        // "1064579782854-g9gd0j33omls5dfqu0avtv9utv0nc02i.apps.googleusercontent.com"
        // );
        socialProvider.setGoogleKey(
            "1064579782854-g9gd0j33omls5dfqu0avtv9utv0nc02i.apps.googleusercontent.com"
        );
        ScrollBarsProvider.defaults = {
            advanced         : {
                updateOnContentResize: false
            },
            autoHideScrollbar: false,
            axis             : 'yx',
            scrollButtons    : {
                enable      : false,
                scrollAmount: 'auto'
            },
            scrollInertia    : 0,
            setHeight        : 471,
            theme            : 'dark'
        };
        LightboxProvider.fullScreenMode = true;
    })
    .factory(
        'authInterceptor',
        function ($rootScope, $q, $cookieStore, $location) {
            return {
                request      : function (config) {
                    config.headers = config.headers || {};
                    if ($cookieStore.get('token')) {
                        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                    }
                    return config;
                },
                responseError: function (response) {
                    if (response.status === 401) {
                        $location.path('/login');
                        $cookieStore.remove('token');
                        return $q.reject(response);
                    } else {
                        return $q.reject(response);
                    }
                }
            };
        }
    )
    .factory('socket', function (socketFactory) {
        return socketFactory();
    })
    .value('version', '0.1')
    .run(
        function ($rootScope, Auth, $state, User, $mdDialog, $location, $loading, $interval, $FB) {

            var md = new MobileDetect(window.navigator.userAgent);
            $rootScope.$on('$stateChangeStart', function (event, next) {});
            $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
                window.document.title = '10KMua - ' + toState.title;
            });
            $rootScope.$on('event:social-sign-in-success', function (event, userDetails) {
                if (!userDetails.email) {
                    $mdDialog
                        .show(
                            $mdDialog.alert().clickOutsideToClose(true).title('Thông báo.').textContent('Đăng nhập không thành công. Vui lòng cung cấp địa chỉ email của bạn.').ok('Đóng cửa sổ')
                        )
                        .then(function () {
                            $loading.finish('lazy-submit');
                        });
                } else {
                    var user = {
                        avatar        : userDetails.imageUrl,
                        email         : userDetails.email,
                        fullname      : userDetails.name,
                        password_input: userDetails.uid
                    };
                    $loading.start('lazy-submit');
                    Auth
                        .checkEmailExits(userDetails.email)
                        .then(function (result) {
                            if (result.provider != userDetails.provider) {
                                if (result.provider == 'local') {
                                    $mdDialog
                                        .show(
                                            $mdDialog.alert().clickOutsideToClose(true).title('Thông báo.').textContent('Đăng nhập không thành công. Địa chỉ email này đã được đăng ký.').ok('Đóng cửa sổ')
                                        )
                                        .then(function () {
                                            $loading.finish('lazy-submit');
                                        });
                                } else {
                                    $mdDialog
                                        .show(
                                            $mdDialog.alert().clickOutsideToClose(true).title('Thông báo.').textContent(
                                                'Đăng nhập không thành công. Địa chỉ email này phải được đăng nhập bằng tài kho' +
                                                'ản ' + result.provider + ' tương ứng của bạn.'
                                            ).ok('Đóng cửa sổ')
                                        )
                                        .then(function () {
                                            $loading.finish('lazy-submit');
                                        });
                                }
                            } else {
                                user.id = result._id;
                                Auth
                                    .editUserbyProvider(user)
                                    .then(function (data) {
                                        var user_tmp = data.user;
                                        var login_data = {
                                            password: user_tmp.password_input,
                                            user    : user_tmp.email
                                        };
                                        if (md.mobile() != null) {
                                            login_data.tokenApp = $rootScope.tokenApp;
                                        }
                                        Auth
                                            .login(login_data)
                                            .then(function (data) {
                                                Auth.isLoggedInAsync(function (cb) {
                                                    $rootScope.isLoggedIn = cb;
                                                    $rootScope.isAdmin    = Auth.isAdmin();
                                                    cb && ($rootScope.getCurrentUser = Auth.getCurrentUser());
                                                    $mdDialog
                                                        .show(
                                                            $mdDialog.alert().clickOutsideToClose(true).title('Thông báo.').textContent('Đăng nhập thành công.').ok('Đến trang chủ')
                                                        )
                                                        .then(function () {
                                                            $loading.finish('lazy-submit');
                                                            $location.path('/');
                                                        });
                                                });
                                            });
                                    });
                            }
                        })
                        .catch(function (err) {
                            user.actived  = true;
                            user.provider = userDetails.provider;
                            Auth
                                .createUserbyProvider(user)
                                .then(function (data) {
                                    var login_data = {
                                        password: data.password_input,
                                        user    : data.email
                                    };
                                    if (md.mobile() != null) {
                                        login_data.tokenApp = $rootScope.tokenApp;
                                    }
                                    Auth
                                        .login(login_data)
                                        .then(function (data) {
                                            Auth.isLoggedInAsync(function (cb) {
                                                $rootScope.isLoggedIn = cb;
                                                $rootScope.isAdmin    = Auth.isAdmin();
                                                cb && ($rootScope.getCurrentUser = Auth.getCurrentUser());
                                                $mdDialog
                                                    .show(
                                                        $mdDialog.alert().clickOutsideToClose(true).title('Thông báo.').textContent('Đăng nhập thành công.').ok('Đến trang chủ')
                                                    )
                                                    .then(function () {
                                                        $loading.finish('lazy-submit');
                                                        $location.path('/');
                                                    });
                                            });
                                        });
                                });
                        });
                }
            });
            $rootScope.spinner = {
                active: false,
                off   : function () {
                    this.active = false;
                },
                on    : function () {
                    this.active = true;
                }
            };
        }
    );