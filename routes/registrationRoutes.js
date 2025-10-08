const express = require('express');
const Registration = require('../models/Registration');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Registration:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           description: Имя участника
 *         phone:
 *           type: string
 *           description: Номер телефона
 *       example:
 *         name: Максат
 *         phone: "+996700123456"
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Регистрация на курс
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registration'
 *     responses:
 *       201:
 *         description: Успешная регистрация
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Ошибка сервера
 */
router.post('/register', async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone are required' });
    }

    const registration = new Registration({ name, phone });
    await registration.save();

    res.status(201).json({ success: true, registration });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

/**
 * @swagger
 * /registrations:
 *   get:
 *     summary: Получить список всех регистраций
 *     tags: [Registration]
 *     responses:
 *       200:
 *         description: Список регистраций
 *       500:
 *         description: Ошибка сервера
 */
router.get('/registrations', async (_req, res) => {
  try {
    const registrations = await Registration.find().sort({ created_at: -1 });
    res.json({ success: true, registrations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
