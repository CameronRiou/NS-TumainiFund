import { model } from "~/app/shared/model.model";

export class Child extends model {
    first_name: string;
    last_name: string;
    age: number;
    gender: number;
    date_of_birth: Date;
    school_name: string;
    school: number;
    school_level: number;
    books: boolean;
    head_of_family: string;
    hof_relation: string;
    personal_status: string;
    hygiene_kits: boolean;
    medical_support: boolean;
    future_educational_goals: string;
    transport_to_clinic: boolean;


    constructor(options: any) {
		super(options.id, encodeURI(options.image))
		this.first_name = options.first_name
        this.last_name = options.last_name
        this.age = Number(options.age)
        this.gender = Number(options.gender)
        this.date_of_birth = new Date(options.date_of_birth)
        this.school_name = options.school_name
        this.school = Number(options.school)
        this.school_level = Number(options.school_level)
        this.books = options.books
        this.head_of_family = options.head_of_family
        this.hof_relation = options.hof_relation
        this.personal_status = options.personal_status
        this.hygiene_kits = options.hygiene_kits
        this.medical_support = options.medical_support;
        this.future_educational_goals = options.future_educational_goals;
		this.transport_to_clinic = options.transport_to_clinic
	}

	public valid(): any {
		return model.validation(this,Child.validate)
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
				"name": "school_name",
				"displayName": "School",
				"index": 4,
				"editor": "Text",
				"required": true
			},
			{
				"name": "school_level",
				"displayName": "School Level",
				"index": 5,
				"required": true,
				"editor": "Picker",
				"valuesProvider": ["Pre","Primary","Secondary","Post 16","University"]
			},
			{
				"name": "books",
				"displayName": "Books",
				"index": 6,
				"editor": "Switch",
				"required": true
			},
			{
				"name": "head_of_family",
				"displayName": "Head of Family",
				"index": 7,
				"editor": "Text",
				"required": true
			},
			{
				"name": "hof_relation",
				"displayName": "Head of Family's Relation to Child",
				"index": 8,
				"editor": "Text",
				"required": true
			},
			{
				"name": "personal_status",
				"displayName": "Personal Status",
				"index": 9,
				"editor": "Text",
				"required": true
			},
			{
				"name": "hygiene_kits",
				"displayName": "Hygiene Kits",
				"index": 10,
				"editor": "Switch",
				"required": true
			},
			{
				"name": "medical_support",
				"displayName": "Medical Support",
				"index": 11,
				"editor": "Switch",
				"required": true
			},
			{
				"name": "future_educational_goals",
				"displayName": "Future Educational Goal",
				"index": 12,
				"editor": "MultilineText",
				"required": true
			},
			{
				"name": "transport_to_clinic",
				"displayName": "Transport to Clinic",
				"index": 13,
				"editor": "Switch",
				"required": true
			},
			{
				"name": "id",
				"index": 14,
				"ignore": true,
				"editor": "Number",
				"required": true,
				"modelfilter": true
			},
			{
				"description": "Age",
				"name": "age",
				"index": 15,
				"ignore": true,
				"editor": "Number",
				"required": true
			},
			{
				"name": "school",
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

	static editableProperties = Child.form.propertyAnnotations
	.filter(elem => !elem.modelfilter)
	.map(elem => elem.name)

	static validate = Child.form.propertyAnnotations
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