/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="segments.ts" />
/// <reference path="query-segments.ts" />

module Segmentation{

	export interface IAskForSegmentsConfig {
		groupedLabel?: string;
		openedEmailsLabel?: string;
		followupLabel?: string;
		broadcastLabel?: string;
		postSegmentLabel?: string;
		campaignId: number;
	};

	export interface IAskForSegmentScope extends angular.IScope, IAskForSegmentsConfig {
		segmentType: Segmentation.SegmentType;
		segmentTypeSelected: ()=>void;
		segmentSelected: ( segment: Segmentation.Segment )=>void;
		getOptionLabels: ( option: string ) => string;
		selectedSegment: Segmentation.Segment;
		groupedId: Segmentation.SegmentType;
		openedEmailsId: Segmentation.SegmentType;
		segmentCandidates: Segmentation.Response;
		postSegmentLabel: string;
		postSegment: ()=>void;
		askForSegments: IAskForSegmentsConfig;
	}

	class AskForSegmentsDirective implements angular.IDirective{
		scope = {
			askForSegments: '='
		};
		templateUrl = function(element, attr ){
			return attr.template || 'segmentation/ask-for-segments.html';
		};
		controller = this.controllerFn;
		restrict = 'AC';

		private controllerFn( $scope: IAskForSegmentScope, querySegments: QuerySegments ){

			$scope.segmentCandidates = new Response();

			angular.extend( $scope, $scope.askForSegments );	// pass config to local scope

			$scope.groupedId = Segmentation.SegmentType.grouped;
			$scope.openedEmailsId = Segmentation.SegmentType.opened_emails;

			$scope.segmentTypeSelected = function(){
				$scope.selectedSegment = null;

				$scope.segmentCandidates = querySegments.get( $scope.segmentType, $scope.campaignId );
			}

			$scope.segmentSelected = function( segment: Segmentation.Segment ) {
				$scope.selectedSegment = segment;
				console.log( 'Selected segment', $scope.selectedSegment );
			}

			$scope.postSegment = function() {
				querySegments.post( $scope.selectedSegment, $scope.segmentType, $scope.campaignId );
			}

			$scope.getOptionLabels = function( option: string ){
				switch( option ){
					case 'followup':
						return $scope.followupLabel;
					case 'broadcast':
						return $scope.broadcastLabel;
				};
			}
		}
	}

	angular.module('segmentation.askFor',[
	])
	.directive( 'askForSegments', ()=> new AskForSegmentsDirective() );

}
