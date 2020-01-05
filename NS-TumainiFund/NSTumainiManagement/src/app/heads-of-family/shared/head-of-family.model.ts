import { Child } from "~/app/children/shared/child.model";

export class HeadOfFamily {
    id: string;
    first_name: string;
    last_name: string;
    age: number;
    gender: number;
    date_of_birth: Date;
	assigned_children: Child[]; // While using NoSQL, not needed as it is number entry only
	assigned_children_number: number;
	assigned_office: number; // While using NoSQL, not needed as it is text entry only
	assigned_office_name: string;
	village: number; // While using NoSQL, not needed as it is text entry only
	village_name: string;
	deanery: number; // While using NoSQL, not needed as it is text entry only
	deanery_name: string;
	diocese: number; // While using NoSQL, not needed as it is text entry only
	diocese_name: string;
	parish_worker: number; // While using NoSQL, not needed as it is text entry only
	parish_worker_name: string;
	social_worker: number; // While using NoSQL, not needed as it is text entry only
	social_worker_name: string;
	receiving_money: boolean;
	assigned_sponsor: number; // While using NoSQL, not needed as it is text entry only
	assigned_sponsor_name: string;
	verified_by_guernsey: boolean;
	date_verified: Date;
	house_type: number; // While using NoSQL, not needed as it is text entry only
	house_type_name: string;
	house_provided: boolean;
	diet_type: number; // While using NoSQL, not needed as it is text entry only
	diet_type_name: string;
	food_needs: string;
	work_type: number; // While using NoSQL, not needed as it is text entry only
	work_type_name: string;
	distance_to_work: number;
	created_by: string;
	nearest_hospital: number; // While using NoSQL, not needed as it is text entry only
	nearest_hospital_name: string;
	distance_to_hospital: number;
	water_type: number; // While using NoSQL, not needed as it is text entry only
	water_type_name: string;
	distance_to_water: number;
	situation: string;
    image: string;

    constructor(options: any) {
        this.id = options.id;
        this.first_name = options.first_name
        this.last_name = options.last_name
        this.age = Number(options.age)
        this.gender = Number(options.gender)
        this.date_of_birth = new Date(options.date_of_birth)
		this.image = encodeURI(options.image);
		this.assigned_children = options.assigned_children
		this.assigned_children_number = options.assigned_children_number
		this.assigned_office = options.assigned_office
		this.assigned_office_name = options.assigned_office_name
		this.village = options.village
		this.village_name = options.village_name
		this.deanery = options.deanery
		this.deanery_name = options.deanery_name
		this.diocese = options.diocese
		this.diocese_name = options.diocese_name
		this.parish_worker = options.parish_worker
		this.parish_worker_name = options.parish_worker_name
		this.social_worker = options.social_worker
		this.social_worker_name = options.social_worker_name
		this.receiving_money = options.receiving_money
		this.assigned_sponsor = options.assigned_sponsor
		this.assigned_sponsor_name = options.assigned_sponsor_name
		this.verified_by_guernsey = options.verified_by_guernsey
		this.date_verified = new Date(options.date_verified)
		this.house_type = options.house_type
		this.house_type_name = options.house_type_name
		this.house_provided = options.house_provided
		this.diet_type = options.diet_type
		this.diet_type_name = options.diet_type_name
		this.food_needs = options.food_needs
		this.work_type = options.work_type
		this.work_type_name = options.work_type_name
		this.distance_to_work = options.distance_to_work
		this.created_by = options.created_by
		this.nearest_hospital = options.nearest_hospital
		this.nearest_hospital_name = options.nearest_hospital_name
		this.distance_to_hospital = options.distance_to_hospital
		this.water_type = options.water_type
		this.water_type_name = options.water_type_name
		this.distance_to_water = options.distance_to_water
		this.situation = options.situation
    }
}