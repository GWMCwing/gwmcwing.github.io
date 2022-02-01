const pathFindingBox_display = document.getElementById(
	'pathFindingBox-display'
);
const pathFindingSpeed_range = document.getElementById(
	'pathFindingSpeed-range'
);
const pathFindingSpeed_number = document.getElementById(
	'pathFindingSpeed-number'
);
const pathFindingWidth_range = document.getElementById(
	'pathFindingWidth-range'
);
const pathFindingWidth_number = document.getElementById(
	'pathFindingWidth-number'
);
const pathFindingHeight_range = document.getElementById(
	'pathFindingHeight-range'
);
const pathFindingHeight_number = document.getElementById(
	'pathFindingHeight-number'
);
const pathFindingStartElement = document.getElementById('pathFindingStart');
const pathFindingResetElement = document.getElementById('pathFindingReset');
//
const pathFindTypeBoxStart = document.getElementById('pathFindBox-types-start');
const pathFindTypeBoxEnd = document.getElementById('pathFindBox-types-end');
// [min,max,initial]
const speedRange = [4, 1000, 50];
const widthRange = [5, 60, 15];
const heightRange = [5, 60, 15];
//
const gridGapSize_Px = 3;
const contentVhPercentage = 100;
//
const boxTypeObj = {
	wall: 'wall',
	start: 'start',
	end: 'end',
	path: 'path',
	empty: 'empty',
};
