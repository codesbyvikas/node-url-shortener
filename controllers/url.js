const URL = require('../models/url');
const shortid = require('shortid');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortId = shortid.generate();
    console.log(shortId)

    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.render("home", {
        id: shortId
    });
    // return res.json({ id: shortId });
}

async function handleGetAnalytics(req,res){
    const shortId = decodeURIComponent(req.params.shortId.trim());
    console.log(shortId);
    const result = await URL.findOne({shortId});
    console.log(result);
    return res.json({ 
        totalClicks: result.visitHistory.length,
        analytics:result.visitHistory
    });
}

async function handGetRedirectUrl(req,res){
    const shortId = req.params.shortId.trim();


    console.log("Requested shortId:", shortId);

    
    
    const entry = await URL.findOneAndUpdate(
        { shortId }, 
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        },
        { new: true }
    );
    
    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    
    res.redirect(entry.redirectUrl); 
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
    handGetRedirectUrl,
};
