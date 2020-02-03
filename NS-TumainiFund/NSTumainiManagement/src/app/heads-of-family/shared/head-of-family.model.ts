import { Child } from "~/app/children/shared/child.model";
import { model } from "~/app/shared/model.model";

export class HeadOfFamily extends model {
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


    constructor(options: any) {
		super(options.id, encodeURI(options.image))
		this.first_name = options.first_name
        this.last_name = options.last_name
        this.age = Number(options.age)
        this.gender = Number(options.gender)
		this.date_of_birth = new Date(options.date_of_birth)
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

	public valid(): any {
		return model.validation(this,HeadOfFamily.validate)
	}
	
	static form = {
		"isReadOnly": false,
		"commitMode": "Immediate",
		"validationMode": "Immediate",
		"propertyAnnotations":
		[
			{
				"name": "first_name",
				"displayName": "First Name",
				"index": 0,
				"required": true
			},
			{
				"name": "last_name",
				"displayName": "Last Name",
				"index": 1,
				"required": true
			},
			{
				"name": "date_of_birth",
				"displayName": "Date of Birth",
				"index": 2,
				"editor": "DatePicker",
				"required": true,
				"strokeColor": "black"
			},
			{
				"name": "gender",
				"displayName": "Gender",
				"index": 3,
				"required": true,
				"editor": "Picker",
				"valuesProvider": ["Male","Female","Other"]
			},
			{
				"name": "assigned_children_number",
				"displayName": "Assigned Children",
				"index": 4,
				"required": true,
				"editor": "Number"
			},
			{
				"name": "assigned_office_name",
				"displayName": "Assigned Office",
				"index": 5,
				"required": true
			},
			{
				"name": "village_name",
				"displayName": "Village",
				"index": 6,
				"required": true
			},
			{
				"name": "deanery_name",
				"displayName": "Deanery",
				"index": 7,
				"required": true
			},
			{
				"name": "diocese_name",
				"displayName": "Diocese",
				"index": 8,
				"required": true
			},
			{
				"name": "parish_worker_name",
				"displayName": "Parish Worker",
				"index": 9,
				"required": true
			},
			{
				"name": "social_worker_name",
				"displayName": "Social Worker",
				"index": 10,
				"required": true
			},
			{
				"name": "receiving_money",
				"displayName": "Receiving Money?",
				"index": 11,
				"editor": "Switch",
				"required": true
			},
			{
				"name": "assigned_sponsor_name",
				"displayName": "Assigned Sponsor",
				"index": 12,
				"required": true
			},
			{
				"name": "verified_by_guernsey",
				"displayName": "Verified By Guernsey?",
				"index": 13,
				"editor": "Switch",
				"required": true
			},
			{
				"name": "date_verified",
				"displayName": "Date Verified",
				"index": 14,
				"editor": "DatePicker",
				"required": true,
				"strokeColor": "black"
			},
			{
				"name": "house_type_name",
				"displayName": "House Type",
				"index": 15,
				"required": true
			},
			{
				"name": "house_provided",
				"displayName": "House Provided?",
				"index": 16,
				"editor": "Switch",
				"required": true
			},
			{
				"name": "diet_type_name",
				"displayName": "Diet Type",
				"index": 17,
				"required": true
			},
			{
				"name": "food_needs",
				"displayName": "Food Needs",
				"index": 18,
				"required": true
			},
			{
				"name": "work_type_name",
				"displayName": "Work Type",
				"index": 19,
				"required": true
			},
			{
				"name": "distance_to_work",
				"displayName": "Distance To Work (Km)",
				"index": 20,
				"editor":"Number",
				"required": true
			},
			{
				"name": "created_by",
				"displayName": "Record Creator",
				"required": true,
				"ignore":true
			},
			{
				"name": "nearest_hospital_name",
				"displayName": "Nearest Hospital",
				"index": 21,
				"required": true
			},
			{
				"name": "distance_to_hospital",
				"displayName": "Distance To Hospital (Km)",
				"index":22,
				"editor":"Number",
				"required": true
			},
			{
				"name": "water_type_name",
				"displayName": "Water Type",
				"index": 23,
				"required": true
			},
			{
				"name": "distance_to_water",
				"displayName": "Distance To Water (Km)",
				"index": 24,
				"editor": "Number",
				"required": true
			},
			{
				"name": "situation",
				"displayName": "Situation",
				"index": 25,
				"editor": "MultilineText",
				"required": true,
				"modelfilter": true
			},
			{
				"name": "assigned_children",
				"editor": "Number",
				"ignore":true,
				"required": true,
				"modelfilter": true
			},
			{
				"name": "assigned_office",
				"editor": "Number",
				"ignore":true,
				"required": true,
				"modelfilter": true
			},
			{
				"name": "village",
				"editor": "Number",
				"ignore": true,
				"required": true,
				"modelfilter": true
			},
			{
				"name": "deanery",
				"editor": "Number",
				"ignore": true,
				"required": true,
				"modelfilter": true
			},
			{
				"name": "diocese",
				"editor": "Number",
				"ignore": true,
				"required": true,
				"modelfilter": true
			},
			{
				"name": "image",
				"editor": "Text",
				"ignore": true,
				"required": true,
				"modelfilter": true
			},
			{
				"name": "parish_worker",
				"editor": "Number",
				"ignore":true,
				"required": true,
				"modelfilter": true
			},
			{
				"name": "social_worker",
				"editor": "Number",
				"ignore":true,
				"required": true,
				"modelfilter": true
			},
			{
				"name": "assigned_sponsor",
				"editor": "Number",
				"ignore": true,
				"required": true,
				"modelfilter": true
			},
			{
				"name": "house_type",
				"ignore": true,
				"required": true,
				"modelfilter": true
			},
			{
				"name": "diet_type",
				"ignore": true,
				"required": true,
				"modelfilter": true
			},
			{
				"name": "work_type",
				"ignore": true,
				"required": true,
				"modelfilter": true
			},
			{
				"name": "nearest_hospital",
				"editor": "Number",
				"ignore": true,
				"required": true,
				"modelfilter": true
			},
			{
				"name": "water_type",
				"editor": "Number",
				"ignore": true,
				"required": true,
				"modelfilter": true
			},
			{
				"name": "id",
				"editor": "Number",
				"ignore":true,
				"required":true,
				"modelfilter": true
			},
			{
				"description": "Age",
				"name": "age",
				"editor": "Number",
				"ignore": true,
				"required":true,
				// "modelfilter": true
			}
		]
	}

	static editableProperties = HeadOfFamily.form.propertyAnnotations
	.filter(elem => !elem.modelfilter)
	.map(elem => elem.name)

	static validate = HeadOfFamily.form.propertyAnnotations
	.filter(elem => !elem.modelfilter)
	.map(elem => {
		let type, options
		switch(elem.editor){
			case "Text":
				type = "string"
				break
			case "MultilineText":
				type = "string"
				break
			case "DatePicker":
				type = "date"
				break
			case "Picker":
				type = "picker"
				options = elem.valuesProvider
				break
			case "Switch":
				type = 'boolean'
				break
			case "Number":
				type = 'number'
				break
			default:
				type = "string"
		}
		return {
			"description": elem.displayName,
			"property": elem.name,
			"type": type,
			"options": options
		}

	})
}