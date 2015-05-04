/// <reference path="../../typings/angularjs/angular.d.ts" />

module segmentation {
	interface ISegmentSelectionDirectiveScope extends angular.IScope {
		segmentSelection: () => string;
	}

	angular.module('segmentation', [])
	
	.directive('segmentSelection', function(){
		return { 
			scope: {
				segmentSelection: '&'	
			},
			restrict: 'AECM', 
			link: function( scope: ISegmentSelectionDirectiveScope, element: angular.IAugmentedJQuery, attr: angular.IAttributes ){
				element.html( scope.segmentSelection() );
			}
		}
	});

}
