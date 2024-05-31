const { Bid, Item, User } = require('../models');

const getBidsForItem = async (itemId) => {
    return await Bid.findAll({ where: { itemId }, include: [User] });
};

const placeBid = async (userId, itemId, bidAmount) => {
    // Check if the item exists and the auction hasn't ended
    const item = await Item.findByPk(itemId);
    if (!item) throw new Error('Item not found');
    if (new Date() > item.end_time) throw new Error('Auction has ended');

    // Check if the bid is higher than the current price
    if (bidAmount <= item.current_price) throw new Error('Bid amount must be higher than current price');

    // Place the bid
    const bid = await Bid.create({ userId, itemId, bidAmount });

    // Update the item's current price
    item.current_price = bidAmount;
    await item.save();

    return bid;
};

module.exports = { getBidsForItem, placeBid };
