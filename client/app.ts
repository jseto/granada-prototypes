/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="segmentation/segments.ts" />
/// <reference path="segmentation/query-segments.ts" />

interface IAppScope extends angular.IScope {
	segmentType: Segmentation.SegmentType;
	segmentTypeSelected: ()=>void;
	segmentSelected: ( Segmentation.Segment );
	groupedId: Segmentation.SegmentType;
	groupedLabel: string;
	openedEmailsId: Segmentation.SegmentType;
	openedEmailsLabel: string;
	followupLabel: string;
	broadcastLabel: string;
	segmentCandidates: Segmentation.Response;
	postSegmentLabel: string;
	postSegment: ()=>void;
	campaignId: number;
}

angular.module('app', [
	'segmentation'
])

.controller('appController', function( $scope: IAppScope, querySegments: Segmentation.QuerySegments ){	
	$scope.campaignId = 40;


	$scope.segmentCandidates = {
		promise: null
	};
	
	$scope.groupedLabel = 'Grouped';
	$scope.openedEmailsLabel = 'Opened Emails';
	$scope.followupLabel = 'Followups';
	$scope.broadcastLabel = 'Broadcasts';
	$scope.postSegmentLabel = 'Enviar peticion de segmentación';

	$scope.groupedId = Segmentation.SegmentType.grouped;
	$scope.openedEmailsId = Segmentation.SegmentType.opened_emails;
	
	var selectedSegment: Segmentation.Segment;
	
	$scope.segmentTypeSelected = function(){
		selectedSegment = null;
		
		querySegments.get( $scope.segmentType, $scope.campaignId )
			.then(()=>{
				$scope.segmentCandidates = querySegments.getSegmentCandidates();
			});
	}
	
	$scope.segmentSelected = function( segment: Segmentation.Segment ) {
		console.log( segment );
		selectedSegment = segment;
	}
	
	$scope.postSegment = function() {
		console.log( selectedSegment );
		
		querySegments.post( selectedSegment );
	}
});

