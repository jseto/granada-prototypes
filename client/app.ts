/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="segmentation/segment.ts" />

angular.module('app', [
	'segmentation'
])

.controller('appController', function( $scope ){
	$scope.segmentCandidates = [
		new segmentation.Segment('country', 'Pais'),
		new segmentation.SegmentBoolean('gender', 'Hombre'),
		new segmentation.SegmentDate('born', 'Fecha nacimiento')
	];
	
	var selected: segmentation.Segment;
	
	$scope.setSelected = function( value: segmentation.Segment ) {
		selected = value;
	}
	
	$scope.getSelected = function(){
		return selected;
	}
 	
});

