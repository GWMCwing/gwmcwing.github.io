var boxList2d = [];
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
	updateGridSize();
};
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
		console.log('start');
	};
	pathFindingResetElement.onclick = function () {
		console.log('reset');
	};
}
function updateGridSize() {
	const widthNum = parseInt(pathFindingWidth_number.value);
	const heightNum = parseInt(pathFindingHeight_number.value);

	const boxSize = Math.min(
		window.innerWidth / widthNum,
		window.innerHeight / heightNum
	);
	pathFindingBox_display.style.gridTemplateColumns = `repeat(${widthNum}, ${boxSize}px)`;
	pathFindingBox_display.style.gridTemplateRows = `repeat(${heightNum}, ${boxSize}px)`;
	//
	const iLen = boxList2d.length;
	const jLen = boxList2d[0].length;
	for (let i = 0; i < heightNum; i++) {
		for (let j = 0; j < widthNum; j++) {
			const box = boxList2d[i][j];
			box.element.display = 'block';
		}
	}
	for (let i = heightNum; i < iLen; i++) {
		for (let j = widthNum; j < jLen; j++) {
			const box = boxList2d[i][j];
			box.element.display = 'none';
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