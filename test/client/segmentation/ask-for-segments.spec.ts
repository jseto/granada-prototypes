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
		scope.config = config;
		scope.$digest();

		//lets grab the directive controller scope, so we can spy on internal directive methods
		controller = element.controller()
		directiveScope = <Segmentation.IAskForSegmentScope>( element.isolateScope() || element.scope() );

	});

	beforeEach(()=>{
		http.whenGET('/segments?campaign_id=40&segment_type=grouped').respond( fieldsObj );
		http.whenGET('/segments?campaign_id=40&segment_type=opened_emails').respond( emailsObj );
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
			spyOn( directiveScope, 'fieldSelected' ).and.callThrough();

			element.find('#__test_groupedRB')[0].click();
			http.flush();
		});

		it('sould show fields list', ()=>{
			expect( element.find('#__test_fields').children().length ).toBe( 4 );
			expect( element.find('#__test_followups').children().length ).toBe(0);
			expect( element.find('#__test_broadcasts').children().length ).toBe(0);
		});

		it('should show description',()=>{
			expect( element.find('#__test_fields').first().text().trim() ).toBe('Pais');
		});

		it('should select segment', ()=>{
			element.find('#__test_fields>a').first().click();

			expect( directiveScope.fieldSelected ).toHaveBeenCalled();
		});

		it('should post selected segment', ()=>{
			element.find('#__test_fields>a').first().click();
			http.expectPOST( '/segments', {"campaign_id":40,"segment_type":"grouped","option":{"field":"country"}}).respond({});
			element.find('button').click();
			http.flush();
		});

	});

	describe('when opened_emails selected',()=>{
		beforeEach(()=>{
			spyOn( directiveScope, 'followupSelected' ).and.callThrough();
			spyOn( directiveScope, 'broadcastSelected' ).and.callThrough();

			element.find('#__test_openedEmailRB')[0].click();
			http.flush();
		});

		it('sould show followups and broadcast list', ()=>{
			expect( element.find('#__test_fields').children().length ).toBe( 0 );
			expect( element.find('#__test_followups').children().length ).toBe(2);
			expect( element.find('#__test_broadcasts').children().length ).toBe(2);
		});

		it('should show description',()=>{
			expect( element.find('#__test_followups>li').first().text().trim() ).toBe('#25 - Esto es un email');
			expect( element.find('#__test_broadcasts>li').first().text().trim() ).toBe('#12 - Esto es un broadcast email');
		});

		describe('when followup selected', ()=>{
			it('should select followup segment', ()=>{
				element.find('#__test_followups').find('a').first().click();

				expect( directiveScope.followupSelected ).toHaveBeenCalled();
			});

			it('should post selected segment', ()=>{
				element.find('#__test_followups').find('a').first().click();
				http.expectPOST( '/segments', {"campaign_id":40,"segment_type":"opened_emails","option":{"followup":"25"}}).respond({});
				element.find('button').click();
				http.flush();
			});
		});

		describe('when broadcast selected', ()=>{
			it('should select broadcast segment', ()=>{
				element.find('#__test_broadcasts').find('a').first().click();

				expect( directiveScope.broadcastSelected ).toHaveBeenCalled();
			});

			it('should post selected segment', ()=>{
				element.find('#__test_broadcasts').find('a').first().click();
				http.expectPOST( '/segments', {"campaign_id":40,"segment_type":"opened_emails","option":{"broadcast":"12"}}).respond({});
				element.find('button').click();
				http.flush();
			});
		});
	});
});
