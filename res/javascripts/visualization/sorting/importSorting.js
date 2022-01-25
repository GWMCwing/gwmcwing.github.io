const sortingAlgorithmScriptDiv = document.getElementById(
	'sortingAlgorithmScript'
);
for (let i = 0; i < sortingOptions.length; i++) {
	const script = document.createElement('script');
	script.src = sortingOptions[i].src;
	sortingAlgorithmScriptDiv.appendChild(script);
}
