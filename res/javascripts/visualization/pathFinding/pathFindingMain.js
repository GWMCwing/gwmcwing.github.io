var boxList2d = [];
var boxClassLoaded = false;
var mousedownCount = 0;
var selectedBoxType = 'wall';
//
var startBox = null;
var endBox = null;
//
var pathFindingObj = null;
//
window.onload = function () {
	setOptionsRange();
	setOptionsListener();
	appendAlgorithmOptions();
	insertBox();
	boxClassLoaded = true;
	updateGridSize();
};
window.onresize = function () {
	updateGridSize();
};
//
function appendAlgorithmOptions() {
	const pathFindAlgorithmValues = Object.values(algorithmOptions);
	const pathFindAlgorithmValueLen = pathFindAlgorithmValues.length;
	for (let i = 0; i < pathFindAlgorithmValueLen; i++) {
		const pathFindAlgorithmElement = document.createElement('option');
		const pathFindAlgorithmValue = pathFindAlgorithmValues[i];
		const optionDisabled = pathFindAlgorithmValue.optionDisabled;
		//
		pathFindAlgorithmElement.value = pathFindAlgorithmValue.algorithmName;
		pathFindAlgorithmElement.innerHTML = pathFindAlgorithmValue.algorithmName;
		if (optionDisabled === true || optionDisabled === undefined) {
			pathFindAlgorithmElement.disabled = true;
		}
		pathFindingOptions.appendChild(pathFindAlgorithmElement);
	}
}
//
function setOptionsRange() {
	[
		pathFindingSpeed_range.min,
		pathFindingSpeed_range.max,
		pathFindingSpeed_range.value,
	] = speedRange;
	[
		pathFindingSpeed_number.min,
		pathFindingSpeed_number.max,
		pathFindingSpeed_number.value,
	] = speedRange;
	//
	[
		pathFindingWidth_range.min,
		pathFindingWidth_range.max,
		pathFindingWidth_range.value,
	] = widthRange;
	[
		pathFindingWidth_number.min,
		pathFindingWidth_number.max,
		pathFindingWidth_number.value,
	] = widthRange;
	//
	[
		pathFindingHeight_range.min,
		pathFindingHeight_range.max,
		pathFindingHeight_range.value,
	] = heightRange;
	[
		pathFindingHeight_number.min,
		pathFindingHeight_number.max,
		pathFindingHeight_number.value,
	] = heightRange;
}
function setOptionsListener() {
	pathFindingSpeed_range.oninput = function () {
		pathFindingSpeed_number.value = this.value;
	};
	pathFindingSpeed_number.onchange = function () {
		let value = parseInt(this.value);
		if (value > speedRange[1]) {
			value = speedRange[1];
		} else if (value < speedRange[0]) {
			value = speedRange[0];
		}
		pathFindingSpeed_range.value = value;
		this.value = value;
	};
	//
	pathFindingWidth_range.oninput = function () {
		pathFindingWidth_number.value = this.value;
		updateGridSize();
	};
	pathFindingWidth_number.onchange = function () {
		let value = parseInt(this.value);
		if (value > widthRange[1]) {
			value = widthRange[1];
		} else if (value < widthRange[0]) {
			value = widthRange[0];
		}
		pathFindingWidth_range.value = value;
		this.value = value;
		updateGridSize();
	};
	//
	pathFindingHeight_range.oninput = function () {
		pathFindingHeight_number.value = this.value;
		updateGridSize();
	};
	pathFindingHeight_number.onchange = function () {
		let value = parseInt(this.value);
		if (value > heightRange[1]) {
			value = heightRange[1];
		} else if (value < heightRange[0]) {
			value = heightRange[0];
		}
		pathFindingHeight_range.value = value;
		this.value = value;
		updateGridSize();
	};
	//
	pathFindingStartElement.onclick = function () {
		startPathFinding();
	};
	pathFindingResetElement.onclick = function () {
		resetPathGrid();
	};
}
function updateGridSize() {
	if (!boxClassLoaded) return;
	const widthNum = parseInt(pathFindingWidth_number.value);
	const heightNum = parseInt(pathFindingHeight_number.value);
	const boxSize = Math.min(
		window.innerWidth / (widthNum + 6),
		((window.innerHeight / (heightNum + 6)) * contentVhPercentage) / 100
	);
	const gapSize = boxSize * 0.08;
	pathFindingBox_display.style.gridTemplateColumns = `repeat(${widthNum}, ${
		boxSize - gridGapSize_Px
	}px)`;
	pathFindingBox_display.style.gridTemplateRows = `repeat(${heightNum}, ${
		boxSize - gridGapSize_Px
	}px)`;
	pathFindingBox_display.style.gap = `${gapSize}px`;
	pathFindingBox_display.style.width = `${
		widthNum * boxSize + (widthNum - 2) * gridGapSize_Px
	}px`;
	// pathFindingBox_display.style.height = `${heightNum * boxSize + (heightNum - 2) * gridGapSize_Px}px`;
	//
	const iLen = boxList2d.length;
	const jLen = boxList2d[0].length;
	for (let i = 0; i < iLen; i++) {
		for (let j = 0; j < jLen; j++) {
			const box = boxList2d[i][j];
			if (i < heightNum && j < widthNum) {
				box.element.classList.add('show-box');
			} else {
				box.element.classList.remove('show-box');
			}
		}
	}
}
function insertBox() {
	const widthMax = widthRange[1];
	const heightMax = heightRange[1];
	for (let i = 0; i < heightMax; i++) {
		const row = [];
		for (let j = 0; j < widthMax; j++) {
			const box = document.createElement('div');
			box.classList.add('box');
			box.classList.add(boxTypeObj.empty);
			let weight = 1;
			box.id = `box-${i}-${j}`;
			box.addEventListener('mouseover', function (event) {
				if (mousedownCount) changeSelectedBoxClass(event);
			});
			pathFindingBox_display.appendChild(box);
			row.push(new boxClass(i, j, box, boxTypeObj.empty, weight));
		}
		boxList2d.push(row);
	}
}
// add class when drag over
window.addEventListener('mousedown', function (event) {
	if (event.target.classList.contains('box')) {
		event.preventDefault();
		if (mousedownCount === 0) {
			changeSelectedBoxClass(event);
		}
		mousedownCount = 1;
	} else {
		mousedownCount = 0;
	}
});
window.addEventListener('mouseup', function (event) {
	mousedownCount = 0;
});
//
async function changeSelectedBoxClass(event) {
	if (
		pathFindingObj !== null ||
		(selectedBoxType === 'start' && startBox !== null) ||
		(selectedBoxType === 'end' && endBox !== null)
	) {
		return;
	}
	const box = event.target;
	const boxId = box.id.split('-');
	const boxId_i = parseInt(boxId[1]);
	const boxId_j = parseInt(boxId[2]);
	const boxObj = boxList2d[boxId_i][boxId_j];
	const oriBoxType = boxObj.type;
	//
	box.classList.remove(oriBoxType);
	box.classList.add(selectedBoxType);
	//
	boxObj.type = selectedBoxType;
	//
	if (selectedBoxType === boxTypeObj.start) {
		startBox = boxObj;
		toggleStartBox();
	} else if (selectedBoxType === boxTypeObj.end) {
		endBox = boxObj;
		toggleEndBox();
	} else if (oriBoxType === boxTypeObj.start) {
		startBox = null;
		toggleStartBox();
	} else if (oriBoxType === boxTypeObj.end) {
		endBox = null;
		toggleEndBox();
	}
}
function updateSelectedClass(name) {
	if (pathFindingObj !== null) return;
	const oriSelectedBoxType = selectedBoxType;
	selectedBoxType = boxTypeObj[name];
	switch (oriSelectedBoxType) {
		case boxTypeObj.start:
		case boxTypeObj.start:
			pathFindTypeBoxStart.classList.remove('selected');
			break;
		case boxTypeObj.end:
			pathFindTypeBoxEnd.classList.remove('selected');
			break;
		case boxTypeObj.wall:
			pathFindTypeBoxWall.classList.remove('selected');
			break;
		case boxTypeObj.empty:
			pathFindTypeBoxEmpty.classList.remove('selected');
			break;
		default:
			console.warn('unknown name');
			break;
	}
	switch (name) {
		case boxTypeObj.start:
			pathFindTypeBoxStart.classList.add('selected');
			break;
		case boxTypeObj.end:
			pathFindTypeBoxEnd.classList.add('selected');
			break;
		case boxTypeObj.wall:
			pathFindTypeBoxWall.classList.add('selected');
			break;
		case boxTypeObj.empty:
			pathFindTypeBoxEmpty.classList.add('selected');
			break;
		default:
			console.warn('unknown name');
			break;
	}
}
function toggleStartBox() {
	pathFindTypeBoxStart.classList.toggle('full');
}
function toggleEndBox() {
	pathFindTypeBoxEnd.classList.toggle('full');
}
//
function startPathFinding() {
	// if (startBox === null) {
	// 	alert('請選擇起點');
	// 	return;
	// } else if (endBox === null) {
	// 	alert('請選擇終點');
	// 	return;
	// }
	toggleButton(true);
	console.log('start');
	//
	const algorithmName = pathFindingOptions.value;
	const pathFindingSpeed = pathFindingSpeed_range.value;
	const pathFindingWidth = pathFindingWidth_range.value;
	const pathFindingHeight = pathFindingHeight_range.value;
	const startBoxObj = startBox;
	const endBoxObj = endBox;
	//
	let mapList = [];
	for (let i = 0; i < pathFindingHeight; i++) {
		const row = [];
		for (let j = 0; j < pathFindingWidth; j++) {
			row.push(boxList2d[i][j]);
		}
		mapList.push(row);
	}
	console.log(mapList);
	//
	const pathFindingObjClass = algorithmOptions[algorithmName].function();
	pathFindingObj = new pathFindingObjClass(
		pathFindingSpeed,
		pathFindingWidth,
		pathFindingHeight,
		mapList,
		boxList2d,
		startBoxObj,
		endBoxObj
	);
	//TODO trigger
}

function toggleButton(boolean) {
	pathFindingOptions.disabled = boolean;
	pathFindingWidth_number.disabled = boolean;
	pathFindingWidth_range.disabled = boolean;
	pathFindingHeight_number.disabled = boolean;
	pathFindingHeight_range.disabled = boolean;
	pathFindingStartElement.disabled = boolean;
	//
	if (boolean) {
		pathFindTypeBoxStart.classList.add('full');
		pathFindTypeBoxEnd.classList.add('full');
		pathFindTypeBoxWall.classList.add('full');
		pathFindTypeBoxEmpty.classList.add('full');
	} else {
		pathFindTypeBoxStart.classList.remove('full');
		pathFindTypeBoxEnd.classList.remove('full');
		pathFindTypeBoxWall.classList.remove('full');
		pathFindTypeBoxEmpty.classList.remove('full');
	}
}

function resetPathGrid() {
	const iLen = boxList2d.length;
	const jLen = boxList2d[0].length;
	for (let i = 0; i < iLen; i++) {
		for (let j = 0; j < jLen; j++) {
			const box = boxList2d[i][j];
			const boxElement = box.element;
			const boxType = box.type;
			box.type = boxTypeObj.empty;
			box.weight = 1;
			box.pathValue = Infinity;
			boxElement.classList.remove(boxType);
			boxElement.classList.add(boxTypeObj.empty);
			boxElement.style = '';
		}
	}
	//
	startBox = null;
	endBox = null;
	pathFindingObj = null;
	toggleButton(false);
}
