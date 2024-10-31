import { UUID } from "crypto"

export const addProfile=(id:UUID,image:string)=>{
    return(
        `
            INSERT INTO profile_picture(id,image)
            VALUES('${id}','${image}');
        `
    )
}

export const getProfilePicture=(id:UUID)=>{
    return(
        `
            SELECT image FROM profile_picture WHERE id='${id}';
        `
    )
}

export const updateProfile=(image:string,id:string)=>{
    return(
        `
            UPDATE profile_picture SET image='${image}' WHERE id='${id}';
        `
    )
}