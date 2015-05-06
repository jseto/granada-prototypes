/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />

interface CustomScope extends angular.IScope {
	campaign: number;	
}

describe( 'Directive askForSegments', ()=>{
	var $compile: angular.ICompileService;
	var scope: CustomScope;
	 
	var html = '<ask-for-segments campaign="getCampaing"></ask-for-segments>';
	var element: angular.IAugmentedJQuery;

	beforeEach(()=>{
		angular.mock.module('segmentation');
	});	
	
	beforeEach( angular.mock.inject( ( _$compile_, _$rootScope_ )=>{
		$compile = _$compile_;
		scope = _$rootScope_;
	}));

	beforeEach(()=>{
		element = $compile( html )( scope );
	});
	
	describe('when grouped selected',()=>{
		beforeEach(()=>{
			scope.$apply(()=>{
				
			});
		});
		
	});
});