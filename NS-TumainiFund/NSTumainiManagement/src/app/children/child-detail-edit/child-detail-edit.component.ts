import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { alert } from "tns-core-modules/ui/dialogs";

import { ChildEditService } from "../shared/child-edit.service";
import { Child } from "../shared/child.model";
import { ChildService } from "../shared/child.service";

const childMetadata = require('../shared/child-edit.metadata.json');

/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
@Component({
    selector: "ChildDetailEdit",
    templateUrl: "./child-detail-edit.component.html",
    styleUrls: ["./child-detail-edit.component.scss"]
})
export class ChildDetailEditComponent implements OnInit {
    private _child: Child;
    private _isChildImageDirty: boolean = false;
    private _isUpdating: boolean = false;
    private _childMetadata

    constructor(
        private _childService: ChildService,
        private _childEditService: ChildEditService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions,
        ) {
            this._childMetadata = JSON.parse(JSON.stringify(childMetadata));
        }

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
                const childId = params.id;

                this._child = this._childEditService.startEdit(childId);
            });
    }

    get childMetadata() {
        return this._childMetadata;
    }

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    get child(): Child {
        return this._child;
    }

    /* ***********************************************************
    * The edit cancel button navigates back to the item details page.
    *************************************************************/
    onCancelButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    /* ***********************************************************
    * The edit done button uses the data service to save the updated values of the data item details.
    * Check out the data service as children/shared/child.service.ts
    *************************************************************/
   onDoneButtonTap(): void {
    /* ***********************************************************
    * By design this app is set up to work with read-only sample data.
    * Follow the steps in the "Kinvey database setup" section in app/readme.md file
    * and uncomment the code block below to make it editable.
    *************************************************************/

    /* ***********************uncomment here*********************/
    let queue = Promise.resolve();
    this._isUpdating = true;
    /*if (this._isChildImageDirty && this._child.imageUrl) {
        queue = queue
            .then(() => this._childService.uploadImage(this._child.imageStoragePath, this._child.imageUrl))
            .then((uploadedFile: any) => {
                this._child.imageUrl = uploadedFile.url;
            });
    }*/
    let to_submit:any = this._child;
    to_submit.date_of_birth = this._child.date_of_birth.toISOString();
    console.log(to_submit.date_of_birth);
    /*
    queue.then(() => this._childService.update(this._child))
        .then(() => {
            this._isUpdating = false;
            this._routerExtensions.navigate(["/children"], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideBottom",
                    duration: 200,
                    curve: "ease"
                }
            });
        })
        .catch((errorMessage: any) => {
            this._isUpdating = false;
            alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" });
        });
    */
    /*********************uncomment here*************************/

    /* ***********************************************************
    * Comment out the code block below if you made the app editable.
    *************************************************************
    const readOnlyMessage = "Check out the \"Kinvey database setup\" section in the readme file to make it editable."; // tslint:disable-line:max-line-length
    const queue = Promise.resolve();
    queue.then(() => alert({ title: "Read-Only Template!", message: readOnlyMessage, okButtonText: "Ok" }))
        .then(() => this._routerExtensions.backToPreviousPage());

    */
}

    // private initializeEditOptions(): void {
    //     for (const classItem of childClassList) {
    //         this._childClassOptions.push(classItem);
    //     }

    //     for (const doorItem of childDoorList) {
    //         this._childDoorOptions.push(doorItem);
    //     }

    //     for (const seatItem of childSeatList) {
    //         this._childSeatOptions.push(seatItem);
    //     }

    //     for (const transmissionItem of childTransmissionList) {
    //         this._childTransmissionOptions.push(transmissionItem);
    //     }
    // }
}
