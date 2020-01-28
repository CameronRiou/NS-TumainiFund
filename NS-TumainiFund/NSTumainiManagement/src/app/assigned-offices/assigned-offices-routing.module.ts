import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

/************** Components ***************/
import { AssignedOfficesComponent } from "./assigned-offices.component";
import { AssignedOfficeDetailComponent } from "./assigned-office-detail/assigned-office-detail.component";
import { AssignedOfficeDetailEditComponent } from "./assigned-office-detail-edit/assigned-office-detail-edit.component";

/************** Routes ***************/
const routes: Routes = [
    { path: "", component: AssignedOfficesComponent },
    { path: "assigned-office-detail/:id", component: AssignedOfficeDetailComponent },
    { path: "assigned-office-detail-edit/:id", component: AssignedOfficeDetailEditComponent }
];

/************** Module initialisation ***************/
@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AssignedOfficesRoutingModule { }
