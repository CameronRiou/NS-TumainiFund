import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { alert } from "tns-core-modules/ui/dialogs";

import { AssignedOfficeEditService } from "../shared/assigned-office-edit.service";
import { AssignedOffice } from "../shared/assigned-office.model";
import { AssignedOfficeService } from "../shared/assigned-office.service";
import { Property } from "tns-core-modules/ui/page/page";

const assigned_officeMetadata = require('../shared/assigned-office-edit.metadata.json');

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
		this._assigned_officeMetadata = JSON.parse(JSON.stringify(assigned_officeMetadata));
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

	isValidDate(date) {
		return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
	}

	valid() {
		let assigned_office: AssignedOffice = this.assigned_office
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
					"description": "School Name",
					"property": "school_name",
					"type": "string"
				},
				{
					"description": "School Level",
					"property": "school_level",
					"type": "picker",
					"options": [
						"Pre",
						"Primary",
						"Secondary",
						"Post 16",
						"University"
					]
				},
				{
					"description": "Books",
					"property": "books",
					"type": "boolean"
				},
				{
					"description": "Head Of Family",
					"property": "head_of_family",
					"type": "string"
				},
				{
					"description": "Head of Family Relation",
					"property": "hof_relation",
					"type": "string"
				},
				{
					"description": "Personal Status",
					"property": "personal_status",
					"type": "string"
				},
				{
					"description": "Hygiene Kits",
					"property": "hygiene_kits",
					"type": "boolean"
				},
				{
					"description": "Medical Support",
					"property": "medical_support",
					"type": "boolean"
				},
				{
					"description": "Future Educational Goals",
					"property": "future_educational_goals",
					"type": "string"
				},
				{
					"description": "Transport To Clinic",
					"property": "transport_to_clinic",
					"type": "boolean"
				}
			]
		let valid = true

		for (let field of checks) {
			switch (field.type) {
				case "picker":
					//field.options.indexOf(assigned_office[field.property]) === -1 ? valid = false : false;
					(0 <= assigned_office[field.property] && assigned_office[field.property] < field.options.length) ? valid : valid = false;
					break
				case "date":
					this.isValidDate(assigned_office[field.property]) ? valid : valid = false;
					break
				default:
					typeof assigned_office[field.property] != field.type ? valid = false : false;
			}
				assigned_office[field.property] == null ? valid = false : false;
				assigned_office[field.property] === "" ? valid = false : false;
			if (!valid) return `${field.description} || ${assigned_office[field.property]}`
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
    * Check out the data service as assigned-offices/shared/assigned-office.service.ts
    *************************************************************/
	onDoneButtonTap(): void {
		this._isUpdating = true;

		//this._assigned_office.assigned_office_level = ["Pre", "Primary", "Secondary", "Post 16", "University"][this._assigned_office.assigned_office_level]
		let date_of_birth = this._assigned_office.date_of_birth
		this._assigned_office.age = this.getAge(date_of_birth)
		
		let answer = this.valid()
		if (answer === true) {
			//typeof assigned_office.age === "number"                               && assigned_office.age !== null
            /* ***********************************************************
            * By design this app is set up to work with read-only sample data.
            * Follow the steps in the "Kinvey database setup" section in app/readme.md file
            * and uncomment the code block below to make it editable.
            *************************************************************/

			/* ***********************uncomment here*********************/
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
	//     for (const classItem of assigned_officeClassList) {
	//         this._assigned_officeClassOptions.push(classItem);
	//     }

	//     for (const doorItem of assigned_officeDoorList) {
	//         this._assigned_officeDoorOptions.push(doorItem);
	//     }

	//     for (const seatItem of assigned_officeSeatList) {
	//         this._assigned_officeSeatOptions.push(seatItem);
	//     }

	//     for (const transmissionItem of assigned_officeTransmissionList) {
	//         this._assigned_officeTransmissionOptions.push(transmissionItem);
	//     }
	// }
}
