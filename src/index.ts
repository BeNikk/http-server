/*
This code is an example of creating raw http server without any modules, in JS/TS
*/
import net from 'node:net';
const server = net.createServer((c) => {
   // this function runs everytime a client is connected
  // 'connection' listener.
  console.log('client connected');
  c.on('data',(data)=>{
    console.log("Data");
    const stringifiedRequestData = data.toString(); //stringifying the request data and logging it
    console.log(stringifiedRequestData);
    //parsing the request
      const [requestLine, ...headerLines] = stringifiedRequestData.split('\r\n');
      const [method, path, protocol] = requestLine.split(' ');

      console.log(`Method: ${method}`);
      console.log(`Path: ${path}`);
      console.log(`Protocol: ${protocol}`);
      


    //moving the response inside data ensures that i only send the data once i have received a request.
        let body = '';

        if (path === '/') {
        body = 'Welcome to the homepage!';
        } else if (path === '/about') {
        body = 'This is the about page.';
        } else {
        body = '404 Not Found';
        }
    const response = //to make it a valid HTTP response, this is what makes the TCP protocol HTTP
    'HTTP/1.1 200 OK\r\n' +
    `Content-Length: ${body.length}\r\n` +
    'Content-Type: text/plain\r\n' +
    '\r\n' +
    body;
  
    c.write(response,()=>{
      c.end(); 
      /*the above line is to close the request response cycle as soon as we send a response, which is typical to client 
      server architecture
      without this line, socket(not server) will throw an error as the client(curl/postman in this case) is closing the 
      connection before the server does.
      */
    });
  })
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.on('error',(e)=>{
    console.log(`error occured ${e}`);
  })
  c.pipe(c);
});
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});