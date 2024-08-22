const express = require('express');
const router = express.Router();

router.post('/fooddata', (req, res) => {
    try {
        if (!global.fooditems || !global.foodcatagory) {
            return res.status(404).json({ success: false, message: 'Food items or categories not found' });
        }

        // console.log('Food items:', global.fooditems);
        // console.log('Food categories:', global.foodcatagory);

        // Send both food items and categories in a single response object
        res.status(200).json({
            success: true,
            fooditems: global.fooditems,
            foodcatagory: global.foodcatagory
        });
        
    } catch (error) {
        console.error('Error displaying data:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
