import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {
    ErrorTemplateComponent,
    InfoTemplateComponent,
    SuccessTemplateComponent,
    WarningTemplateComponent
} from './message-template.component';

@Injectable()
export class MessageTemplateService {
    private _config: MatSnackBarConfig = {
        duration: 2500,
        horizontalPosition: 'end',
        verticalPosition: 'top',
    };

    constructor(private snackbar: MatSnackBar) { }

    public success(message = 'Successful') {
        this._config.data = message;
        this.snackbar.openFromComponent(SuccessTemplateComponent, this._config);
    }

    public error(message = 'Error') {
        this._config.data = message;
        this.snackbar.openFromComponent(ErrorTemplateComponent, this._config);
    }

    public warning(message = 'Warning') {
        this._config.data = message;
        this.snackbar.openFromComponent(WarningTemplateComponent, this._config);
    }

    public info(message = 'Info') {
        this._config.data = message;
        this.snackbar.openFromComponent(InfoTemplateComponent, this._config);
    }
}
