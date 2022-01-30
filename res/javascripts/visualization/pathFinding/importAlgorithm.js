function importAlgorithm() {
	const pathFindingAlgorithmScriptDiv = document.getElementById(
		'pathFindingAlgorithmScript'
	);
	const pathFindingOptionsValues = Object.values(algorithmOptions);
	const pathFindingOptionsValuesLen = pathFindingOptionsValues.length;
	for (let i = 0; i < pathFindingOptionsValuesLen; i++) {
		const script = document.createElement('script');
		script.src = pathFindingOptionsValues[i].src;
		pathFindingAlgorithmScriptDiv.appendChild(script);
	}
}
importAlgorithm();
