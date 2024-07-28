const express = require('express');
const app = express();
const port = 4000;

// Middleware to check if the current time is within working hours
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // Sunday - Saturday : 0 - 6
  const hour = now.getHours(); // 0 - 23

  // Check if current day is Monday to Friday and current time is between 9 to 17
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Within working hours, proceed to the next middleware/route
  } else {
    res.status(403).send('<html><body><h1>Service Unavailable</h1><p>The service is only available Monday to Friday, from 9 to 17.</p></body></html>');
  }
};

// Apply the middleware to all routes
app.use(checkWorkingHours);

// Route for greeting user by name
app.get('/name/:user_name', function(req, res) {
  res.status(200);
  res.set('Content-type', 'text/html');
  res.send('<html><head>' +
    '<style>' +
    'body { font-family: Arial, sans-serif; }' +
    '.navbar { overflow: hidden; background-color: #333; }' +
    '.navbar a { float: right; display: block; color: #f2f2f2; text-align: center; padding: 14px 16px; text-decoration: none; }' +
    '.navbar a:hover { background-color: #ddd; color: black; }' +
    '</style>' +
    '</head><body>' +
    '<div class="navbar">' +
    '<a href="/service">Service</a>' +
    '<a href="/contact">Contact</a>' +
    '<a href="/">Home</a>' +
    '</div>' +
    '<h1>Hello ' + req.params.user_name + '</h1>' +
    '</body></html>'
  );
});

// Route for contact page
app.get('/contact', function(req, res) {
  res.status(200);
  res.set('Content-type', 'text/html');
  res.send('<html><head>' +
    '<style>' +
    'body { font-family: Arial, sans-serif; }' +
    '.navbar { overflow: hidden; background-color: #333; }' +
    '.navbar a { float: right; display: block; color: #f2f2f2; text-align: center; padding: 14px 16px; text-decoration: none; }' +
    '.navbar a:hover { background-color: #ddd; color: black; }' +
    '</style>' +
    '</head><body>' +
    '<div class="navbar">' +
    '<a href="/service">Service</a>' +
    '<a href="/contact">Contact</a>' +
    '<a href="/">Home</a>' +
    '</div>' +
    '<h1>Contact Page</h1>' +
    '<p>This is the contact page.</p>' +
    '</body></html>'
  );
});

// Route for service page
app.get('/service', function(req, res) {
  res.status(200);
  res.set('Content-type', 'text/html');
  res.send('<html><head>' +
    '<style>' +
    'body { font-family: Arial, sans-serif; }' +
    '.navbar { overflow: hidden; background-color: #333; }' +
    '.navbar a { float: right; display: block; color: #f2f2f2; text-align: center; padding: 14px 16px; text-decoration: none; }' +
    '.navbar a:hover { background-color: #ddd; color: black; }' +
    '</style>' +
    '</head><body>' +
    '<div class="navbar">' +
    '<a href="/service">Service</a>' +
    '<a href="/contact">Contact</a>' +
    '<a href="/">Home</a>' +
    '</div>' +
    '<h1>Service Page</h1>' +
    '<p>This is the service page.</p>' +
    '</body></html>'
  );
});

// Route for home page with navbar
app.get('/', function(req, res) {
  res.status(200);
  res.set('Content-type', 'text/html');
  res.send('<html><head>' +
    '<style>' +
    'body { font-family: Arial, sans-serif; }' +
    '.navbar { overflow: hidden; background-color: #333; }' +
    '.navbar a { float: right; display: block; color: #f2f2f2; text-align: center; padding: 14px 16px; text-decoration: none; }' +
    '.navbar a:hover { background-color: #ddd; color: black; }' +
    '</style>' +
    '</head><body>' +
    '<div class="navbar">' +
    '<a href="/service">Service</a>' +
    '<a href="/contact">Contact</a>' +
    '<a href="/">Home</a>' +
    '</div>' +
    '<h1>Home Page</h1>' +
    '<p>Welcome to the home page.</p>' +
    '</body></html>'
  );
});

// Catch-all route for all other requests
app.get('*', function(req, res){
  res.end('Hello World');
});

// Start the server
app.listen(port, function(){
  console.log('The server is running, ' +
    'please, open your browser at http://localhost:%s', 
    port);
});
