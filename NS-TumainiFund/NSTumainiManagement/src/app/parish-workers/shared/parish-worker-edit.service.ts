import { Injectable } from "@angular/core";

import { ParishWorker } from "./parish-worker.model";
import { ParishWorkerService } from "./parish-worker.service";

@Injectable({
    providedIn: "root"
})
export class ParishWorkerEditService {
    private _editModel: ParishWorker;

    constructor(private _parish_workerService: ParishWorkerService) {}

    startEdit(id: string): ParishWorker {
        this._editModel = null;

        return this.getEditableParishWorkerById(id);
    }

    getEditableParishWorkerById(_id: string): ParishWorker {
        if (!this._editModel || this._editModel.id !== _id) {
            const parish_worker = this._parish_workerService.getParishWorkerById(_id);

            // get fresh editable copy of parish worker model
            this._editModel = new ParishWorker(parish_worker);
        }

        return this._editModel;
    }
}
