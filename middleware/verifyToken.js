const Jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if (authHeaders) {
        const token = authHeaders.split("")[1];
        Jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                return res.status(403).json({
                    status: false, message: "Invalid Token"
                })
                req.user = user;
                next();
            }
            else {
                return res.status(401).json({
                    status: false,
                    message: "You are not authenticated"
                });

            }
        }
        )
    }


};
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "Client" || req.user.userType === "Admin" || req.user.userType === "Vendor" || req.user.userType === "Delivery") {
            next();
        } else {
            return res.status(403).json({
                status: false,
                message: "You are not allowed to do that!"
            });
        }
    })
};
const verifyVendor = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "Admin" || req.user.userType === "Vendor") {
            next();
        } else {
            return res.status(403).json({
                status: false,
                message: "You are not allowed to do that!"
            });
        }
    })
};
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "Admin") {
            next();
        } else {
            return res.status(403).json({
                status: false,
                message: "You are not allowed to do that!"
            });
        }
    })
};
const verifyDriver = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "Delivery") {
            next();
        } else {
            return res.status(403).json({
                status: false,
                message: "You are not allowed to do that!"
            });
        }
    })
};

module.exports = {
    verifyTokenAndAuthorization,
    verifyAdmin,
    verifyDriver,
    verifyVendor
}
    ;
