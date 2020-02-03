import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { alert } from "tns-core-modules/ui/dialogs";

import { SchoolEditService } from "../shared/school-edit.service";
import { School } from "../shared/school.model";
import { SchoolService } from "../shared/school.service";
import { Property } from "tns-core-modules/ui/page/page";

/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
@Component({
	selector: "SchoolDetailEdit",
	templateUrl: "./school-detail-edit.component.html",
	styleUrls: ["./school-detail-edit.component.scss"]
})
export class SchoolDetailEditComponent implements OnInit {
	private _school: School;
	private _isSchoolImageDirty: boolean = false;
	private _isUpdating: boolean = false;
	private _schoolMetadata

	constructor(
		private _schoolService: SchoolService,
		private _schoolEditService: SchoolEditService,
		private _pageRoute: PageRoute,
		private _routerExtensions: RouterExtensions,
	) {
		this._schoolMetadata = JSON.parse(JSON.stringify(School.form));
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
				const schoolId = params.id;

				this._school = this._schoolEditService.startEdit(schoolId);
			});
	}

	get isUpdating(): boolean {
		return this._isUpdating;
	}

	get school(): School {
		return this._school;
	}

	get schoolMetadata() {
		return this._schoolMetadata;
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
    * Check out the data service as schools/shared/school.service.ts
    *************************************************************/
	onDoneButtonTap(): void {
		this._isUpdating = true;
		let answer = this.school.valid()
		if (answer === true) {
			let queue = Promise.resolve();
            /*if (this._isSchoolImageDirty && this._school.imageUrl) {
                queue = queue
                    .then(() => this._schoolService.uploadImage(this._school.imageStoragePath, this._school.imageUrl))
                    .then((uploadedFile: any) => {
                        this._school.imageUrl = uploadedFile.url;
                    });
            }*/

			queue.then(() => this._schoolService.update(this._school))
				.then(() => {
					this._isUpdating = false;
					this._routerExtensions.navigate(["/schools"], {
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
