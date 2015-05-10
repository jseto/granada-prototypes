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
	var controller: angular.IControllerService;
	var directiveScope: Segmentation.IAskForSegmentScope;
	var http: angular.IHttpBackendService;

	var config: Segmentation.IAskForSegmentsConfig = {
		campaignId: 40,
	};

	var html = '<div ask-for-segments="config" template="client/segmentation/ask-for-segments.html"></div>';
//	var html = '<div ask-for-segments="config"></div>';
	var element: angular.IAugmentedJQuery;


	var fieldsObj = {
        'fields': {
            'country': {'description': 'Pais'},
            'province': {'description':'Provincia'},
            'region': {'description':'Cdad. Autonoma'},
            'company_type': {'description':'Tipo de empresa'}
        }
	};

	var emailsObj = {
		'followups': {
			25: {campaign_id: 40, subject: 'Esto es un email', description:'#25 - Esto es un email', position: 1 },
			30: {campaign_id: 40, subject: 'Esto es otro email', description:'#30 - Esto es otro email', position: 2 }
		},
		'broadcasts': {
			12: {subject: 'Esto es un broadcast email', description:'#12 - Esto es un broadcast email', sent_at: '2015-02-02 00:00:00'},
			14: {subject: 'Esto es un broadcast email mas', description:'#14 - Esto es un broadcast emailmas', sent_at: '2015-02-01 00:00:00'},
		}
	}


	beforeEach(()=>{
		angular.mock.module('segmentation');
	});

	// load the templates
	beforeEach( angular.mock.module( 'client/segmentation/ask-for-segments.html') );

	beforeEach( angular.mock.inject( ( _$compile_, _$rootScope_, _$httpBackend_ )=>{
		$compile = _$compile_;
		scope = _$rootScope_.$new();
		http = _$httpBackend_;
	}));

	beforeEach(()=>{
		element = $compile( html )( scope );
		scope.$digest();

		//lets grab the directive controller scope, so we can spy on internal directive methods
		controller = element.controller()
		directiveScope = <Segmentation.IAskForSegmentScope>( element.isolateScope() || element.scope() );

	});

	beforeEach(()=>{
		http.whenGET('/segments?campaign_id=40&segment_type=grouped').respond( fieldsObj );
		http.whenGET('/segments?segment_type=grouped').respond( fieldsObj );
	});

	it('should show only segement type selector',()=>{
		expect( element.find('#__test_fields').children().length ).toBe(0);
		expect( element.find('#__test_followups').children().length ).toBe(0);
		expect( element.find('#__test_broadcasts').children().length ).toBe(0);
	});

	afterEach(()=>{
		http.verifyNoOutstandingExpectation();
		http.verifyNoOutstandingRequest();
	});

	describe('when grouped selected',()=>{
		beforeEach(()=>{
			scope.$apply(()=>{
				scope.config = config;
			});

			spyOn( directiveScope, 'fieldSelected' ).and.callThrough();

			element.find('#__test_groupedRB')[0].click();
			http.flush();
		});

		it('sould show fields list', ()=>{
			expect( element.find('#__test_fields').children().length ).toBe( 4 );
			expect( element.find('#__test_followups').children().length ).toBe(0);
			expect( element.find('#__test_broadcasts').children().length ).toBe(0);
		});

		it('should select segment', ()=>{
			element.find('#__test_fields>a').first().click();

			expect( directiveScope.fieldSelected ).toHaveBeenCalled();
		});

		it('should post selected segment', ()=>{
			element.find('#__test_fields>a').first().click();
			http.expectPOST( '/segments', {"segment_type":"grouped","option":{"field":"company_type"}}).respond({});
			element.find('button').click();
			http.flush();
		});

	});
});
