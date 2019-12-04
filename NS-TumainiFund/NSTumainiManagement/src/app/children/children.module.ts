import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";


import { ChildrenRoutingModule } from "./children-routing.module";
import { ChildrenComponent } from "./children.component";
import { ChildDetailComponent } from "./child-detail/child-detail.component";
import { CarDetailEditComponent } from "./car-detail-edit/car-detail-edit.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ChildrenRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
    ],
    declarations: [
        ChildrenComponent,
        ChildDetailComponent,
        CarDetailEditComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ChildrenModule { }