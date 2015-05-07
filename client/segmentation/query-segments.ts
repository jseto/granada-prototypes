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
			this._http = $http;
			this._segmentEndPoint = segmentEndPoint;
			this._response = { promise: null };
		}
		
		get( segmentType: SegmentType, campaignId?: number ){
			this._segmentType = segmentType;
			
			this._response.promise = this._http({
				method: 'GET',
				url: this._segmentEndPoint,
				params: {
					campaign_id: campaignId,
					segment_type: SegmentType[segmentType]
				}
			}).success( ( data: RawResponse ) => {
				angular.extend( this._response, data );
			});	
			return this._response.promise;
		}
		
		post( segment: Segment ){
			this._http.post( this._segmentEndPoint, segment );
		}
		
		getSegmentCandidates(){
			return this._response;
		}
		
		segmentType() {
			return this._segmentType;
		}
		
		private _http: angular.IHttpService;
		private _segmentEndPoint: string;
		private _response: Response;
		private _segmentType: SegmentType;
	}

	angular.module('segmentation', [
	])
	.service( 'querySegments', QuerySegments )
	.constant( 'segmentEndPoint', '/segments' )
	;
}

