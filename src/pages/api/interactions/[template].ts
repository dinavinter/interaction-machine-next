import { isValidEmail } from 'lib/email'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import {random} from "nanoid";
 
// THIS IS IN MEMORY STATE
// will reset on every app restart
const interactions = []
export default function interactionsHandler(req, res) {
    const {
        query: { template },
        method,
    } = req

    switch (method) {
        case 'GET':
            // Get data from your database
            res.status(200).json(interactions)
            break
        case 'PUT':
            // Update or create data in your database
            res.status(200).json( interactions)
            break
        case 'POST':
            interactions.push({ ...req.body, id: random(7), updated: Date.now(), uid:req.body.email || req.body.phonenumber, state:"pending_verification"  })

            // Update or create data in your database
            res.status(200).json( interactions)
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
//
// export default nc<NextApiRequest, NextApiResponse >()
//     .get(async (req, res) => {
//         console.log( 'get interactions' );
//
//         return res.json(interactions)
//     })
//     .post(async (req, res) => {
//         console.log( 'post interactions' );
//
//         interactions.push({ ...req.body, id: random(7), updated: Date.now(), uid:req.body.email || req.body.phonenumber, state:"pending_verification"  })
//         return res.status(204).end()
//     })
