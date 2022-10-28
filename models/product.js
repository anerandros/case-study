function Product(config) {
    if (config && Object.keys(config).length > 0) {
        this.productId = config.id_product || "";
        this.nomeProduct = config.nome_product || "";
    }
}

Product.prototype.getProduct = function () {
    return {
        id_product: this.productId,
        nome_product: this.nomeProduct,
    };
};

exports.Product = Product;
