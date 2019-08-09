const cache = {};

module.exports = {
   get: ( key ) => cache[ key ],
   set: ( key, value ) => {
      cache[ key ] = value
   },
   delete: ( key ) => delete cache[ key ],
};