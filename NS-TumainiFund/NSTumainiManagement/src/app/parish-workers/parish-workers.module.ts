import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";


import { ParishWorkersRoutingModule } from "./parish-workers-routing.module";
import { ParishWorkersComponent } from "./parish-workers.component";
import { ParishWorkerDetailComponent } from "./parish-worker-detail/parish-worker-detail.component";
import { ParishWorkerDetailEditComponent } from "./parish-worker-detail-edit/parish-worker-detail-edit.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ParishWorkersRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        ParishWorkersComponent,
        ParishWorkerDetailComponent,
        ParishWorkerDetailEditComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ParishWorkersModule { }