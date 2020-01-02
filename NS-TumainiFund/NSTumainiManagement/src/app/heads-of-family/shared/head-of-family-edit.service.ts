import { Injectable } from "@angular/core";

import { HeadOfFamily } from "./head-of-family.model";
import { HeadOfFamilyService } from "./head-of-family.service";

@Injectable({
    providedIn: "root"
})
export class HeadOfFamilyEditService {
    private _editModel: HeadOfFamily;

    constructor(private _HeadOfFamilyService: HeadOfFamilyService) {}

    startEdit(id: string): HeadOfFamily {
        this._editModel = null;

        return this.getEditableHeadOfFamilyById(id);
    }

    getEditableHeadOfFamilyById(_id: string): HeadOfFamily {
        if (!this._editModel || this._editModel.id !== _id) {
            const headoffamily = this._HeadOfFamilyService.getHeadOfFamilyById(_id);

            // get fresh editable copy of child model
            this._editModel = new HeadOfFamily(headoffamily);
        }

        return this._editModel;
    }
}
