'use strict'; angular.module('shopnxApp') .directive('productSessionSelled', function($loading, Product, $stateParams,$interval, $rootScope, $location) {return {restrict: 'E', scope: {product: '=', }, templateUrl: 'app/product/views/tpm.product.session.selled.html', link: function(scope, element, attribute) {scope.scrollbarConfigSession =  {theme: 'dark', autoHideScrollbar: false, setHeight: 471, scrollInertia: 0, axis: 'y', advanced: {updateOnContentResize: true }, scrollButtons: {scrollAmount: 'auto', enable: false } }; scope.noSelling = false; scope.sessionSelling = {}; scope.keySearchSession = ''; var getSessionSelling = function(product_id) {Product.getSessionSelling.get({id : product_id }).$promise .then(function(session){scope.sessionSelling = session; }) .catch(function(err){scope.noSelling = true; }); }; var computeCurrentSession = function() {var sessions_tmp = scope.list_sessions; var len_sessions = scope.len_sessions; var sessions = scope.list_sessions; if (typeof $stateParams.session_id != 'undefined' && len_sessions > 8) {sessions_tmp.forEach(function(item, index) {if (parseInt(item.session_id) === parseInt($stateParams.session_id)) {if (index < 7) {scope.isCutSession = false; sessions = sessions.slice(0,8); } else if (len_sessions - 8 > index) {if (index == 0){scope.isCutSession = false; sessions = sessions.slice(index,index + 8); } else {scope.isCutSession =  true; sessions = sessions.slice(index - 1,index + 7); } } else {scope.isCutSession = true; if (index == len_sessions - 8) {sessions = sessions.slice(len_sessions - 9, len_sessions-1); } else {sessions = sessions.slice(len_sessions - 8, len_sessions); } } return; } }); } else {scope.isCutSession = false; sessions = sessions.slice(0,8); } scope.sessions = sessions; }; var getSessionSelled = function() {Product.getSessionSelled.query({id: scope.product.id }).$promise.then(function(sessions){scope.len_sessions = sessions.length; scope.list_sessions = sessions; computeCurrentSession(); $rootScope.lottery_session = _.filter(sessions, function(value){if(!_.isUndefined($stateParams.session_id) && parseInt(value.session_id) === parseInt($stateParams.session_id)){return value; }else{return false; } }); scope.stateParams = $stateParams; }) .catch(function(err){scope.sessions = []; }); } ; scope.$watch('product',function(product) {if(typeof product != 'undefined'){getSessionSelling(product.id); getSessionSelled(); scope.funcSearchSession = function() {if (typeof scope.keySearchSession != 'undefined' && scope.keySearchSession != '') {Product.getSessionBySearch.get({id: product.id, number: scope.keySearchSession }).$promise .then(function(session){if (session.finish){$location.path("/san-pham/"+product.slug+"/"+session.session_id+".html"); } else {$location.path("/san-pham/"+product.slug+".html"); } }) .catch(function(err){scope.keySearchSession = ''; }); } }; } }); scope.$watch('keySearchSession', function(newValue, oldValue) {var arr = String(newValue).split(""); if (arr.length === 0) return; if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return; if (arr.length === 2 && newValue === '-.') return; if (isNaN(newValue)) {scope.keySearchSession = oldValue; } }); scope.closeSession = function(){var elementDiv = angular.element(document.querySelector(".view-more-session-slide")) ; var top = 0; var promise = $interval(function(){top = top - 3; elementDiv.css({'top' : top}); top <= -550 && ($interval.cancel(promise)); }, 1); }; scope.viewMoreSession = function(){var elementDiv = angular.element(document.querySelector(".view-more-session-slide")) ; var top = -552; var promise = $interval(function(){top = top + 3; elementDiv.css({'top' : top}); top >= 0 && ($interval.cancel(promise)); }, 1); } } } })