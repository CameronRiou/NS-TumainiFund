import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

/************** Components ***************/
import { ChildrenComponent } from "./children.component";
import { ChildDetailComponent } from "./child-detail/child-detail.component";
import { ChildDetailEditComponent } from "./child-detail-edit/child-detail-edit.component";

/************** Routes ***************/
const routes: Routes = [
    { path: "", component: ChildrenComponent },
    { path: "child-detail/:id", component: ChildDetailComponent },
    { path: "child-detail-edit/:id", component: ChildDetailEditComponent }
];

/************** Module initialisation ***************/
@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ChildrenRoutingModule { }
