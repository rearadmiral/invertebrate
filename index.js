var _ = require('lodash');

var debackbonify = function(model) {

  if (model.map) {
    return model.map(function(member) {
      return debackbonify(member);
    });
  }

  var clone = _.clone(model.attributes);
  if (model.invertebrateProperties) {
    _.each(model.invertebrateProperties, function(propertyName) {
      clone[propertyName] = model[propertyName]();
    });
  }
  if (model.relations) {
    _.each(model.relations, function(relation) {
      var associatedModel = model.get(relation.key);
      clone[relation.key] = debackbonify(associatedModel);
    });
  }
  return clone;
};

module.exports = debackbonify;