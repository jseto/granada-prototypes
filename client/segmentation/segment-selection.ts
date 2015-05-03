/// <reference path="../../typings/angularjs/angular.d.ts" />

module segmentation {

	angular.module('segmentation', [])
	
	.directive('segmentSelection', function(){
		return { 
			scope: {
				segmentSelection: '&'	
			},
			restrict: 'AECM', 
			link: function( scope: any, element: angular.IAugmentedJQuery, attr: angular.IAttributes ){
				element.html( scope.segmentSelection() );
			}
		}
	});

}
