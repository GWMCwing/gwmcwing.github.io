/**
 * saved all the sorting algorithms in an object
 * algorithmName has to be same as object key
 */
const algorithmOptions = {
	'A Star': {
		algorithmName: 'A Star',
		src: '/res/javascripts/visualization/pathFinding/pathFindingAlgorithm/AStar.js',
		optionDisabled: false,
		function: () => {
			return AStar;
		},
	},
	Dijkstra: {
		algorithmName: 'Dijkstra',
		src: '/res/javascripts/visualization/pathFinding/pathFindingAlgorithm/Dijkstra.js',
		optionDisabled: true,
		function: () => {
			return Dijkstra;
		},
	},
};
