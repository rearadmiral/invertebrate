# Invertebrate
creates a simple object clone of a Backbone.Model or Backbone.Collection

# Why
Our main use case is with the Flux architecture for React apps, which emphasizes immutable data in the views.  In our stores we use Backbone to talk to the API and mutate data, and then pass along immutable clones to the view.

We're using Facebook's [immutable](http://facebook.github.io/immutable-js/) library for this reason.

If you just want regular js objects, you can just call `.toJS()` on the result.

# Usage

Given this domain.

```javascript
    var Book = Backbone.Model.extend({
      invertebrateProperties: ['age'],
      age: function() {
        return currentYear - this.get('copyrightYear');
      }
    });
    
    var BookCollection = Backbone.Collection.extend({
      model: Book
    });
    
```

And this instantiated data:

```javascript
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
```

You can use this:

```javascript
var invertebrate = require('invertebrate');
var clone = invertebrate(collection);
```

Clone will be something like this:

```javascript
[
          {
            title: 'Vampires in the Lemon Grove',
            publisher: 'Random House',
            copyrightYear: 2013,
            age: 2
          },
          {
            title: 'St. Lucy\'s Home for Girls Raised by Wolves',
            publisher: 'Vintage',
            copyrightYear: 2007,
            age: 8
          }
]
```

No functions, not listeners, just the plain attributes.

This also plays nicely with the [backbone-associations](http://dhruvaray.github.io/backbone-associations/) plugin.  It will recursively invertebratize your relations. 

## camelCasing and Rails

By default, Rails apps tend to produce snake_cased javascript attributes. This library converts them to camelcase by default. If you don't want this behavior, use this:

```javascript
var clone = invertebrate(model, { camelize: false });
```

