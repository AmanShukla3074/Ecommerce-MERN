const orderService = require("../services/orderService")

const getAllOrders=async(req,res)=>{
    try {
        const order = await orderService.getAllOrder()
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const confirmOrders=async(req,res)=>{
    const orderId=req.params.orderId;
    try {
        const order = await orderService.confirmedOrder(orderId)
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const shipOrders=async(req,res)=>{
    const orderId=req.params.orderId;
    try {
        const order = await orderService.shipOrder(orderId)
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const deliverOrders=async(req,res)=>{
    const orderId=req.params.orderId;
    try {
        const order = await orderService.deliverOrder(orderId)
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const cancelledOrders=async(req,res)=>{
    const orderId=req.params.orderId;
    try {
        const order = await orderService.cancelOrder(orderId)
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const deleteOrders=async(req,res)=>{
    const orderId=req.params.orderId;
    try {
        const order = await orderService.deleteOrder(orderId)
        return res.status(200).send(order)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={
    getAllOrders,
    confirmOrders,
    shipOrders,
    deliverOrders,
    cancelledOrders,
    deleteOrders,
}