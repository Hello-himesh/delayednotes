document.addEventListener("DOMContentLoaded", function () {
    const entriesContainer = document.getElementById("entries");
    entriesContainer.innerHTML = "<p>Loading journal entries...</p>";

    async function fetchJournalEntries() {
        try {
            // Fetch the list of files from "noto_entries/" folder
            const response = await fetch("entries.json");
            if (!response.ok) throw new Error("Failed to fetch file list");

            const text = await response.text();
            console.log("Fetched directory list:", text); // Debugging

            // Extract Markdown filenames using regex
            const filesArray = await response.json();
            console.log("Journal entries:", filesArray);
             // Debugging

            if (filesArray.length === 0) {
                entriesContainer.innerHTML = "<p>No journal entries found.</p>";
                return;
            }

            // Load and display each journal entry
            let contentHTML = "";
            for (let file of filesArray) {
                const fileResponse = await fetch(`noto_entries/${file}`);
                if (!fileResponse.ok) continue;

                const entryText = await fileResponse.text();
                contentHTML += `<div class="entry"><h3>${file.replace(".md", "")}</h3><pre>${entryText}</pre></div>`;
            }

            entriesContainer.innerHTML = contentHTML || "<p>No valid entries found.</p>";
        } catch (error) {
            console.error("Error fetching journal entries:", error);
            entriesContainer.innerHTML = "<p>Error loading journal entries.</p>";
        }
    }

    fetchJournalEntries();
});
