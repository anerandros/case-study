class Product {
    constructor(config) {
        if (config && Object.keys(config).length > 0) {
            this.productId = config.id_product || "";
            this.nomeProduct = config.nome_product || "";
        }
    }

    getProduct() {
        return {
            id_product: this.productId,
            nome_product: this.nomeProduct,
        };
    }
}

exports.Product = Product;
