import * as app from "tns-core-modules/application";
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array";

/************** Plugins ***************/
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ListViewEventData } from "nativescript-ui-listview";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";

/************** Models and Services ***************/
import { Sponsor } from "./shared/sponsor.model";
import { SponsorService } from "./shared/sponsor.service";

/************** Component Creation ***************/
@Component({
    selector: "Sponsors",
    templateUrl: "./sponsors.component.html",
    styleUrls: ["./sponsors-list.component.scss"]
})

export class SponsorsComponent implements OnInit {

    /************** Variable Initiation ***************/
    private _isLoading: boolean = false;
    private _sponsors: ObservableArray<Sponsor> = new ObservableArray<Sponsor>([]);
    private _feedback : Feedback;

    /************** Constructor ***************/
    constructor(
        private _sponsorService: SponsorService,
        private _routerExtensions: RouterExtensions
    ) { 
        this._feedback = new Feedback();
    }

    /************** On Init ***************/
    ngOnInit(): void {
        this._isLoading = true;

        this._sponsorService.load()
            .then((sponsors: Array<Sponsor> ) => {
                this._sponsors = new ObservableArray(sponsors);
                this._isLoading = false;
            })
            .catch((e) => {
                this._feedback.error({
                    title: "Connection Error",
                    message: "Failed to connect to sponsors DB"
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

    onSponsorItemTap(args: ListViewEventData): void {
        const tappedSponsorItem = args.view.bindingContext;
        this._routerExtensions.navigate(["/sponsors/sponsor-detail", tappedSponsorItem.id],
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
    get sponsors(): ObservableArray<Sponsor> {
        return this._sponsors;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }
}
