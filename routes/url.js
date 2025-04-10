const express = require('express');
const { handleGenerateNewShortUrl,handleGetAnalytics,handGetRedirectUrl } = require('../controllers/url');

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);

router.get('/analytics/:shortId', handleGetAnalytics);

router.get("/:shortId",handGetRedirectUrl);



module.exports = router