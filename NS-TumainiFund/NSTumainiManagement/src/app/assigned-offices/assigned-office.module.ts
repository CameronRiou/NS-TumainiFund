import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";


import { AssignedOfficesRoutingModule } from "./assigned-offices-routing.module";
import { AssignedOfficesComponent } from "./assigned-offices.component";
import { AssignedOfficeDetailComponent } from "./assigned-office-detail/assigned-office-detail.component";
import { AssignedOfficeDetailEditComponent } from "./assigned-office-detail-edit/assigned-office-detail-edit.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AssignedOfficesRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        AssignedOfficesComponent,
        AssignedOfficeDetailComponent,
        AssignedOfficeDetailEditComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AssignedOfficesModule { }