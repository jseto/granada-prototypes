/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="segments.ts" />


module Segmentation {
	export interface RawResponse {
		fields?: Grouped;
		followups?: Followup;
		broadcasts?: Broadcast;
	}
	
	export interface Response extends RawResponse {
		promise: angular.IPromise<Response>;
	}
	
	export class QuerySegments {
		constructor( $http: angular.IHttpService, segmentEndPoint: string ) {
			this.http = $http;
			this.segmentEndPoint = segmentEndPoint;
			this.response = { promise: null };
		}
		
		get( segmentType: SegmentType, campaignId?: number ){
			this.response.promise = this.http({
				method: 'GET',
				url: this.segmentEndPoint,
				params: {
					campaign_id: campaignId,
					segment_type: SegmentType[segmentType]
				}
			}).success( ( data: RawResponse ) => {
				angular.extend( this.response, data );
			});	
		}
		
		getSegmentCandidates(){
			return this.response;
		}
		
		private http: angular.IHttpService;
		private segmentEndPoint: string;
		private response: Response;
	}

	angular.module('segmentation', [
	])
	.service( 'querySegments', QuerySegments )
	.constant( 'segmentEndPoint', 'mock-data/segments.json' )
	;
}

