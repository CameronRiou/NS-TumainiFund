import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { alert } from "tns-core-modules/ui/dialogs";

import { ParishWorkerEditService } from "../shared/parish-worker-edit.service";
import { ParishWorker } from "../shared/parish-worker.model";
import { ParishWorkerService } from "../shared/parish-worker.service";
import { Property } from "tns-core-modules/ui/page/page";

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
		this._parish_workerMetadata = JSON.parse(JSON.stringify(ParishWorker.form));
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
		this._parish_worker.age = this.getAge(this._parish_worker.date_of_birth)
		let answer = this.parish_worker.valid()
		if (answer === true) {
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
	}
}
