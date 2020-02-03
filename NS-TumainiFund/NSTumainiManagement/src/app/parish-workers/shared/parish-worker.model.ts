import { model } from "~/app/shared/model.model";

export class ParishWorker extends model {
	first_name: string;
	last_name: string;
	age: number;
	gender: number;
	date_of_birth: Date;
	assigned_children: number;
	assigned_children_number: number;
	assigned_office: number;
	assigned_office_name: string;
	village: number;
	village_name: string;
	deanery: number;
	deanery_name: string;
	diocese: number;
	diocese_name: string;

    constructor(options: any) {
		super(options.id, encodeURI(options.image))
		this.first_name = options.first_name
        this.last_name = options.last_name
        this.age = Number(options.age)
        this.gender = Number(options.gender)
        this.date_of_birth = new Date(options.date_of_birth)
        this.assigned_children_number = options.assigned_children_number
        this.assigned_office_name = options.assigned_office_name
        this.village_name = options.village_name
        this.deanery_name = options.deanery_name
        this.diocese_name = options.diocese_name
	}

	public valid(): any {
		return model.validation(this,ParishWorker.validate)
	}

	static form = 
	{
		"isReadOnly": false,
		"commitMode": "Immediate",
		"validationMode": "Immediate",
		"propertyAnnotations":
		[
			{
				"name": "first_name",
				"displayName": "First Name",
				"index": 0,
				"editor": "Text",
				"required": true
			},
			{
				"name": "last_name",
				"displayName": "Last Name",
				"index": 1,
				"editor": "Text",
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
				"name": "age",
				"index": 4,
				"editor": "Number",
				"required": true,
				"ignore": true,
				"modelfilter": true
			},
			{
				"name": "assigned_children",
				"displayName": "Assigned Children",
				"index": 5,
				"required": true,
				"ignore": true,
				"modelfilter": true,
				"editor": "Picker",
			},
			{
				"name": "assigned_children_number",
				"displayName": "Assigned Children",
				"index": 6,
				"editor": "Number",
				"required": true
			},
			{
				"name": "assigned_office",
				"displayName": "Assigned Office",
				"index": 7,
				"editor": "Text",
				"required": true,
				"ignore": true,
				"modelfilter": true
			},
			{
				"name": "assigned_office_name",
				"displayName": "Assigned Office",
				"index": 8,
				"editor": "Text",
				"required": true
			},
			{
				"name": "village",
				"displayName": "Village",
				"index": 9,
				"editor": "Text",
				"required": true,
				"ignore": true,
				"modelfilter": true
			},
			{
				"name": "village_name",
				"displayName": "Village",
				"index": 10,
				"editor": "Text",
				"required": true
			},
			{
				"name": "deanery",
				"displayName": "Deanery",
				"index": 11,
				"editor": "Text",
				"required": true,
				"ignore": true,
				"modelfilter": true
			},
			{
				"name": "deanery_name",
				"displayName": "Deanery",
				"index": 12,
				"editor": "Text",
				"required": true
			},
			{
				"name": "diocese",
				"displayName": "Diocese",
				"index": 13,
				"editor": "Text",
				"required": true,
				"ignore": true,
				"modelfilter": true
			},
			{
				"name": "diocese_name",
				"displayName": "Diocese",
				"index": 14,
				"editor": "Text",
				"required": true,
			},
			{
				"name": "id",
				"index": 16,
				"ignore": true,
				"editor": "Number",
				"required": true,
				"modelfilter": true
			},
			{
				"name": "image",
				"index": 17,
				"ignore": true,
				"required": true,
				"modelfilter": true
			}
		]
	}

	static editableProperties = ParishWorker.form.propertyAnnotations
	.filter(elem => !elem.modelfilter)
	.map(elem => elem.name)

	static validate = ParishWorker.form.propertyAnnotations
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