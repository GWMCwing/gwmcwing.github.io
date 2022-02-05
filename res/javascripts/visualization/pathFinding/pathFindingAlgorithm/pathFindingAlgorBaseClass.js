class pathFindingAlgorithmBaseClass {
	constructor(speed, width, height, boxList, oriBoxList, startObj, endObj) {
		this.speed = speed;
		this.width = width;
		this.height = height;
		this.boxList = this.fillWall(boxList);
		this.oriBoxList = oriBoxList;
		this.startObj = startObj;
		this.endObj = endObj;
		this.pathFound = false;
		this.forceEnd = false;
		this.validPath = false;
	}
	// common methods for subclass
	/**
	 * fill boxList list with walls around for easier processing
	 * @param {object[]} boxList
	 * @returns boxList with walls around
	 */
	fillWall(boxList) {
		const boxListLen_i = boxList.length;
		const boxListLen_j = boxList[0].length;
		const defaultBox = new boxClass(-1, -1, null, 'wall', Infinity);
		const defaultBoxArray = Array(boxListLen_j + 2).fill(defaultBox);
		for (let i = 0; i < boxListLen_i; i++) {
			boxList[i].push(defaultBox);
			boxList[i].splice(0, 0, defaultBox);
		}
		boxList.push(defaultBoxArray);
		boxList.splice(0, 0, defaultBoxArray);
		return boxList;
	}
	/**
	 * get adjacent box list
	 * @param {object} box
	 * @returns
	 */
	getAdjacentBox(box) {
		const AdjBoxList = [];
		const i = box.i + 1;
		const j = box.j + 1;
		AdjBoxList.push(this.boxList[i - 1][j]);
		AdjBoxList.push(this.boxList[i + 1][j]);
		AdjBoxList.push(this.boxList[i][j - 1]);
		AdjBoxList.push(this.boxList[i][j + 1]);
		return AdjBoxList;
	}
	/**
	 * update the path value of the box, and update the box color
	 * ? required checking if the box is empty or not
	 * @param {number} i an integer that represent the row index of box
	 * @param {number} j an integer that represent the box index in the row
	 * @param {number} value a number greater than 0
	 */
	updatePathValue(i, j, value) {
		const box = this.boxList[i + 1][j + 1];
		if (box.type !== 'empty') return console.warn('editing a non-empty box');
		box.value = value;
		this.updateBoxColor(i, j, value, box);
	}
	/**
	 * update the box color
	 * ? function or css class or direct style change??
	 * @param {number} i an integer that represent the row index of box
	 * @param {number} j an integer that represent the box index in the row
	 * @param {number} value path value of the box
	 * @param {object} box box object in the boxList
	 */
	updateBoxColor(i, j, value, box) {
		if (value <= 0)
			console.warn(
				`box[${i + 1},${j + 1}] value is ${value} which is not valid`
			);
		const hue = 115;
		const saturation = '100%';
		const lightness = 100 - (1 / value) * 100 + '%';
		const alpha = 0.85;
		box.element.style.backgroundColor = `hsla(${hue},${saturation},${lightness},${alpha})`;
	}
	/**
	 * the functions below required override in subclass
	 * do not call these function in this class directly
	 * @override
	 */
	/**
	 * call the path finding algorithm continuously with a delay of this.speed ms
	 */
	continuePathFinding(ms) {
		this.warnOverride('continuePathFinding');
	}
	/**
	 * call the path finding algorithm once
	 */
	pathFindOnce() {
		this.warnOverride('pathFindOnce');
	}
	//
	/**
	 * warning message for calling non-overrided function
	 * @param {string} name
	 */
	warnOverride(name) {
		console.warn(`${name} is not override`);
		console.trace();
	}
}
