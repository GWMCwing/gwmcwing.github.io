// display elements
const pathFindingBox_display = document.getElementById(
	'pathFindingBox-display'
);
const pathFindingOptions = document.getElementById('pathFindingAlgorithm');
//
// options
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
//
// buttons
const pathFindingStartElement = document.getElementById('pathFindingStart');
const pathFindingResetElement = document.getElementById('pathFindingReset');
const pathFindingRerunElement = document.getElementById('pathFindingRerun');
//
// box types
const pathFindTypeBoxStart = document.getElementById('pathFindBox-types-start');
const pathFindTypeBoxEnd = document.getElementById('pathFindBox-types-end');
const pathFindTypeBoxWall = document.getElementById('pathFindBox-types-wall');
const pathFindTypeBoxEmpty = document.getElementById('pathFindBox-types-empty');
//
// options range
// [min,max,initial]
const speedRange = [4, 1000, 50];
const widthRange = [5, 60, 15];
const heightRange = [5, 60, 15];
//
// css related
const gridGapSize_Px = 3;
const contentVhPercentage = 100;
//
// object related
const boxTypeObj = {
	wall: 'wall',
	start: 'start',
	end: 'end',
	path: 'path',
	empty: 'empty',
};
const boxTypeList = Object.values(boxTypeObj);
const boxTypeListLen = boxTypeList.length;
//
const heuristicWeight = 3;
