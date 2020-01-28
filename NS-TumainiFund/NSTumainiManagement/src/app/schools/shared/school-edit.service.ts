import { Injectable } from "@angular/core";

import { School } from "./school.model";
import { SchoolService } from "./school.service";

@Injectable({
    providedIn: "root"
})
export class SchoolEditService {
    private _editModel: School;

    constructor(private _schoolService: SchoolService) {}

    startEdit(id: string): School {
        this._editModel = null;

        return this.getEditableSchoolById(id);
    }

    getEditableSchoolById(_id: string): School {
        if (!this._editModel || this._editModel.id !== _id) {
            const school = this._schoolService.getSchoolById(_id);

            // get fresh editable copy of school model
            this._editModel = new School(school);
        }

        return this._editModel;
    }
}
