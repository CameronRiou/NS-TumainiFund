import { model } from "~/app/shared/model.model";

/*
"_id": 1,
"first_name": "Test",
"last_name": "Sponsor",
"salutation": "Hi",
"payment": "BT",
"contribution_type": "example",
"email": "example@example.com",
"phone_extension":"+(000)",
"phone_number": "000000",
"address_line_1": "Place",
"address_line_2": "Place",
"country": "Place",
"region": "Place",
"area_code": "XXXXXX",
*/
export class Sponsor extends model {
	first_name: string;
	last_name: string;
	salutation: string;
	payment: string;
	contribution_type: string;
	email: string;
	phone_extension: string;
	phone_number: string;
	address_line_1: string;
	address_line_2: string;
	country: string;
	region: string;
	area_code: string;

    constructor(options: any) {
		super(options.id, encodeURI(options.image))
		this.first_name = options.first_name
        this.last_name = options.last_name
        this.salutation = options.salutation
        this.payment = options.payment
        this.contribution_type = options.contribution_type
        this.email = options.email
        this.phone_extension = options.phone_extension
        this.phone_number = options.phone_number
        this.address_line_1 = options.address_line_1
        this.address_line_2 = options.address_line_2
        this.country = options.country
        this.region = options.region
        this.area_code = options.area_code
	}

	public valid(): any {
		return model.validation(this,Sponsor.validate)
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
				"name": "salutation",
				"displayName": "Salutation",
				"index": 2,
				"editor": "Text",
				"required": true,
			},
			{
				"name": "payment",
				"displayName": "Payment Method",
				"index": 3,
				"required": true,
				"editor": "Text",
			},
			{
				"name": "contribution_type",
				"displayName": "Contribution Type",
				"index": 4,
				"editor": "Text",
				"required": true
			},
			{
				"name": "email",
				"displayName": "Email",
				"index": 5,
				"required": true,
				"editor": "Email",
			},
			{
				"name": "phone_extension",
				"displayName": "Phone Extension",
				"index": 6,
				"editor": "Text",
				"required": true
			},
			{
				"name": "phone_number",
				"displayName": "Phone Number",
				"index": 7,
				"editor": "Text",
				"required": true
			},
			{
				"name": "address_line_1",
				"displayName": "Address Line 1",
				"index": 8,
				"editor": "Text",
				"required": true
			},
			{
				"name": "address_line_2",
				"displayName": "Address Line 2",
				"index": 9,
				"editor": "Text",
				"required": true
			},
			{
				"name": "country",
				"displayName": "Country",
				"index": 10,
				"editor": "Text",
				"required": true
			},
			{
				"name": "region",
				"displayName": "Region",
				"index": 11,
				"editor": "Text",
				"required": true
			},
			{
				"name": "area_code",
				"displayName": "Area Code",
				"index": 12,
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

	static editableProperties = Sponsor.form.propertyAnnotations
	.filter(elem => !elem.modelfilter)
	.map(elem => elem.name)

	static validate = Sponsor.form.propertyAnnotations
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
				// options = elem.valuesProvider
				break
			case "Switch":
				type = 'boolean'
				break
			case "Number":
				type = 'number'
				break
			default:
				type = 'string'
			}
		return {
			"description": elem.displayName,
			"property": elem.name,
			"type": type,
			"options": options
		}

	})
}