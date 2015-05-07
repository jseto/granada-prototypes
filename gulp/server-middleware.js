var urlParser = require('url').parse;
	
module.exports = segmentsRoute;

function segmentsRoute( req, res, next ) {
	var urlFields = urlParser( req.url, true );
	
	if ( urlFields.pathname === '/segments' ){

		if ( urlFields.query.segment_type === 'grouped') {
			return res.end(
				[
					'{',
					'	"fields": {',
					'		"country": {"description": "Pais"},',
					'		"province": {"description":"Provincia"},',
					'		"region": {"description":"Cdad. Autonoma"},',
					'		"company_type": {"description":"Tipo de empresa"}',
					'	}',
					'}'
				].join('\n')				
			);
		}

		if ( urlFields.query.segment_type === 'opened_emails' && urlFields.query.campaign_id === '40' ) {
			return res.end(
				[
					'{',
					'	"followups": {',
					'		"25": {"campaign_id": 40, "subject": "Esto es un email", "description":"#25 - Esto es un email", "position": 1 },',
					'		"30": {"campaign_id": 40, "subject": "Esto es otro email", "description":"#30 - Esto es otro email", "position": 2 }',
					'	},',
					'	"broadcasts": {',
					'		"12": {"subject": "Esto es un broadcast email", "description":"#12 - Esto es un broadcast email", "sent_at": "2015-02-02 00:00:00"},',
					'		"14": {"subject": "Esto es un broadcast email mas", "description":"#14 - Esto es un broadcast emailmas", "sent_at": "2015-02-02 00:00:00"}',
					'	} ',
					'}'
				].join('\n')
			);
		}
	}
	
	next();
}
