class Employee {
  constructor(
    _account,
    _name,
    _email,
    _password,
    _date,
    _salary,
    _role,
    _hours
  ) {
    this.account = _account;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.date = _date;
    this.salary = _salary;
    this.role = _role;
    this.hours = _hours;
    this.type = "";
    this.total = 0;
  }

  totalSalary() {
    let multiplier = 1;
    switch (this.role) {
      case "Sếp":
        multiplier = 3;
        break;
      case "Trưởng phòng":
        multiplier = 2;
        break;
      case "Nhân viên":
        multiplier = 1;
        break;
    }
    this.total = this.salary * multiplier;
    return this.total;
  }

  classifyEmployee() {
    if (this.hours >= 192) {
      this.type = "Xuất sắc";
    } else if (this.hours >= 176) {
      this.type = "Giỏi";
    } else if (this.hours >= 160) {
      this.type = "Khá";
    } else {
      this.type = "Trung bình";
    }
    return this.type; 
  }
}

export default Employee;
