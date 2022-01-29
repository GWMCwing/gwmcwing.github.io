//TODO add a compare function to all sorting algorithms and create compare counter
//a
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
const accessCountNumberElement = document.getElementById('accessCount-number');
const compareCountNumberElement = document.getElementById(
	'compareCount-number'
);
const swapCountNumberElement = document.getElementById('swapCount-number');
const sortStatusStateElement = document.getElementById('sortStatus-state');
//
class barClass {
	constructor(element, value) {
		this.element = element;
		this._value = value;
	}
	get value() {
		accessCount++;
		return this._value;
	}
	set value(newValue) {
		this._value = newValue;
	}
}
const barList = [];
var sortingAlgorithmObj = null;
var accessCount = 0;
var compareCount = 0;
var swapCount = 0;

window.onload = function () {
	addEventListenerToOptions();
	const sortingOptionValues = Object.values(sortingOptions);
	const sortingOptionValuesLen = sortingOptionValues.length;
	for (let i = 0; i < sortingOptionValuesLen; i++) {
		const sortingOptionElement = document.createElement('option');
		const sortingOptionValue = sortingOptionValues[i];
		const optionDisabled = sortingOptionValue.optionDisabled;
		//
		sortingOptionElement.value = sortingOptionValue.algorithmName;
		sortingOptionElement.innerHTML = sortingOptionValue.algorithmName;
		if (optionDisabled === true || optionDisabled === undefined) {
			sortingOptionElement.disabled = true;
		}
		sortingOptionsElement.appendChild(sortingOptionElement);
	}
	sortingSpeedElement_range.max = 1000;
	sortingSpeedElement_range.min = 4;
	sortingSizeElement_range.max = Math.min(
		Math.floor((document.body.clientWidth / 2) * 0.85),
		200
	);
	sortingSizeElement_range.min = 1;
	sortingSpeedElement_number.max = sortingSpeedElement_range.max;
	sortingSpeedElement_number.min = sortingSpeedElement_range.min;
	sortingSizeElement_number.max = sortingSizeElement_number.max;
	sortingSizeElement_number.min = sortingSizeElement_number.min;
	const barListLen = sortingSizeElement_range.max + 1;
	for (let i = 0; i < barListLen; i++) {
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
	console.log(algorithm, speed, size);
	const sortingList = barList.slice(0, size);
	const originalList = barList;
	//
	sortingAlgorithmObj = sortingOptions[algorithm].function(
		speed,
		sortingList,
		originalList
	);
	if (sortingAlgorithmObj === null) return;
	//
	sortingOptionsElement.disabled = true;
	sortingSpeedElement_range.disabled = true;
	sortingSpeedElement_number.disabled = true;
	sortingSizeElement_range.disabled = true;
	sortingSizeElement_number.disabled = true;
	//
	sortStatusStateElement.innerHTML = 'Sorting...';
	//
	sortingAlgorithmObj.continueSort();
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
	return [bar, parseFloat(value)];
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
	accessCount = 0;
	compareCount = 0;
	swapCount = 0;
	sortingOptionsElement.disabled = false;
	sortingSpeedElement_range.disabled = false;
	sortingSpeedElement_number.disabled = false;
	sortingSizeElement_range.disabled = false;
	sortingSizeElement_number.disabled = false;
	if (sortingAlgorithmObj !== null) {
		sortingAlgorithmObj.forceEnd = true;
		delete sortingAlgorithmObj;
	}
	for (let i = 0; i < barListLen; i++) {
		const barListObj = barList[i];
		const value = getRandomHeight();
		barListObj.element.style.height = `${value}%`;
		barListObj._value = value;
		const classList = barListObj.element.classList;
		classList.remove('red-highlight');
		classList.remove('green-highlight');
		classList.remove('blue-highlight');
	}
	sortStatusStateElement.innerHTML = 'Paused';
	updateMetrics();
}
function updateMetrics() {
	accessCountNumberElement.innerHTML = accessCount;
	compareCountNumberElement.innerHTML = compareCount;
	swapCountNumberElement.innerHTML = swapCount;
}
function getRandomHeight() {
	return Math.random() * 97;
}
