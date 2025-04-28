import { productsModel } from "./models/productsmodels.js"

export class ProductsDaoMongo {
    constructor(){
        this.productsModel = productsModel

    }

    create = async newProduct => await productsModel.create(newProduct);
    get = async () => await productsModel.find();
    getBy = async filterObject => await productsModel.findOne(filterObject);
    update = async (pid, productToUpdate) => productsModel.findByIdAndUpdate({_id: uid}, productToUpdate, {new:true});
    delete = async pid => await productsModel.findByIdAndDelete({_id: uid});
}