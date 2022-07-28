class Ingestion {
    products = [];
    day_of_diet = 0;
    constructor(meal_type, id) {
        this.meal_type = meal_type;
        this.id = id;
    }
    setProduct(product) {
        this.products.push(product);
    }
    getFromFridge(product) {
        for (let p of this.products){
            if (p.name == product) {
                try {
                    p.check();
                } catch (e) {
                    e.message = `To many calories in ${product} for ${this.meal_type}`;
                    throw e;
                }
            }
        }
    }
    getProductInfo(product) {
        let result = {};
        for (let p of this.products) {
            if (p.name === product) {
                result.kcal = p.kcal_per_portion;
                return result;
            }
        }
    }
}

module.exports.Ingestion = Ingestion