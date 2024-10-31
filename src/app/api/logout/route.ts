import { NextResponse } from "next/server";

export function GET(request:Request){
     const res=NextResponse.json({message:'Logout successfully'})
     res.cookies.delete('token')
     return res
}