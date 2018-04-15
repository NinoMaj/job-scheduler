const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const jobSchema = new mongoose.Schema({
  message: {
    type: String,
    trim: true,
    required: 'Pease enter a jobs message!',
  },
  channel: {
    type: String,
  },
  status: {
    type: String,
    default: 'Waiting',
  },
  date: {
    type: Date,
    required: 'Pease enter when would you like to post a job!',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  // author: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  //   required: 'You must supply an author',
  // }
});


// storeSchema.pre('save', async function(next) {
//   if (!this.isModified('name')) {
//     next();
//     return;
//   }
//   this.slug = slug(this.name);

//   const slugReqEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
//   const storesWithSlug = await this.constructor.find({ slug: slugRegEx });
//   if (storesWithSlug.length) {
//     this.slug = `${this.slug}-${storeWithSlug.length + 1}`;
//   }

//   next();
// })

module.exports = mongoose.model('Job', jobSchema);
