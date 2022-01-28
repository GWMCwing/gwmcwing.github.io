class algorithmBaseClass {
	constructor(sortingSpeed, listObj, originalList) {
		this.sortingSpeed = sortingSpeed;
		this.listObj = listObj;
		this.originalList = originalList;
		this.sortingSize = listObj.length;
		this.sorted = null;
		this.forceEnd = false;
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
	//
	warnUnimplemented(funName) {
		console.error(`${funName} is not implemented`);
		console.trace();
	}
}
