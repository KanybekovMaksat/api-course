const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const registrationRoutes = require('./routes/registrationRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// --- Swagger ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- MongoDB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- Routes ---
app.use('/', registrationRoutes);

app.get('/', (_req, res) => res.send('✅ Course registration API is up'));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
