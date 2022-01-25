//
const sortingBox_displayElement = document.getElementById('sortingBox-display');
//
const sortingOptionsElement = document.getElementById('sortingAlgorithm');
const sortingSpeedElement_range = document.getElementById('sortingSpeed-range');
const sortingSpeedElement_number = document.getElementById(
	'sortingSpeed-number'
);
const sortingSizeElement_range = document.getElementById('sortingSize-range');
const sortingSizeElement_number = document.getElementById('sortingSize-number');
const sortingStartElement = document.getElementById('sortingStart');
const sortingReshuffleElement = document.getElementById('sortingReshuffle');
//
class barClass {
	constructor(element, value) {
		this.element = element;
		this.value = value;
	}
}
const barList = [];

window.onload = function () {
	addEventListenerToOptions();
	let sortingOptionsLen = sortingOptions.lists.length;
	for (let i = 0; i < sortingOptionsLen; i++) {
		let sortingOptionElement = document.createElement('option');
		const algorithmName = sortingOptions.lists[i].algorithmName;
		sortingOptionElement.value = algorithmName;
		sortingOptionElement.innerHTML = algorithmName;
		sortingOptionsElement.appendChild(sortingOptionElement);
	}
	sortingSpeedElement_range.max = 100;
	sortingSpeedElement_range.min = 1;
	sortingSizeElement_range.max = Math.max(
		Math.floor((document.body.clientWidth / 2) * 0.85),
		500
	);
	sortingSizeElement_range.min = 1;
	sortingSpeedElement_number.max = sortingSpeedElement_range.max;
	sortingSpeedElement_number.min = sortingSpeedElement_range.min;
	sortingSizeElement_number.max = sortingSizeElement_number.max;
	sortingSizeElement_number.min = sortingSizeElement_number.min;
	for (let i = 0; i < sortingSizeElement_range.max; i++) {
		const [bar, value] = insertBar();
		barList.push(new barClass(bar, value));
	}
	sortingStartElement.addEventListener('click', () => {
		const sortingAlgorithm = sortingOptionsElement.value;
		const sortingSpeed = sortingSpeedElement_range.value;
		const sortingSize = sortingSizeElement_range.value;
		startSorting(sortingAlgorithm, sortingSpeed, sortingSize);
	});
	sortingReshuffleElement.addEventListener('click', () => {
		reshuffle();
	});
	updateVisibleBars(sortingSizeElement_number.value);
};
function addEventListenerToOptions() {
	sortingSpeedElement_range.oninput = function () {
		sortingSpeedElement_number.value = this.value;
	};
	sortingSpeedElement_number.onchange = function () {
		let value = parseInt(this.value);
		const maxValue = parseInt(sortingSpeedElement_range.max);
		const minValue = parseInt(sortingSpeedElement_range.min);
		if (value > maxValue) {
			value = maxValue;
		} else if (value < minValue) {
			value = minValue;
		}
		sortingSpeedElement_range.value = value;
		this.value = value;
	};
	sortingSizeElement_range.oninput = function () {
		sortingSizeElement_number.value = this.value;
		updateVisibleBars(this.value);
	};
	sortingSizeElement_number.onchange = function () {
		let value = parseInt(this.value);
		const maxValue = parseInt(sortingSizeElement_range.max);
		const minValue = parseInt(sortingSizeElement_range.min);
		if (value > maxValue) {
			value = maxValue;
		} else if (value < minValue) {
			value = minValue;
		}
		sortingSizeElement_range.value = value;
		this.value = value;
		updateVisibleBars(this.value);
	};
}
function startSorting(algorithm, speed, size) {
	//! speed and size are string
	console.log(algorithm, speed, size);
}

function insertBar() {
	const bar = document.createElement('div');
	const value = getRandomHeight();
	bar.classList.add('bar');
	bar.style.height = `${value}%`;
	bar.style.width = `100%`;
	bar.style.marginTop = 'auto';
	bar.style.display = 'none';
	sortingBox_displayElement.appendChild(bar);
	return [bar, value];
}
function updateVisibleBars(values) {
	for (let i = 0; i < values; i++) {
		barList[i].element.style.display = 'block';
	}
	const barListLen = barList.length;
	for (let i = values; i < barListLen; i++) {
		barList[i].element.style.display = 'none';
	}
}
function reshuffle() {
	const barListLen = barList.length;
	for (let i = 0; i < barListLen; i++) {
		const barListObj = barList[i];
		const value = getRandomHeight();
		barListObj.element.style.height = `${value}%`;
		barListObj.value = value;
	}
}
function getRandomHeight() {
	return Math.random() * 97;
}
