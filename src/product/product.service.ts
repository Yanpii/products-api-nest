import { Injectable, Delete } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {

constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

async getProducts(): Promise<Product[]>{
    const Product = await this.productModel.find();
    return Product;
}

async getProduct(productID: string): Promise<Product>{
    const product = await this.productModel.findById(productID);
    return product;
}

async createProduct(createProductDTO: CreateProductDTO): Promise<Product>{
   const product = new this.productModel(createProductDTO);
   await product.save();
   return product;
}

async deleteProduct(productID: string): Promise<Product>{
 const deleteProduct = await this.productModel.findByIdAndDelete(productID);
 return deleteProduct;
}

async updateProduct(productID: string, createProductDTO: CreateProductDTO): Promise<Product>{
const updateProduct = await this.productModel.findByIdAndUpdate(productID, createProductDTO, {new: true});
return updateProduct;
}

}
