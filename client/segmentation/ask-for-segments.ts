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
		labels: string[];
		campaignId: number;
	};

	export interface IAskForSegmentScope extends angular.IScope, IAskForSegmentsConfig {
		segmentType: Segmentation.SegmentType;
		segmentTypeSelected: ()=>void;
		segmentSelected: ( segment: Segmentation.Segment )=>void;
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
			var selected: Segment;

			$scope.segmentCandidates = new Response();

			angular.extend( $scope, $scope.askForSegments );	// pass config to local scope

			$scope.groupedId = Segmentation.SegmentType.grouped;
			$scope.openedEmailsId = Segmentation.SegmentType.opened_emails;

			$scope.segmentTypeSelected = function(){
				selected = null;

				$scope.segmentCandidates = querySegments.get( $scope.segmentType, $scope.campaignId );
			}

			$scope.segmentSelected = function( segment: Segmentation.Segment ) {
				selected = segment;
				console.log( 'Selected segment', selected );
			}

			$scope.postSegment = function() {
				querySegments.post( selected, $scope.segmentType, $scope.campaignId );
			}

			$scope.labels = [];
			$scope.labels['followup'] = $scope.followupLabel;
			$scope.labels['broadcast'] = $scope.broadcastLabel;
		}
	}

	angular.module('segmentation.askFor',[
	])
	.directive( 'askForSegments', ()=> new AskForSegmentsDirective() );

}
