const corsAllows = {
    origin:[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials:true
}
module.exports = corsAllows