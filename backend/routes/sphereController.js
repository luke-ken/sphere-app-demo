const express = require('express');
const router = express.Router();


// in-memory-only storage for the radius
let radius = 1 // default value

router.post("/json-rpc-sphere", (req, res) => {
    const {id, method, params} = req.body
    if (method === "setRadius" && params && params.radius) {
        radius = params.radius
        res.json({jsonrpc: "2.0", result: "Radius updated successfully", id: id})
    } else if (method === "getRadius") {
        res.json({jsonrpc: "2.0", result: radius, id: id})
    }
})

module.exports = router
