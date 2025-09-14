import EntryManager from './entryManager.js';
import messages from '../lang/messages/en/user.js';
const entryManager = new EntryManager();

// Hook up buttons
if (entryManager.saveBtn && entryManager.removeBtn) {
    entryManager.saveBtn.addEventListener('click', () => entryManager.writeData());
    entryManager.removeBtn.addEventListener('click', () => entryManager.removeData());
}

// Initial display
entryManager.displayEntries();

// Listen for localStorage changes from other tabs/windows
// On reader page, display entries on load
if (entryManager.Container || entryManager.output) {
    entryManager.displayEntries();
    //this approach was aided by chatGPT
    window.addEventListener('storage', function (e) {
        if (e.key === 'entries') {
            entryManager.entries = JSON.parse(localStorage.getItem('entries')) || [];
            entryManager.displayEntries();

        }
        let date = new Date()
        date = date.toLocaleString();
        entryManager.refreshedAt.textContent = `${messages.PAGE_REFRESHED} ${date}`;
    });
}

