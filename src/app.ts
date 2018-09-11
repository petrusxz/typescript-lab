import { fromEvent, Observable, interval } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogActionModel } from './models/log-action.model';
import { TypesEnum } from './models/types-enum.model';

class App {

    // You can make the object type explicit with => <"Object Type">
    noteForm = <HTMLInputElement>document.querySelector('#note-form');
    noteInput = <HTMLInputElement>document.querySelector('#note-input');
    noteList = <HTMLInputElement>document.querySelector('#note-list');
    time = <HTMLInputElement>document.querySelector('#time');

    constructor() {
        // Adding a watch to demonstrate Observables
        this.initWatch();

        // Adding Form Submit listener in the class construction | new App()
        // this.noteForm.addEventListener('submit', this.updateList.bind(this), true);
        fromEvent(this.noteForm, 'submit')
            .subscribe((event: Event) => this.updateList(event));
    }

    initWatch(): void {
        // const timer = new Observable((observer) => {
        //     setInterval(() => observer.next(new Date().toTimeString()), 1000);
        // });

        const timer = interval(1000).pipe(
            tap(() => this.time.innerText = new Date().toTimeString())
        );

        const timerSubscription = timer.subscribe();
        // setTimeout(() => timerSubscription.unsubscribe(), 5000);
    }

    updateList(e: Event): void {
        e.preventDefault();

        // Treating null values from input => <input id="note-input" type="text">
        if (!this.noteInput.value) {
            return this.printLog();
        }

        // This creates two variables from the interface returned from the method
        let { id, value } = this.assignItemValues(this.noteInput.value);
        value = value.charAt(0).toUpperCase().concat(value.substr(1));

        const itemExists = this.checkExistingItem(id);
        const node = this.setListItem(id, value);
        this.noteInput.value = '';

        if (!itemExists) {
            this.updateCounter(TypesEnum.Inserted as TypesEnum);
            this.noteList.appendChild(node);

            return this.printLog({ id, value, type: TypesEnum.Inserted });
        }

        this.updateCounter(TypesEnum.Updated as TypesEnum);
        this.printLog({ id, value, type: TypesEnum.Updated });
    }

    // Make a specific object property to "readonly" to prevent edition after construction
    assignItemValues(value: string): { readonly id: string, value: string } {
        return {
            id: value.toLocaleLowerCase().replace(/\s+/g, ''),
            value: value
        };
    }

    checkExistingItem(id: string): boolean {
        // You can also make the type explicit with => as "Object Type"
        const foundId = document.querySelector(`#${id}`) as HTMLInputElement;
        // Use multiple exclamations to convert strings to boolean => '' = false | 'anything' = true
        return !!foundId;
    }

    setListItem(id: string, value: string): Node {
        // <li id="hello" onclick="deleteListItem()">Hello</li>
        const node = document.createElement('li');
        node.id = id;
        node.textContent = value;
        node.addEventListener('click', this.deleteListItem.bind(this), true);
        return node;
    }

    deleteListItem(event: Event): void {
        const item = event.target as HTMLInputElement;
        // You can change a variable name after assigning the values
        const { id, innerText: value } = item;
        item.remove();

        this.updateCounter(TypesEnum.Deleted as TypesEnum);
        this.printLog({ id, value, type: TypesEnum.Deleted });
    }

    updateCounter(type: TypesEnum): void {
        const actionType = TypesEnum[type].toLocaleLowerCase();
        const counter = document.querySelector(`#${actionType}`) as HTMLInputElement;
        counter.innerText = `${+counter.innerText + 1}`;
    }

    // The '?' after a parameter declaration indicates that the same it's optional
    printLog(logAction?: LogActionModel): void {
        let logText = `Log Info: `;

        if (!logAction) {
            logText = logText.concat('Null value ignored');
            return console.log(logText);
        }

        logAction.actionDate = new Date();
        // Use backquotes (`) for embedded expressions, wrapping variables between ${}
        logText = logText.concat(`"${logAction.value}" was ${TypesEnum[logAction.type as TypesEnum]}`);
        logText = logText.concat(` (id: ${logAction.id}) at ${logAction.actionDate.toLocaleString()}`);
        console.log(logText);
    }
}

new App();