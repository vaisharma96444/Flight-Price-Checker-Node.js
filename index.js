const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.post("/flights", async function(req, res) {
    const { origin, destination, datee } = req.body;
  
    const apiKey = "6466df2ed6397507580fb16f";
    const url = `https://api.flightapi.io/onewaytrip/${apiKey}/${origin}/${destination}/${datee}/1/0/0/Economy/USD`;
  
    try {
      const response = await axios.get(url);
      const flightData = response.data;

      if (flightData.fares && flightData.fares.length > 0) {
        const price = flightData.fares[0].price.totalAmount;
        const originname = flightData.cities[0].name;
        const destinationname= flightData.cities[1].name;
        const airlinecode = flightData.legs[0].segments[0].airlineCode;
        
        res.send(`<h2>Average Flight price ${originname} to ${destinationname} on ${datee}  <br><br><br> <p>with airline name :-- ${airlinecode}: <h1 style ="font-style :"italic""> ${price} </h1> USD </h2>`);
      } else {
        res.send("No fare information available.");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error occurred.");
  }
});

app.listen((process.env.PORT || 3000), function() {
  console.log("Server is started");
});
