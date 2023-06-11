import { Request, Response } from 'express';
import { getDb } from "../db/connection";
import { ObjectId } from 'mongodb';

const getAll = async (req: Request, res: Response): Promise<void> => {
  const result = await getDb()
  //.db('CSE341Project')
  .collection('contactCard');
  
  try{
    result.find().toArray().then((lists: unknown) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  }catch(err){
      res.status(400).json(err);
    };
  };
  
const getSingle = async (req: Request, res: Response): Promise<void> => {
  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must use a valid ID to find a contact');
  }
  const userId = new ObjectId(req.params.id);
  const result = await getDb()
    //.db('CSE341Project')
    .collection('contactCard');
  try{
    result.find({ _id: userId }).toArray().then((lists: unknown[]) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
      });
  }catch(err){
    res.status(400).json(err);
  };
    };



const addContacts = async (req: Request, res: Response): Promise<void> => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    mobile: req.body.mobile,
    email: req.body.email,
    address : req.body.address,
    city: req.body.city,
    country: req.body.country,
    website: req.body.website
    
  };
  const response = await getDb()
    //.db('CSE341Project')
    .collection('contactCard')
    .insertOne(contact);
  if (response.acknowledged) {
          res.status(201).json(response);
  } else {
          res.status(500).send(response || 'Error: Contact Card was not created');
  }
};

const updateContacts = async (req: Request, res: Response): Promise<void> => {
  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must use a valid ID to update a contact');
  }
  const userId = new ObjectId(req.params.id);
  
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    mobile: req.body.mobile,
    email: req.body.email,
    address : req.body.address,
    city: req.body.city,
    country: req.body.country,
    website: req.body.website
  };
  const response = await getDb()
          //.db('CSE341Project')
          .collection('contactCard')
          .replaceOne({ _id: userId }, contact);
  // console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send(response || 'Contact Card modified successfully');
  } else {
    res.status(500).send(response || 'Error: Contact Card was not updated');
  }
};

const deleteContacts = async (req: Request, res: Response) => {
  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must use a valid ID to delete a contact');
  }
  const userId = new ObjectId(req.params.id);
  const response = await getDb()
    //.db('CSE341Project')
    .collection('contactCard')
    .deleteOne({ _id: userId });
  // console.log(response);
  if (response.deletedCount > 0) {
          res.status(204).send(response || 'Contact Card Deleted Successfully');
  } else {
          res.status(500).send(response || 'Error: Contact Card was not deleted');
  }
};

module.exports = {
  getAll,
  getSingle,
  addContacts,
  updateContacts,
  deleteContacts
};