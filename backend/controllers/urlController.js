const Url = require('../model/url');
const randomString=require("randomstring");

//Generate Short url
exports.shortenUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;
        // if (!originalUrl) {
        //     req.flash("error", "Enter url first");
        //     return res.redirect("/home");
        // }

        const shortUrl = randomString.generate(8); //Generate random string for url
        const newUrl=await Url.create({
            originalUrl,
            shortUrl,
        });
        
        await newUrl.save();

        // req.flash("success", "Url generated successfully");
        res.status(201).json({shortenLink:`http://localhost:8000/api/v1/${shortUrl}`})
        

    } catch (error) {
        console.error(error);
        // req.flash("error", "Internal server error");
        res.status(500).send('Internal Server error');
    }
};


//redirect to original url
exports.redirectToOriginal = async (req, res) => {
    try{
        const { short} = req.params;
        const link = await Url.findOne({ shortUrl:short });
        if (!link) {
            return res.status(404).json({ message: 'Link not found' });
        }

        if (new Date() > link.expiresAt) { //check if link is expired
            return res.status(400).json({ message: 'Link has expired' });
        }

        res.redirect(link.originalUrl);
        
    }catch(err){
        // req.flash("error", "Internal server error");
        res.status(500).json('Internal Server error');
    }       
}