/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="segmentation/segments.ts" />
/// <reference path="segmentation/query-segments.ts" />
/// <reference path="segmentation/ask-for-segments.ts" />

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
	askForSegmentsConfig: Segmentation.IAskForSegmentsConfig;
}

angular.module('app', [
	'segmentation'
])

.controller('appController', function( $scope: IAppScope ){	

	$scope.askForSegmentsConfig = {
		groupedLabel: 'Grouped',
		openedEmailsLabel: 'Opened Emails',
		followupLabel: 'Followups',
		broadcastLabel: 'Broadcasts',
		postSegmentLabel: 'Enviar peticion de segmentación',
		campaignId: 40
	};
});

