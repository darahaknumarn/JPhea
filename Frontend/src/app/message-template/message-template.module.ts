import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedMaterialModule} from '@hanumantech/core-frontend/src/lib/shared/shared-material.module';
import {MessageTemplateService} from './message-template.service';
import {
    ErrorTemplateComponent,
    InfoTemplateComponent, MessageTemplateComponent,
    SuccessTemplateComponent,
    WarningTemplateComponent
} from './message-template.component';

@NgModule({
    declarations: [
        SuccessTemplateComponent,
        InfoTemplateComponent,
        ErrorTemplateComponent,
        WarningTemplateComponent,
        MessageTemplateComponent
    ],
    imports: [
        FlexLayoutModule,
        SharedMaterialModule,
    ],
    providers: [MessageTemplateService],
    entryComponents: [
        SuccessTemplateComponent,
        InfoTemplateComponent,
        ErrorTemplateComponent,
        WarningTemplateComponent
    ]
})
export class MessageTemplateModule {

}
