/// <reference path="../../typings/angularjs/angular.d.ts" />

module segmentation {
	interface ITemplateFn {
		( element: angular.IAugmentedJQuery, attr: angular.IAttributes ): string;
	}
	
	export class Segment {
		constructor( kind: string, description: string, displayName?: string ) {
			if ( !kind || !description ) throw "Segment: kind and description required";
			
			this._kind = kind;
			this._description = description;
			this._displayName = displayName || description;
		}
		
		htmlTemplate(){
			return '<input />';
		}
		
		get kind(): string { return this._kind; }
		get description(): string { return this._description; }
		get displayName(): string { return this._displayName; }

		private _kind: string;
		private _description: string;
		private _displayName: string;
	}
	
	export class SegmentBoolean extends Segment {
		htmlTemplate(){
			return '<input type="checkbox" />';
		}
	}
	
	export class SegmentDate extends Segment {
		htmlTemplate(){
			return '<input placeholder="calendar" />';
		}
	}
} 