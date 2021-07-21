// the link to your model provided by Teachable Machine export panel
const URL = 'https://teachablemachine.withgoogle.com/models/_Dy9h-10f/';

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
		let element = document.createElement('div');
		element.classList.add('d-flex');
		labelContainer.appendChild(element);
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
	let resultTitle, resultExplain;
	switch (prediction[0].className) {
		case 'RM':
			resultTitle = 'Kim Namjoon';
			resultExplain = 'You are charming and charismatic like the leader, RM.';
			break;
		case 'J-Hope':
			resultTitle = 'Jung Hoseok';
			resultExplain = 'You shine bright like the real life angel, J-Hope ';
			break;
		case 'V':
			resultTitle = 'Kim Taehyung';
			resultExplain = 'You look like a unique piece of art like V';
			break;
		case 'Jungkook':
			resultTitle = 'Jeon Jeongguk';
			resultExplain = 'You are adorable like the golden maknae, Jungkook';
			break;
		case 'Suga':
			resultTitle = 'Min Yoongi';
			resultExplain = 'You look cool and creative like the producer Suga';
			break;
		case 'Jin':
			resultTitle = 'Kim Seokjin';
			resultExplain = 'You look amazing like "Mr World Handsome" Jin ';
			break;
		case 'Jimin':
			resultTitle = 'Park Jimin';
			resultExplain = 'You look kind and sexy at the same time like Jimin';
			break;
		default:
			resultTitle = 'error';
			resultExplain = 'error';
	}
	let title =
		"<div class='" +
		prediction[0].className +
		"-bts-title'>" +
		resultTitle +
		'</div>';
	let explain = "<div class='bts-explain pt-2'>" + resultExplain + '</div>';
	$('.result-message').html(title + explain);
	let barWidth;
	for (let i = 0; i < maxPredictions; i++) {
		if (prediction[i].probability.toFixed(2) > 0.1) {
			barWidth = Math.round(prediction[i].probability.toFixed(2) * 100) + '%';
		} else if (prediction[i].probability.toFixed(2) >= 0.01) {
			barWidth = '4%';
		} else {
			barWidth = '2%';
		}
		let labelTitle;
		switch (prediction[i].className) {
			case 'RM':
				labelTitle = 'RM';
				break;
			case 'J-Hope':
				labelTitle = 'J-Hope';
				break;
			case 'Suga':
				labelTitle = 'Suga';
				break;
			case 'Jin':
				labelTitle = 'Jin';
				break;
			case 'Jimin':
				labelTitle = 'Jimin';
				break;
			case 'V':
				labelTitle = 'V';
				break;
			case 'Jungkook':
				labelTitle = 'Jungkook';
				break;
			default:
				labelTitle = 'Error';
		}
		let label =
			"<div class='bts-label d-flex align-items-center'>" +
			labelTitle +
			'</div>';
		let bar =
			"<div class='bar-container position-relative container'><div class='" +
			prediction[i].className +
			"-box'></div><div class='d-flex justify-content-center align-items-center " +
			prediction[i].className +
			"-bar' style='width: " +
			barWidth +
			"'><span class='d-block percent-text'>" +
			Math.round(prediction[i].probability.toFixed(2) * 100) +
			'%</span></div></div>';
		labelContainer.childNodes[i].innerHTML = label + bar;
	}
}
// const classPrediction =
// 	prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
// labelContainer.childNodes[i].innerHTML = classPrediction;
