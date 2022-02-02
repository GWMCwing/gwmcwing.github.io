class pathFindingAlgorithmBaseClass {
	constructor(boxList, oriBoxList, startObj, endObj) {
		this.boxList = fillWall(boxList);
		this.oriBoxList = oriBoxList;
		this.startObj = startObj;
		this.endObj = endObj;
	}
	//
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
	getAdjacentBox(box) {
		const AdjBoxList = [];
		const i = box.i;
		const j = box.j;
		AdjBoxList.push(this.boxList[i - 1][j]);
		AdjBoxList.push(this.boxList[i + 1][j]);
		AdjBoxList.push(this.boxList[i][j - 1]);
		AdjBoxList.push(this.boxList[i][j + 1]);
		return AdjBoxList;
	}
	//TODO
	updatePathValue() {}
	//? function or css class or direct style change??
	updateBoxColor() {}
}
