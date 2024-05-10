const panShopOrder = require('../model/panShopOrderModel');

const createPanShopOrder = async (req, res) => {
    const { products, totalPrice, superStockistEmail, stockistEmail,  panShopOwner_id,panShopOwnerName,panShopOwnerstate ,panShopOwneraddress } = req.body;
    
    let total_Price = 0; // Initialize total_Price as 0

  // Calculate total price for the products
  products.forEach(p => {
    total_Price += Number(p.price) * Number(p.quantity); // Assuming Number is a function to parse strings to numbers
  });

  console.log(total_Price); // Log the total price
    

    if (!products || !products.length ) {
        return res.status(400).json({ error: "All fields are mandatory" });
    }

 

    try {
        const order = await panShopOrder.create({
            products,
            totalPrice : total_Price,
            superStockistEmail,
            stockistEmail,
            panShopOwner_id,
            panShopOwnerName,
            panShopOwnerstate,
            panShopOwneraddress
        });

        res.status(201).json(order); // Return the created order
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create pan shop order" });
    }
};

const getPanShopOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await panShopOrder.findById(id);
        if (!order) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve order" });
    }
};

const updateEmail = async (req, res) => {
    const { id } = req.params;

    try {
        const existingOrder = await panShopOrder.findById(id);
        if (!existingOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        const { superStockistEmail, stockistEmail, ...updateData } = req.body;

        if (superStockistEmail) existingOrder.superStockistEmail = superStockistEmail;
        if (stockistEmail) existingOrder.stockistEmail = stockistEmail;

        for (let key in updateData) {
            existingOrder[key] = updateData[key];
        }

        const updatedOrder = await existingOrder.save();
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update order" });
    }
};

module.exports = { createPanShopOrder, getPanShopOrderById, updateEmail };