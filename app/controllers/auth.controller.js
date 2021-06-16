const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    prenom: req.body.prenom,
    nom: req.body.nom,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    sex: req.body.sex,
    adresse: req.body.adresse,
    travail: req.body.travail,
    age: req.body.age,
    activites: req.body.activites,
    Prix: req.body.Prix,
    rolle: req.body.rolle,
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          
        if (req.body.rolle == 1){
          
        user.setRoles([2]).then(() => {
            res.send({ message: "needeur registered successfully!" });
          });
        }
        
      else {

        if (req.body.rolle == 2){
          
        user.setRoles([3]).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        }
        
        }});
      } 
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      prenom: req.body.prenom
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          prenom: user.prenom,
          nom: user.nom,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
