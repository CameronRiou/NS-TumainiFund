import * as app from "tns-core-modules/application";
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array";

/************** Plugins ***************/
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ListViewEventData } from "nativescript-ui-listview";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";

/************** Models and Services ***************/
import { AssignedOffice } from "./shared/assigned-office.model";
import { AssignedOfficeService } from "./shared/assigned-office.service";

/************** Component Creation ***************/
@Component({
    selector: "AssignedOffices",
    templateUrl: "./assigned-offices.component.html",
    styleUrls: ["./assigned-offices-list.component.scss"]
})

export class AssignedOfficesComponent implements OnInit {

    /************** Variable Initiation ***************/
    private _isLoading: boolean = false;
    private _assigned_offices: ObservableArray<AssignedOffice> = new ObservableArray<AssignedOffice>([]);
    private _feedback : Feedback;

    /************** Constructor ***************/
    constructor(
        private _assigned_officeService: AssignedOfficeService,
        private _routerExtensions: RouterExtensions
    ) { 
        this._feedback = new Feedback();
    }

    /************** On Init ***************/
    ngOnInit(): void {
        this._isLoading = true;

        this._assigned_officeService.load()
            .then((assigned_offices: Array<AssignedOffice> ) => {
                this._assigned_offices = new ObservableArray(assigned_offices);
                this._isLoading = false;
            })
            .catch((e) => {
                this._feedback.error({
                    title: "Connection Error",
                    message: "Failed to connect to assigned-offices DB"
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

    onAssignedOfficeItemTap(args: ListViewEventData): void {
        const tappedAssignedOfficeItem = args.view.bindingContext;
        this._routerExtensions.navigate(["/assigned-offices/assigned-office-detail", tappedAssignedOfficeItem.id],
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
    get assigned_offices(): ObservableArray<AssignedOffice> {
        return this._assigned_offices;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }
}
