
module Segmentation {
	export enum SegmentType { grouped, opened_emails }
	
	export interface Grouped {
		type: string;
		description: string;
	}
	
	export interface Email {
		id: number;
		description: string;
		subject: string;	
	}
	
	export interface Followup extends Email {
		campaignId: number;
		position: number;
	}
	
	export interface Broadcast extends Email {
		sentAt: Date;
	}
}