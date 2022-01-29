/**
 * saved all the sorting algorithms in an object
 */
const sortingOptions = {
	'Bubble Sort': {
		algorithmName: 'Bubble Sort',
		src: '/res/javascripts/visualization/sorting/sortingAlgorithm/bubbleSort.js',
		function: (sortingSpeed, listObj, originalList) => {
			return new bubbleSort(sortingSpeed, listObj, originalList);
		},
		optionDisabled: false,
	},
	'Insertion Sort': {
		algorithmName: 'Insertion Sort',
		src: '/res/javascripts/visualization/sorting/sortingAlgorithm/insertionSort.js',
		function: (sortingSpeed, listObj, originalList) => {
			return new insertionSort(sortingSpeed, listObj, originalList);
		},
		optionDisabled: false,
	},
	'Selection Sort': {
		algorithmName: 'Selection Sort',
		src: '/res/javascripts/visualization/sorting/sortingAlgorithm/selectionSort.js',
		function: (sortingSpeed, listObj, originalList) => {
			return new selectionSort(sortingSpeed, listObj, originalList);
		},
		optionDisabled: false,
	},
	'Merge Sort': {
		algorithmName: 'Merge Sort',
		src: '/res/javascripts/visualization/sorting/sortingAlgorithm/mergeSort.js',
		function: (sortingSpeed, listObj, originalList) => {
			return new mergeSort(sortingSpeed, listObj, originalList);
		},
		optionDisabled: true,
	},
	'Quick Sort': {
		algorithmName: 'Quick Sort',
		src: '/res/javascripts/visualization/sorting/sortingAlgorithm/quickSort.js',
		function: (sortingSpeed, listObj, originalList) => {
			return new quickSort(sortingSpeed, listObj, originalList);
		},
		optionDisabled: true,
	},
	'Radix Sort': {
		algorithmName: 'Radix Sort',
		src: '/res/javascripts/visualization/sorting/sortingAlgorithm/radixSort.js',
		function: (sortingSpeed, listObj, originalList) => {
			return new radixSort(sortingSpeed, listObj, originalList);
		},
		optionDisabled: true,
	},
};
