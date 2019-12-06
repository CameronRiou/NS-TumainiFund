export class Car {
    id: string;
    first_name: string;
    last_name: string;
    age: number;
    gender: string;
    date_of_birth: Date;
    school_name: string;
    school_id: number;
    school_level: string;
    books: boolean;
    head_of_family: string;
    hof_relation: string;
    personal_status: string;
    hygiene_kits: boolean;
    medical_support: boolean;
    future_educational_goals: string;
    transport_to_clinic: boolean;
    image: string;


    constructor(options: any) {
        this.id = options.id;
        this.first_name = options.first_name
        this.last_name = options.last_name
        this.age = Number(options.age)
        this.gender = options.gender
        this.date_of_birth = new Date(options.date_of_birth)
        this.school_name = options.school_name
        this.school_id = Number(options.school)
        this.school_level = options.school_level
        this.books = options.books
        this.head_of_family = options.head_of_family
        this.hof_relation = options.hof_relation
        this.personal_status = options.personal_status
        this.hygiene_kits = options.hygiene_kits
        this.medical_support = options.medical_support;
        this.future_educational_goals = options.future_educational_goals;
        this.transport_to_clinic = options.transport_to_clinic
        this.image = encodeURI(options.image);
    }
}
