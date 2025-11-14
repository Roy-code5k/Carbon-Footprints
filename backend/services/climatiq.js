const axios = require("axios");

const CLIMATIQ_API_KEY = process.env.CLIMATIQ_API_KEY;
const CLIMATIQ_BASE_URL = "https://api.climatiq.io";

if (!CLIMATIQ_API_KEY) {
  console.warn("Warning: CLIMATIQ_API_KEY is not set. Emission calculations will fail.");
}

const client = axios.create({
  baseURL: CLIMATIQ_BASE_URL,
  headers: {
    Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
    "Content-Type": "application/json",
  },
});

// Example: calculate travel emissions by distance (km, car, etc.)
async function calculateTravelEmissions({ distance_km, vehicle_type }) {
  // Pick an appropriate emission factor from Climatiq docs.
  // Example factor: 'passenger_vehicle-vehicle_type_car-fuel_source_na-distance_na'
  const emissionFactor = "passenger_vehicle-vehicle_type_car-fuel_source_na-distance_na";

  const body = {
    emission_factor: emissionFactor,
    parameters: {
      distance: distance_km,
      distance_unit: "km",
    },
  };

  const { data } = await client.post("/compute", body);
  return data.co2e; // total CO2e in kg
}

async function calculateElectricityEmissions({ kwh, country }) {
  // Replace with relevant factor from Climatiq docs, e.g. country-specific electricity
  const emissionFactor = "electricity-energy_source_grid_mix-location_" + country.toLowerCase();

  const body = {
    emission_factor: emissionFactor,
    parameters: {
      energy: kwh,
      energy_unit: "kWh",
    },
  };

  const { data } = await client.post("/compute", body);
  return data.co2e;
}

module.exports = {
  calculateTravelEmissions,
  calculateElectricityEmissions,
};