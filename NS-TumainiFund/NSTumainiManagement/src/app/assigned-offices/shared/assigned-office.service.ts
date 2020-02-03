import { Injectable } from "@angular/core";

/************** Plugins ***************/
import { DataStoreService, FilesService, UserService, Query, DataStoreType } from "kinvey-nativescript-sdk/angular";
//import { File } from "tns-core-modules/file-system";

/************** Models and Configs ***************/
import { Config } from "../../shared/config";
import { AssignedOffice } from "./assigned-office.model";

/************** Service Initialization ***************/
@Injectable({
    providedIn: "root"
})
export class AssignedOfficeService {
    /************** Variable Initialization ***************/
    private static cloneUpdateModel(assigned_office: AssignedOffice): object {
        return AssignedOffice.editableProperties.reduce((a, e) => (a[e] = assigned_office[e], a), { _id: assigned_office.id });
    }
    private _allAssigned_Offices: Array<AssignedOffice> = [];
    private _assigned_officesStore = null;

    /************** Constructor ***************/
    constructor(
        dataStoreService: DataStoreService,
        private _filesService: FilesService,
        private _userService: UserService
    ) {
        this._assigned_officesStore = dataStoreService.collection("assigned-offices");
    }

    /************** Functions ***************/
    getAssignedOfficeById(id: string): AssignedOffice {
        if (id) {         
            return this._allAssigned_Offices.filter((assigned_office) => {
                return assigned_office.id === id;
            })[0];
        }
    }

    updateAssignedOffice(assigned_officeData){
        assigned_officeData.id = assigned_officeData._id;
        /*
        this.streamFile(assigned_officeData.image_id).then((output: any) => {
            assigned_officeData.image = output._downloadURL;
        })
        */
        const assigned_office = new AssignedOffice(assigned_officeData);
        return assigned_office;
    }

    load(): Promise<any> {
        return this.login().then(() => {
            return this._assigned_officesStore.sync();
        }).then(() => {
            const sortByIDQuery = new Query();
            sortByIDQuery.ascending("_id");
            const stream = this._assigned_officesStore.find(sortByIDQuery);
            return stream.toPromise();
        }).then((data) => {
            this._allAssigned_Offices = [];
            data.forEach((assigned_officeData: any) => {
                let assigned_office = this.updateAssignedOffice(assigned_officeData)
                this._allAssigned_Offices.push(assigned_office);
            })            
            return this._allAssigned_Offices;        
        });
    }

    update(assigned_officeModel: AssignedOffice): Promise<any> {
        const updateModel = AssignedOfficeService.cloneUpdateModel(assigned_officeModel);
        return this._assigned_officesStore.save(updateModel);
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