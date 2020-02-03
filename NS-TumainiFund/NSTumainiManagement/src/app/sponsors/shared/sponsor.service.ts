import { Injectable } from "@angular/core";

/************** Plugins ***************/
import { DataStoreService, FilesService, UserService, Query, DataStoreType } from "kinvey-nativescript-sdk/angular";
//import { File } from "tns-core-modules/file-system";

/************** Models and Configs ***************/
import { Config } from "../../shared/config";
import { Sponsor } from "./sponsor.model";

/************** Service Initialization ***************/
@Injectable({
    providedIn: "root"
})
export class SponsorService {
    /************** Variable Initialization ***************/
    private static cloneUpdateModel(sponsor: Sponsor): object {
        return Sponsor.editableProperties.reduce((a, e) => (a[e] = sponsor[e], a), { _id: sponsor.id });
    }
    private _allSponsors: Array<Sponsor> = [];
    private _sponsorsStore = null;

    /************** Constructor ***************/
    constructor(
        dataStoreService: DataStoreService,
        private _filesService: FilesService,
        private _userService: UserService
    ) {
        this._sponsorsStore = dataStoreService.collection("sponsors");
    }

    /************** Functions ***************/
    getSponsorById(id: string): Sponsor {
        if (id) {            
            return this._allSponsors.filter((sponsor) => {
                return sponsor.id === id;
            })[0];
        }
    }

    updateSponsor(sponsorData){
        sponsorData.id = sponsorData._id;
        /*
        this.streamFile(sponsorData.image_id).then((output: any) => {
            sponsorData.image = output._downloadURL;
        })
        */
        const sponsor = new Sponsor(sponsorData);
        return sponsor;
    }

    load(): Promise<any> {
        return this.login().then(() => {
            return this._sponsorsStore.sync();
        }).then(() => {
            const sortByIDQuery = new Query();
            sortByIDQuery.ascending("_id");
            const stream = this._sponsorsStore.find(sortByIDQuery);
            return stream.toPromise();
        }).then((data) => {
            this._allSponsors = [];
            data.forEach((sponsorData: any) => {
                let sponsor = this.updateSponsor(sponsorData)
                this._allSponsors.push(sponsor);
            })            
            return this._allSponsors;        
        });
    }

    update(sponsorModel: Sponsor): Promise<any> {
        const updateModel = SponsorService.cloneUpdateModel(sponsorModel);
        return this._sponsorsStore.save(updateModel);
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