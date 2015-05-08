/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../client/segmentation/ask-for-segments.ts" />


interface CustomScope extends angular.IScope {
	campaign: number;	
	config: Segmentation.IAskForSegmentsConfig;
}

describe( 'Directive askForSegments', ()=>{
	var $compile: angular.ICompileService;
	var scope: CustomScope;
	
	var config: Segmentation.IAskForSegmentsConfig = {
		campaignId: 40,
	};
	 
	var html = '<div ask-for-segments="config"></div>';
	var element: angular.IAugmentedJQuery;

	beforeEach(()=>{
		angular.mock.module('segmentation');
	});	

	// load the templates
	beforeEach( angular.mock.module( 'client/segmentation/ask-for-segments.html') );
	
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
				scope.config = config;
			});
//			element.find('#groupedId').click();
		});
		
		it('sould show fields list', ()=>{
			console.log('+++++++++++', element.find('div').find('input')[0])
		})
		
	});
});