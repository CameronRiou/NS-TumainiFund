import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";

import { Child } from "../shared/child.model";
import { ChildService } from "../shared/child.service";

/* ***********************************************************
* This is the item details component in the master-detail structure.
* This component retrieves the passed parameter from the master list component,
* finds the data item by this parameter and displays the detailed data item information.
*************************************************************/
@Component({
    selector: "ChildDetail",
    templateUrl: "./child-detail.component.html"
})
export class ChildDetailComponent implements OnInit {
    private _child: Child;

    constructor(
        private _childService: ChildService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
    * Get the data item details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        this._pageRoute.activatedRoute
            .pipe(switchMap((activatedRoute) => activatedRoute.params))
            .forEach((params) => {
                const childID = params.id;

                this._child = this._childService.getChildById(childID);
            });
    }

    get child(): Child {
        return this._child;
    }

    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    onBackButtonTap(): void {
        this._routerExtensions.navigate(["/children"],
        {
            animated: true,
            transition: {
                name: "slideTop",
                duration: 200,
                curve: "ease"
            }
        });
    }

    /* ***********************************************************
    * The master-detail template comes with an example of an item edit page.
    * Check out the edit page in the /child/child-detail-edit folder.
    *************************************************************/
    onEditButtonTap(): void {
        this._routerExtensions.navigate(["/children/child-detail-edit", this.child.id],
            {
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
}
