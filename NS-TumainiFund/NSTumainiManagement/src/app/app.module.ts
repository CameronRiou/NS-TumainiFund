import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
// TODO: should be imported from kinvey-nativescript-sdk/angular but declaration file is currently missing
import { KinveyModule } from "kinvey-nativescript-sdk/lib/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";

import { Config } from "./shared/config";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        /* ***********************************************************
        * The {N} Kinvey plugin initialization is explained in the plugin readme here:
        * http://devcenter.kinvey.com/nativescript/guides/getting-started#ConfigureYourApp
        * In this template, Kinvey is set up with a custom existing project, so that
        * You can build and run this template without creating your own Kinvey project.
        *************************************************************/
        KinveyModule.init({
            appKey: Config.kinveyAppKey,
            appSecret: Config.kinveyAppSecret
        }),
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        NativeScriptUIDataFormModule, 
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
