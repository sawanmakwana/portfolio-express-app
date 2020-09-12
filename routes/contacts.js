const contactFromValidate = require("../validation/contactFormValidate");
const ContactForm = require("../models/contact_form");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", (req, res) => {
  ContactForm.find()
    .exec()
    .then((result) => {
      console.log("Got products--->", result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("Error in getting----->", err);
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  ContactForm.findById(id)
    .exec()
    .then((result) => {
      console.log("Got product successfuly--->", result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("Error in getting----->", err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res) => {
  const { error } = contactFromValidate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const contact = {
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
  };

  const contactInstance = new ContactForm(contact);
  contactInstance
    .save()
    .then((result) => {
      console.log("Saved Successfully", result);
    })
    .catch((err) => {
      console.log("Error----->", err);
    });
  res.send(contact);
});

router.put("/:id", (req, res) => {
  //   const { error } = contactFromValidate(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const updateContent = {
    name: req.body.name,
  };

  ContactForm.update({ _id: id }, updateContent)
    .exec()
    .then((result) => {
      res.status(200).json(result);
      console.log("Updated Successfully", result);
    })
    .catch((err) => {
      console.log("Errorr------->", err);
      res.send(400).json({
        error: err,
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  ContactForm.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
      console.log("Deleted Successfully", result);
    })
    .catch((err) => {
      console.log("Errorr------->", err);
      res.send(400).json({
        error: err,
      });
    });
});

module.exports = router;
