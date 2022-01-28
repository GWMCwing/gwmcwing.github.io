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
		if (this.forceEnd) return true;
		this.sortOnce();
		if (this.sorted) {
			console.log('ended');
			return true;
		}
		setTimeout(() => {
			this.continueSort();
		}, this.sortingSpeed);
	}
	sortOnce() {
		if (this.sorted || this.forceEnd) {
			return true;
		}
		return this.sortUpdate();
	}
	//

	sortUpdate() {
		if (this.leftPointer >= this.endPoint) {
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
		return false;
	}
}
