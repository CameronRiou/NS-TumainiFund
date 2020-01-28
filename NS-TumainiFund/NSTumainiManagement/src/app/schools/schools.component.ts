import * as app from "tns-core-modules/application";
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array";

/************** Plugins ***************/
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ListViewEventData } from "nativescript-ui-listview";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";

/************** Models and Services ***************/
import { School } from "./shared/school.model";
import { SchoolService } from "./shared/school.service";

/************** Component Creation ***************/
@Component({
    selector: "Schools",
    templateUrl: "./schools.component.html",
    styleUrls: ["./schools-list.component.scss"]
})

export class SchoolsComponent implements OnInit {

    /************** Variable Initiation ***************/
    private _isLoading: boolean = false;
    private _schools: ObservableArray<School> = new ObservableArray<School>([]);
    private _feedback : Feedback;

    /************** Constructor ***************/
    constructor(
        private _schoolService: SchoolService,
        private _routerExtensions: RouterExtensions
    ) { 
        this._feedback = new Feedback();
    }

    /************** On Init ***************/
    ngOnInit(): void {
        this._isLoading = true;

        this._schoolService.load()
            .then((schools: Array<School> ) => {
                this._schools = new ObservableArray(schools);
                this._isLoading = false;
            })
            .catch((e) => {
                this._feedback.error({
                    title: "Connection Error",
                    message: "Failed to connect to schools DB"
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

    onSchoolItemTap(args: ListViewEventData): void {
        const tappedSchoolItem = args.view.bindingContext;
        this._routerExtensions.navigate(["/schools/school-detail", tappedSchoolItem.id],
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
    get schools(): ObservableArray<School> {
        return this._schools;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }
}
