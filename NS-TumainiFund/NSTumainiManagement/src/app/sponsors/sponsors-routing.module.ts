import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

/************** Components ***************/
import { SponsorsComponent } from "./sponsors.component";
import { SponsorDetailComponent } from "./sponsor-detail/sponsor-detail.component";
import { SponsorDetailEditComponent } from "./sponsor-detail-edit/sponsor-detail-edit.component";

/************** Routes ***************/
const routes: Routes = [
    { path: "", component: SponsorsComponent },
    { path: "sponsor-detail/:id", component: SponsorDetailComponent },
    { path: "sponsor-detail-edit/:id", component: SponsorDetailEditComponent }
];

/************** Module initialization ***************/
@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SponsorsRoutingModule { }
