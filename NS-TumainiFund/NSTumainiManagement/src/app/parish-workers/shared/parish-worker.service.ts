import { Injectable } from "@angular/core";

/************** Plugins ***************/
import { DataStoreService, FilesService, UserService, Query, DataStoreType } from "kinvey-nativescript-sdk/angular";
//import { File } from "tns-core-modules/file-system";

/************** Models and Configs ***************/
import { Config } from "../../shared/config";
import { ParishWorker } from "./parish-worker.model";

/************** Service Initialization ***************/
@Injectable({
    providedIn: "root"
})
export class ParishWorkerService {
    /************** Variable Initialization ***************/
    private static cloneUpdateModel(parish_worker: ParishWorker): object {
        return ParishWorker.editableProperties.reduce((a, e) => (a[e] = parish_worker[e], a), { _id: parish_worker.id });
    }
    private _allParish_Workers: Array<ParishWorker> = [];
    private _parish_workersStore = null;

    /************** Constructor ***************/
    constructor(
        dataStoreService: DataStoreService,
        private _filesService: FilesService,
        private _userService: UserService
    ) {
        this._parish_workersStore = dataStoreService.collection("parish-workers");
    }

    /************** Functions ***************/
    getParishWorkerById(id: string): ParishWorker {
        if (id) {            
            return this._allParish_Workers.filter((parish_worker) => {
                return parish_worker.id === id;
            })[0];
        }
    }

    updateParishWorker(parish_workerData){
        parish_workerData.id = parish_workerData._id;
        /*
        this.streamFile(parish_workerData.image_id).then((output: any) => {
            parish_workerData.image = output._downloadURL;
        })
        */
        const parish_worker = new ParishWorker(parish_workerData);
        return parish_worker;
    }

    load(): Promise<any> {
        return this.login().then(() => {
            return this._parish_workersStore.sync();
        }).then(() => {
            const sortByIDQuery = new Query();
            sortByIDQuery.ascending("_id");
            const stream = this._parish_workersStore.find(sortByIDQuery);
            return stream.toPromise();
        }).then((data) => {
            this._allParish_Workers = [];
            data.forEach((parish_workerData: any) => {
                let parish_worker = this.updateParishWorker(parish_workerData)
                this._allParish_Workers.push(parish_worker);
            })            
            return this._allParish_Workers;        
        });
    }

    update(parish_workerModel: ParishWorker): Promise<any> {
        const updateModel = ParishWorkerService.cloneUpdateModel(parish_workerModel);
        return this._parish_workersStore.save(updateModel);
    }

    /*
    uploadImage(remoteFullPath: string, localFullPath: string): Promise<any> {
        const imageFile = File.fromPath(localFullPath);
        const imageContent = imageFile.readSync();

        const metadata = {
            filename: imageFile.name,
            mimeType: this.getMimeType(imageFile.extension),
            size: imageContent.length,
            public: true
        };

        return this._filesService.upload(imageFile, metadata, { timeout: 2147483647 })
            .then((uploadedFile: any) => {
                const query = new Query();
                query.equalTo("_id", uploadedFile._id);

                return this._filesService.find(query);
            })
            .then((files: Array<any>) => {
                if (files && files.length) {
                    const file = files[0];
                    file.url = file._downloadURL;

                    return file;
                } else {
                    Promise.reject(new Error("No items with the given ID could be found."));
                }
            }    
        );
    }
    */
    /************** Private Functions ***************/
    private login(): Promise<any> {
        if (!!this._userService.getActiveUser()) {
            return Promise.resolve();
        } else {
            return this._userService.login(Config.kinveyUsername, Config.kinveyPassword);
        }
    }

    /*
    private getMimeType(imageExtension: string): string {
        const extension = imageExtension === "jpg" ? "jpeg" : imageExtension;
        return "image/" + extension.replace(/\./g, "");
    }
    */

    /************** Async Functions ***************/
    /*
    async streamFile(id: string) {
        try {
            const file = await this._filesService.stream(id);
            return file;
        } catch (error) {
            console.log(error);
        }
    }
    */
}