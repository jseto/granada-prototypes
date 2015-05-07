
module Segmentation {
	export enum SegmentType { grouped, opened_emails }
	
	export interface Segment {}
	
	export interface Grouped extends Segment {
		[field: string]: {	description: string; };
	}
	
	export interface Email {
		description: string;
		subject: string;	
	}
	
	export interface FollowupEmail extends Email {
		campaign_id: number;
		position: number;
	}
	
	export interface Followup extends Segment {
		[ id: number ]: FollowupEmail;
	}
	
	export interface BroadcastEmail extends Email {
		sent_at: Date;
	}

	export interface Broadcast extends Segment {
		[ id: number ]: BroadcastEmail;
	}
}