import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array";

import { Car } from "./shared/car.model";
import { CarService } from "./shared/car.service";

@Component({
    selector: "Children",
    templateUrl: "./children.component.html",
    styleUrls: ["./children-list.component.scss"]
})
export class ChildrenComponent implements OnInit {
    private _isLoading: boolean = false;
    private _children: ObservableArray<Car> = new ObservableArray<Car>([]);

    constructor(
        private _childrenService: CarService,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        this._isLoading = true;
        this._childrenService.load()
            .then((children: Array<Car>) => {
                this._children = new ObservableArray(children);
                this._isLoading = false;
            })
            .catch((e) => {
                console.log(e)
                this._isLoading = false;
            });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    get children(): ObservableArray<Car> {
        return this._children;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    /* ***********************************************************
    * Use the "itemTap" event handler of the <RadListView> to navigate to the
    * item details page. Retrieve a reference for the data item (the id) and pass it
    * to the item details page, so that it can identify which data item to display.
    * Learn more about navigating with a parameter in this documentation article:
    * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
    *************************************************************/
    onChildItemTap(args: ListViewEventData): void {
        const tappedCarItem = args.view.bindingContext;

        this._routerExtensions.navigate(["/children/child-detail", tappedCarItem.id],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
        console.log(`Navigating to ${args.view.bindingContext.id}`);
    }
}
