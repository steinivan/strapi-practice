class ProductDTO {
    productId: number;
    originalPrice: number;
    discountPrice?: number;
    title?: string;
    image?: string;
    quantity?: number;
    offer?: number;
    descripcion?: any | null;

    constructor(originalJson) {
      this.productId = originalJson.id;
      this.originalPrice = originalJson.attributes.price; // Agregar originalPrice
      if(originalJson.attributes.offer > 0) {
        this.discountPrice = this.originalPrice - originalJson.attributes.price * originalJson.attributes.offer;
      } else delete originalJson.attributes.offer;
      // Crear una copia de attributes
      let attributesCopy = { ...originalJson.attributes };
  
      // Eliminar las propiedades que no quieres
      delete attributesCopy.createdAt;
      delete attributesCopy.updatedAt;
      delete attributesCopy.publishedAt;
      delete attributesCopy.price; // Eliminar price de attributesCopy
  
      let categoriesData = attributesCopy.categories.data
      if(categoriesData.length > 0) {
        attributesCopy.categories.data.forEach(element => {
          element.title = element.attributes.title;
          delete element.attributes;
        });
      }
      // Usar Object.assign para copiar las propiedades de la copia de attributes a this
      Object.assign(this, attributesCopy);
    }
  }
  export default ProductDTO;