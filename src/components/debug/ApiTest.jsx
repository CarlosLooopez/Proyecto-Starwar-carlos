
import { useState } from 'react';
import { testAPIConnection, fetchCharacters, fetchVehicles, fetchPlanets } from '../../services/swapiService';

const APITest = () => {
  const [results, setResults] = useState({});
  const [testing, setTesting] = useState(false);

  const runTest = async (testName, testFunction) => {
    setTesting(true);
    setResults(prev => ({ ...prev, [testName]: 'Testing...' }));
    
    try {
      const result = await testFunction();
      setResults(prev => ({ 
        ...prev, 
        [testName]: { 
          success: true, 
          data: result,
          message: 'Success!'
        }
      }));
    } catch (error) {
      setResults(prev => ({ 
        ...prev, 
        [testName]: { 
          success: false, 
          error: error.message,
          message: 'Failed!'
        }
      }));
    } finally {
      setTesting(false);
    }
  };

  const runAllTests = async () => {
    await runTest('connection', testAPIConnection);
    await runTest('characters', async () => {
      const chars = await fetchCharacters();
      return `Found ${chars.length} characters`;
    });
    await runTest('vehicles', async () => {
      const vehicles = await fetchVehicles();
      return `Found ${vehicles.length} vehicles`;
    });
    await runTest('planets', async () => {
      const planets = await fetchPlanets();
      return `Found ${planets.length} planets`;
    });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h4><i className="fas fa-bug me-2"></i>API Connection Test</h4>
        </div>
        <div className="card-body">
          <button 
            className="btn btn-primary mb-3" 
            onClick={runAllTests}
            disabled={testing}
          >
            {testing ? 'Testing...' : 'Run API Tests'}
          </button>
          
          <div className="row">
            {Object.entries(results).map(([testName, result]) => (
              <div key={testName} className="col-md-6 mb-3">
                <div className={`card ${
                  result === 'Testing...' ? 'border-warning' :
                  result.success ? 'border-success' : 'border-danger'
                }`}>
                  <div className="card-header">
                    <h6 className="mb-0">
                      {testName.charAt(0).toUpperCase() + testName.slice(1)} Test
                      {result !== 'Testing...' && (
                        <i className={`fas fa-${result.success ? 'check text-success' : 'times text-danger'} ms-2`}></i>
                      )}
                    </h6>
                  </div>
                  <div className="card-body">
                    {result === 'Testing...' ? (
                      <div className="d-flex align-items-center">
                        <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                        <span>Testing...</span>
                      </div>
                    ) : (
                      <div>
                        <p className="mb-1">{result.message}</p>
                        {result.success ? (
                          <small className="text-success">{result.data}</small>
                        ) : (
                          <small className="text-danger">{result.error}</small>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-3">
            <h6>Expected API Endpoints:</h6>
            <ul className="list-unstyled">
              <li><code>https://www.swapi.tech/api/people</code></li>
              <li><code>https://www.swapi.tech/api/vehicles</code></li>
              <li><code>https://www.swapi.tech/api/planets</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APITest;