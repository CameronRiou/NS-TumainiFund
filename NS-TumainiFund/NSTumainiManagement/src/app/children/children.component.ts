import * as app from "tns-core-modules/application";
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array";

/************** Plugins ***************/
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ListViewEventData } from "nativescript-ui-listview";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";

/************** Models and Services ***************/
import { Child } from "./shared/child.model";
import { ChildService } from "./shared/child.service";

/************** Component Creation ***************/
@Component({
    selector: "Children",
    templateUrl: "./children.component.html",
    styleUrls: ["./children-list.component.scss"]
})

export class ChildrenComponent implements OnInit {

    /************** Variable Initiation ***************/
    private _isLoading: boolean = false;
    private _children: ObservableArray<Child> = new ObservableArray<Child>([]);
    private _feedback : Feedback;

    /************** Constructor ***************/
    constructor(
        private _childService: ChildService,
        private _routerExtensions: RouterExtensions
    ) { 
        this._feedback = new Feedback();
    }

    /************** On Init ***************/
    ngOnInit(): void {
        this._isLoading = true;

        this._childService.load()
            .then((children: Array<Child> ) => {
                this._feedback.success({
                    title: "Connected Successfully",
                    message: "Connected to child DB"
                })
                this._children = new ObservableArray(children);
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

    onChildItemTap(args: ListViewEventData): void {
        const tappedChildItem = args.view.bindingContext;
        this._routerExtensions.navigate(["/children/child-detail", tappedChildItem.id],
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
    get children(): ObservableArray<Child> {
        return this._children;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }
}
