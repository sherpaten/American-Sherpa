require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {
  processReservationMessage,
} = require('./src/services/reservationAI');

const app = express();

const PORT = process.env.PORT || 5000;


// ========================================
// CORS
// ========================================

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      'http://localhost:5173',
  }),
);


// ========================================
// JSON
// ========================================

app.use(express.json());


// ========================================
// HEALTH CHECK
// ========================================

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'RipTides AI backend is running.',
  });
});


// ========================================
// RESERVATION AI
// ========================================

app.post('/api/reservation-ai', async (req, res) => {
  try {
    const {
      message,
      formData = {},
    } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a message.',
      });
    }

    console.log('');
    console.log('================================');
    console.log('RESERVATION AI REQUEST');
    console.log('================================');
    console.log('Customer:', message);
    console.log('Current form:', formData);

    const result =
      await processReservationMessage(
        message,
        formData,
      );

    console.log('AI response:', result);

    return res.json({
      success: true,
      message: result.message,
      formData: result.formData,
    });

  } catch (error) {

    console.error(
      'Reservation AI error:',
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        'The reservation assistant is temporarily unavailable.',
    });
  }
});


// ========================================
// 404
// ========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found.',
  });
});


// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
  console.log('');
  console.log('========================================');
  console.log('       RipTides AI Backend');
  console.log('========================================');
  console.log(
    `Server: http://localhost:${PORT}`,
  );
  console.log(
    `Health: http://localhost:${PORT}/api/health`,
  );
  console.log(
    `AI: http://localhost:${PORT}/api/reservation-ai`,
  );
  console.log('========================================');
  console.log('');
});