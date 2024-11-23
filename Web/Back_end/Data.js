const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const fs = require('fs');
const path = require('path');
const { console } = require('inspector');
const cors = require('cors');

const app = express();

const PORT = 3125;  

app.use(cors({
  origin: 'http://18.206.216.151:5000'
}));

const client = new Client({
  node: 'https://vpc-test1-tiqhmw2hd4jqoloqhsi7cw5hqe.us-east-1.es.amazonaws.com',
  auth: {
    username: 'elastic',
    password: 'YLroqaqGQMt3C6cFTnUA'
  },
  tls: {
    rejectUnauthorized: false,  
    ca: fs.readFileSync(path.join(__dirname, 'http_ca.crt'))
  }
});

// Endpoint to get dog breeds
app.get('/', async (req, res) => {
  try {
    // Count the total documents in the dog_breed index
    const countResponse = await client.count({
      index: 'dog_breed',
      body: {
        query: { match_all: {} }
      }
    });
    const totalDocs = countResponse.count;

    // Fetch all dog breeds
    const response = await client.search({
      index: 'dog_breed',
      size: totalDocs,
      body: {
        query: { match_all: {} }
      }
    });

  

    // Process the response and format the data
    const breeds = response.hits.hits.map(hit => ({
      id: hit._id,
      breed_name: hit._source.breed_name || "N/A",
      group: hit._source.group || "N/A",
      origin: hit._source.origin || "N/A",
      size: hit._source.size || "N/A",
      coat_length: hit._source.coat_length || "N/A",
      temperament: hit._source.temperament || [],
      life_expectancy: hit._source.life_expectancy || "N/A",
      behaviors: hit._source.behaviors || [],
      kid_friendly: hit._source.kid_friendly || "N/A",
      exercise_needs: hit._source.exercise_needs || "N/A",
      favorite_activities: hit._source.favorite_activities || [],
      trainability: hit._source.trainability || "N/A",
      adapts_well_to_apartment_living: hit._source.adapts_well_to_apartment_living || "N/A",
      health_concern: hit._source.health_concern || "N/A",
      image_url: hit._source.image_url || "N/A"
    }));
    console.log(breeds);
    // Send the data as JSON
    res.json(breeds);
  } catch (error) {
    console.error("Error fetching dog breeds:", error.meta ? error.meta.body : error);
    res.status(500).json({ error: "Failed to fetch dog breeds" });
  }
});

app.get('/search', async (req, res) => {
  const { query: searchQuery } = req.query;

  if (!searchQuery) {
    return res.status(400).json({ error: "No search query provided" });
  }

  try {
    const response = await client.search({
      index: 'dog_breed',
      body: {
        query: {
          multi_match: {
            query: searchQuery,
            fields: [
              "breed_name^3",
              "breed_name.edge_ngram^2",
              "breed_name.autocomplete^3",
              "group^1.5",
              "origin",
              "size",
              "coat_length",
              "temperament^2",
              "temperament.raw^3",
              "life_expectancy",
              "behaviors",
              "trainability",
              "adapts_well_to_apartment_living",
              "health_concern",
              "catch_all"
            ],
            fuzziness: "AUTO",
            prefix_length: 2,
            operator: "or"
          }
        }
      }
    });

    const breeds = response.hits.hits.map(hit => ({
      id: hit._id,
      breed_name: hit._source.breed_name || "N/A",
      group: hit._source.group || "N/A",
      origin: hit._source.origin || "N/A",
      size: hit._source.size || "N/A",
      coat_length: hit._source.coat_length || "N/A",
      temperament: hit._source.temperament || [],
      life_expectancy: hit._source.life_expectancy || "N/A",
      behaviors: hit._source.behaviors || [],
      kid_friendly: hit._source.kid_friendly || "N/A",
      exercise_needs: hit._source.exercise_needs || "N/A",
      favorite_activities: hit._source.favorite_activities || [],
      trainability: hit._source.trainability || "N/A",
      adapts_well_to_apartment_living: hit._source.adapts_well_to_apartment_living || "N/A",
      health_concern: hit._source.health_concern || "N/A",
      image_url: hit._source.image_url || "N/A"
    }));

    res.json(breeds);
  } catch (error) {
    console.error("Error performing search:", error.meta ? error.meta.body.error : error);
    res.status(500).json({ error: "Failed to perform search. Check server logs for more details." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
