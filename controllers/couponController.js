// controllers/couponController.js
const Coupon = require('../models/Coupon');

exports.createCoupon = async (req, res) => {
  const { code, discount } = req.body;
  const coupon = new Coupon({ code, discount, createdByAdmin: req.user.id });
  await coupon.save();
  res.status(201).json(coupon);
};

// Additional coupon methods (apply, get, favorite) go here...
