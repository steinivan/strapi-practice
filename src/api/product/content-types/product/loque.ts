export default {
    beforeCreate(event) {
    //   const { data, where, select, populate } = event.params;
    console.log("lo que sea x1300");
      // let's do a 20% discount everytime
    //   event.params.data.price = event.params.data.price * 0.8;
    },
  
    afterCreate(event) {
      const { result, params } = event;
    console.log("lo que sea x1000");
      // do something to the result;
    },
  };