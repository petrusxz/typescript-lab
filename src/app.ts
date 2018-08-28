class App {

    noteForm = <HTMLInputElement>document.querySelector('#note-form');
    noteInput = <HTMLInputElement>document.querySelector('#note-input');
    noteList = <HTMLInputElement>document.querySelector('#note-list');

    constructor() {
        this.noteForm.addEventListener('submit', this.updateList.bind(this), true);
    }

    updateList(e: Event): void {
        e.preventDefault();

        const { id, value } = this.assignItemValues(this.noteInput.value);
        const itemExists = this.checkExistingItem(id);
        const node = this.setListItem(id, value);

        this.noteInput.value = '';
        if (!itemExists) {
            this.noteList.appendChild(node);
        }
    }

    assignItemValues(value: string): { id: string, value: string } {
        return {
            id: value.toLocaleLowerCase().replace(/\s+/g, ''),
            value: value
        };
    }

    checkExistingItem(id: string): boolean {
        const foundId = document.querySelector(`#${id}`) as HTMLInputElement;
        return !!foundId;
    }

    setListItem(id: string, value: string): Node {
        const node = document.createElement('li');
        node.id = id;
        node.textContent = value;
        node.addEventListener('click', this.deleteListItem.bind(this), true);
        return node;
    }

    deleteListItem(event: Event): void {
        const item = event.target as HTMLInputElement;
        item.remove();
    }
}

new App();