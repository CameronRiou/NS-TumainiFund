import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/children", pathMatch: "full" },
    // { path: "", redirectTo: "/heads-of-family", pathMatch: "full" },
    // { path: "home", loadChildren: () => import("~/app/home/home.module").then(m => m.HomeModule) },
    { path: "children", loadChildren: () => import("~/app/children/children.module").then(m => m.ChildrenModule) },
    { path: "browse", loadChildren: () => import("~/app/browse/browse.module").then(m => m.BrowseModule) },
    { path: "search", loadChildren: () => import("~/app/search/search.module").then(m => m.SearchModule) },
    { path: "featured", loadChildren: () => import("~/app/featured/featured.module").then(m => m.FeaturedModule) },
	{ path: "settings", loadChildren: () => import("~/app/settings/settings.module").then(m => m.SettingsModule) },
	{ path: "heads-of-family", loadChildren: () => import("~/app/heads-of-family/heads-of-family.module").then(m => m.HeadsOfFamilyModule) },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
