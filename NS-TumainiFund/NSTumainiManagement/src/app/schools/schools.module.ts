import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";


import { SchoolsRoutingModule } from "./schools-routing.module";
import { SchoolsComponent } from "./schools.component";
import { SchoolDetailComponent } from "./school-detail/school-detail.component";
import { SchoolDetailEditComponent } from "./school-detail-edit/school-detail-edit.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SchoolsRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        SchoolsComponent,
        SchoolDetailComponent,
        SchoolDetailEditComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SchoolsModule { }