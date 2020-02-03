import { model } from "~/app/shared/model.model";

export class School extends model {

	school_name: string
	school_type: number
	village: string
	district: string
	country: string
	region: string
	account_number: string
	landline_extension: string
	landline_number: string

    constructor(options: any) {
		super(options.id, encodeURI(options.image))
		this.school_name = options.school_name
        this.school_type = Number(options.school_type)
        this.village = options.village
        this.district = options.district
        this.country = options.country
        this.region = options.region
        this.account_number = options.account_number
        this.landline_extension = options.landline_extension
        this.landline_number = options.landline_number
        
	}

	public valid(): any {
		return model.validation(this,School.validate)
	}

	static form = 
	{
		"isReadOnly": false,
		"commitMode": "Immediate",
		"validationMode": "Immediate",
		"propertyAnnotations":
		[
			{
				"name": "school_name",
				"displayName": "School Name",
				"index": 0,
				"editor": "Text",
				"required": true
			},
			{
				"name": "school_type",
				"displayName": "School Type",
				"index": 1,
				"editor": "Picker",
				"valuesProvider": ["Pre","Primary","Secondary","Post 16","University"],
				"required": true
			},
			{
				"name": "village",
				"displayName": "Village",
				"index": 2,
				"editor": "Text",
				"required": true
			},
			{
				"name": "district",
				"displayName": "District",
				"index": 3,
				"required": true,
				"editor": "Text"
			},
			{
				"name": "region",
				"displayName": "Region",
				"index": 4,
				"editor": "Text",
				"required": true
			},
			{
				"name": "account_number",
				"displayName": "Account Number",
				"index": 5,
				"required": true,
				"editor": "Text"
			},
			{
				"name": "landline_extension",
				"displayName": "Landline Extension",
				"index": 7,
				"editor": "Text",
				"required": true
			},
			{
				"name": "landline_number",
				"displayName": "Landline Number",
				"index": 8,
				"editor": "Text",
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
				"name": "image",
				"index": 17,
				"ignore": true,
				"required": true,
				"modelfilter": true
			}
		]
	}

	static editableProperties = School.form.propertyAnnotations
	.filter(elem => !elem.modelfilter)
	.map(elem => elem.name)

	static validate = School.form.propertyAnnotations
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