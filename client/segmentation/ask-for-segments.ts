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
	
	interface IAskForSegmentScope extends angular.IScope, IAskForSegmentsConfig {
		segmentType: Segmentation.SegmentType;
		segmentTypeSelected: ()=>void;
		segmentSelected: ( Segmentation.Segment );
		groupedId: Segmentation.SegmentType;
		openedEmailsId: Segmentation.SegmentType;
		segmentCandidates: Segmentation.Response;
		postSegmentLabel: string;
		postSegment: ()=>void;
		config: IAskForSegmentsConfig;
		askForSegments: IAskForSegmentsConfig;
	}
	
	class AskForSegmentsDirective implements angular.IDirective{
		scope = {
			askForSegments: '='	
		};
		templateUrl = 'segmentation/ask-for-segments.html';
		controller = this.controllerFn;
		restrict = 'AC';
		
		private controllerFn( $scope: IAskForSegmentScope, querySegments: QuerySegments ){
			var selectedSegment: Segmentation.Segment;

			$scope.segmentCandidates = {
				promise: null
			};
				
			$scope.config = $scope.askForSegments;
			$scope.groupedId = Segmentation.SegmentType.grouped;
			$scope.openedEmailsId = Segmentation.SegmentType.opened_emails;
			
			$scope.segmentTypeSelected = function(){
				selectedSegment = null;
				
				querySegments.get( $scope.segmentType, $scope.config.campaignId )
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
		}
	}

	angular.module('segmentation.askFor',[
	])
	.directive( 'askForSegments', ()=> new AskForSegmentsDirective() );
	
}