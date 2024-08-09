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
    confirmPassword: {
      type: String,
        validate: {
        validator: function(val) {
          return val === this.Password;
        },
        message: 'Passwords do not match'
      }
    }
  },
  {
    timestamps: true
  }
);


export default model('User', userSchema);


// userSchema.pre('save', function(next) {
//   if (this.Password !== this.confirmPassword) {
//       this.invalidate('confirmPassword', 'Passwords do not match');
//   }
//   next();
// });
