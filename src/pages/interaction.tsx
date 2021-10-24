import * as React from 'react'
import {NextPage} from 'next'
import {Container} from '@material-ui/core'
import {SubscribeHero} from 'components/SubscribeHero/SubscribeHero'
import {secureLoader, useAPIPost} from 'lib/api'
import useSWR from 'swr'
import {InteractionList} from 'components/InteractionList'
import {InteractionForm} from "../components/InteractionForm/InteractionForm";
import {InteractionRecord, InteractionTemplate} from "../components/InteractionTemplate";
import {JSONSchema7} from "json-schema";

const URL = '/api/interactions/signup'
var schema:JSONSchema7 = {
    "definitions": {
        "email": {
            "type": "object",
            "title": "Email",
            "properties": {
                "email": {
                    "type": "string"
                }
            },
            "required": [
                "email"
            ]
        },
        "phone": {
            "type": "object",
            "properties": {
                "phonenumber": {
                    "type": "string"
                }
            },
            "required": [
                "phonenumber"
            ]
        },
        "profile": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "age": {
                    "type": "string"
                }
            },
            "required": [
                "name",
                "age"
            ]
        }
    },
    "type": "object",
    "properties": {
        "profile": {
            "$ref": "#/definitions/profile"
        },
        "channel": {
            "type": "string",
            "enum": [
                "email",
                "sms"
            ],
            "default" : "email"
        }
    } ,
    "dependencies": {
        "channel": {
            "oneOf": [
                {
                    "properties": {
                        "channel": {
                            "type": "string",
                            "enum": [           "email"
                            ]
                        },
                        "email" :{
                            "$ref":"#/definitions/email"
                        },
                        "deals": {
                            "type": "boolean"
                        }
                    }
                },
                {
                    "properties": {
                        "channel": {
                            "type": "string",
                            "enum": [
                                "sms"
                            ]
                        },
                        "phonenumber" :{
                            "$ref":"#/definitions/phone"
                        },
                        "newsletter": {
                            "type": "boolean"
                        }
                    }
                }
            ]
        }
    }
}
const fetcher = (url) => fetch(url).then((res) => res.json())

const IterationPage: NextPage = () => {
    const subscribe = useAPIPost<void, InteractionTemplate>(URL)
    // const subscribe =  {post:console.log,error:console.log }
    console.log(1);
    const {data, revalidate} = useSWR<any[]>(URL,fetcher)
    console.log(2);

    // const schema = useSWR<JSONSchema7>(`${URL}/schema`, secureLoader())
    console.log(3);

    React.useEffect(() => {
        if (subscribe.posted) {
            revalidate()
            subscribe.reset()
        }
    }, [subscribe.posted])

    return (
        <Container maxWidth='lg'>
            {/*<SubscribeHero onSubmit={email => subscribe.post({ email })} hasError={!!subscribe.error} />*/}

            <InteractionForm onSubmit={subscribe.post} hasError={!!subscribe.error} schema={schema}/> 
            <InteractionList interactions={data || []}/>
        </Container>
    )
}

export default IterationPage
