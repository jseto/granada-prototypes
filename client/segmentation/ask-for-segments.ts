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
		fieldSelected: ( key: string, segment: Segmentation.Segment )=>void;
		broadcastSelected: ( key: string, segment: Segmentation.Segment )=>void;
		followupSelected: ( key: string, segment: Segmentation.Segment )=>void;
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
		templateUrl = 'client/segmentation/ask-for-segments.html';
		controller = this.controllerFn;
		restrict = 'AC';
		
		private controllerFn( $scope: IAskForSegmentScope, querySegments: QuerySegments ){
			var selected: PostObject;

			$scope.segmentCandidates = {
				promise: null
			};
			
			angular.extend( $scope, $scope.askForSegments );	// pass config to local scope

			$scope.groupedId = Segmentation.SegmentType.grouped;
			$scope.openedEmailsId = Segmentation.SegmentType.opened_emails;
			
			$scope.segmentTypeSelected = function(){
				selected = null;
				
				querySegments.get( $scope.segmentType, $scope.campaignId )
					.then(()=>{
						$scope.segmentCandidates = querySegments.getSegmentCandidates();
					});
			}
			
			$scope.fieldSelected = function( key: string, segment: Segmentation.Segment ) {
				selected = {
					key: key,
					option: 'field',
					segment: segment
				};
				console.log( selected );
			}

			$scope.broadcastSelected = function( key: string, segment: Segmentation.Segment ) {
				selected = {
					key: key,
					option: 'broadcast',
					segment: segment
				};
				console.log( selected );
			}
			$scope.followupSelected = function( key: string, segment: Segmentation.Segment ) {
				selected = {
					key: key,
					option: 'followup',
					segment: segment
				};
				console.log( selected );
			}
			
			$scope.postSegment = function() {
				querySegments.post( selected, $scope.segmentType, $scope.campaignId );
			}
		}
	}

	angular.module('segmentation.askFor',[
	])
	.directive( 'askForSegments', ()=> new AskForSegmentsDirective() );
	
}