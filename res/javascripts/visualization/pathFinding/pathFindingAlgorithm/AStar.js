class AStar extends pathFindingAlgorithmBaseClass {
	constructor(speed, width, height, boxList, oriBoxList, startObj, endObj) {
		super(speed, width, height, boxList, oriBoxList, startObj, endObj);
		this.initBoxList();
		this.openSet = [startObj];
		this.closedSet = [];
		this.start_i = startObj.i;
		this.start_j = startObj.j;
		this.end_i = endObj.i;
		this.end_j = endObj.j;
		this.path = [];
	}
	continuePathFinding(ms) {
		this.pathFindOnce();
		if (this.pathFound) {
			console.log('path found');
		} else if (!this.forceEnd) {
			setTimeout(() => {
				this.continuePathFinding(ms);
			}, this.speed);
		}
	}
	pathFindOnce() {
		if (this.openSet.length > 0) {
			// get the box with the lowest f value
			const lowestBoxIndex = this.getLowestFBoxIndex();
			const lowestBox = this.openSet[lowestBoxIndex];
			// console.log('lowest box');
			// console.log(lowestBox);
			// console.log('lowest box');
			// console.log(lowestBox);
			if (lowestBox.i == this.endObj.i && lowestBox.j == this.endObj.j) {
				// found the path
				this.pathFound = true;
				this.validPath = true;
				this.tracePath();
				return true;
			}
			// remove the box from openSet
			this.openSet.splice(lowestBoxIndex, 1);
			// add the box to closedSet
			this.closedSet.push(lowestBox);
			// get the adjacent boxes
			let AdjBoxList = this.getAdjacentBox(lowestBox);
			AdjBoxList = AdjBoxList.filter((box) => {
				if (box.type === 'wall') {
					return false;
				}
				return true;
			});
			// console.log('AdjBoxList');
			// console.log(AdjBoxList);
			for (let i = 0; i < AdjBoxList.length; i++) {
				const box = AdjBoxList[i];
				// console.log('box');
				// console.log(box);
				if (this.isInCloseSet(box)) continue;
				// console.log('not in closed set');
				//
				const gScore = lowestBox.gScore + lowestBox.weight;
				// console.log('gScore ' + gScore);
				if (gScore < box.gScore) {
					// console.log('gScore < box.gScore');
					box.parent = lowestBox;
					box.gScore = gScore;
					const hScore = this.getHScore(box);
					// console.log('hScore ' + hScore);
					box.fScore = gScore + hScore * heuristicWeight;
					this.updatePathValue(box.i, box.j, box.fScore);
					if (!this.isInOpenSet(box)) {
						this.openSet.push(box);
					}
				}
			}
		} else {
			// no solution
			this.pathFound = true;
			return true;
		}
		this.tracePath();
		return false;
	}
	getLowestFBoxIndex() {
		const openSetLen = this.openSet.length;
		let lowestF = Infinity;
		let lowestFBoxIndex = 0;
		for (let i = 0; i < openSetLen; i++) {
			const box = this.openSet[i];
			if (box.fScore < lowestF) {
				lowestF = box.fScore;
				lowestFBoxIndex = i;
			}
		}
		return lowestFBoxIndex;
	}
	getHScore(box) {
		const x = Math.abs(box.i - this.end_i);
		const y = Math.abs(box.j - this.end_j);
		return Math.sqrt(x * x + y * y);
	}
	isInOpenSet(box) {
		const len = this.openSet.length;
		for (let i = 0; i < len; i++) {
			if (this.openSet[i] == box) {
				return true;
			}
		}
		return false;
	}
	isInCloseSet(box) {
		const len = this.closedSet.length;
		for (let i = 0; i < len; i++) {
			if (this.closedSet[i] == box) {
				return true;
			}
		}
		return false;
	}
	initBoxList() {
		let iSize = this.boxList.length;
		let jSize = this.boxList[0].length;
		for (let i = 0; i < iSize; i++) {
			for (let j = 0; j < jSize; j++) {
				const box = this.boxList[i][j];
				box.gScore = Infinity;
			}
		}
		this.endObj.fScore = -1;
		this.startObj.fScore = this.getHScore(this.startObj);
		this.startObj.gScore = 0;
	}
	tracePath() {
		for (let i = 0; i < this.path.length; i++) {
			this.path[i].element.classList.remove('path');
		}
		this.path = [];
		let box = this.closedSet[this.closedSet.length - 1];
		while (box.parent) {
			this.path.push(box);
			box.element.classList.add('path');
			box = box.parent;
		}
	}
}
