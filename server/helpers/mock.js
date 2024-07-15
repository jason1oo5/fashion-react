const Product_Mock = {
    "id": 4,
    "title": "女士中腰内裤模板",
    "sku": "F07U02P100",
    "description": "<p>标准女士中腰内裤模板。适用于各类经典内裤的设计，例如学生内裤等</p>",
    "category_id": 1,
    "price": 29.00,
    "tags": "内衣,内裤,女士",
    "views_count": 19,
    "is_editor_picked": 0,
    "added_to_cart_count": 2,
    "purchased_count": 1,
    "approval_status": 1,
    "created_at": "2020-10-23 04:47:47",
    "updated_at": "2021-05-11 14:51:22",
    "user_id": 23,
    "entity_type": 2,
    "in_app": 0,
    "public": 1
  }

const AssetSkus_Mock =
    {
    "id": 29,
    "asset": "F06D01S000",
    "product_id": 18,
    "created_at": "2020-10-29 11:26:22",
    "updated_at": "2020-10-29 11:26:22"
    }

const Category_Mock = 
    {
    "id": 1,
    "title": "Underwear",
    "isQuickFilter": 0,
    "order": 1,
    "disabled": 0
    }

const Price_Mock = 
    {
        "price": 0.00
    }

const ProductCompatibility_Mock = 
    {
        "id": 3,
        "data_set": "compatibility_os",
        "record_id": 199,
        "product_id": "2"
    }    

const ProductFile_Mock = 
    {
        "id": 3,
        "product_id": 4,
        "platform_id": 1,
        "version": 2,
        "is_edited": 1,
        "is_enabled": 1,
        "name": "F07U02P100.zip",
        "path": "7qYDtJmmNK1gYst2fb30esTX2fGMGBshqdEvSvjm.zip"
      }

const ProductImage_Mock = 
    {
        "id": 12,
        "product_id": 4,
        "path": "0EsqHwHftxzvC8PdT4D6.jpg",
        "type": 1
    }

const Promotion_Mock = 
    {
      "id": 2,
      "name": "Price",
      "sale_price": 0.01,
      "sale_percent": null,
      "disabled": 0,
      "start_date": "2021-02-15",
      "end_date": "2022-02-22",
      "created_at": "2021-02-18 00:57:48",
      "updated_at": "2021-08-22 06:57:39"
    }  

const Purchase_Mock =
    {
        "id": 1,
        "product_id": 3,
        "product_type": "product",
        "owner_id": 78,
        "date": "2021-01-07 14:27:03",
        "sale_price": 0.00,
        "publisher_sale_share": 0.10,
        "quantity": 1,
        "order_id": 2,
        "payment_status": 1,
        "publisher_payment_status": 0,
        "discount": 0
    }    

const Tag_Mock = 
    {
        "tag": "Activewear",
        "disabled": 0
    }

module.exports = {
    Product_Mock
}