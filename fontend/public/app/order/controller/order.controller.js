'use strict';angular.module('shopnxApp').controller('OrderWinnerCtrl',function($scope,$rootScope,Auth,Order){Auth.isLoggedInAsync(function(cb){if(!cb){$location.path('/dang-nhap.html')}else{$scope.session={};$scope.listorder={};var iduser=Auth.getCurrentUser()._id;Order.listorderbyuser.query({id:iduser}).$promise.then(function(result){if(result){$scope.listorder=result}});var md=new MobileDetect(window.navigator.userAgent);$scope.doTheBack=function(){window.history.back()};$scope.isMobile=false;$scope.isnotMobile=true;if(md.mobile()!=null){$scope.isMobile=true;$scope.isnotMobile=false}}})});