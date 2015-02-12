# Invertebrate
creates a simple object clone of a Backbone.Model or Backbone.Collection

# Why
Our main use case is with the Flux architecture for React apps, which emphasizes immutable data in the views.  In our stores we use Backbone to talk to the API and mutate data, and then pass along immutable clones to the view.

# Usage

Given this domain.

```
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

```
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

```
var invertebrate = require('./index');
var clone = invertebrate(collection);
```

Clone will be something like this:

```
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

This also plays nicely with the backbone-associations plugin.  It will recursively invertebratize your relations. 

