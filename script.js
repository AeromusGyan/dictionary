function transformDictionary(D) {
    
    // console.log(D);
    const result = {};
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // Calculate the sum of values for each day
    for (let day of daysOfWeek) {
      result[day] = 0;
      // console.log(day);
    }
    
    for (let dateStr in D) {
      const date = new Date(dateStr);
      const value = D[dateStr];
      // console.log(dateStr);
      
      // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const dayOfWeek = date.getDay();
      
      // Accumulate the value for the corresponding day
      result[daysOfWeek[dayOfWeek]] += value;
    }
    
    // Fill in missing days with the mean of previous and next days
    for (let i = 0; i < daysOfWeek.length; i++) {
      const currentDay = daysOfWeek[i];
      const prevDay = daysOfWeek[(i + 6) % 7];
      const nextDay = daysOfWeek[(i + 1) % 7];
      
      if (!(currentDay in result)) {
        const meanValue = Math.round((result[prevDay] + result[nextDay]) / 2);
        result[currentDay] = meanValue;
      }
    }
    // console.log(result);
    
    return result;
  }
  
  
  function displayTransformedDictionary() {
    const D = {
      '2023-05-13': 10,
      '2023-05-14': 5,
      '2023-05-15': 7,
      '2023-05-17': 3,
      '2023-05-18': 4,
      '2023-05-19': 2,
    };
  
    const transformed = transformDictionary(D);
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
  
    const heading = document.createElement('h1');
    heading.textContent = 'Transformed Dictionary';
    outputDiv.appendChild(heading);
  
    const ul = document.createElement('ul');
    for (let key in transformed) {
      const li = document.createElement('li');
      const label = document.createElement('label');
      label.textContent = key;
      li.appendChild(label);
  
      const value = document.createElement('span');
      value.textContent = transformed[key];
      li.appendChild(value);
  
      ul.appendChild(li);
    }
    outputDiv.appendChild(ul);
  }
  
  // Display the transformed dictionary when the page loads
  window.addEventListener('DOMContentLoaded', displayTransformedDictionary);
  
  function runTests() {
    const testCases = [
      {
        input: {
          '2023-05-13': 10,
          '2023-05-14': 5,
          '2023-05-15': 7,
          '2023-05-17': 3
        },
        expectedOutput: {
          Mon: 8,
          Tue: 7,
          Wed: 7,
          Thu: 3,
          Fri: 3,
          Sat: 8,
          Sun: 5
        }
      },
      {
        input: {
          '2022-12-30': 1,
          '2022-12-31': 5,
          '2023-01-01': 3,
          '2023-01-02': 7
        },
        expectedOutput: {
          Mon: 7,
          Tue: 7,
          Wed: 3,
          Thu: 4,
          Fri: 6,
          Sat: 4,
          Sun: 5
        }
      },
      {
        input: {
          '2023-05-13': 10,
          '2023-05-14': 5,
          '2023-05-15': 7,
          '2023-05-17': 3,
          '2023-05-18': 4,
          '2023-05-19': 2,
        },
        expectedOutput: {
          Mon: 5,
          Tue: 7,
          Wed: 0,
          Thu: 3,
          Fri: 4,
          Sat: 2,
          Sun: 10
        }
      },
      // Add more test cases as needed
    ];
  
    for (let i = 0; i < testCases.length; i++) {
      const { input, expectedOutput } = testCases[i];
      const actualOutput = transformDictionary(input);
  
      // Compare the actual and expected outputs
      const isEqual = JSON.stringify(actualOutput) === JSON.stringify(expectedOutput);
  
      if (isEqual) {
        console.log(`Test case ${i + 1}: Passed`);
      } else {
        console.log(`Test case ${i + 1}: Failed`);
        console.log('Expected:', expectedOutput);
        console.log('Actual:', actualOutput);
      }
    }
  }
  
  // Run the tests
  runTests();
  