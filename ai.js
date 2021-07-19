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
			resultExplain =
				'RM is the leader of BTS and he played a big part in helping Big Hit form the group that fans get to enjoy today. ';
			break;
		case 'J-Hope':
			resultTitle = 'Jung Hoseok';
			resultExplain =
				'J-Hope is one of the best dancers in the group, and also also a literal sunshine angel! ';
			break;
		case 'V':
			resultTitle = 'Kim Taehyung';
			resultExplain =
				'V, also known as Taehyung, Tae, or TaeTae was the last member of BTS to be revealed';
			break;
		case 'Jungkook':
			resultTitle = 'Jeon Jeongguk';
			resultExplain =
				'Jungkook is the youngest BTS member, also known as their Golden Maknae because he seems to be good at basically everything. ';
			break;
		case 'Suga':
			resultTitle = 'Min Yoongi';
			resultExplain =
				'Suga is the second oldest BTS member and can often be found taking care of things for the other members. ';
			break;
		case 'Jin':
			resultTitle = 'Kim Seokjin';
			resultExplain =
				'Jin is the oldest BTS member, although he doesn’t often act like it. He’s known for his dad jokes, describing himself as “Worldwide handsome” ';
			break;
		case 'Jimin':
			resultTitle = 'Park Jimin';
			resultExplain =
				'Jimin had the shortest amount of time as a trainee before BTS debuted and almost didn’t make the cut.';
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
	let barWidth;
	for (let i = 0; i < maxPredictions; i++) {
		if (prediction[i].probability.toFixed(2) > 0.1) {
			barWidth = Math.round(prediction[i].probability.toFixed(2) * 100) + '%';
		} else if (prediction[i].probability.toFixed(2) >= 0.01) {
			barWidth = '4%';
		} else {
			barWidth = '2%';
		}
		var labelTitle;
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
		var label =
			"<div class='bts-label d-flex align-items-center'>" +
			labelTitle +
			'</div>';
		var bar =
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
