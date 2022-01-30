//TODO factorize
/**
 * modified version of the merge sort algorithm for better implementation
 * for visualization
 *
 * Space Complexity: O(n)
 */
class mergeSort extends algorithmBaseClass {
	/**
	 *
	 * @param {number} sortingSpeed
	 * @param {number[]} listObj
	 */
	constructor(sortingSpeed, listObj, originalList) {
		super(sortingSpeed, listObj, originalList);
		//TODO merge by pointer and size value list
		this.sizeList = listObj.map((element) => {
			return 1;
		});
		this.indexPointer = 0; // for sizeList
		this.leftListPointer = 0; // for sizeList
		this.rightListPointer = 0; // for sizeList
	}
	sortUpdate() {
		if (this.sizeList.length === 1) {
			this.sorted = true;
			return true;
		}
		if (this.indexPointer >= this.sizeList.length - 1) {
			// end of one layer
			this.indexPointer = 0;
		} else {
			this.mergeList();
		}
		return false;
	}
	colorHighlightUpdate() {
		if (this.leftListPointer < this.sizeList[this.indexPointer]) {
			this.currentRedHighlight.push(
				this.originalList[this.mapLeftListPointerToIndex()].element
			);
		}
		if (this.rightListPointer < this.sizeList[this.indexPointer + 1]) {
			this.currentRedHighlight.push(
				this.originalList[this.mapRightListPointerToIndex()].element
			);
		}
	}
	mergeList() {
		const leftIndex = this.mapLeftListPointerToIndex();
		const rightIndex = this.mapRightListPointerToIndex();
		let leftDone = this.leftListPointer >= this.sizeList[this.indexPointer];
		let rightDone =
			this.rightListPointer >= this.sizeList[this.indexPointer + 1];
		if (leftDone && rightDone) {
			this.modifySizeList();
		} else if (leftDone && !rightDone) {
			const element = this.insertBeforeElement(rightIndex, leftIndex);
			this.currentGreenHighlightPending.push(element);
			this.rightListPointer++;
		} else if (rightDone && !leftDone) {
			this.leftListPointer = this.sizeList[this.indexPointer] + 1;
		} else {
			this.compareAndInsert(leftIndex, rightIndex);
		}
	}
	modifySizeList() {
		this.sizeList.splice(
			this.indexPointer,
			2,
			this.sizeList[this.indexPointer] + this.sizeList[this.indexPointer + 1]
		);
		this.indexPointer++;
		this.leftListPointer = 0;
		this.rightListPointer = 0;
	}
	compareAndInsert(leftIndex, rightIndex) {
		const leftGreater = this.compareValues(leftIndex, rightIndex);
		if (leftGreater) {
			// insert rightObj Before leftIndex element
			const element = this.insertBeforeElement(rightIndex, leftIndex);
			this.currentGreenHighlightPending.push(element);
			this.rightListPointer++;
		} else {
			this.leftListPointer++;
		}
	}
	mapLeftListPointerToIndex() {
		return this.getIndexOffset() + this.leftListPointer + this.rightListPointer;
	}
	mapRightListPointerToIndex() {
		return (
			this.getIndexOffset() +
			this.sizeList[this.indexPointer] +
			this.rightListPointer
		);
	}
	getIndexOffset() {
		let indexValue = 0;
		for (let i = 0; i < this.indexPointer; i++) {
			indexValue += this.sizeList[i];
		}
		return indexValue;
	}
}
