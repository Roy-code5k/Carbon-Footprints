// const express = require('express');
// const router = express.Router();
// router.post('/calculate', (req, res) => {
//     res.json({message: "Emissions route Working"});
// });
// module.exports = router;
const express = require("express");
const router = express.Router();

// Emission factors (simple version)
const FACTORS = {
  petrol: 2.31,       // kg CO2 per liter equivalent
  diesel: 2.68,
  cng: 2.00,
  electricity: 0.82   // kg CO2 per kWh (India avg)
};

router.post("/calculate", (req, res) => {
  const { carKm, fuelType, electricityUsage } = req.body;

  // Convert inputs to numbers
  const km = Number(carKm) || 0;
  const electricity = Number(electricityUsage) || 0;

  // Transportation calculation (simple model)
  const emissionFactor = FACTORS[fuelType] || 0;
  const transportCO2 = km * emissionFactor * 0.15; 
  // (0.15 is an approximate liters/km conversion)

  // Electricity
  const electricityCO2 = electricity * FACTORS.electricity;

  const total = transportCO2 + electricityCO2;

  res.json({
    transportCO2,
    electricityCO2,
    total,
    message: "Carbon footprint calculated successfully"
  });
});

module.exports = router;
