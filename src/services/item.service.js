const Item = require('../models/item.model');
const { Op } = require('sequelize');

const getAllItems = async ({ search, status, page = 1, limit = 10 }) => {
    const offset = (page - 1) * limit;
    const where = {};

    if (search) {
        where.name = {
            [Op.like]: `%search%`,
        };
    }

    if (status) {
        const now = new Date();
        if (status === 'active') {
            where.end_time = {
                [Op.gt]: now,
            };
        } else if (status === 'ended') {
            where.end_time = {
                [Op.lte]: now,
            };
        }
    }

    const { rows, count } = await Item.findAndCountAll({
        where,
        limit,
        offset,
    });

    return { items: rows, total: count, page, pages: Math.ceil(count / limit) };
};

const getItemById = async (id) => {
    const item = await Item.findByPk(id);
    return item;
}

const createItem = async (itemData) => {
    const item = await Item.create(itemData);
    return item;
}

const updateItem = async (id, itemData) => {
    const item = await Item.findByPk(id);
    if (!item) throw new Error('Item not found');
    await item.update(itemData);
    return item;
}

const deleteItem = async (id) => {
    const item = await Item.findByPk(id);
    if (!item) throw new Error('Item not found');
    await item.destroy();
    return item;
}

module.exports = { getAllItems, getItemById, createItem, updateItem, deleteItem };
