import * as app from "tns-core-modules/application";
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array";

/************** Plugins ***************/
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ListViewEventData } from "nativescript-ui-listview";
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";

/************** Models and Services ***************/
import { ParishWorker } from "./shared/parish-worker.model";
import { ParishWorkerService } from "./shared/parish-worker.service";

/************** Component Creation ***************/
@Component({
    selector: "ParishWorkers",
    templateUrl: "./parish-workers.component.html",
    styleUrls: ["./parish-workers-list.component.scss"]
})

export class ParishWorkersComponent implements OnInit {

    /************** Variable Initiation ***************/
    private _isLoading: boolean = false;
    private _parish_workers: ObservableArray<ParishWorker> = new ObservableArray<ParishWorker>([]);
    private _feedback : Feedback;

    /************** Constructor ***************/
    constructor(
        private _parish_workerService: ParishWorkerService,
        private _routerExtensions: RouterExtensions
    ) { 
        this._feedback = new Feedback();
    }

    /************** On Init ***************/
    ngOnInit(): void {
        this._isLoading = true;

        this._parish_workerService.load()
            .then((parish_workers: Array<ParishWorker> ) => {
                this._parish_workers = new ObservableArray(parish_workers);
                this._isLoading = false;
            })
            .catch((e) => {
                this._feedback.error({
                    title: "Connection Error",
                    message: "Failed to connect to parish-workers DB"
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

    onParishWorkerItemTap(args: ListViewEventData): void {
        const tappedParishWorkerItem = args.view.bindingContext;
        this._routerExtensions.navigate(["/parish-workers/parish-worker-detail", tappedParishWorkerItem.id],
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
    get parish_workers(): ObservableArray<ParishWorker> {
        return this._parish_workers;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }
}
