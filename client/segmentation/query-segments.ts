/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="segments.ts" />


module Segmentation {
	interface RawResponse {
		fields?: any;
		followups?: any;
		broadcasts?: any;
	}
	
	export interface Response {
		fields?: Grouped[];
		followups?: Followup[];
		broadcasts?: Broadcast[];
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
				switch( segmentType ) {
					case SegmentType.grouped:
						this.response.fields = this.groupedFromJSON( data.fields );
						break;
					case SegmentType.opened_emails:
						this.response.broadcasts = this.broadcastsFromJSON( data.broadcasts );
						this.response.followups = this.followupsFromJSON( data.followups );
						break;
				}
			});	
		}
		
		getSegmentCandidates(){
			return this.response;
		}
		
		private groupedFromJSON( obj: any ) {
			var fields: Grouped[] = [];
			
			for( var key in obj ){
				fields.push({
					type: key,
					description: obj[ key ].description
				})		
			}	
			return fields;
		}

		private broadcastsFromJSON( obj: any ) {
			var broadcasts: Broadcast[] = [];
			
			for( var key in obj ){
				broadcasts.push({
					id: key,
					description: obj[ key ].description,
					subject: obj[ key ].subject,
					sentAt: obj[ key ].sentAt
				})		
			}	
			return broadcasts;
		}

		private followupsFromJSON( obj: any ) {
			var followups: Followup[] = [];
			
			for( var key in obj ){
				followups.push({
					id: key,
					description: obj[ key ].description,
					subject: obj[ key ].subject,
					campaignId: obj[ key ].campaign_id,
					position: obj[ key ].position
				})		
			}	
			return followups;
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

