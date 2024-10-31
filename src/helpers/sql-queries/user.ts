import { UUID } from "crypto"

export function createUser({name,email,password,dob,image}:{
 name:string,email:string,password:string,dob:Date | null,image:UUID
}){
    if(dob){
    return(
                `
            INSERT INTO "user" (
                name,
                email,
                password,
                dob,
                image
            ) 
            VALUES('${name}','${email}','${password}',Date '${dob}','${image}');
        `
    )}
    else{
        return(
                `
            INSERT INTO "user" (
                name,
                email,
                password,
                image
            ) 
            VALUES('${name}','${email}','${password}','${image}');
        `
        )
    }
}

export function getUserById(id:string){
        return(
                `
                SELECT * FROM "user" WHERE id='${id}';
            `
        )
    }

export function getUserByEmail(email:string){
    return (
        `
            SELECT * FROM "user" WHERE email='${email}';
        `
    )

}
export function getAllUsers(){
    return(
        `
            SELECT * FROM "user";
        `
    )
    }

