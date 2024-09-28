const errorMiddleware = (err, req, res, next) => {
    console.log(err.stack)

    res.status(err.status || 500).json({
        msg: err.message || "Server Error"
    })
}

module.exports = { errorMiddleware }