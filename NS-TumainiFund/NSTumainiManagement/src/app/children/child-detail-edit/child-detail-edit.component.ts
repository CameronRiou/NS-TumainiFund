import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { alert } from "tns-core-modules/ui/dialogs";

import { ChildEditService } from "../shared/child-edit.service";
import { Child } from "../shared/child.model";
import { ChildService } from "../shared/child.service";
import { Property } from "tns-core-modules/ui/page/page";


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
	private metadata = Child.form
	private _childMetadata

	constructor(
		private _childService: ChildService,
		private _childEditService: ChildEditService,
		private _pageRoute: PageRoute,
		private _routerExtensions: RouterExtensions,
	) {
		this._childMetadata = JSON.parse(JSON.stringify(this.metadata))
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
				this._child = new Child(this._childEditService.startEdit(childId))
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

	getAge(dateString) {
		let today = new Date();
		let birthDate = new Date(dateString);
		let age = today.getFullYear() - birthDate.getFullYear();
		let m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
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
		this._isUpdating = true;

		this._child.age = this.getAge(this._child.date_of_birth)
		let answer = this.child.valid()
		if (answer === true) {
			let queue = Promise.resolve();

            /*if (this._isChildImageDirty && this._child.imageUrl) {
                queue = queue
                    .then(() => this._childService.uploadImage(this._child.imageStoragePath, this._child.imageUrl))
                    .then((uploadedFile: any) => {
                        this._child.imageUrl = uploadedFile.url;
                    });
			}*/
			
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
					console.log("Caught Issue: " + errorMessage)
					this._isUpdating = false;
					alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" });
				});
		} else {
			console.log(answer)
			this._isUpdating = false;
		}
	}
}
