class bubbleSort extends algorithmBaseClass {
	/**
	 *
	 * @param {number} sortingSpeed
	 * @param {number[]} listObj
	 */
	constructor(sortingSpeed, listObj, originalList) {
		super(sortingSpeed, listObj, originalList);
		this.leftPointer = 0;
		this.rightPointer = 1;
		this.endPoint = this.sortingSize - 1;
	}
	/**
	 *
	 * @returns {boolean?} null means not the end of search
	 */

	//
	colorHighlightUpdate() {
		this.currentRedHighlight.push(this.originalList[this.leftPointer].element);
		this.currentRedHighlight.push(this.originalList[this.rightPointer].element);
		this.currentGreenHighlight.push(
			this.originalList[this.endPoint + 1].element
		);
	}
	sortUpdate() {
		if (this.rightPointer > this.endPoint) {
			// loop end condition
			this.leftPointer = 0;
			this.rightPointer = 1;
			this.endPoint--;
			if (this.sorted === null) {
				this.sorted = true;
				return true;
			} else {
				this.sorted = null;
				return false;
			}
		} else if (this.compareValues(this.leftPointer, this.rightPointer)) {
			// swap
			this.swapElement(this.leftPointer, this.rightPointer);
			// console.log('swapped' + this.leftPointer + ' ' + this.rightPointer);
			this.sorted = false;
		}
		//
		this.leftPointer++;
		this.rightPointer = this.leftPointer + 1;
		if (this.rightPointer == this.sortingSize) {
			this.rightPointer = this.leftPointer;
		}
		return false;
	}
}
