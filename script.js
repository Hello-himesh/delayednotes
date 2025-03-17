document.addEventListener("DOMContentLoaded", function () {
    const entriesContainer = document.getElementById("entries");
    entriesContainer.innerHTML = "<p>Loading journal entries...</p>";

    async function fetchJournalEntries() {
        try {
            // Step 1: Fetch the JSON file
            const response = await fetch("entries.json");
            if (!response.ok) throw new Error("Failed to load journal entries");

            // Step 2: Parse JSON data
            const data = await response.json();
            const entries = data.entries; // Extract the list of entries

            if (entries.length === 0) {
                entriesContainer.innerHTML = "<p>No journal entries found.</p>";
                return;
            }

            // Step 3: Fetch each Markdown file and display it
            let contentHTML = "";
            for (let entry of entries) {
                const fileResponse = await fetch(entry.file);
                if (!fileResponse.ok) continue;

                const entryText = await fileResponse.text();

                // Step 4: Display each journal entry
                contentHTML += `
                    <div class="entry">
                        <h3>${entry.title} (${entry.date})</h3>
                        <pre>${entryText}</pre>
                    </div>
                `;
            }

            // Step 5: Update the page with the entries
            entriesContainer.innerHTML = contentHTML || "<p>No valid entries found.</p>";

        } catch (error) {
            console.error("Error fetching journal entries:", error);
            entriesContainer.innerHTML = "<p>Error loading journal entries.</p>";
        }
    }

    fetchJournalEntries();
});
