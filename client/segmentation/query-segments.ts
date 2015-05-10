/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="segments.ts" />


module Segmentation {
	export interface RawResponse {
		fields?: Grouped;
		followups?: Followup;
		broadcasts?: Broadcast;
	}

	export class Response {
		fields: Segment[];
		followups: Segment[];
		broadcasts: Segment[];
		promise: angular.IPromise<Response>;
	}

	export class QuerySegments {
		constructor( $http: angular.IHttpService, segmentEndPoint: string ) {
			this._http = $http;
			this._segmentEndPoint = segmentEndPoint;
		}

		get( segmentType: SegmentType, campaignId?: number ){
			this._response = new Response();
			this._segmentType = segmentType;

			this._response.promise = this._http({
				method: 'GET',
				url: this._segmentEndPoint,
				params: {
					campaign_id: campaignId,
					segment_type: SegmentType[segmentType]
				}
			}).success( ( data: RawResponse ) => {
				this._response.fields = [];
				this._response.followups = [];
				this._response.broadcasts = [];

				angular.forEach( data.fields, (value, key)=>{
					this._response.fields.push( angular.extend( value, {
						key: key,
						option: 'field'
					}));
				});

				angular.forEach( data.followups, (value, key)=>{
					this._response.followups.push( angular.extend( value, {
						key: key,
						option: 'followup'
					}));
				});

				angular.forEach( data.broadcasts, (value, key)=>{
					this._response.broadcasts.push( angular.extend( value, {
						key: key,
						option: 'broadcast'
					}));
				});

			});
			return this._response;
		}

		post( obj: Segment, segmentType: SegmentType, campaignId: number ){
			var data = {
				campaign_id: campaignId,
				segment_type: SegmentType[ segmentType ],
				option: {}
			};
			data.option[ obj.option ] = obj.key;

			console.log( 'Post data: ', data );
			this._http.post( this._segmentEndPoint, data);
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

	angular.module('segmentation.query',[
	])
	.service( 'querySegments', QuerySegments )
	.constant( 'segmentEndPoint', '/segments' )
	;
}
