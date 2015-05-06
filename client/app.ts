/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="segmentation/segments.ts" />
/// <reference path="segmentation/query-segments.ts" />

interface IAppScope extends angular.IScope {
	segmentType: Segmentation.SegmentType;
	segmentTypeSelected: ()=>void;
	groupedId: Segmentation.SegmentType;
	groupedLabel: string;
	openedEmailsId: Segmentation.SegmentType;
	openedEmailsLabel: string;
}

angular.module('app', [
	'segmentation'
])

.controller('appController', function( $scope: IAppScope, querySegments: Segmentation.QuerySegments ){	

	$scope.groupedLabel = 'Grouped';
	$scope.openedEmailsLabel = 'Opened Emails';

	$scope.groupedId = Segmentation.SegmentType.grouped;
	$scope.openedEmailsId = Segmentation.SegmentType.opened_emails;
	
	$scope.segmentTypeSelected = function(){
		querySegments
			.get( $scope.segmentType )
			.then(( data )=>{
				fillSegmentCandidates( data );
			});
	}
	
	function fillSegmentCandidates( data ) {
		
	}
});

