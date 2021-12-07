const express = require("express");
const router = express.Router();
const UserList = require("../models/Users");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');
const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET;
var fetchuser = require("../middleware/fetchuser");
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword, mobile } = req.body;
    UserList.findOne({ email }, async (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (data == null) {
          if (name.length >= 3) {
            if (password.length >= 8 && password == confirmPassword) {
              if (mobile.length == 10) {
                bcrypt.hash(
                  password + process.env.FAKEPASS,
                  saltRounds,
                  async function (err, hash) {
                    const data = await UserList.create({
                      name,
                      email,
                      password: hash,
                      confirmPassword: hash,
                      mobile,
                    });
                    res.status(200).send(data);
                  }
                );
              } else {
                res.status(400).send("Mobile No. Length should be equal to 10");
              }
            } else {
              res
                .status(400)
                .send(
                  "Password Not Matched and length should be greater than or equal to 8"
                );
            }
          } else {
            res
              .status(400)
              .send("Name Length should be greater than or equal to 3");
          }
        } else {
          res.status(400).send("Email Already exists");
        }
      }
    });
  } catch (e) {
    res.status(500).send(e);
    console.log(e);
  }
});

router.post("/login", (req, res) => {
  const { email, myPlaintextPassword } = req.body;
  UserList.findOne({ email }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (data == null) {
        res.status(400).send(`No Details Found for ${email}`);
      } else {
        bcrypt.compare(
          myPlaintextPassword + process.env.FAKEPASS,
          data.password,
          function (err, result) {
            if (err) {
              res.status(400).send(err);
            } else {
              if (result == false) {
                res.status(400).send("Invalid Credentials");
              } else {
                var data1 = {
                  user: {
                    id: data._id,
                  },
                };
                var token = jwt.sign(data1, JWT_SECRET);
                res.status(200).send({ authtoken: token });
              }
            }
          }
        );
      }
    }
  });
});

router.post("/forgotpassword", (req, res) => {
  const { email, password, confirmPassword } = req.body;
  UserList.findOne({ email }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      if (data == null) {
        res.status(400).send({ error: "Email Not exist" });
      } else {
        if (password.length >= 8 && password == confirmPassword) {
          bcrypt.hash(
            password + process.env.FAKEPASS,
            saltRounds,
            async function (err, hash) {
              const data = await UserList.updateOne(
                { email },
                { $set: { password: hash, confirmPassword: hash } }
              );
              // res.status(200).send(data);
              res
                .status(200)
                .send({ changed: `Password successfully changed for ${email}` });
            }
          );
        } else {
          res
            .status(400)
            .send(
              "Password Not Matched and length should be greater than or equal to 8"
            );
        }
      }
    }
  });
});

router.post("/getuserdetails", fetchuser, async (req, res) => {
  try {
    const user = await UserList.findById(req.user.id).select(["-password", "-confirmPassword"]);
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/sendemail", (req, res) => {

  const { email } = req.body;

  UserList.findOne({ email }, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      if (data == null) {
        res.status(400).send({ mess: "Email not exist" })
      } else {
        const otp = Math.floor(Math.random() * 900000) + 100000;

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.gmail,
            pass: process.env.GPASS
          }
        });

        var mailOptions = {
          from: 'inotebooks16@gmail.com',
          to: email,
          subject: 'Forgot Password OTP',
          html: `<div>
          <p>Hi <b style="font-size:20px;">${email},</b></p><br/>
          <img src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg?size=338&ext=jpg" alt="Forgot Password?"><br/>
          <h2 style="text-align: center;">Forgot Password? Don't Worry.</h2><br/>
          <p style="text-align:center;">Enter the OTP on <b style="font-size: 25px;font-weight: bold;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> iNotebooks16</b>  website</p><br/>
          <p style="text-align:center;">Your OTP is <b style="font-size: 25px;font-weight: bold;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> ${otp}</b> </p><br/>
      </div>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.status(400).send(error)
          } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({ otp: otp })
          }
        });
      }
    }
  })

})


module.exports = router;
