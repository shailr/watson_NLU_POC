//setting API usenname and password

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': '43ae17d3-bbbc-4189-86a8-5ea495038924',
    'password': 'P2QVUeioQlJR',
    'version_date': '2017-02-27'
});



//setting up the request
var parameters = {
    'text': 'Testing check shail is an expert',
    'features': {
        'entities': {
            'emotion': true,
            'sentiment': true,
            'limit': 2
        },
        'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 2
        }
    }
}


natural_language_understanding.analyze(parameters, function(err, response) {
    if (err)
        console.log('error:', err);
    else
        console.log(JSON.stringify(response, null, 2));
});

