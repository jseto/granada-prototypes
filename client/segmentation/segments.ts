/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../utils/class-helpers" />


module Segmentation {
	angular.module('segmentation',[
		'segmentation.query',
		'segmentation.askFor'
	]);

//	var segmentationNgModule = angular.module('segmentation');
//	export class SegmentationModule extends ClassHelpers.Singleton {
//		constructor( module: string ) {
//			super();
//			SegmentationModule._module = angular.module('segmentation',[]);
//		};
//		private static _module: angular.IModule;
//	};

	export enum SegmentType { grouped, opened_emails }

	export interface BackEndSegment {
		description: string;
	}

	export interface Grouped {
		[field: string]: BackEndSegment;
	}

	export interface Email extends BackEndSegment{
		description: string;
		subject: string;
	}

	export interface FollowupEmail extends Email {
		campaign_id: number;
		position: number;
	}

	export interface Followup extends BackEndSegment {
		[ id: number ]: FollowupEmail;
	}

	export interface BroadcastEmail extends Email {
		sent_at: Date;
	}

	export interface Broadcast extends BackEndSegment {
		[ id: number ]: BroadcastEmail;
	}

	export interface Segment {
		campaign_id?: number;
		key: any;
		option: string;
		value: BackEndSegment;
	}
}
