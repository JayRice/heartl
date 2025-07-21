import {User} from "../data/interfaces.ts";


export async function verify_user(user: User) : Promise<boolean> {
    console.log("Contacting server and verifying user: ", user)
    // Verify User here...


    return new Promise<boolean>((resolve, reject) => {
        resolve(true);
    })




}