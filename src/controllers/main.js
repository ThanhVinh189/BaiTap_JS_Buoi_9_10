import Employee from "../models/employee.js";
import EmployeeList from "../models/employee-list.js";
import Validation from "./../models/validation.js";

const validation = new Validation();

// *Create new object from class EmployeeList
const employeeList = new EmployeeList();

export const getEleId = (id) => document.getElementById(id);

const getInfoEmployee = (isAdd) => {
  // *Get value from input
  const employeeAccount = getEleId("tknv").value;
  const employeeName = getEleId("name").value;
  const employeeEmail = getEleId("email").value;
  const employeePassword = getEleId("password").value;
  const employeeDate = getEleId("datepicker").value;
  const employeeSalary = getEleId("luongCB").value;
  const employeeRole = getEleId("chucvu").value;
  const employeeHours = getEleId("gioLam").value;

  // *Check Validation
  let isValid = true;

  if (isAdd) {
    // employeeAccount
    isValid &=
      validation.checkEmty(
        employeeAccount,
        "tbTKNV",
        "*Vui lòng nhập số Tài Khoản"
      ) &&
      validation.checkAccountExist(
        employeeAccount,
        "tbTKNV",
        "*Số Tài Khoản đã tồn tại",
        employeeList.arr
      ) &&
      validation.checkAccount(
        employeeAccount,
        "tbTKNV",
        "*Tài khoản tối đa 4 - 6 ký số"
      );
  }

  // employeeName
  isValid &=
    validation.checkEmty(
      employeeName,
      "tbTen",
      "*Vui lòng nhập Tên nhân viên"
    ) && validation.checkName(employeeName, "tbTen", "*Họ và Tên phải là chữ");

  // employeeEmail
  isValid &=
    validation.checkEmty(employeeEmail, "tbEmail", "*Vui lòng nhập Email") &&
    validation.checkEmail(
      employeeEmail,
      "tbEmail",
      "*Email phải đúng định dạng"
    );

  // employeePassword
  isValid &=
    validation.checkEmty(
      employeePassword,
      "tbMatKhau",
      "*Vui lòng nhập Mật Khẩu"
    ) &&
    validation.checkPassword(
      employeePassword,
      "tbMatKhau",
      "*Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    );

  // employeeDate
  isValid &=
    validation.checkEmty(employeeDate, "tbNgay", "*Vui lòng nhập Ngày làm") &&
    validation.checkDate(
      employeeDate,
      "tbNgay",
      "*Vui lòng nhập đúng định dạng mm/dd/yyyy"
    );

  // employeeSalary
  isValid &=
    validation.checkEmty(
      employeeSalary,
      "tbLuongCB",
      "*Vui lòng nhập Lương cơ bản"
    ) &&
    validation.checkSalary(
      employeeSalary,
      "tbLuongCB",
      "*Lương cơ bản 1.000.000 VNĐ - 20.000.000 VNĐ"
    );

  // employeeRole
  isValid &= validation.checkRole(
    "chucvu",
    "tbChucVu",
    "*Vui lòng chọn Chức vụ phù hợp"
  );

  // employeeHours
  isValid &=
    validation.checkEmty(employeeHours, "tbGiolam", "*Vui lòng nhập Giờ làm") &&
    validation.checkHours(
      employeeHours,
      "tbGiolam",
      "* Số giờ làm trong tháng 80 - 200 giờ"
    );

  if (!isValid) return null;

  const employee = new Employee(
    employeeAccount,
    employeeName,
    employeeEmail,
    employeePassword,
    employeeDate,
    employeeSalary,
    employeeRole,
    employeeHours
  );

  employee.totalSalary();

  employee.classifyEmployee();

  return employee;
};

// *Render Employee List UI
const renderEmployeeList = (data) => {
  let content = "";
  for (let i = 0; i < data.length; i++) {
    const employee = data[i];
    content += `
        <tr>
            <td>${employee.account}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.date}</td>
            <td>${employee.role}</td>
            <td>${new Intl.NumberFormat("vn-VN").format(
              employee.total
            )} VNĐ</td>
            <td>${employee.type}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEditEmployee('${
                  employee.account
                }')">EDIT</button>
                <button class="btn btn-danger" onclick="handleDeleteEmployee('${
                  employee.account
                }')">DELETE</button>
            </td>
      </tr>
    `;
  }

  getEleId("tableDanhSach").innerHTML = content;
};

getEleId("btnThem").onclick = function () {
  // *Edit title modal
  getEleId("header-title").innerHTML = "Log In";

  // *Show button add Employee
  getEleId("btnThemNV").style.display = "inline-block";

  // *Hide button update Employee
  getEleId("btnCapNhat").style.display = "none";

  // *reset value form
  getEleId("employeeForm").reset();

  // *enable input employeeAccount
  getEleId("tknv").removeAttribute("disabled");
};

/**
 *  * Handle Edit Employee
 */
const handleEditEmployee = (account) => {
  // *Edit title modal
  getEleId("header-title").innerHTML = "Cập nhật nhân viên";
  // *Hide button add Employee
  getEleId("btnThemNV").style.display = "none";
  // *Show button update Employee
  getEleId("btnCapNhat").style.display = "inline-block";

  const employee = employeeList.editEmployee(account);

  if (employee) {
    // *Show value của employee ra form
    getEleId("tknv").value = employee.account;
    // *Disabled input employeeAccount
    getEleId("tknv").setAttribute("disabled", true);

    getEleId("name").value = employee.name;
    getEleId("email").value = employee.email;
    getEleId("password").value = employee.password;
    getEleId("datepicker").value = employee.date;
    getEleId("luongCB").value = employee.salary;
    getEleId("chucvu").value = employee.role;
    getEleId("gioLam").value = employee.hours;
  }
};

window.handleEditEmployee = handleEditEmployee;

/**
 *  * Handle Delete Employee
 */
const handleDeleteEmployee = (account) => {
  // *Remove employee from employeeList.arr
  employeeList.removeEmployee(account);

  // *Render employee List
  renderEmployeeList(employeeList.arr);

  // *Set Local Storage
  setLocalStorage();
};

window.handleDeleteEmployee = handleDeleteEmployee;

/**
 * * Set Local Storage
 */
const setLocalStorage = () => {
  const dataJSON = employeeList.arr;
  // *Convert dataJSON to string
  const dataString = JSON.stringify(dataJSON);
  // *Save dataString to localStorage
  localStorage.setItem("EMPLOYEE_LIST", dataString);
};

/**
 * * Get Local Storage
 */
const getLocalStorage = () => {
  const dataString = localStorage.getItem("EMPLOYEE_LIST");
  // *Check dataString is null => return
  if (dataString) {
    // *Convert dataString to data JSON
    const dataJSON = JSON.parse(dataString);
    // *Update employeeList.arr
    employeeList.arr = dataJSON;
    // *Render Employee List
    renderEmployeeList(employeeList.arr);
  }
};

getLocalStorage();

/**
 *  * Add Employee
 */
getEleId("btnThemNV").onclick = function () {
  // *Get employee from form
  const employee = getInfoEmployee(true);

  if (!employee) return;

  // *Add employee to employee list
  employeeList.addEmployee(employee);

  // *Render employee List
  renderEmployeeList(employeeList.arr);

  // *Set Local Storage
  setLocalStorage();

  // *Close modal
  document.getElementById("btnDong").click();
};

/**
 *  * Update Employee
 */
getEleId("btnCapNhat").onclick = function () {
  // *Get employee from form
  const employee = getInfoEmployee(false);

  if (!employee) return;

  // *Add employee to employee list
  employeeList.updateEmployee(employee);

  // *Render employee List
  renderEmployeeList(employeeList.arr);

  // *Set Local Storage
  setLocalStorage();

  // *Close modal
  document.getElementById("btnDong").click();
};

/**
 *  * Search Employee
 */
getEleId("searchName").addEventListener("keyup", function () {
  const type = getEleId("searchName").value;
  const employeeSearch = employeeList.searchEmployee(type);
  renderEmployeeList(employeeSearch);
});
