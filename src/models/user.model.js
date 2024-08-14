import { required } from '@hapi/joi';
import { path } from '@hapi/joi/lib/errors';
import { type } from '@hapi/joi/lib/extend';
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    FirstName: {type: String},
    LastName: {type: String},
    Email: {type: String, unique: true},
    Age: {type: Number},
    Password: {type: String},
    // confirmPassword: {type: String}
  },
  {
    timestamps: true
  }
);



export default model('User', userSchema);
