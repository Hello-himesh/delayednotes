async function getentries(){
	try{
		const respo = await fetch(entries.json);
		const data = await respo.json();
		const entries = data.entries.reverse();
		const etriesdiv = document.getElementById('entries');
		entriesdiv.innerHTML = '';
		for (let file in entries){
			const entryrespo = await fetch('noto_entries/${file}');
			const entrytext = entryrespo.text();
			const formatedtext = entrytext
				.replace(/#(.#?)$/gm, '<h2>$1</h2>')
				.replace(/\n/g, '<br>');
			const entrydiv = document.createElement('div');
			entrydiv.innerHTML = formatedtext;
			entrydiv.style.marginBottom ="20px";
			entriesdiv.appendChild(entrydiv);
		}
	}catch(error){
		console.error("Error loading journal", error);
	}
}	
window.onload = getentries;