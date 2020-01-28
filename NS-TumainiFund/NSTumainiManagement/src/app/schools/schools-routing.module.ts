import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

/************** Components ***************/
import { SchoolsComponent } from "./schools.component";
import { SchoolDetailComponent } from "./school-detail/school-detail.component";
import { SchoolDetailEditComponent } from "./school-detail-edit/school-detail-edit.component";

/************** Routes ***************/
const routes: Routes = [
    { path: "", component: SchoolsComponent },
    { path: "school-detail/:id", component: SchoolDetailComponent },
    { path: "school-detail-edit/:id", component: SchoolDetailEditComponent }
];

/************** Module initialisation ***************/
@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SchoolsRoutingModule { }
