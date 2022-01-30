class radixSort extends algorithmBaseClass {
	/**
	 *
	 * @param {number} sortingSpeed
	 * @param {number[]} listObj
	 */
	constructor(sortingSpeed, listObj, originalList) {
		super(sortingSpeed, listObj, originalList);
		this.maxIntegerDigitLong = 0;
		this.maxDecimalDigitLong = 0;
		//
		this.digitPivot = 0; // start from left side
		this.targetSortIndex = 0; // the barObj index to be sorted
		//
		this.indexListTargetIndex = 0;
		this.indexList = Array(10).fill(0); // store the index of each digit //! insert before the index => +1 for all the index self(?) and after
		this.targetIndexListIndex = [0, this.sortingSize - 1]; // the first and last index of the index List
	}
	sortUpdate() {}
	colorHighlightUpdate() {}
	/**
	 *
	 * @param {number} value
	 * @returns
	 */
	getDigitLong(value) {
		let [integer, decimal] = value.toString().split('.');
		if (decimal === undefined) decimal = '';
		return [integer.length, decimal.length];
	}
	// this function is called in a for loop once
	assignDigitLong(barObj) {
		const [integerLong, decimalLong] = this.getDigitLong(barObj.value);
		const appendIntegerLong = this.maxIntegerDigitLong - integerLong;
		const appendDecimalLong = this.maxDecimalDigitLong - decimalLong;
		let stringList = barObj.value.toString().split('.');
		stringList.splice(0, 0, '0'.repeat(appendIntegerLong));
		stringList.push('0'.repeat(appendDecimalLong));
		const stringReturn = stringList.join('');
		barObj.digitLongString = stringReturn;
		return stringReturn;
	}
	assignColorCode(colorCode, index) {
		const barObj = this.listObj[index];
		barObj.element.classList.add(colorCode);
		barObj.colorCode = colorCode;
	}
	resetBarColor() {
		const len = this.sortingSize;
		for (let i = 0; i < len; i++) {
			const { element, colorCode } = this.listObj[i];
			element.classList.remove(colorCode);
		}
	}
}
