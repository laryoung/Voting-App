const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://127.0.0.1:27017/polling',
    {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(()=>console.log('Db  connected'))
.catch(err =>console.log(err));
