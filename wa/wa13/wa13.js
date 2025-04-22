//#1
const employeeData = [
    {
        "name": "Sam",
        "department": "Tech",
        "designation": "Manager",
        "salary": 40000,
        "raiseEligible": true,
    },
    {
        "name": "Mary",
        "department": "Finance",
        "designation": "Trainee",
        "salary": 18500,
        "raiseEligible": true,
    },
    {
        "name": "Bill",
        "department": "HR",
        "designation": "Executive",
        "salary": 21200,
        "raiseEligible": false,
    }
];
  
console.log("Problem 1", employeeData);

//#2
const company = {
        "companyName": "Tech Stars",
        "website": "www.techstars.com",
        "employees": employeeData,
};

console.log("Problem 2",company)

//#3
const newEmployee = {
        "name": "Anna",
        "department": "Tech",
        "designation": "Executive",
        "salary": 25600,
        "raiseEligible": false,
};

company.employees.push(newEmployee);

console.log("Problem 3",company);

//#4
let totalSalary = 0;

company.employees.forEach(employee => {
  totalSalary += employee.salary;
});

console.log("Problem 4", totalSalary);

//#5
function raises(company) {
    company.employees.forEach(employee => {
      if (employee.raiseEligible) {
        employee.salary *= 1.10; 
        employee.raiseEligible = false;
      }
    });
  }
  
  raises(company);
  
  console.log("Problem 5", company);
  

