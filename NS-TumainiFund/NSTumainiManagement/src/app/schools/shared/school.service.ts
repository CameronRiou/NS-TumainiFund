import { Injectable } from "@angular/core";

/************** Plugins ***************/
import { DataStoreService, FilesService, UserService, Query, DataStoreType } from "kinvey-nativescript-sdk/angular";
//import { File } from "tns-core-modules/file-system";

/************** Models and Configs ***************/
import { Config } from "../../shared/config";
import { School } from "./school.model";

/************** Service Initialization ***************/
@Injectable({
    providedIn: "root"
})
export class SchoolService {
    /************** Variable Initialization ***************/
    private static cloneUpdateModel(school: School): object {
        return School.editableProperties.reduce((a, e) => (a[e] = school[e], a), { _id: school.id });
    }
    private _allSchools: Array<School> = [];
    private _schoolsStore = null;

    /************** Constructor ***************/
    constructor(
        dataStoreService: DataStoreService,
        private _filesService: FilesService,
        private _userService: UserService
    ) {
        this._schoolsStore = dataStoreService.collection("schools");
    }

    /************** Functions ***************/
    getSchoolById(id: string): School {
        if (id) {            
            return this._allSchools.filter((school) => {
                return school.id === id;
            })[0];
        }
    }

    updateSchool(schoolData){
        schoolData.id = schoolData._id;
        /*
        this.streamFile(schoolData.image_id).then((output: any) => {
            schoolData.image = output._downloadURL;
        })
        */
        const school = new School(schoolData);
        return school;
    }

    load(): Promise<any> {
        return this.login().then(() => {
            return this._schoolsStore.sync();
        }).then(() => {
            const sortByIDQuery = new Query();
            sortByIDQuery.ascending("_id");
            const stream = this._schoolsStore.find(sortByIDQuery);
            return stream.toPromise();
        }).then((data) => {
            this._allSchools = [];
            data.forEach((schoolData: any) => {
                let school = this.updateSchool(schoolData)
                this._allSchools.push(school);
            })            
            return this._allSchools;        
        });
    }

    update(schoolModel: School): Promise<any> {
        const updateModel = SchoolService.cloneUpdateModel(schoolModel);
        return this._schoolsStore.save(updateModel);
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