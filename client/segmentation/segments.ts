
module Segmentation {
	export enum SegmentType { grouped, opened_emails }
	
	export interface Grouped {
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
	
	export interface Followup {
		[ id: number ]: FollowupEmail;
	}
	
	export interface BroadcastEmail extends Email {
		sent_at: Date;
	}

	export interface Broadcast {
		[ id: number ]: BroadcastEmail;
	}
}