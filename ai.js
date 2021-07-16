// the link to your model provided by Teachable Machine export panel
const URL = 'https://teachablemachine.withgoogle.com/models/tXFOt5O3p/';

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
	const modelURL = URL + 'model.json';
	const metadataURL = URL + 'metadata.json';

	// load the model and metadata
	// Refer to tmImage.loadFromFiles() in the API to support files from a file picker
	// or files from your local hard drive
	// Note: the pose library adds "tmImage" object to your window (window.tmImage)
	model = await tmImage.load(modelURL, metadataURL);
	maxPredictions = model.getTotalClasses();

	// append elements to the DOM
	labelContainer = document.getElementById('label-container');
	for (let i = 0; i < maxPredictions; i++) {
		// and class labels
		labelContainer.appendChild(document.createElement('div'));
	}
}

// run the webcam image through the image model
async function predict() {
	// predict can take in an image, video or canvas html element
	let image = document.getElementById('face-image');
	const prediction = await model.predict(image, false);
	prediction.sort(
		(a, b) => parseFloat(b.probability) - parseFloat(a.probability)
	);
	console.log(prediction[0].className);
	let resultMessage;
	switch (prediction[0].className) {
		case 'RM':
			resultMessage = 'RM';
			break;
		case 'J-Hope':
			resultMessage = 'J-Hope';
			break;
		case 'V':
			resultMessage = 'V';
			break;
		case 'Jungkook':
			resultMessage = 'Jungkook';
			break;
		case 'Suga':
			resultMessage = 'Suga';
			break;
		case 'Jin':
			resultMessage = 'Jin';
			break;
		case 'Jimin':
			resultMessage = 'Jimin';
			break;
		default:
			resultMessage = 'error';
	}
	$('.result-message').html(resultMessage);
	for (let i = 0; i < maxPredictions; i++) {
		const classPrediction =
			prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
		labelContainer.childNodes[i].innerHTML = classPrediction;
	}
}
