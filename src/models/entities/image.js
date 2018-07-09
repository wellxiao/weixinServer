const Sequelize = require("sequelize");

module.exports = {
  type: "sequelize.external",
  schema: {
   id:{
       type:Sequelize.INTEGER.UNSIGNED,
       primaryKey:true,
       autoIncrement:true
   },
   url:{ type:Sequelize.STRING},
  },
  options:{
    timestamps:false
  }
};
