
export interface  InteractionMetadata   
{
    id: string,
    uid: string,
    state: string,
    updated: number
    [id: string]:any
}

export type  InteractionRecord =  InteractionTemplate & InteractionMetadata ;
export type InteractionTemplate =  SighUpInteractionEmail | SighUpInteractionSms ;

export interface SighUpInteractionEmail {
    channel: "email",
    email: string,
    firstname?: string,
    newsletter: boolean,
    deals?: boolean,

}


export interface SighUpInteractionSms {
    channel: "sms",
    phonenumber: string,
    firstname?: string,
    newsletter: boolean,

}