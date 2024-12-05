class EmployeeList {
  constructor() {
    this.arr = [];
  }

  addEmployee(employee) {
    this.arr.push(employee);
  }

  findIndexEmployee(account) {
    let index = -1;
    for (let i = 0; i < this.arr.length; i++) {
      const employee = this.arr[i];
      if (employee.account === account) {
        index = i;
        break;
      }
    }
    return index;
  }

  removeEmployee(account) {
    const index = this.findIndexEmployee(account);

    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  }

  editEmployee(account) {
    const index = this.findIndexEmployee(account);

    if (index !== -1) {
      return this.arr[index];
    }

    return null;
  }

  updateEmployee(employee) {
    const index = this.findIndexEmployee(employee.account);

    if (index !== -1) {
      this.arr[index] = employee;
    }
  }

  searchEmployee(type) {
    let result = [];
    for (let i = 0; i < this.arr.length; i++) {
      const employee = this.arr[i];

      const typeLowerCase = type.toLowerCase();
      const employeeTypeLowerCase = employee.type.toLowerCase();

      if (employeeTypeLowerCase.indexOf(typeLowerCase) !== -1) {
        result.push(employee);
      }
    }

    return result;
  }
}

export default EmployeeList;
