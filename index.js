var _ = require('lodash');
var Immutable = require('immutable');

var debackbonify = function(model) {

  if (typeof model === 'undefined' || model === null) {
    throw new Error('cannot invertebrate null');
  }

  if (model.map) {
    return Immutable.List(model.map(function(member) {
      return debackbonify(member);
    }));
  } else if (model.attributes) {
    var clone = _.clone(model.attributes);
    if (model.invertebrateProperties) {
      _.each(model.invertebrateProperties, function(propertyName) {
        clone[propertyName] = model[propertyName]();
      });
    }
    if (model.relations) {
      _.each(model.relations, function(relation) {
        var associatedModel = model.get(relation.key);
        if (associatedModel) {
          clone[relation.key] = debackbonify(associatedModel);
        }
      });
    }
    return Immutable.Map(clone);
  } else {
    throw new Error('expected Backbone.Model or Backbone.Collection. got: ' + model);
  }

};

module.exports = debackbonify;