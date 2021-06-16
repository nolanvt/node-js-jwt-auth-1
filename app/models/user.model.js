module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    prenom: {
      type: Sequelize.STRING
    },
      nom: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    sex: {
      type: Sequelize.STRING
    },
    adresse: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.STRING
    },
      activites: {
      type: Sequelize.STRING
    }
,
      Prix: {
      type: Sequelize.STRING
    }
  });

  return User;
};
