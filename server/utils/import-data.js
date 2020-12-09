const mongoose = require('mongoose');
const CustomError = require('./customError');
const Candidate = require('../models/candidate.model');
const Skill = require('../models/skill.model');
const Client = require('../models/client.model');
const dotEnv = require('dotenv');

dotEnv.config({ path: '../config/config.env' });

const data = ['Datawrkz', 'IWOVS India Private Limited', 'Lead Magnets'];

const clients = [...data].sort();
const uri = process.env.DATABASE_LOCAL;
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('DB connection established');
    });

const importSkillsData = () => {
    clients.forEach(async (client) => {
        await Client.create({ name: client });
    });

    console.log('success');
};

importSkillsData();
