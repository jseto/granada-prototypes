/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="segmentation/segments.ts" />

interface IAppScope extends angular.IScope {
}

angular.module('app', [
	'segmentation'
])

.controller('appController', function( $scope: IAppScope ){	
});

