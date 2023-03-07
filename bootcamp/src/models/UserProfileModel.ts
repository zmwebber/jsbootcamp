export type Profile = {
    _id?: string | null,
    name: string,
    email: string,
    password: string,
    dateOfBirth:Date,
    createdAt: Date,   
        modifiedAt: Date,
        address1: string,
        address2: string,
         city: string,
        state: string,
        zipCode: string,
}

export class User implements Profile {
    name;
    email;
    password;
    dateOfBirth;
    createdAt;  
        modifiedAt;
        address1;
        address2;
         city;
        state;
        zipCode;

    constructor(email: string, password: string) {
        this.name = ""       
        this.email = email
        this.password = password
        this.dateOfBirth = new Date()
        this.createdAt = new Date()
        this.modifiedAt = new Date()
        this.address1 = ""
        this.address2 = ""
        this.city = ""
        this.state = ""
        this.zipCode = ""
    }
}