import { Injectable } from "@angular/core";

import { AssignedOffice } from "./assigned-office.model";
import { AssignedOfficeService } from "./assigned-office.service";

@Injectable({
    providedIn: "root"
})
export class AssignedOfficeEditService {
    private _editModel: AssignedOffice;

    constructor(private _assigned_officeService: AssignedOfficeService) {}

    startEdit(id: string): AssignedOffice {
        this._editModel = null;

        return this.getEditableAssignedOfficeById(id);
    }

    getEditableAssignedOfficeById(_id: string): AssignedOffice {
        if (!this._editModel || this._editModel.id !== _id) {
            const assigned_office = this._assigned_officeService.getAssignedOfficeById(_id);

            // get fresh editable copy of assigned office model
            this._editModel = new AssignedOffice(assigned_office);
        }

        return this._editModel;
    }
}
