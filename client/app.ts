/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="segmentation/segment.ts" />

interface IAppScope extends angular.IScope {
	segmentCandidates: segmentation.Segment[];
	setSelected: ( value: segmentation.Segment ) => void;
	getSelected: () => segmentation.Segment;
}

angular.module('app', [
	'segmentation'
])

.controller('appController', function( $scope: IAppScope ){
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

