import React from 'react'
import {ComponentMeta} from '@storybook/react'
import {Container} from '@material-ui/core'
import {InteractionList} from "./InteractionList";

export default {
    title: 'Components/InteractionList',
    component: InteractionList,
    decorators: [
        Story => (
            <Container maxWidth='lg'>
                <Story/>
            </Container>
        )
    ]
} as ComponentMeta<typeof InteractionList>

export const list = () => (
    <InteractionList
        interactions={[
            {
                id: "121212",
                uid: "ewwewewe",
                state: "confirmed",
                updated: 11213232,

                channel: "email",
                email: "email@mail.com",
                newsletter: true,
                deals: true,
                firstname: "puf",
            },
            {
                id: "121212",
                uid: "ewwewewe",
                state: "confirmed",
                updated: 11213232,
                
                channel: "sms",
                phonenumber: "096767676",
                newsletter: true,
                firstname: "that's my name",
 
            },
        ]}
    />
)
