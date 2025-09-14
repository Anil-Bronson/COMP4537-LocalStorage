import messages from '../lang/messages/en/user.js';

// This class handles data operations
// It does not handle any UI logic
// UI logic is handled in entryManager which extends this class
export default class DataManager {

    constructor() {

        this.output         = document.getElementById('output');
        this.entryContainer = document.getElementById('entry-container');
        this.storedAt       = document.getElementById('stored-at');
        this.refreshedAt    = document.getElementById('refreshed-at');
        this.inputContainer = document.getElementById('input-container');
        this.valueInput     = document.getElementById('valueInput');
        this.entries        = JSON.parse(localStorage.getItem('entries')) || [];
    }
    
    readData() {
        const found = entries.find(entry => entry.key === key);

        if (found) {
            output.textContent = `${found.value}`;
        } 
        else {
            output.textContent = messages.NO_VALUE;
        }
    }

    writeData() {
        const value = valueInput.value.trim();

        if (!value) {
            alert(messages.PLEASE_ENTER_VALUE);
            return;
        }

        // Generate unique key (timestamp)
        const key = Date.now().toString();

        this.entries.push({ key, value });
        localStorage.setItem('entries', JSON.stringify(this.entries));

        // Clear + hide input
        this.valueInput.value = "";
        this.inputContainer.style.display = 'none';

        this.displayEntries(); 

        let date = new Date()
        date = date.toLocaleString();
        this.storedAt.textContent = `${messages.ENTRY_STORED} ${date}`;
    }

    removeData() {
        if (this.entries.length === 0) {
            this.output.textContent = messages.NO_ENTRIES_TO_REMOVE;
            return;
        }

        localStorage.setItem('entries', JSON.stringify(this.entries));

        this.displayEntries(); 
    }
    // Placeholder method to be overridden in subclass
    displayEntries() {}

}