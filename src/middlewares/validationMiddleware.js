const { body, validationResult } = require('express-validator');

const validateTask = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Status must be one of: pending, in-progress, completed'),
];

const validateUserRegistration = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validateUserLogin = [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateTask,
    validateUserRegistration,
    validateUserLogin,
    validate,
};