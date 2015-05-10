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

	var fields: Segmentation.Grouped

	beforeEach(()=>{
		angular.mock.module('segmentation');
	});

	beforeEach( angular.mock.inject(( $httpBackend, _segmentEndPoint_, _querySegments_ ) => {
		http = $httpBackend;
		segmentEndPoint = _segmentEndPoint_;
		querySegments = _querySegments_;
	}));

	afterEach(()=>{
		http.verifyNoOutstandingExpectation();
		http.verifyNoOutstandingRequest();
	});

	describe('when grouped query', function() {

		beforeEach(()=>{
			http.expectGET(  segmentEndPoint + '?segment_type=grouped' ).respond( fieldsObj );
			querySegments.get( Segmentation.SegmentType.grouped );
			http.flush();
		});

		it('should report a collection of segment fields', function() {
			expect( querySegments.getSegmentCandidates().fields.length ).not.toBe( 0 );
			expect( querySegments.getSegmentCandidates().followups.length ).toBe( 0 );
			expect( querySegments.getSegmentCandidates().broadcasts.length ).toBe( 0 );

			expect( querySegments.getSegmentCandidates().fields[0].value.description ).toBe( 'Pais' );
		});

		it('sould report segement type as grouped', function() {
			expect( querySegments.segmentType() ).toBe( Segmentation.SegmentType.grouped );
		});
	});

	describe('when opened_emails query', function() {

		beforeEach(()=>{
			http.expectGET(  segmentEndPoint + '?segment_type=opened_emails' ).respond( emailsObj );
			querySegments.get( Segmentation.SegmentType.opened_emails );
			http.flush();
		});

		it('should report a collection of segment emails', function() {
			expect( querySegments.getSegmentCandidates().fields.length ).toBe( 0 );
			expect( querySegments.getSegmentCandidates().followups.length ).not.toBe( 0 );
			expect( querySegments.getSegmentCandidates().broadcasts.length ).not.toBe( 0 );

			// expect( querySegments.getSegmentCandidates().followups[ 25 ].position ).toBe( 1 );
			// expect( querySegments.getSegmentCandidates().broadcasts[ 12 ].sent_at ).toBe( '2015-02-02 00:00:00' );
		});

		it('sould report segement type as opened_emails', function() {
			expect( querySegments.segmentType() ).toBe( Segmentation.SegmentType.opened_emails );
		});
	});

	describe('when chained calls',()=>{

		beforeEach(()=>{
			http.whenGET(  segmentEndPoint + '?segment_type=grouped' ).respond( fieldsObj );
			http.whenGET(  segmentEndPoint + '?segment_type=opened_emails' ).respond( emailsObj );
		});

		it('sould clear completed previous data', ()=>{
			querySegments.get( Segmentation.SegmentType.grouped );
			http.flush();
			querySegments.get( Segmentation.SegmentType.opened_emails );
			http.flush();

			expect( querySegments.getSegmentCandidates().fields.length ).toBe(0);
		});

	});

	describe('when post', function(){
		it('should post grouped to server', function() {
			http.expectPOST( segmentEndPoint, {
				campaign_id: 40,
				segment_type: 'grouped',
				option:  {
					field: 'country'
				}
			}).respond({});

			querySegments.post({
				key: 'country',
				option: 'field',
				value: {
					description: 'I have nothing to declare'
				}
			}, Segmentation.SegmentType.grouped, 40 );
			http.flush();
		});

		it('should post broadcast to server', function() {
			http.expectPOST( segmentEndPoint, {
				campaign_id: 40,
				segment_type: 'opened_emails',
				option:  {
					broadcast: 12
				}
			}).respond({});

			querySegments.post({
				key: 12,
				option: 'broadcast',
				value: {
					description: 'I have nothing to declare'
				}
			}, Segmentation.SegmentType.opened_emails, 40 );
			http.flush();
		});

		it('should post grouped to server', function() {
			http.expectPOST( segmentEndPoint, {
				campaign_id: 40,
				segment_type: 'opened_emails',
				option:  {
					followup: 25
				}
			}).respond({});

			querySegments.post({
				key: 25,
				option: 'followup',
				value: {
					description: 'I have nothing to declare'
				}
			}, Segmentation.SegmentType.opened_emails, 40 );
			http.flush();
		});
	})
});
