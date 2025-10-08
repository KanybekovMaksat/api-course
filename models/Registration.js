const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        const digits = v.replace(/\D/g, '');
        return digits.length >= 7 && digits.length <= 15;
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Registration', registrationSchema);
