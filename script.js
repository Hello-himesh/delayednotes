async function getEntries() {
    try {
        // Fetch the list of entries from entries.json
        const respo = await fetch('entries.json');
        const data = await respo.json();
        const entries = data.entries.reverse(); // Show newest first

        const entriesdiv = document.getElementById('entries');
        entriesdiv.innerHTML = ''; // Clear previous content

        for (let file of entries) { // Use "of" instead of "in"
            const entryrespo = await fetch(`noto_entries/${file}`);
            if (!entryrespo.ok) continue; // Skip missing files

            const entrytext = await entryrespo.text();

            // Format Markdown-style titles
            const formatedtext = entrytext
                .replace(/^# (.*?)$/gm, '<h2>$1</h2>') // Convert # Title to <h2>
                .replace(/\n/g, '<br>'); // Convert line breaks

            const entrydiv = document.createElement('div');
            entrydiv.innerHTML = formatedtext;
            entrydiv.style.marginBottom = "20px";

            entriesdiv.appendChild(entrydiv);
        }
    } catch (error) {
        console.error("Error loading journal", error);
    }
}

window.onload = getEntries;
