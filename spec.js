var should = require('should');

var Backbone = require('backbone');
var BackboneAssociations = require('backbone-associations');

var invertebrate = require('./index');

describe('Invertebrate', function() {

  describe('given a Backbone.Collection', function() {

    var currentYear = 2015;

    var Book = Backbone.Model.extend({
      invertebrateProperties: ['age'],
      age: function() {
        return currentYear - this.get('copyrightYear');
      }
    });
    var BookCollection = Backbone.Collection.extend({
      model: Book
    });

    var collection;

    beforeEach(function(){
      collection = new BookCollection([
          {
            title: 'Vampires in the Lemon Grove',
            publisher: 'Random House',
            copyrightYear: 2013
          },
          {
            title: 'St. Lucy\'s Home for Girls Raised by Wolves',
            publisher: 'Vintage',
            copyrightYear: 2007
          }
        ]);
    });

    it('invertebrates each member', function() {
      var clone = invertebrate(collection);
      clone.length.should.be.exactly(2);
      clone[0].age.should.be.exactly(2);
    });
  });

  describe('given a Backbone.Model with associations', function () {

    var Author = Backbone.AssociatedModel.extend({});

    var Book = Backbone.AssociatedModel.extend({
      relations: [
          {
            type: Backbone.One,
            key: 'author',
            relatedModel: Author
          }
        ]
    });
    var model;

    beforeEach(function() {
      model = new Book({
        title: 'St. Lucy\'s Home for Girls Raised by Wolves',
        publisher: 'Vintage',
        copyrightYear: 2007,
        author: {
          name: 'Karen Russell'
        }
      });
    });

    it('includes associated models', function() {
      invertebrate(model).author.should.have.property('name', 'Karen Russell');
    });
  });

  describe('given a simple Backbone.Model', function() {

    var Author = Backbone.Model.extend({
      invertebrateProperties: ['displayName'],
      displayName: function() {
        return this.get('firstName') + ' ' + this.get('lastName');
      }
    });

    var model;

    beforeEach(function() {
      model = new Author({ firstName: 'Karen', lastName: 'Russell', age: 33 });
    });

    it('creates a plain js object from the attrs', function() {
      var plain = invertebrate(model);
      plain.should.have.property('firstName', 'Karen');
      plain.should.have.property('age', 33);
    });

    it('includes specified computed props', function() {
      invertebrate(model).should.have.property('displayName', 'Karen Russell');
    });

    it('returns a clone', function() {
      var clone = invertebrate(model);
      clone.firstName = 'Osito';
      model.get('firstName').should.be.exactly('Karen');
    });
  });
});