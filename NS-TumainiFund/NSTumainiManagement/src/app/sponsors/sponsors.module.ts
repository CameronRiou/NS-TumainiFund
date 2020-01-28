import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";


import { SponsorsRoutingModule } from "./sponsors-routing.module";
import { SponsorsComponent } from "./sponsors.component";
import { SponsorDetailComponent } from "./sponsor-detail/sponsor-detail.component";
import { SponsorDetailEditComponent } from "./sponsor-detail-edit/sponsor-detail-edit.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SponsorsRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        SponsorsComponent,
        SponsorDetailComponent,
        SponsorDetailEditComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SponsorsModule { }