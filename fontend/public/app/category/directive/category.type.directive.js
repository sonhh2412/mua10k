'use strict'; angular.module('shopnxApp') .directive('categoryType', function ($loading, Category, socket, $stateParams) {return {restrict: 'E', scope: {parent: '='}, templateUrl: 'app/category/views/category.type.view.html', link: function (scope, element, attribute, $timeout) {scope.$watch('parent',function(data) {typeof scope.parent !== 'undefined' && ($loading.start('lazy-category'), Category.getChild.get({id: scope.parent }).$promise.then(function(result){scope.categories = _.size(result.results) > 0 ? result.results : []; scope.noChild = _.size(result.results) > 0 ? result.noChild : false; scope.slug = $stateParams.slug; setTimeout(function() {$loading.finish('lazy-category'); }, 500); }) ) }); } }; }) .directive('brandProduct', function ($loading, Category, socket, $rootScope) {return {restrict: 'E', scope: {category: '='}, templateUrl: 'app/category/views/category.brand.product.html', link: function (scope, element, attribute) {scope.$watch('category',function(data) {scope.url = $rootScope.url; typeof scope.category !== 'undefined' && (scope.currentId = -1, $loading.start('lazy-brand'), Category.getBrand.query({id: scope.category }).$promise.then(function(result){scope.brands = result.length > 0 ? result : []; setTimeout(function() {$loading.finish('lazy-brand'); }, 500); }), scope.filtBrand = function(brand_id){scope.currentBrandId = brand_id; $rootScope.url = scope.url + '/' + brand_id; } ) }); } }; })