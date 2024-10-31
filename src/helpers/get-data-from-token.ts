import jwt from 'jsonwebtoken'
export function getTokenData(token:string){
    let result:any
    try {
        result=jwt.verify(token,process.env.PRIVATE_KEY!,(error:any,user:any)=>{
            if(error){
                throw new Error(error)
            }
            return user
        })
    } catch (error:any) {
        console.log(error.message)
        return error
    }
    return result
}