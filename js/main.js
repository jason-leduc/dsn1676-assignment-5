<script>
YUI().use('event-focus', 'json', 'model', 'model-list', 'view', function (Y) {
    var TodoAppView, TodoList, TodoModel, TodoView;
  TodoModel = Y.TodoModel = Y.Base.create('todoModel', Y.Model, [], {
    // This tells the Model to use a localStorage sync provider (which we'll
    // create below) to save and load information about a todo item.
    sync: LocalStorageSync('todo'),

    // This method will toggle the `done` attribute from `true` to `false`, or
    // vice versa.
    toggleDone: function () {
        this.set('done', !this.get('done')).save();
    }
}, {
    ATTRS: {
        // Indicates whether or not this todo item has been completed.
        done: {value: false},

        // Contains the text of the todo item.
        text: {value: ''}
    }
});
  
  TodoList = Y.TodoList = Y.Base.create('todoList', Y.ModelList, [], {
    // This tells the list that it will hold instances of the TodoModel class.
    model: TodoModel,

    // This tells the list to use a localStorage sync provider (which we'll
    // create below) to load the list of todo items.
    sync: LocalStorageSync('todo'),

    // Returns an array of all models in this list with the `done` attribute
    // set to `true`.
    done: function () {
        return this.filter(function (model) {
            return model.get('done');
        });
    },

    // Returns an array of all models in this list with the `done` attribute
    // set to `false`.
    remaining: function () {
        return this.filter(function (model) {
            return !model.get('done');
        });
    }
});

 TodoAppView = Y.TodoAppView = Y.Base.create('todoAppView', Y.View, [], {
    // This is where we attach DOM events for the view. The `events` object is a
    // mapping of selectors to an object containing one or more events to attach
    // to the node(s) matching each selector.
    events: {
        // Handle <enter> keypresses on the "new todo" input field.
        '#new-todo': {keypress: 'createTodo'},

        // Clear all completed items from the list when the "Clear" link is
        // clicked.
        '.todo-clear': {click: 'clearDone'},

        // Add and remove hover states on todo items.
        '.todo-item': {
            mouseover: 'hoverOn',
            mouseout : 'hoverOff'
        }
    },

    // The `template` property is a convenience property for holding a
    // template for this view. In this case, we'll use it to store the
    // contents of the #todo-stats-template element, which will serve as the
    // template for the statistics displayed at the bottom of the list.
    template: Y.one('#todo-stats-template').getHTML(),

    // The initializer runs when a TodoAppView instance is created, and gives
    // us an opportunity to set up the view.
    initializer: function () {
        // Create a new TodoList instance to hold the todo items.
        var list = this.todoList = new TodoList();
      
      TodoView = Y.TodoView = Y.Base.create('todoView', Y.View, [], {
    // This customizes the HTML used for this view's container node.
    containerTemplate: '<li class="todo-item"/>',

    // Delegated DOM events to handle this view's interactions.
    events: {
        // Toggle the "done" state of this todo item when the checkbox is
        // clicked.
        '.todo-checkbox': {click: 'toggleDone'},

        // When the text of this todo item is clicked or focused, switch to edit
        // mode to allow editing.
        '.todo-content': {
            click: 'edit',
            focus: 'edit'
        },

        // On the edit field, when enter is pressed or the field loses focus,
        // save the current value and switch out of edit mode.
        '.todo-input'   : {
            blur    : 'save',
            keypress: 'enter'
        },

        // When the remove icon is clicked, delete this todo item.
        '.todo-remove': {click: 'remove'}
    },

    // The template property holds the contents of the #todo-item-template
    // element, which will be used as the HTML template for each todo item.
    template: Y.one('#todo-item-template').getHTML(),

    initializer: function () {
        // The model property is set to a TodoModel instance by TodoAppView when
        // it instantiates this TodoView.
        var model = this.get('model');

        // Re-render this view when the model changes, and destroy this view
        // when the model is destroyed.
        model.after('change', this.render, this);

        model.after('destroy', function () {
            this.destroy({remove: true});
        }, this);
    },

    render: function () {
        var container = this.get('container'),
            model     = this.get('model'),
            done      = model.get('done');

        container.setHTML(Y.Lang.sub(this.template, {
            checked: done ? 'checked' : '',
            text   : model.getAsHTML('text')
        }));

        container[done ? 'addClass' : 'removeClass']('todo-done');
        this.set('inputNode', container.one('.todo-input'));

        return this;
    },

    // -- Event Handlers -------------------------------------------------------

    // Toggles this item into edit mode.
    edit: function () {
        this.get('container').addClass('editing');
        this.get('inputNode').focus();
    },

    // When the enter key is pressed, focus the new todo input field. This
    // causes a blur event on the current edit field, which calls the save()
    // handler below.
    enter: function (e) {
        if (e.keyCode === 13) { // enter key
            Y.one('#new-todo').focus();
        }
    },

    // Removes this item from the list.
    remove: function (e) {
        e.preventDefault();

        this.constructor.superclass.remove.call(this);
        this.get('model').destroy({'delete': true});
    },

    // Toggles this item out of edit mode and saves it.
    save: function () {
        this.get('container').removeClass('editing');
        this.get('model').set('text', this.get('inputNode').get('value')).save();
    },

    // Toggles the `done` state on this item's model.
    toggleDone: function () {
        this.get('model').toggleDone();
    }
});
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // ... Add the code from the following sections here! ...
});
</script>