import { Injectable } from "@angular/core";

import { Child } from "./child.model";
import { ChildService } from "./child.service";

@Injectable({
    providedIn: "root"
})
export class ChildEditService {
    private _editModel: Child;

    constructor(private _childService: ChildService) {}

    startEdit(id: string): Child {
        this._editModel = null;

        return this.getEditableChildById(id);
    }

    getEditableChildById(_id: string): Child {
        if (!this._editModel || this._editModel.id !== _id) {
            const child = this._childService.getChildById(_id);

            // get fresh editable copy of child model
            this._editModel = new Child(child);
        }

        return this._editModel;
    }
}
