'use strict'; angular.module('shopnxApp').controller('AdminManageCtrl', function($scope, Auth, $rootScope, $location) {$rootScope.isPageProduct = false; $rootScope.isHomePage = false; $rootScope.parmas = {home: false, waiting_result: false, restricted_area: false, customer_share: false, forum: false, help: false, }; Auth.isLoggedInAsync(function(cb) {if (!cb) {$location.path('/dang-nhap.html'); } else {$rootScope.isAdmin = Auth.isAdmin(); if (!$rootScope.isAdmin) {$location.path('/dang-nhap.html'); } else {$location.path('/quan-ly-banner.html'); } } }); }) .controller('AdminEvenCtrl', function($scope, Auth, $rootScope, $location, $loading) {$scope.formatDate = function(date){var dateOut = new Date(date); return dateOut; }; $scope.sortComment = function(item) {var date = new Date(item.create); return date; }; Auth.isLoggedInAsync(function(cb) {if (!cb) {$location.path('/dang-nhap.html'); } else {$rootScope.isAdmin = Auth.isAdmin(); if (!$rootScope.isAdmin) {$location.path('/'); } else {$scope.session = {}; $scope.session.startDate = new Date(); $scope.session.endDate = $scope.session.startDate; $scope.session.active = false; $scope.session.k_number = 0; $scope.err_date = ''; Auth.getEventK(1).then(function(event){$scope.statusEventCurrent = event; }); $scope.submit = function(){if($scope.session.endDate < $scope.session.startDate){$scope.err_date = "(*) Ngày kết thúc nhỏ hơn ngày bắt đầu"; }else{$scope.err_date = ''; Auth.updateEventK($scope.session).then(function(data){$scope.statusEventCurrent = data; }) } }; } } }); })