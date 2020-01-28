import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { alert } from "tns-core-modules/ui/dialogs";

import { ParishWorkerEditService } from "../shared/parish-worker-edit.service";
import { ParishWorker } from "../shared/parish-worker.model";
import { ParishWorkerService } from "../shared/parish-worker.service";
import { Property } from "tns-core-modules/ui/page/page";

const parish_workerMetadata = require('../shared/parish-worker-edit.metadata.json');

/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
@Component({
	selector: "ParishWorkerDetailEdit",
	templateUrl: "./parish-worker-detail-edit.component.html",
	styleUrls: ["./parish-worker-detail-edit.component.scss"]
})
export class ParishWorkerDetailEditComponent implements OnInit {
	private _parish_worker: ParishWorker;
	private _isParishWorkerImageDirty: boolean = false;
	private _isUpdating: boolean = false;
	private _parish_workerMetadata

	constructor(
		private _parish_workerService: ParishWorkerService,
		private _parish_workerEditService: ParishWorkerEditService,
		private _pageRoute: PageRoute,
		private _routerExtensions: RouterExtensions,
	) {
		this._parish_workerMetadata = JSON.parse(JSON.stringify(parish_workerMetadata));
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
				const parish_workerId = params.id;

				this._parish_worker = this._parish_workerEditService.startEdit(parish_workerId);
			});
	}

	get parish_workerMetadata() {
		return this._parish_workerMetadata;
	}

	get isUpdating(): boolean {
		return this._isUpdating;
	}

	get parish_worker(): ParishWorker {
		return this._parish_worker;
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
		let parish_worker: ParishWorker = this.parish_worker
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
					//field.options.indexOf(parish_worker[field.property]) === -1 ? valid = false : false;
					(0 <= parish_worker[field.property] && parish_worker[field.property] < field.options.length) ? valid : valid = false;
					break
				case "date":
					this.isValidDate(parish_worker[field.property]) ? valid : valid = false;
					break
				default:
					typeof parish_worker[field.property] != field.type ? valid = false : false;
			}
				parish_worker[field.property] == null ? valid = false : false;
				parish_worker[field.property] === "" ? valid = false : false;
			if (!valid) return `${field.description} || ${parish_worker[field.property]}`
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
    * Check out the data service as parish-workers/shared/parish-worker.service.ts
    *************************************************************/
	onDoneButtonTap(): void {
		this._isUpdating = true;

		//this._parish_worker.parish_worker_level = ["Pre", "Primary", "Secondary", "Post 16", "University"][this._parish_worker.parish_worker_level]
		let date_of_birth = this._parish_worker.date_of_birth
		this._parish_worker.age = this.getAge(date_of_birth)
		
		let answer = this.valid()
		if (answer === true) {
			//typeof parish_worker.age === "number"                               && parish_worker.age !== null
            /* ***********************************************************
            * By design this app is set up to work with read-only sample data.
            * Follow the steps in the "Kinvey database setup" section in app/readme.md file
            * and uncomment the code block below to make it editable.
            *************************************************************/

			/* ***********************uncomment here*********************/
			let queue = Promise.resolve();
            /*if (this._isParishWorkerImageDirty && this._parish_worker.imageUrl) {
                queue = queue
                    .then(() => this._parish_workerService.uploadImage(this._parish_worker.imageStoragePath, this._parish_worker.imageUrl))
                    .then((uploadedFile: any) => {
                        this._parish_worker.imageUrl = uploadedFile.url;
                    });
            }*/

			queue.then(() => this._parish_workerService.update(this._parish_worker))
				.then(() => {
					this._isUpdating = false;
					this._routerExtensions.navigate(["/parish-workers"], {
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
	//     for (const classItem of parish_workerClassList) {
	//         this._parish_workerClassOptions.push(classItem);
	//     }

	//     for (const doorItem of parish_workerDoorList) {
	//         this._parish_workerDoorOptions.push(doorItem);
	//     }

	//     for (const seatItem of parish_workerSeatList) {
	//         this._parish_workerSeatOptions.push(seatItem);
	//     }

	//     for (const transmissionItem of parish_workerTransmissionList) {
	//         this._parish_workerTransmissionOptions.push(transmissionItem);
	//     }
	// }
}
