import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

/************** Components ***************/
import { ParishWorkersComponent } from "./parish-workers.component";
import { ParishWorkerDetailComponent } from "./parish-worker-detail/parish-worker-detail.component";
import { ParishWorkerDetailEditComponent } from "./parish-worker-detail-edit/parish-worker-detail-edit.component";

/************** Routes ***************/
const routes: Routes = [
    { path: "", component: ParishWorkersComponent },
    { path: "parish-worker-detail/:id", component: ParishWorkerDetailComponent },
    { path: "parish-worker-detail-edit/:id", component: ParishWorkerDetailEditComponent }
];

/************** Module initialisation ***************/
@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ParishWorkersRoutingModule { }
