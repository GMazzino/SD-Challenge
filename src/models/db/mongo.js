import mongoose from 'mongoose';

//-----------------------------------------------------------------------------
// COLLECTIONS
//-----------------------------------------------------------------------------
const clientsCollection = 'clients';

//-----------------------------------------------------------------------------
// SCHEMAS
//-----------------------------------------------------------------------------
const clientsSchema = new mongoose.Schema(
  {
    dni: { type: String, maxlength: 8, required: true },
    name: { type: String, maxlength: 20, required: true },
    lastname: { type: String, maxlength: 30, required: true },
    sex: { type: String, maxLength: 9, required: true },
    phone: { type: String, maxlength: 14, required: true },
  },
  { versionKey: false }
);

//-----------------------------------------------------------------------------
// MODELS
//-----------------------------------------------------------------------------
const clientsModel = mongoose.model(clientsCollection, clientsSchema);

export { mongoose, clientsModel };
