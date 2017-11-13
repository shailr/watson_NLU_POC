var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');
// var getUserMedia = require('get-user-media-promise');
// var MicrophoneStream = require('microphone-stream');


var speech_to_text = new SpeechToTextV1 ({
  username: 'd729122a-d68c-4cd2-bf79-fb44733ce118',
  password: 'RD3FlRJ3h5O2'
});
speech_to_text.getModels(null, function(error, models) {
  if (error) {
    console.log('Error:', error);
  } else {
    //console.log(JSON.stringify(models, null, 2));
  }
});

// var micStream = new MicrophoneStream();
// getUserMedia({ video: false, audio: true }).then(function(stream) {
//   micStream.setStream(stream);
// }).catch(function(error) {
//   console.log(error);
// });



var params = {
  model: 'en-US_BroadbandModel',
  content_type: 'audio/flac',
  'inactivity_timeout': -1,
  'interim_results': true,
  'max_alternatives': 3,
  'word_confidence': false,
  timestamps: false,
  // keywords: [],
  // 'keywords_threshold': 0.5
};

var recognizeStream = speech_to_text.createRecognizeStream(params);

// micStream.pipe(recognizeStream);
fs.createReadStream('audio-file.flac').pipe(recognizeStream);

recognizeStream.pipe(fs.createWriteStream('transcription.txt'));
recognizeStream.setEncoding('utf8');

recognizeStream.on('results', function(event) { onEvent('Results:', event); });
recognizeStream.on('data', function(event) { onEvent('Data:', event); });
recognizeStream.on('error', function(event) { onEvent('Error:', event); });
recognizeStream.on('close', function(event) { onEvent('Close:', event); });
recognizeStream.on('speaker_labels', function(event) { onEvent('Speaker_Labels:', event); });

// Displays events on the console.
function onEvent(name, event) {
  console.log(name, event);
};

// setTimeout(function() {}, 4000);
