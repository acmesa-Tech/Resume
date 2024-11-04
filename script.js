document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar li');
    const contentSections = document.querySelectorAll('.content .section');

    // Function to load content from HTML file
    function loadContent(targetId) {
        if (targetId !== 'resume') {
            fetch(`https://acmesa-Tech.github.com/acmesa-Tech/Resume/master/${targetId}.html`)
                .then(response => response.text())
                .then(html => {
                    document.getElementById('loaded_area').innerHTML = html;
    //            document.getElementById('footer').innerHTML = '<p>Select Home section to go back.</p>';
})
                .catch(error => {
                    console.error('Error loading content:', error);
                    document.getElementById('content').innerHTML = '<p>Error loading content.</p>';
                });
        }
        else
        {
            fetch(`https://acmesa-Tech.github.com/acmesa-Tech/Resume/master/home.html`)
            .then(response => response.text())
            .then(html => {
                document.getElementById('loaded_area').innerHTML = html;
  //              document.getElementById('footer').innerHTML = '<p>Select a section from the sidebar to view details.</p>';
            })
            .catch(error => {
                console.error('Error loading content:', error);
                document.getElementById('content').innerHTML = '<p>Error loading content.</p>';
            });
        }
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const targetId = link.dataset.target;
            loadContent(targetId);
        });
    });

    // Initial content load (for the default "Resume" section)
    loadContent('resume'); 
});

function loadContent(targetId) {
 //   if (targetId !== 'Resume') {
        fetch(`${targetId}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                document.getElementById('content').innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading content:', error);
                document.getElementById('content').innerHTML = `<p>Error loading content: ${error.message}</p>`;
            });
    if (targetId !== 'Resume') {
        document.getElementById('footer').innerHTML = ' <p>References Available upon request.</p>';
    }
}
