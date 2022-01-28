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
	continueSort() {
		if (this.forceEnd) {
			sortStatusStateElement.innerHTML = 'Paused';
			return true;
		}
		this.sortOnce();
		if (this.sorted) {
			this.previousRedHighlight = this.currentRedHighlight;
			this.previousBlueHighlight = this.currentBlueHighlight;
			this.previousGreenHighlight = this.currentGreenHighlight;
			this.currentRedHighlight = [];
			this.currentBlueHighlight = [];
			this.currentGreenHighlight = [];
			this.updateHighlightClass();
			sortStatusStateElement.innerHTML = 'Sorting Complete';
			console.log('ended');
			return true;
		}
		updateMetrics();
		setTimeout(() => {
			this.continueSort();
		}, this.sortingSpeed);
	}
	sortOnce() {
		if (this.sorted || this.forceEnd) {
			return true;
		}
		this.displayUpdate();
		return this.sortUpdate();
	}
	//
	displayUpdate() {
		this.pushHighligh();
		this.currentRedHighlight.push(this.originalList[this.leftPointer].element);
		this.currentRedHighlight.push(this.originalList[this.rightPointer].element);
		this.currentBlueHighlight.push(
			this.originalList[this.endPoint + 1].element
		);
		this.updateHighlightClass();
	}
	sortUpdate() {
		if (this.rightPointer > this.endPoint) {
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
		} else if (
			this.listObj[this.leftPointer].value >
			this.listObj[this.rightPointer].value
		) {
			this.swapElement(this.leftPointer, this.rightPointer);
			// console.log('swapped' + this.leftPointer + ' ' + this.rightPointer);
			this.sorted = false;
		}
		this.leftPointer++;
		this.rightPointer = this.leftPointer + 1;
		if (this.rightPointer == this.sortingSize) {
			this.rightPointer = this.leftPointer;
		}
		return false;
	}
}
