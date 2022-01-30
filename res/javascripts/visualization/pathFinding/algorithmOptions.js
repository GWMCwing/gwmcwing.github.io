/**
 * saved all the sorting algorithms in an object
 */
const algorithmOptions = {
	'A Star': {
		algorithmName: 'A Star',
		src: '/res/javascripts/visualization/pathFinding/pathFindingAlgorithm/AStar.js',
		optionDisabled: true,
		function: () => {
			return new AStar();
		},
	},
	Dijkstra: {
		algorithmName: 'Dijkstra',
		src: '/res/javascripts/visualization/pathFinding/pathFindingAlgorithm/Dijkstra.js',
		optionDisabled: true,
		function: () => {
			return new Dijkstra();
		},
	},
};
