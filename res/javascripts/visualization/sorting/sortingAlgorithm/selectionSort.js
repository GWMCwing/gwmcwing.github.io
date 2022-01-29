class selectionSort extends algorithmBaseClass {
	/**
	 *
	 * @param {number} sortingSpeed
	 * @param {number[]} listObj
	 */
	constructor(sortingSpeed, listObj, originalList) {
		super(sortingSpeed, listObj, originalList);
		this.targetIndex = 0; // the target index of the element to be inserted
		this.minIndex = 0; // the index of the minimum element
		this.rightPointer = 1; // the index of the right pointer
	}
	sortUpdate() {
		if (this.targetIndex == this.sortingSize) {
			this.sorted = true;
			return true;
		}
		if (this.rightPointer == this.sortingSize) {
			this.insertBeforeElement(this.minIndex, this.targetIndex);
			this.targetIndex++;
			this.minIndex = this.targetIndex;
			this.rightPointer = this.targetIndex;
		} else if (this.compareValues(this.minIndex, this.rightPointer)) {
			this.minIndex = this.rightPointer;
		}
		this.rightPointer++;
	}
	colorHighlightUpdate() {
		this.currentBlueHighlight.push(this.originalList[this.minIndex].element);
		this.currentGreenHighlight.push(
			this.originalList[this.targetIndex].element
		);
		this.currentRedHighlight.push(this.originalList[this.rightPointer].element);
	}
}
