class insertionSort extends algorithmBaseClass {
	/**
	 *
	 * @param {number} sortingSpeed
	 * @param {number[]} listObj
	 */
	constructor(sortingSpeed, listObj, originalList) {
		super(sortingSpeed, listObj, originalList);
		this.index = 1;
		this.leftPointer = 0;
	}
	displayUpdate() {
		this.pushHighlight();
		if (this.index < this.sortingSize) {
			this.currentBlueHighlight.push(this.originalList[this.index].element);
		}
		if (this.leftPointer >= 0) {
			this.currentRedHighlight.push(
				this.originalList[this.leftPointer].element
			);
		}
		this.updateHighlightClass();
	}
	sortUpdate() {
		if (this.index >= this.sortingSize) {
			this.sorted = true;
			return true;
		}
		if (this.leftPointer < 0) {
			const insertedElement = this.insertBeforeElement(this.index, 0);
			this.index++;
			this.leftPointer = this.index - 1;
			this.currentGreenHighlightPending.push(insertedElement);
		} else if (this.compareValues(this.index, this.leftPointer)) {
			if (this.leftPointer != this.index - 1) {
				const insertedElement = this.insertAfterElement(
					this.index,
					this.leftPointer
				);
				this.currentGreenHighlightPending.push(insertedElement);
			}
			this.index++;
			this.leftPointer = this.index - 1;
		} else {
			this.leftPointer--;
		}
		return false;
	}
}
