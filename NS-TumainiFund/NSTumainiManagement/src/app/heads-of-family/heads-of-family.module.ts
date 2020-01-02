import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ChildrenRoutingModule } from './heads-of-family-routing.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular/listview-directives';
import { HeadsOfFamilyComponent } from './heads-of-family.component';
import { HeadOfFamilyDetailComponent } from './head-of-family-detail/head-of-family-detail.component';
import { HeadOfFamilyDetailEditComponent } from './head-of-family-detail-edit/head-of-family-detail-edit.component';

@NgModule({
	imports: [
        NativeScriptCommonModule,
        ChildrenRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        HeadsOfFamilyComponent,
        HeadOfFamilyDetailComponent,
        HeadOfFamilyDetailEditComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HeadsOfFamilyModule { }
