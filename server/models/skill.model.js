const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: [true, 'skill name is required']
  }
});

module.exports = mongoose.model('Skill', SkillSchema);
