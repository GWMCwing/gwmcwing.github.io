const sortingOptions = {
	'Bubble Sort': {
		algorithmName: 'Bubble Sort',
		src: '/res/javascripts/visualization/sorting/sortingAlgorithm/bubbleSort.js',
		function: (sortingSpeed, listObj, originalList) => {
			return new bubbleSort(sortingSpeed, listObj, originalList);
		},
	},
	'Insertion Sort': {
		algorithmName: 'Insertion Sort',
		src: '/res/javascripts/visualization/sorting/sortingAlgorithm/insertionSort.js',
		function: () => {
			alert('not implemented');
			return null;
		},
	},
	'Selection Sort': {
		algorithmName: 'Selection Sort',
		src: '/res/javascripts/visualization/sorting/sortingAlgorithm/selectionSort.js',
		function: () => {
			alert('not implemented');
			return null;
		},
	},
	'Merge Sort': {
		algorithmName: 'Merge Sort',
		src: '/res/javascripts/visualization/sorting/sortingAlgorithm/mergeSort.js',
		function: () => {
			alert('not implemented');
			return null;
		},
	},
	'Quick Sort': {
		algorithmName: 'Quick Sort',
		src: '/res/javascripts/visualization/sorting/sortingAlgorithm/quickSort.js',
		function: () => {
			alert('not implemented');
			return null;
		},
	},
};
