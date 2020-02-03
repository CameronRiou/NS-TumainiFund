import { model } from "~/app/shared/model.model";

export class AssignedOffice extends model {
    office_name: string;
    address_line_1: string;
	address_line_2: string;
	country: string;
	region: string;
	area_code: string;
	nac: string;
	landline_extension: string;
	landline_number: string;

	
    constructor(options: any) {
		super(options.id, encodeURI(options.image))
		this.office_name = options.office_name
		this.address_line_1 = options.address_line_1
		this.address_line_2 = options.address_line_2
		this.country = options.country
		this.region = options.region
		this.area_code = options.area_code
		this.nac = options.nac
		this.landline_extension = options.landline_extension
		this.landline_number = options.landline_number
		
		// console.dir(AssignedOffice.form.propertyAnnotations)
	}
	
	public valid(): any {
		return model.validation(this,AssignedOffice.validate)
		model.validation(this,AssignedOffice.validate)
		return 'testing'
	}

	static form = 
	{
		"isReadOnly": false,
		"commitMode": "Immediate",
		"validationMode": "Immediate",
		"propertyAnnotations":
		[
			{
				"name": "office_name",
				"displayName": "Office Name",
				"index": 0,
				"editor": "Text",
				"required": true
			},
			{
				"name": "address_line_1",
				"displayName": "Address Line 1",
				"index": 1,
				"editor": "Text",
				"required": true
			},
			{
				"name": "address_line_2",
				"displayName": "Address Line 2",
				"index": 2,
				"editor": "Text",
				"required": true
			},
			{
				"name": "country",
				"displayName": "Country",
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
				"name": "area_code",
				"displayName": "Area Code",
				"index": 5,
				"required": true,
				"editor": "Text"
			},
			{
				"name": "nac",
				"displayName": "NAC",
				"index": 6,
				"editor": "Text",
				"required": true
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
				"name": "image",
				"index": 9,
				"ignore": true,
				"required": true,
				"modelfilter": true
			},
			{
				"name": "id",
				"index": 10,
				"ignore": true,
				"required": true,
				"modelfilter": true
			}
		]
	}

	static editableProperties = AssignedOffice.form.propertyAnnotations
	.filter(elem => !elem.modelfilter)
	.map(elem => elem.name)

	static validate = AssignedOffice.form.propertyAnnotations
	.filter(elem => {
		console.dir(elem)
		return !elem.modelfilter
	})
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
			/*case "Picker":
				type = "picker"
				options = elem.valuesProvider
				break*/
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