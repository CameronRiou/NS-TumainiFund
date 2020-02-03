import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { alert } from "tns-core-modules/ui/dialogs";

import { SponsorEditService } from "../shared/sponsor-edit.service";
import { Sponsor } from "../shared/sponsor.model";
import { SponsorService } from "../shared/sponsor.service";
import { Property } from "tns-core-modules/ui/page/page";

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
		this._sponsorMetadata = JSON.parse(JSON.stringify(Sponsor.form));
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
		let answer = this.sponsor.valid()
		if (answer === true) {
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
	}
}
