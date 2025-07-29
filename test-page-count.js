const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3200,
  path: '/api/mcp/figma/page-flows',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const pages = JSON.parse(data);
      
      console.log('📊 Page Analysis Results:\n');
      console.log(`Total pages returned: ${pages.length}`);
      
      // Count containers vs individual pages
      const containers = pages.filter(p => p.isContainer);
      const individualPages = pages.filter(p => !p.isContainer);
      
      console.log(`📁 Containers: ${containers.length}`);
      console.log(`📄 Individual pages: ${individualPages.length}\n`);
      
      // Show containers
      if (containers.length > 0) {
        console.log('📁 Containers:');
        containers.forEach(container => {
          console.log(`  - "${container.name}" (${container.flowData?.subPages?.length || 0} sub-pages)`);
        });
        console.log('');
      }
      
      // Show individual pages
      if (individualPages.length > 0) {
        console.log('📄 Individual pages:');
        individualPages.forEach(page => {
          const parent = page.parentContainer ? ` (from ${page.parentContainer})` : '';
          console.log(`  - "${page.name}"${parent} - ${page.bounds?.width}x${page.bounds?.height}`);
        });
      }
      
    } catch (error) {
      console.error('❌ Error parsing response:', error.message);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
});

req.end(); 