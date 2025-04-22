// Original base data
const originalEmployees = [
    {
      name: "Sam",
      department: "Tech",
      designation: "Manager",
      salary: 40000,
      raiseEligible: true,
    },
    {
      name: "Mary",
      department: "Finance",
      designation: "Trainee",
      salary: 18500,
      raiseEligible: true,
    },
    {
      name: "Bill",
      department: "HR",
      designation: "Executive",
      salary: 21200,
      raiseEligible: false,
    }
  ];
  
  // Problem 1
  const problem1Employees = structuredClone(originalEmployees);
  console.log("Problem 1", { employees: problem1Employees });
  
  // Problem 2
  const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: structuredClone(originalEmployees)
  };
  console.log("Problem 2", company);
  
  // Problem 3 – Add Anna
  const problem3Employees = structuredClone(originalEmployees);
  problem3Employees.push({
    name: "Anna",
    department: "Tech",
    designation: "Executive",
    salary: 25600,
    raiseEligible: false
  });
  console.log("Problem 3", { employees: problem3Employees });
  
  // Problem 4 – Total Salary
  let totalSalary = 0;
  problem3Employees.forEach(emp => {
    totalSalary += emp.salary;
  });
  console.log("Problem 4 Total Salary:", totalSalary);
  
  // Problem 5 – Raise Eligible Update
  const problem5Employees = structuredClone(problem3Employees);
  problem5Employees.forEach(emp => {
    if (emp.raiseEligible) {
      emp.salary *= 1.10;
      emp.raiseEligible = false;
    }
  });
  console.log("Problem 5", { employees: problem5Employees });
  
  // Problem 6 – Work From Home
  const wfhList = ['Anna', 'Sam'];
  const problem6Employees = structuredClone(problem5Employees);
  problem6Employees.forEach(emp => {
    emp.wfh = wfhList.includes(emp.name);
  });
  console.log("Problem 6", { employees: problem6Employees });
  