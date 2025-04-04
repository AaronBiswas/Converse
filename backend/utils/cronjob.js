import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
    // Use the app's own deployed URL instead of localhost
    const appUrl = process.env.API_URL || "https://converse-7i2n.onrender.com";
    
    https.get(appUrl, (res) => {
        if (res.statusCode === 200)
            console.log("GET request sent successfully");
        else
            console.log("GET request failed", res.statusCode);
    }).on("error", (e) => console.error("Error while sending request", e));
})

export default job;