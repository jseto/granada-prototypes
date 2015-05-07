/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="segments.ts" />

module Segmentation{
	
	class AskForSegmentsDirective {
		
		controller( $scope: ){
			
		}
		
		static getInstance(): angular.IDirective {
			return {
				scope: {
					
				},
				templateUrl: 'ask-for-segments.html',
				controller: controller
			};
		} 
	}
	
}