/**
 * product controller
 */

import { factories } from '@strapi/strapi'
import dtoProduct from '../content-types/product/productDto'
import ProductDTO from '../content-types/product/productDto';

export default factories.createCoreController('api::product.product', ({ strapi }) =>  ({
    async findOne(ctx) {
      ctx.query = { ...ctx.query, local: 'en', populate: '*' };
      const { data, meta } = await super.findOne(ctx);    
      meta.date = Date.now()
      console.log(data)
      const DTO = new ProductDTO(data);
      console.log("lo que me sale: ", DTO)
      return { DTO , meta };
      // return "invest"
    },
    async find(ctx) {
        // some custom logic here
        console.log("search...")
        ctx.query = { ...ctx.query, local: 'en', populate: '*' }
        // ctx.query = { ...ctx.query, local: 'en', populate: '*', filters: {
        //   categories: {
        //     title: {
        //       $eq: 'libros'
        //     }
        //   }
        // }}
        const { data, meta } = await super.find(ctx);    
        meta.date = Date.now()
        // return { data, meta };
        const DTO = data.map(element => new ProductDTO(element));
        return {DTO , meta};
      },

      async create(ctx) {
        const { body } = ctx.request;
    
        if (!body.data.categories) {
          ctx.throw(400, 'categories is required');
          return;
        }
    
        const response = await super.create(ctx);
        return response;
    }
}));
