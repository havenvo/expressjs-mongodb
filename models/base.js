"use strict";
var mongoose = require('mongoose');

class Base {
    
}

Base.schema = {
    created_at: { type: Date },
    updated_at: { type: Date }
}

Base.hooks = {
    pre: {
    save: function(next) {
      var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
    }
  }
}

module.exports = Base;