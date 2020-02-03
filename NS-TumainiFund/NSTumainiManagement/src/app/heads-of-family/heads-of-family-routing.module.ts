import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

/************** Components ***************/
import { HeadsOfFamilyComponent } from "./heads-of-family.component";
import { HeadOfFamilyDetailComponent } from "./head-of-family-detail/head-of-family-detail.component";
import { HeadOfFamilyDetailEditComponent } from "./head-of-family-detail-edit/head-of-family-detail-edit.component";

/************** Routes ***************/
const routes: Routes = [
    { path: "", component: HeadsOfFamilyComponent },
    { path: "head-of-family-detail/:id", component: HeadOfFamilyDetailComponent },
    { path: "head-of-family-detail-edit/:id", component: HeadOfFamilyDetailEditComponent }
];

/************** Module initialization ***************/
@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ChildrenRoutingModule { }
