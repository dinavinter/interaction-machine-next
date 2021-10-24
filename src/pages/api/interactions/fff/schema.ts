import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import {random} from "nanoid";
import {JSONSchema6, JSONSchema7} from "json-schema";

// THIS IS IN MEMORY STATE
// will reset on every app restart
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

export default nc<NextApiRequest, NextApiResponse<JSONSchema7> >()
    
    .get(async (req, res) => {
        console.log( 'get schema' );

        return res.json(schema)
    })
    .post(async (req, res) => {
        schema = req.body as JSONSchema7;
        return res.status(204).end()
    })
