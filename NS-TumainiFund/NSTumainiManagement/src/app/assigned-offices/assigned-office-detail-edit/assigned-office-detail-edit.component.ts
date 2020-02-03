import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { alert } from "tns-core-modules/ui/dialogs";

import { AssignedOfficeEditService } from "../shared/assigned-office-edit.service";
import { AssignedOffice } from "../shared/assigned-office.model";
import { AssignedOfficeService } from "../shared/assigned-office.service";
import { Property } from "tns-core-modules/ui/page/page";

/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
@Component({
	selector: "AssignedOfficeDetailEdit",
	templateUrl: "./assigned-office-detail-edit.component.html",
	styleUrls: ["./assigned-office-detail-edit.component.scss"]
})
export class AssignedOfficeDetailEditComponent implements OnInit {
	private _assigned_office: AssignedOffice;
	private _isAssignedOfficeImageDirty: boolean = false;
	private _isUpdating: boolean = false;
	private _assigned_officeMetadata

	constructor(
		private _assigned_officeService: AssignedOfficeService,
		private _assigned_officeEditService: AssignedOfficeEditService,
		private _pageRoute: PageRoute,
		private _routerExtensions: RouterExtensions,
	) {
		this._assigned_officeMetadata = JSON.parse(JSON.stringify(AssignedOffice.form));
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
				const assigned_officeId = params.id;

				this._assigned_office = this._assigned_officeEditService.startEdit(assigned_officeId);
			});
	}

	get assigned_officeMetadata() {
		return this._assigned_officeMetadata;
	}

	get isUpdating(): boolean {
		return this._isUpdating;
	}

	get assigned_office(): AssignedOffice {
		return this._assigned_office;
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
    * Check out the data service as assigned-offices/shared/assigned-office.service.ts
    *************************************************************/
	onDoneButtonTap(): void {
		this._isUpdating = true;
		let answer = this.assigned_office.valid()
		if (answer === true) {
			let queue = Promise.resolve();
            /*if (this._isAssignedOfficeImageDirty && this._assigned_office.imageUrl) {
                queue = queue
                    .then(() => this._assigned_officeService.uploadImage(this._assigned_office.imageStoragePath, this._assigned_office.imageUrl))
                    .then((uploadedFile: any) => {
                        this._assigned_office.imageUrl = uploadedFile.url;
                    });
            }*/

			queue.then(() => this._assigned_officeService.update(this._assigned_office))
				.then(() => {
					this._isUpdating = false;
					this._routerExtensions.navigate(["/assigned-offices"], {
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
