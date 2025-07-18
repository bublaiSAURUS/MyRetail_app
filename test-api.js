const pool = require('./src/lib/db.js').default;

// Import the API functions
const { GET, POST } = require('./src/app/api/employees/route.js');

async function testAPI() {
  try {
    console.log('Testing Employee API endpoints...');
    
    // Test GET endpoint
    console.log('\n1. Testing GET /api/employees...');
    const getResponse = await GET();
    const employees = await getResponse.json();
    console.log('✓ GET response:', employees);
    
    // Test POST endpoint
    console.log('\n2. Testing POST /api/employees...');
    const mockRequest = {
      json: async () => ({
        empID: 1002,
        salary: 60000,
        perDetails: 'Test Employee 2 - UI Designer'
      })
    };
    
    const postResponse = await POST(mockRequest);
    const responseText = await postResponse.text();
    console.log('✓ POST response:', responseText);
    
    // Verify the employee was added
    console.log('\n3. Verifying employee was added...');
    const verifyResponse = await GET();
    const updatedEmployees = await verifyResponse.json();
    console.log('✓ Updated employees list:', updatedEmployees);
    
  } catch (error) {
    console.error('❌ API Test Error:', error);
  } finally {
    pool.end();
  }
}

testAPI();
