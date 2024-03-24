import fetch from "node-fetch";
import {ConfigService} from "../../../src/services/config.service";

export default async function handler(req, res) {
    res.json({status: 200, notice: "auth to implement / TODO"});
}