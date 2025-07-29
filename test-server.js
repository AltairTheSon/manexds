const http = require('http');

// Test the page-flows endpoint
const options = {
  hostname: 'localhost',
  port: 3200,
  path: '/api/mcp/figma/page-flows',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const pages = JSON.parse(data);
      console.log(`\n📄 Total pages: ${pages.length}`);
      
      const containers = pages.filter(p => p.isContainer);
      const individual = pages.filter(p => !p.isContainer);
      
      console.log(`📁 Containers: ${containers.length}`);
      console.log(`📄 Individual pages: ${individual.length}`);
      
      if (individual.length > 0) {
        console.log('\n📄 Individual pages found:');
        individual.forEach((page, index) => {
          console.log(`${index + 1}. ${page.name} (from ${page.parentContainer})`);
        });
      }
      
      if (containers.length > 0) {
        console.log('\n📁 Containers found:');
        containers.forEach((page, index) => {
          console.log(`${index + 1}. ${page.name} - ${page.flowData?.subPages?.length || 0} sub-pages`);
        });
      }
      
    } catch (error) {
      console.error('Error parsing response:', error);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Request failed:', error.message);
});

req.end(); 