// Function to load content from HTML file
function loadContent(targetId) {
    // Determine the file name using the targetId from the list item.
    // Since your target files are capitalized (Home.html, Summary.html),
    // we use the targetId directly for the fetch.
    const fileName = `${targetId}.html`;

    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                // Log a more informative error message to help troubleshoot 404s
                throw new Error(`Network response was not ok: ${response.statusText}. Check file path and case (expected: ${targetId}.html)`);
            }
            return response.text();
        })
        .then(html => {
            // The content is loaded into the main section
            document.getElementById('loaded_area').innerHTML = html;
            
            // Note: The footer logic in your original script was inconsistent and removed 
            // for simplicity. You can add a single, consistent footer update here if needed.
        })
        .catch(error => {
            console.error('Error loading content:', error);
            document.getElementById('loaded_area').innerHTML = `<p>Error loading content: ${error.message}</p>`;
        });
}

// Event listener to run code after the page structure is loaded
document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar li');

    // 1. Set up click handlers for all sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove 'active' class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Add 'active' class to the clicked link
            link.classList.add('active');

            const targetId = link.dataset.target; // e.g., 'Home', 'Summary'
            loadContent(targetId);
        });
    });

    // 2. FIX: Initial content load
    // The link in index.html is marked 'active' and has data-target="Home".
    // This call ensures Home.html is the first file loaded, fixing the initial 404.
    loadContent('Home'); 
});