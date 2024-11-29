import { auth } from "../../../../next.auth.config";
import Content from "./content";

interface pageProps{
    
}

export default async function page({}:pageProps ){
    const session=await auth()
    return(
        <Content session={session}/>
    )
}