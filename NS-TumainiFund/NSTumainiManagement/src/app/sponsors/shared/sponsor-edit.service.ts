import { Injectable } from "@angular/core";

import { Sponsor } from "./sponsor.model";
import { SponsorService } from "./sponsor.service";

@Injectable({
    providedIn: "root"
})
export class SponsorEditService {
    private _editModel: Sponsor;

    constructor(private _sponsorService: SponsorService) {}

    startEdit(id: string): Sponsor {
        this._editModel = null;

        return this.getEditableSponsorById(id);
    }

    getEditableSponsorById(_id: string): Sponsor {
        if (!this._editModel || this._editModel.id !== _id) {
            const sponsor = this._sponsorService.getSponsorById(_id);

            // get fresh editable copy of sponsor model
            this._editModel = new Sponsor(sponsor);
        }

        return this._editModel;
    }
}
