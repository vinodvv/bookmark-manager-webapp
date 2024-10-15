// Add Bookmark
function addBookmark() {
    // Get the values from the input fields
    const siteName = document.getElementById('site-name').value;
    const siteURL = document.getElementById('site-url').value;

    // Validate inputs
    if (!siteName || !siteURL) {
        alert('Please fill in both fields');
        return;
    }

    // Create bookmark object
    const bookmark = {
        name: siteName,
        url: siteURL
    };

    // Store bookmark in localStorage
    if (localStorage.getItem('bookmarks') === null) {
        const bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear input fields
    document.getElementById('site-name').value = '';
    document.getElementById('site-url').value = '';

    // Re-fetch bookmarks
    fetchBookmarks();
}

// Fetch and display bookmarks
function fetchBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    const bookmarksList = document.getElementById('bookmarks-list');
    bookmarksList.innerHTML = '';

    bookmarks.forEach((bookmark, index) => {
        bookmarksList.innerHTML += `
            <div class="bookmark">
                <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
                <button onclick="deleteBookmark(${index})">Delete</button>
            </div>
        `;
    });
}

// Delete bookmark
function deleteBookmark(index) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

// Load bookmarks when the page loads
document.addEventListener('DOMContentLoaded', fetchBookmarks);
