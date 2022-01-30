/** choose last element in list as pivot
 *
 */
class quickSort extends algorithmBaseClass {
	/**
	 *
	 * @param {number} sortingSpeed
	 * @param {number[]} listObj
	 */
	constructor(sortingSpeed, listObj, originalList) {
		super(sortingSpeed, listObj, originalList);
		this.pivotIndex = [];
	}
	sortUpdate() {}
	colorHighlightUpdate() {}
	//! update all pivot index when swapping
	updatePivotIndex() {}
}

class quickSortPivot {
	constructor(pivotIndex, leftRemaining, rightRemaining, oriLeft, oriRight) {
		this.pivotIndex = pivotIndex;
		this.leftRemaining = leftRemaining;
		this.rightRemaining = rightRemaining;
		this.oriLeft = oriLeft;
		this.oriRight = oriRight;
	}
}
