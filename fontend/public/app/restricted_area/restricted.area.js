'use strict'; angular.module('shopnxApp') .config(function($stateProvider) {$stateProvider .state('restricted_area', {title: 'Khu vực hạng chế', url: '/khu-vuc-hang-che.html', templateUrl: 'app/restricted_area/views/restricted.area.view.html', controller: 'RestrictedAreaCtrl', data: {css: 'assets/theme/other/full.background.menu.css'} }) });