import {Component, Inject, Input} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

abstract class MessageTemplate {
    public abstract getBackgroundColor(): string;
}

@Component({
    selector: 'app-message-template',
    template: `
        <div [style.background-color]="background" class="template-container" fxLayout="row" fxLayoutAlign="space-between center">
            <div fxFlexAlign="center" style="margin: .5rem .5rem 0 .5rem">
                <h4>{{message}}</h4>
            </div>
            <button mat-icon-button>
                <mat-icon>{{icon}}</mat-icon>
            </button>
        </div>
    `,
    styles: [`
        .template-container {
            color: #FFFFFF;
            border-radius: 4px;
            padding: .2rem;
        }
    `]
})
export class MessageTemplateComponent {

    @Input() background: string;
    @Input() icon: string;

    constructor(@Inject(MAT_SNACK_BAR_DATA) public message: string) {}

}

@Component({
    selector: 'app-success-template',
    template: `
        <app-message-template [background]="getBackgroundColor()" [icon]="'done'"></app-message-template>
    `
})
export class SuccessTemplateComponent extends MessageTemplate {

    getBackgroundColor(): string {
        return '#4caf50';
    }

}

@Component({
    selector: 'app-info-template',
    template: `
        <app-message-template [background]="getBackgroundColor()" [icon]="'info'"></app-message-template>
    `
})
export class InfoTemplateComponent extends MessageTemplate {

    getBackgroundColor(): string {
        return '#3f51b5';
    }

}

@Component({
    selector: 'app-warning-template',
    template: `
        <app-message-template [background]="getBackgroundColor()" [icon]="'warning'"></app-message-template>
    `
})
export class WarningTemplateComponent extends  MessageTemplate {

    getBackgroundColor(): string {
        return '#FFC107';
    }

}

@Component({
    selector: 'app-error-template',
    template: `
        <app-message-template [background]="getBackgroundColor()" [icon]="'error'"></app-message-template>
    `
})
export class ErrorTemplateComponent extends MessageTemplate {

    getBackgroundColor(): string {
        return '#f44336';
    }

}
