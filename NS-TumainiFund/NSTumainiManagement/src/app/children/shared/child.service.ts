import { Injectable } from "@angular/core";

/************** Plugins ***************/
import { DataStoreService, FilesService, UserService, Query, DataStoreType } from "kinvey-nativescript-sdk/angular";
//import { File } from "tns-core-modules/file-system";

/************** Models and Configs ***************/
import { Config } from "../../shared/config";
import { Child } from "./child.model";

/************** Constant Initialization ***************/
const editableProperties = [
    "first_name",
    "last_name",
    "date_of_birth",
    "gender",
    "school_name",
    "school_level",
    "books",
    "head_of_family",
    "hof_relation",
    "personal_status",
    "hygiene_kits",
    "medical_support",
    "future_educational_goals",
    "transport_to_clinic",
    "id",
    "age",
    "school_id",
    "image"
];

/************** Service Initialization ***************/
@Injectable({
    providedIn: "root"
})
export class ChildService {
    /************** Variable Initialization ***************/
    private static cloneUpdateModel(child: Child): object {
        return editableProperties.reduce((a, e) => (a[e] = child[e], a), { _id: child.id });
    }
    private _allChildren: Array<Child> = [];
    private _childrenStore = null;

    /************** Constructor ***************/
    constructor(
        dataStoreService: DataStoreService,
        private _filesService: FilesService,
        private _userService: UserService
    ) {
        this._childrenStore = dataStoreService.collection("children");
    }

    /************** Functions ***************/
    getChildById(id: string): Child {
        if (id) {            
            return this._allChildren.filter((child) => {
                return child.id === id;
            })[0];
        }
    }

    updateChild(childData){
        childData.id = childData._id;
        /*
        this.streamFile(childData.image_id).then((output: any) => {
            childData.image = output._downloadURL;
        })
        */
        const child = new Child(childData);
        return child;
    }

    load(): Promise<any> {
        return this.login().then(() => {
            return this._childrenStore.sync();
        }).then(() => {
            const sortByIDQuery = new Query();
            sortByIDQuery.ascending("_id");
            const stream = this._childrenStore.find(sortByIDQuery);
            return stream.toPromise();
        }).then((data) => {
            this._allChildren = [];
            data.forEach((childData: any) => {
                let child = this.updateChild(childData)
                this._allChildren.push(child);
            })            
            return this._allChildren;        
        });
    }

    update(childModel: Child): Promise<any> {
        const updateModel = ChildService.cloneUpdateModel(childModel);
        return this._childrenStore.save(updateModel);
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