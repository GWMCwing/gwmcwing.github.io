function importSortingOnLoadRun() {
	const sortingAlgorithmScriptDiv = document.getElementById(
		'sortingAlgorithmScript'
	);
	const sortingOptionsValues = Object.values(sortingOptions);
	const sortingOptionsValuesLen = sortingOptionsValues.length;
	for (let i = 0; i < sortingOptionsValuesLen; i++) {
		const script = document.createElement('script');
		script.src = sortingOptionsValues[i].src;
		sortingAlgorithmScriptDiv.appendChild(script);
	}
}
importSortingOnLoadRun();
