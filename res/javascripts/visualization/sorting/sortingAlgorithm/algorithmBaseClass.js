class algorithmBaseClass {
	/**
	 *
	 * @param {number} sortingSpeed sortingSpeed in ms
	 * @param {object[]} listObj list of barObj to be sorted
	 * @param {object[]} originalList list of original barObj in DOM
	 */
	constructor(sortingSpeed, listObj, originalList) {
		this.sortingSpeed = sortingSpeed;
		this.listObj = listObj;
		this.originalList = originalList;
		this.sortingSize = listObj.length;
		this.sorted = null;
		this.forceEnd = false;
		//
		this.previousRedHighlight = [];
		this.currentRedHighlight = [];
		this.currentRedHighlightPending = [];
		//
		this.previousBlueHighlight = [];
		this.currentBlueHighlight = [];
		this.currentBlueHighlightPending = [];
		//
		this.previousGreenHighlight = [];
		this.currentGreenHighlight = [];
		this.currentGreenHighlightPending = [];
	}
	/**
	 * compare the value of the two barObj
	 * @param {number} index1 index of the first element to be compared
	 * @param {number} index2 index of the second element to be compared
	 * @returns {boolean} true if index1 value is smaller than index2 value
	 */
	compareValues(index1, index2) {
		if (this.forceEnd) return;
		compareCount++;
		return this.listObj[index1].value > this.listObj[index2].value;
	}
	/**
	 * insert element to the left of the element at targetIndex, and splice the index1 element
	 * @param {number} index1 index of barObj to be spliced
	 * @param {number} targetIndex target index of the element to be inserted
	 * @returns
	 */
	insertBeforeElement(index1, targetIndex) {
		//
		if (this.forceEnd) return;
		const barObj = this.listObj[index1];
		const targetBarObj = this.listObj[targetIndex];
		swapCount++;
		//
		barObj.element.parentNode.insertBefore(
			barObj.element,
			targetBarObj.element
		);
		//
		const tempObj = this.listObj.splice(index1, 1)[0];
		const tempOriObj = this.originalList.splice(index1, 1)[0];
		if (index1 < targetIndex) {
			targetIndex--;
		}
		this.listObj.splice(targetIndex, 0, tempObj);
		this.originalList.splice(targetIndex, 0, tempOriObj);
		return barObj.element;
	}
	/**
	 * insert element to the left of the element at targetIndex, and splice the index1 element
	 * @param {number} index1 index of barObj to be spliced
	 * @param {number} targetIndex target index of the element to be inserted
	 * @returns
	 */
	insertAfterElement(index1, targetIndex) {
		//
		if (this.forceEnd) return;
		const barObj = this.listObj[index1];
		const targetBarObj = this.listObj[targetIndex];
		swapCount++;
		//
		barObj.element.parentNode.insertBefore(
			barObj.element,
			targetBarObj.element.nextSibling
		);
		//
		const tempObj = this.listObj.splice(index1, 1)[0];
		const tempOriObj = this.originalList.splice(index1, 1)[0];
		if (index1 > targetIndex) {
			targetIndex++;
		}
		this.listObj.splice(targetIndex, 0, tempObj);
		this.originalList.splice(targetIndex, 0, tempOriObj);
		return barObj.element;
	}
	/**
	 *
	 * @param {number} index1 index of the first element to be swapped
	 * @param {number} index2 index of the second element to be swapped
	 * @returns
	 */
	swapElement(index1, index2) {
		if (this.forceEnd) return;
		const barObj1 = this.listObj[index1];
		const barObj2 = this.listObj[index2];
		const barPlaceHolder = document.createElement('div');
		swapCount++;
		barObj1.element.parentNode.insertBefore(
			barPlaceHolder,
			barObj1.element.nextSibling
		);
		//
		barObj2.element.parentNode.insertBefore(
			barObj1.element,
			barObj2.element.nextSibling
		);
		barPlaceHolder.parentNode.insertBefore(
			barObj2.element,
			barPlaceHolder.nextSibling
		);
		//
		barObj1.element.parentNode.removeChild(barPlaceHolder);
		//
		const tempObj = barObj1;
		this.listObj[index1] = barObj2;
		this.listObj[index2] = tempObj;
		//
		const tempOriObj = this.originalList[index1];
		this.originalList[index1] = this.originalList[index2];
		this.originalList[index2] = tempOriObj;
	}
	pushHighlight() {
		this.previousRedHighlight = this.currentRedHighlight;
		this.currentRedHighlight = this.currentRedHighlightPending;
		this.currentRedHighlightPending = [];
		this.previousBlueHighlight = this.currentBlueHighlight;
		this.currentBlueHighlight = this.currentBlueHighlightPending;
		this.currentBlueHighlightPending = [];
		this.previousGreenHighlight = this.currentGreenHighlight;
		this.currentGreenHighlight = this.currentGreenHighlightPending;
		this.currentGreenHighlightPending = [];
	}
	updateHighlightClass() {
		let i = 0;
		const previousRedHighlightLen = this.previousRedHighlight.length;
		// console.log(this.previousRedHighlight[i]);
		for (i = 0; i < previousRedHighlightLen; i++) {
			this.previousRedHighlight[i].classList.remove('red-highlight');
		}
		const previousBlueHighlightLen = this.previousBlueHighlight.length;
		for (i = 0; i < previousBlueHighlightLen; i++) {
			this.previousBlueHighlight[i].classList.remove('blue-highlight');
		}
		const previousGreenHighlightLen = this.previousGreenHighlight.length;
		for (i = 0; i < previousGreenHighlightLen; i++) {
			this.previousGreenHighlight[i].classList.remove('green-highlight');
		}
		const currentRedHighlightLen = this.currentRedHighlight.length;
		for (i = 0; i < currentRedHighlightLen; i++) {
			this.currentRedHighlight[i].classList.add('red-highlight');
		}
		const currentBlueHighlightLen = this.currentBlueHighlight.length;
		for (i = 0; i < currentBlueHighlightLen; i++) {
			this.currentBlueHighlight[i].classList.add('blue-highlight');
		}
		const currentGreenHighlightLen = this.currentGreenHighlight.length;
		for (i = 0; i < currentGreenHighlightLen; i++) {
			this.currentGreenHighlight[i].classList.add('green-highlight');
		}
	}
	continueSort() {
		if (this.forceEnd) {
			sortStatusStateElement.innerHTML = 'Paused';
			return true;
		}
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
		this.sortOnce();
		updateMetrics();
		setTimeout(() => {
			this.continueSort();
		}, this.sortingSpeed);
	}

	sortOnce() {
		if (this.sorted || this.forceEnd) {
			return true;
		}
		this.sortUpdate();
		this.displayUpdate();
	}
	// require override
	sortUpdate(...args) {
		this.warnUnimplemented('sortUpdate');
	}
	displayUpdate(...args) {
		this.warnUnimplemented('displayUpdate');
	}
	//
	warnUnimplemented(funName) {
		console.error(`${funName} is not implemented`);
		console.trace();
	}
}
