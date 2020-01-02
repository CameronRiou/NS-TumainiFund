import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { alert } from "tns-core-modules/ui/dialogs";

import { HeadOfFamilyEditService } from "../shared/head-of-family-edit.service";
import { HeadOfFamily } from "../shared/head-of-family.model";
import { HeadOfFamilyService } from "../shared/head-of-family.service";
import { Property } from "tns-core-modules/ui/page/page";

const HeadOfFamilyMetadata = require('../shared/head-of-family-edit.metadata.json');

/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
@Component({
	selector: "HeadOfFamilyDetailEdit",
	templateUrl: "./head-of-family-detail-edit.component.html",
	styleUrls: ["./head-of-family-detail-edit.component.scss"]
})
export class HeadOfFamilyDetailEditComponent implements OnInit {
	private _HeadOfFamily: HeadOfFamily;
	private _isHeadOfFamilyImageDirty: boolean = false;
	private _isUpdating: boolean = false;
	private _HeadOfFamilyMetadata

	constructor(
		private _HeadOfFamilyService: HeadOfFamilyService,
		private _HeadOfFamilyEditService: HeadOfFamilyEditService,
		private _pageRoute: PageRoute,
		private _routerExtensions: RouterExtensions,
	) {
		this._HeadOfFamilyMetadata = JSON.parse(JSON.stringify(HeadOfFamilyMetadata));
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
				const HeadOfFamilyId = params.id;

				this._HeadOfFamily = this._HeadOfFamilyEditService.startEdit(HeadOfFamilyId);
			});
	}

	get HeadOfFamilyMetadata() {
		return this._HeadOfFamilyMetadata;
	}

	get isUpdating(): boolean {
		return this._isUpdating;
	}

	get HeadOfFamily(): HeadOfFamily {
		return this._HeadOfFamily;
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

	isValidDate(date) {
		return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
	}

	valid() {
		let child: HeadOfFamily = this.HeadOfFamily
		let checks =
			[
				{
					"description": "First Name",
					"property": "first_name",
					"type": "string"
				},
				{
					"description": "Last Name",
					"property": "last_name",
					"type": "string"
				},
				{
					"description": "Date of Birth",
					"property": "date_of_birth",
					"type": "date"
				},
				{
					"description": "Gender",
					"property": "gender",
					"type": "picker",
					"options": [
						"Male",
						"Female",
						"Other"
					]
				},
				{
					"description": "Assigned Children",
					"property": "assigned_children_number",
					"type": "number"
				},
				{
					"description": "Assigned Office",
					"property": "assigned_office_name",
					"type": "string",
				},
				{
					"description": "Village",
					"property": "village_name",
					"type": "string"
				},
				{
					"description": "Deanery",
					"property": "deanery_name",
					"type": "string"
				},
				{
					"description": "Diocese",
					"property": "diocese_name",
					"type": "string"
				},
				{
					"description": "Parish Worker",
					"property": "parish_worker_name",
					"type": "string"
				},
				{
					"description": "Social Worker",
					"property": "social_worker_name",
					"type": "string"
				},
				{
					"description": "Receiving Money?",
					"property": "receiving_money",
					"type": "boolean"
				},
				{
					"description": "Assigned Sponsor",
					"property": "assigned_sponsor_name",
					"type": "string"
				},
				{
					"description": "Verified By Guernsey?",
					"property": "verified_by_guernsey",
					"type": "boolean"
				},
				{
					"description": "Date Verified",
					"property": "date_verified",
					"type": "date"
				},
				{
					"description": "House Type",
					"property": "house_type_name",
					"type": "string"
				},
				{
					"description": "House Provided",
					"property": "house_provided",
					"type": "boolean"
				},
				{
					"description": "Diet Type",
					"property": "diet_type_name",
					"type": "string"
				},
				{
					"description": "Food Needs",
					"property": "food_needs",
					"type": "string"
				},
				{
					"description": "Work Type",
					"property": "work_type_name",
					"type": "string"
				},
				{
					"description": "Distance To Work",
					"property": "distance_to_work",
					"type": "number"
				},
				{
					"description": "Nearest Hospital",
					"property": "nearest_hospital_name",
					"type": "string"
				},
				{
					"description": "Distance To Hospital",
					"property": "distance_to_hospital",
					"type": "number"
				},
				{
					"description": "Water Type",
					"property": "water_type_name",
					"type": "string"
				},
				{
					"description": "Distance To Water",
					"property": "distance_to_water",
					"type": "number"
				},
				{
					"description": "Situation",
					"property": "situation",
					"type": "string"
				}
			]
		let valid = true

		for (let field of checks) {
			switch (field.type) {
				case "picker":
					//field.options.indexOf(child[field.property]) === -1 ? valid = false : false;
					(0 <= child[field.property] && child[field.property] < field.options.length) ? valid : valid = false;
					break
				case "date":
					this.isValidDate(child[field.property]) ? valid : valid = false;
					break
				default:
					typeof child[field.property] != field.type ? valid = false : false;
			}
			child[field.property] == null ? valid = false : false;
			child[field.property] === "" ? valid = false : false;
			if (!valid) return `${field.description} || ${child[field.property]}`
		};
		return valid
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

		//this._child.school_level = ["Pre", "Primary", "Secondary", "Post 16", "University"][this._child.school_level]
		let date_of_birth = this._HeadOfFamily.date_of_birth
		this._HeadOfFamily.age = this.getAge(date_of_birth)
		
		let answer = this.valid()
		if (answer === true) {
			//typeof child.age === "number"                               && child.age !== null
            /* ***********************************************************
            * By design this app is set up to work with read-only sample data.
            * Follow the steps in the "Kinvey database setup" section in app/readme.md file
            * and uncomment the code block below to make it editable.
            *************************************************************/

			/* ***********************uncomment here*********************/
			let queue = Promise.resolve();
            /*if (this._isChildImageDirty && this._child.imageUrl) {
                queue = queue
                    .then(() => this._childService.uploadImage(this._child.imageStoragePath, this._child.imageUrl))
                    .then((uploadedFile: any) => {
                        this._child.imageUrl = uploadedFile.url;
                    });
            }*/

			queue.then(() => this._HeadOfFamilyService.update(this._HeadOfFamily))
				.then(() => {
					this._isUpdating = false;
					this._routerExtensions.navigate(["/heads-of-family"], {
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
