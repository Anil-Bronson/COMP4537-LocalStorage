import messages from '../lang/messages/en/user.js';
import DataManager from './dataManager.js';

//extends because it is the UI logic and 
export default class entryManager extends DataManager {
    constructor() {
        super();
        this.addBtn    = document.getElementById('add-btn');
        this.saveBtn   = document.getElementById('save-btn');
        this.removeBtn = document.getElementById('remove-btn');

        // Show input box when Add is clicked
        if (this.addBtn) {
            this.addBtn.addEventListener('click', () => {
                this.inputContainer.style.display = 'block';
                this.valueInput.focus();
            });
        }

    }

    displayEntries() {
        const container = this.entryContainer || this.output;
        container.innerHTML = '';
        if (this.entries.length !== 0 && this.entryContainer) {
            this.entryContainer.style.display = 'block';
        }

        this.entries.forEach(entry => {
            const entryElem = this.createEntryElement(entry);
            container.appendChild(entryElem);
        });
    }

    createEntryElement(entry) {
        // Create a wrapper for the entry and button
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.gap = '10px';

        const div = document.createElement('div');
        div.className = 'entry';
        div.textContent = entry.value;
        wrapper.appendChild(div);

        // Only add remove button if on writer page
        if (this.removeBtn) {
            const removeEntryBtn = document.createElement('button');
            removeEntryBtn.textContent = 'Remove';
            removeEntryBtn.className = 'remove-btn';
            removeEntryBtn.addEventListener('click', () => {
                this.entries = this.entries.filter(e => e.key !== entry.key);
                localStorage.setItem('entries', JSON.stringify(this.entries));
                this.displayEntries();
            });

            wrapper.appendChild(removeEntryBtn);
        }

        return wrapper;
    }

}
