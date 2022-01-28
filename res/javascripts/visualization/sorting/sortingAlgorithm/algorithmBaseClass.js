class algorithmBaseClass {
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
		this.previousBlueHighlight = [];
		this.currentBlueHighlight = [];
		this.previousGreenHighlight = [];
		this.currentGreenHighlight = [];
	}
	swapElement(index1, index2) {
		if (this.forceEnd) return;
		const barObj1 = this.listObj[index1];
		const barObj2 = this.listObj[index2];
		const barPlaceHolder = document.createElement('div');
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
	pushHighligh() {
		this.previousRedHighlight = this.currentRedHighlight;
		this.currentRedHighlight = [];
		this.previousBlueHighlight = this.currentBlueHighlight;
		this.currentBlueHighlight = [];
		this.previousGreenHighlight = this.currentGreenHighlight;
		this.currentGreenHighlight = [];
	}
	updateHighlightClass() {
		let i = 0;
		const previousRedHighlightLen = this.previousRedHighlight.length;
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
	// require override
	continueSort(...args) {
		this.warnUnimplemented('continueSort');
	}
	sortOnce(...args) {
		this.warnUnimplemented('sortOnce');
	}
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
