import * as app from "tns-core-modules/application";
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array";

/************** Plugins ***************/
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ListViewEventData } from "nativescript-ui-listview";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";

/************** Models and Services ***************/
import { HeadOfFamily } from "./shared/head-of-family.model";
import { HeadOfFamilyService } from "./shared/head-of-family.service";

/************** Component Creation ***************/
@Component({
    selector: "HeadsOfFamily",
    templateUrl: "./heads-of-family.component.html",
    styleUrls: ["./heads-of-family-list.component.scss"]
})

export class HeadsOfFamilyComponent implements OnInit {

    /************** Variable Initiation ***************/
    private _isLoading: boolean = false;
    private _HeadsOfFamily: ObservableArray<HeadOfFamily> = new ObservableArray<HeadOfFamily>([]);
    private _feedback : Feedback;

    /************** Constructor ***************/
    constructor(
        private _HeadOfFamilyService: HeadOfFamilyService,
        private _routerExtensions: RouterExtensions
    ) { 
        this._feedback = new Feedback();
    }

    /************** On Init ***************/
    ngOnInit(): void {
        this._isLoading = true;

        this._HeadOfFamilyService.load()
            .then((HeadsOfFamily: Array<HeadOfFamily> ) => {
                this._HeadsOfFamily = new ObservableArray(HeadsOfFamily);
                this._isLoading = false;
            })
            .catch((e) => {
                this._feedback.error({
                    title: "Connection Error",
                    message: "Failed to connect to child DB"
                })
                console.log(e)
                this._isLoading = false;
            });
    }

    /************** Functions ***************/
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onHeadOfFamilyItemTap(args: ListViewEventData): void {
        const tappedHeadOfFamilyItem = args.view.bindingContext;
        this._routerExtensions.navigate(["/heads-of-family/head-of-family-detail", tappedHeadOfFamilyItem.id],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            }
        );
    }

    /************** Getters ***************/
    get headsoffamily(): ObservableArray<HeadOfFamily> {
        return this._HeadsOfFamily;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }
}
