const { getUser } = require("../service/auth");
// const {} = require("../service/user");

async function restrictToLoggedInUserOnly(req, res, next){
    const userUid = req.cookies?.uid;

    console.log(userUid)
    
    if(!userUid) return res.redirect("/login");
    const user = getUser(userUid);
    
    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
}
