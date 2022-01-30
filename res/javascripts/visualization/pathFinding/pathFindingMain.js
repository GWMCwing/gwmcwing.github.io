var boxList2d = [];
var boxClassLoaded = false;
//
class boxClass {
	constructor(i, j, element) {
		this.i = i;
		this.j = j;
		this.element = element;
	}
}
//
window.onload = function () {
	setOptionsRange();
	setOptionsListener();
	insertBox();
	boxClassLoaded = true;
	updateGridSize();
};
window.onresize = function () {
	updateGridSize();
};
//
function setOptionsRange() {
	[pathFindingSpeed_range.min, pathFindingSpeed_range.max, pathFindingSpeed_range.value] = speedRange;
	[pathFindingSpeed_number.min, pathFindingSpeed_number.max, pathFindingSpeed_number.value] = speedRange;
	//
	[pathFindingWidth_range.min, pathFindingWidth_range.max, pathFindingWidth_range.value] = widthRange;
	[pathFindingWidth_number.min, pathFindingWidth_number.max, pathFindingWidth_number.value] = widthRange;
	//
	[pathFindingHeight_range.min, pathFindingHeight_range.max, pathFindingHeight_range.value] = heightRange;
	[pathFindingHeight_number.min, pathFindingHeight_number.max, pathFindingHeight_number.value] = heightRange;
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
		console.log('start');
	};
	pathFindingResetElement.onclick = function () {
		console.log('reset');
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
	pathFindingBox_display.style.gridTemplateColumns = `repeat(${widthNum}, ${boxSize - gridGapSize_Px}px)`;
	pathFindingBox_display.style.gridTemplateRows = `repeat(${heightNum}, ${boxSize - gridGapSize_Px}px)`;
	pathFindingBox_display.style.gap = `${gapSize}px`;
	pathFindingBox_display.style.width = `${widthNum * boxSize + (widthNum - 2) * gridGapSize_Px}px`;
	// pathFindingBox_display.style.height = `${heightNum * boxSize + (heightNum - 2) * gridGapSize_Px}px`;
	//
	const iLen = boxList2d.length;
	const jLen = boxList2d[0].length;
	for (let i = 0; i < iLen; i++) {
		for (let j = 0; j < jLen; j++) {
			const box = boxList2d[i][j];
			if (i < heightNum && j < widthNum) {
				box.element.style.display = 'block';
			} else {
				box.element.style.display = 'none';
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
			box.id = `box-${i}-${j}`;
			pathFindingBox_display.appendChild(box);
			row.push(new boxClass(i, j, box));
		}
		boxList2d.push(row);
	}
}
