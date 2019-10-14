import { Injectable } from "@angular/core";
// TODO: should be imported from kinvey-nativescript-sdk/angular but declaration file is currently missing
import { DataStoreService, FilesService, UserService, Query, DataStoreType } from "kinvey-nativescript-sdk/lib/angular";
import { File } from "tns-core-modules/file-system";

import { Config } from "../../shared/config";
import { Car } from "./car.model";

const editableProperties = [
    "class",
    "doors",
    "hasAC",
    "transmission",
    "luggage",
    "name",
    "price",
    "seats",
    "imageUrl"
];

@Injectable({
    providedIn: "root"
})
export class CarService {
    private static cloneUpdateModel(car: Car): object {
        // tslint:disable-next-line:ban-comma-operator
        return editableProperties.reduce((a, e) => (a[e] = car[e], a), { _id: car.id });
    }

    private _allChildren: Array<Car> = [];
    private _childrenStore = null;
    private temp: number;

    constructor(
        dataStoreService: DataStoreService,
        private _filesService: FilesService,
        private _userService: UserService) {
        this._childrenStore = dataStoreService.collection("children");
    }

    getCarById(id: string): Car {
        if (!id) {
            return;
        }

        return this._allChildren.filter((car) => {
            return car.id === id;
        })[0];
    }

    async streamFile(id: string) {
        try {
            const file = await this._filesService.stream(id);
            return file;
        } catch (error) {
            console.log(error);
        }
    }

    updateChild(childData){
        childData.id = childData._id;
        this.streamFile(childData.image_id).then((output: any) => {
            childData.image = output._downloadURL;
        })
        const child = new Car(childData);
        console.dir(child);
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
                let car = this.updateChild(childData)
                this._allChildren.push(car);
            })            
            return this._allChildren;        
        });
    }

    update(childModel: Car): Promise<any> {
        const updateModel = CarService.cloneUpdateModel(childModel);

        return this._childrenStore.save(updateModel);
    }

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
            });
    }



    private login(): Promise<any> {
        if (!!this._userService.getActiveUser()) {
            return Promise.resolve();
        } else {
            return this._userService.login(Config.kinveyUsername, Config.kinveyPassword);
        }
    }

    private getMimeType(imageExtension: string): string {
        const extension = imageExtension === "jpg" ? "jpeg" : imageExtension;

        return "image/" + extension.replace(/\./g, "");
    }
}