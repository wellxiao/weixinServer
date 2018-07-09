const Sequelize = require("sequelize");

module.exports = {
  type: "sequelize.external",
  schema: {
   id:{
       type:Sequelize.INTEGER.UNSIGNED,
       primaryKey:true,
       autoIncrement:true
   },
   name:{ type:Sequelize.STRING},
   age:{ type:Sequelize.INTEGER},
   sex:{ type:Sequelize.INTEGER}
  },
  options:{
    timestamps:false
  }
};
