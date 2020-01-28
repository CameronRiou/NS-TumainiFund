import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { alert } from "tns-core-modules/ui/dialogs";

import { SponsorEditService } from "../shared/sponsor-edit.service";
import { Sponsor } from "../shared/sponsor.model";
import { SponsorService } from "../shared/sponsor.service";
import { Property } from "tns-core-modules/ui/page/page";

const sponsorMetadata = require('../shared/sponsor-edit.metadata.json');

/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
@Component({
	selector: "SponsorDetailEdit",
	templateUrl: "./sponsor-detail-edit.component.html",
	styleUrls: ["./sponsor-detail-edit.component.scss"]
})
export class SponsorDetailEditComponent implements OnInit {
	private _sponsor: Sponsor;
	private _isSponsorImageDirty: boolean = false;
	private _isUpdating: boolean = false;
	private _sponsorMetadata

	constructor(
		private _sponsorService: SponsorService,
		private _sponsorEditService: SponsorEditService,
		private _pageRoute: PageRoute,
		private _routerExtensions: RouterExtensions,
	) {
		this._sponsorMetadata = JSON.parse(JSON.stringify(sponsorMetadata));
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
				const sponsorId = params.id;

				this._sponsor = this._sponsorEditService.startEdit(sponsorId);
			});
	}

	get sponsorMetadata() {
		return this._sponsorMetadata;
	}

	get isUpdating(): boolean {
		return this._isUpdating;
	}

	get sponsor(): Sponsor {
		return this._sponsor;
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
		let sponsor: Sponsor = this.sponsor
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
					//field.options.indexOf(sponsor[field.property]) === -1 ? valid = false : false;
					(0 <= sponsor[field.property] && sponsor[field.property] < field.options.length) ? valid : valid = false;
					break
				case "date":
					this.isValidDate(sponsor[field.property]) ? valid : valid = false;
					break
				default:
					typeof sponsor[field.property] != field.type ? valid = false : false;
			}
				sponsor[field.property] == null ? valid = false : false;
				sponsor[field.property] === "" ? valid = false : false;
			if (!valid) return `${field.description} || ${sponsor[field.property]}`
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
    * Check out the data service as sponsors/shared/sponsor.service.ts
    *************************************************************/
	onDoneButtonTap(): void {
		this._isUpdating = true;

		//this._sponsor.school_level = ["Pre", "Primary", "Secondary", "Post 16", "University"][this._sponsor.school_level]
		let date_of_birth = this._sponsor.date_of_birth
		this._sponsor.age = this.getAge(date_of_birth)
		
		let answer = this.valid()
		if (answer === true) {
			//typeof sponsor.age === "number"                               && sponsor.age !== null
            /* ***********************************************************
            * By design this app is set up to work with read-only sample data.
            * Follow the steps in the "Kinvey database setup" section in app/readme.md file
            * and uncomment the code block below to make it editable.
            *************************************************************/

			/* ***********************uncomment here*********************/
			let queue = Promise.resolve();
            /*if (this._isSponsorImageDirty && this._sponsor.imageUrl) {
                queue = queue
                    .then(() => this._sponsorService.uploadImage(this._sponsor.imageStoragePath, this._sponsor.imageUrl))
                    .then((uploadedFile: any) => {
                        this._sponsor.imageUrl = uploadedFile.url;
                    });
            }*/

			queue.then(() => this._sponsorService.update(this._sponsor))
				.then(() => {
					this._isUpdating = false;
					this._routerExtensions.navigate(["/sponsors"], {
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
	//     for (const classItem of sponsorClassList) {
	//         this._sponsorClassOptions.push(classItem);
	//     }

	//     for (const doorItem of sponsorDoorList) {
	//         this._sponsorDoorOptions.push(doorItem);
	//     }

	//     for (const seatItem of sponsorSeatList) {
	//         this._sponsorSeatOptions.push(seatItem);
	//     }

	//     for (const transmissionItem of sponsorTransmissionList) {
	//         this._sponsorTransmissionOptions.push(transmissionItem);
	//     }
	// }
}
