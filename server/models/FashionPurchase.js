const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FashionPurchaseSchema = new Schema(
    {
    id: { type: Number, required: true },
    product_id: { type: Number, required: true },
    product_type: { type: String, required: true },
    owner_id: { type: Number, required: true },
    sale_price: { type: Number, required: true },
    publisher_sale_share: { type: Number, default: 0.1 },
    quantity: { type: Number, required: true },
    order_id: { type: Number, default: null },
    payment_status: { type: Number, required: true },
    publisher_payment_status: { type: Number, default: 0 },
    discount: { type: Number, required: true }
    },
    {
        strict: false,
        timestamps: { createdAt: "date" }
    }
)

const FashionPurchase = mongoose.model('FashionPurchase', FashionPurchaseSchema);

FashionPurchase.findPurchased = function (owner_id, product_id) {    
    return this.findOne({
        owner_id: owner_id,
        product_id: product_id,        
        $or: [ { payment_status: 1 }, {payment_status: 3 } ]
    });s
}

FashionPurchase.findCanceledPurchase = function (owner_id, product_id) {
    return this.findOne({
        owner_id: owner_id,
        product_id: product_id,        
        $or: [ { payment_status: 0 }, {payment_status: 2 } ]
    });
}


FashionPurchase.findSkusSales = function(user_id, promotionState, page) {
    const matchQuery = { owner_id: user_id };    
    const skip = 10 * (Number(page) - 1);
    if(promotionState) {
        Object.assign(matchQuery, { payment_status: { $in: [0, 3] } });
    } else {
        Object.assign(matchQuery, { payment_status: { $in: [0, 2] } });
    }
    console.log(matchQuery);
    const skuSales = this.aggregate([
        {
            $match: matchQuery
        },
        {
            $lookup: {
                from: 'fashionproducts',
                localField: 'product_id',
                foreignField: 'id',
                as: 'fashionproduct'
            }
        },
        {
            $sort: { date: -1 }
        },
        {
            $skip: skip
        },
        {
            $limit: 10
        },
        {
            $project: {
                id: 1,
                product_id: 1,
                product_type: 1,
                owner_id: 1,
                sale_price: 1,
                publisher_sale_share: 1,
                quantity: 1,
                order_id: 1,
                payment_status: 1,
                publisher_payment_status: 1,
                discount: 1,
                date: 1,
                'fashionproduct.title': 1,
                'fashionproduct.sku': 1,
                'fashionproduct.price': 1
            }
        }
    ]);

    return skuSales;
}

FashionPurchase.getUserOwnedSkus = function (owner_id, type, page) {
    const matchQuery = { owner_id: Number(owner_id),  payment_status: { $in: [1, 3] }, 'productOrder.type': Number(type) };
    const perPage = 5;
    const skip = (Number(page) - 1) * perPage;
    const data = this.aggregate([
        {
            $lookup: {
                from: 'orders',
                localField: 'order_id',
                foreignField: 'id',
                as: 'productOrder'        
            }
        },
        {
            $match: matchQuery
        },
        {
            $lookup: {
                from: 'fashionproducts',
                localField: 'product_id',
                foreignField: 'id',
                as: 'product'
            }
        },
        {
            $skip: skip
        },        
        // {
        //     $limit: 5
        // },
        {
            $sort: { date: -1 }
        },
        {
            $project: {
                id: 1,
                date: 1,
                payment_status: 1,
                order_id: 1,
                'product.price': 1,
                'product.sku': 1,
                'productOrder.type': 1
            }
        }
    ])    

    return data;
}

module.exports = FashionPurchase;