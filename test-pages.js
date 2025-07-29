const http = require('http');

console.log('Testing page extraction...');

const req = http.request({
  hostname: 'localhost',
  port: 3200,
  path: '/api/mcp/figma/page-flows',
  method: 'GET'
}, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const pages = JSON.parse(data);
      
      console.log(`\n📊 Results:`);
      console.log(`Total pages: ${pages.length}`);
      
      const containers = pages.filter(p => p.isContainer);
      const individual = pages.filter(p => !p.isContainer);
      
      console.log(`📁 Containers: ${containers.length}`);
      console.log(`📄 Individual pages: ${individual.length}`);
      
      if (individual.length > 0) {
        console.log('\n📄 Individual pages found:');
        individual.forEach((page, i) => {
          const parent = page.parentContainer ? ` (from ${page.parentContainer})` : '';
          console.log(`  ${i+1}. "${page.name}"${parent} - ${page.bounds?.width}x${page.bounds?.height}`);
        });
      } else {
        console.log('\n❌ No individual pages found!');
        console.log('This means the extraction logic needs to be improved.');
      }
      
    } catch (error) {
      console.error('Error parsing response:', error.message);
    }
  });
});

req.on('error', (error) => {
  console.error('Request failed:', error.message);
});

req.end(); 