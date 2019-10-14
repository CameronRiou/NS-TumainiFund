import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ChildrenComponent } from "./children.component";
import { ChildDetailComponent } from "./child-detail/child-detail.component";
import { CarDetailEditComponent } from "./car-detail-edit/car-detail-edit.component";

const routes: Routes = [
    { path: "", component: ChildrenComponent },
    { path: "child-detail/:id", component: ChildDetailComponent },
    { path: "child-detail-edit/:id", component: CarDetailEditComponent }, 

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ChildrenRoutingModule { }
