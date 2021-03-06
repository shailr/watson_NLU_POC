var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');
var mic = require('mic');


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

var mic_instance = mic({
  rate: '16000',
    channels: '1',
    debug: true,
    exitOnSilence: 6
});

var mic_input_stream = mic_instance.getAudioStream();

mic_input_stream.on('startComplete', function(event) { onMISEvent('Start Complete:', event); });
mic_input_stream.on('stopComplete', function(event) { onMISEvent('Stop Complete:', event); });
mic_input_stream.on('pauseComplete', function(event) { onMISEvent('Pause Complete:', event); });
mic_input_stream.on('resumeComplete', function(event) { onMISEvent('Resume Complete:', event); });
mic_input_stream.on('data', function(event) { onMISEvent('Data:', event); });
mic_input_stream.on('error', function(event) { onMISEvent('Error:', event); });
mic_input_stream.on('silence', function(event) { onMISEvent('Silence:', event); });
mic_input_stream.on('processExitComplete', function(event) { onMISEvent('Process Exit Complete:', event); });

// Displays events on the console.
function onMISEvent(name, event) {
  console.log(name);
};

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

mic_input_stream.pipe(recognizeStream);
//fs.createReadStream('audio-file.flac').pipe(recognizeStream);

recognizeStream.pipe(fs.createWriteStream('transcription.txt'));
recognizeStream.setEncoding('utf8');

recognizeStream.on('results', function(event) { onRSEvent('Results:', event); });
recognizeStream.on('data', function(event) { onRSEvent('Data:', event); });
recognizeStream.on('error', function(event) { onRSEvent('Error:', event); });
recognizeStream.on('close', function(event) { onRSEvent('Close:', event); });
recognizeStream.on('speaker_labels', function(event) { onRSEvent('Speaker_Labels:', event); });

// Displays events on the console.
function onRSEvent(name, event) {
  console.log(name, event);
};

mic_instance.start();
setTimeout(function() {
  mic_instance.stop();
}, 4000);
