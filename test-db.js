const pool = require('./src/lib/db.js').default;

async function testEmployeeOperations() {
  try {
    // Test database connection
    console.log('Testing database connection...');
    const connectionTest = await pool.query('SELECT NOW()');
    console.log('✓ Database connected successfully');
    
    // Test employee table structure
    console.log('\nChecking employee table structure...');
    const tableInfo = await pool.query('SELECT column_name, data_type FROM information_schema.columns WHERE table_name = \'employee\' ORDER BY ordinal_position');
    console.log('✓ Employee table columns:', tableInfo.rows);
    
    // Test inserting an employee
    console.log('\nTesting employee insertion...');
    const insertResult = await pool.query(
      'INSERT INTO employee (empid, salary, perdetails) VALUES ($1, $2, $3)',
      [1001, 50000, 'Test Employee - Software Developer']
    );
    console.log('✓ Employee inserted successfully');
    
    // Test fetching employees
    console.log('\nFetching all employees...');
    const employees = await pool.query('SELECT * FROM employee');
    console.log('✓ Current employees:', employees.rows);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    pool.end();
  }
}

testEmployeeOperations();
