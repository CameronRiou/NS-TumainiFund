export class model {
	id: string;
	image: string;

	constructor(id: string, image: string){
		this.id = id
		this.image = image
	}

	static validation(item, validate): any {
		let valid = true
		for (let field of validate) {
			// console.dir(field)
			switch (field.type) {
				case "picker":
					//field.options.indexOf(child[field.property]) === -1 ? valid = false : false;
					(0 <= item[field.property] && item[field.property] < field.options.length) ? valid : valid = false;
					break
				case "date":			
					(item[field.property] && Object.prototype.toString.call(item[field.property]) === "[object Date]" && !isNaN(item[field.property])) ? valid : valid = false;
					break
				default:
					typeof item[field.property] == field.type ? valid : valid=false;
			}
			item[field.property] == null ? valid = false : false;
			item[field.property] === "" ? valid = false : false;
			if (!valid) return `${field.description} || ${item[field.property]}`
		};
		return valid
	}
}