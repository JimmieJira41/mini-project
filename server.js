const express = require('express');
const app = express();
app.use(express.static('./dist/test-build'));
app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/test-build/'});
});
app.listen(process.env.PORT || 8080);