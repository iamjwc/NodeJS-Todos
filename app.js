require('./lib/picard')
var sys    = require('sys');


picard.env = {
 root: __filename.replace(/\/app.js$/, ''),
 mode: 'production',
 port: 9900,
 public_dir: '/public',
 views: '/views'
}

picard.start()

Task = {
  __tasks__: [{
    isDone: false,
    description: "stuff"
  }],

  all: function() {
    var i = 0;
    return Task.__tasks__.map(function(task) {
      task.guid = "/tasks/" + i;
      ++i;
      return task;
    });
  },

  create: function(task) {
    Task.__tasks__.push(task);
  },

  get: function(id) {
    return Tasks.__tasks__[id];
  },

  del: function(id) {
    return Tasks.__tasks__.splice(id,1);
  }
}

function asApplicationJSON(data) {
  return {
    type: 'application/json',
    body: JSON.stringify(data)
  };
}

get('/tasks', function() {
  return asApplicationJSON({
    content: Task.all()
  });
});

post('/tasks', function(params) {
  var r = params.rawData;
  sys.puts(r);

  var task = JSON.parse(r);

  sys.log(Task.all().length);
  //Task.create(task);

  return {text: ""};//asApplicationJSON({content: Task.all()});
});

get('/tasks/:id', function(params) {
  var task = Task.get(params.id);
  return asApplicationJSON({
    content: task
  });
});

put('/tasks/:id', function(params) {
  var task = Task.get(params.id);
  task.description = params.description;
  task.isDone = params.isDone;

  return asApplicationJSON({
    content: task
  });
});

del('/tasks/:id', function(params) {
  Task.del(params.id);
});

//  opts = Task.parse_json(request.body.read) rescue nil
//  halt(401, 'Invalid Format') if opts.nil?
//  
//  task = Task.new(opts)
//  halt(500, 'Could not save task') unless task.save
//
//  response['Location'] = task.url
//  response.status = 201
