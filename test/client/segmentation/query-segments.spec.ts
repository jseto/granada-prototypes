/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../client/segmentation/segments.ts" />
/// <reference path="../../../client/segmentation/query-segments.ts" />

describe('Query segments service', function() {
	var http: angular.IHttpBackendService;
	var segmentEndPoint: string;
	var querySegments: Segmentation.QuerySegments;
	
	var fieldsObj = {
        'fields': {
            'country': {'description': 'Pais'},
            'province': {'description':'Provincia'},
            'region': {'description':'Cdad. Autonoma'},
            'company_type': {'description':'Tipo de empresa'}
        }
	};
	
	var fields: Segmentation.Grouped

	beforeEach(()=>{
		angular.mock.module('segmentation');		
	});
	
	beforeEach( angular.mock.inject( function( $httpBackend, _segmentEndPoint_, _querySegments_ ){
		http = $httpBackend;
		segmentEndPoint = _segmentEndPoint_;
		querySegments = _querySegments_;
	}));

	afterEach(()=>{
		http.verifyNoOutstandingExpectation();
		http.verifyNoOutstandingRequest();	
	});
	
	describe('when grouped query', function() {

		it('should report a collection of segment fields', function() {
			http.expectGET(  segmentEndPoint + '?segment_type=grouped' ).respond( fieldsObj );
			querySegments.get( Segmentation.SegmentType.grouped );
			http.flush();
			
			expect( querySegments.getSegmentCandidates().fields ).toBeDefined();
			expect( querySegments.getSegmentCandidates().followups ).not.toBeDefined();
			expect( querySegments.getSegmentCandidates().broadcasts ).not.toBeDefined();
		});

	});

	describe('when opened_emails query', function() {

		it('should report a collection of segment emails', function() {

		});

	});
});

