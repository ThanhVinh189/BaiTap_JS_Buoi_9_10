import { getEleId } from "./../controllers/main.js";

class Validation {
  // Kiểm tra chuỗi rỗng
  checkEmty(value, spanID, mess) {
    if (value === "") {
      getEleId(spanID).innerHTML = mess;
      getEleId(spanID).style.display = "block";
      return false;
    }

    getEleId(spanID).innerHTML = "";
    getEleId(spanID).style.display = "none";
    return true;
  }

  // Kiểm tra tài khoản (4-6 ký số)
  checkAccount(value, spanID, mess) {
    const number = /^[0-9]{4,6}$/;

    if (value.match(number)) {
      getEleId(spanID).innerHTML = "";
      getEleId(spanID).style.display = "none";
      return true;
    }

    getEleId(spanID).innerHTML = mess;
    getEleId(spanID).style.display = "block";
    return false;
  }

  // Kiểm tra tài khoản tồn tại => không hợp lệ
  checkAccountExist(value, spanID, mess, listEmployee) {
    let isExist = false;

    for (let i = 0; i < listEmployee.length; i++) {
      const employee = listEmployee[i];
      if (employee.account === value) {
        isExist = true;
        break;
      }
    }

    if (isExist) {
      getEleId(spanID).innerHTML = mess;
      getEleId(spanID).style.display = "block";
      return false;
    }

    getEleId(spanID).innerHTML = "";
    getEleId(spanID).style.display = "none";
    return true;
  }

  // Kiểm tra tên (chỉ chứa chữ)
  checkName(value, spanID, mess) {
    const letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      getEleId(spanID).innerHTML = "";
      getEleId(spanID).style.display = "none";
      return true;
    }

    getEleId(spanID).innerHTML = mess;
    getEleId(spanID).style.display = "block";
    return false;
  }

  // Kiểm tra email
  checkEmail(value, spanID, mess) {
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.match(email)) {
      getEleId(spanID).innerHTML = "";
      getEleId(spanID).style.display = "none";
      return true;
    }

    getEleId(spanID).innerHTML = mess;
    getEleId(spanID).style.display = "block";
    return false;
  }

  // Kiểm tra mật khẩu (6-10 ký tự, ít nhất 1 chữ hoa, 1 số, 1 ký tự đặc biệt)
  checkPassword(value, spanID, mess) {
    const password =
      /^(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    if (value.match(password)) {
      getEleId(spanID).innerHTML = "";
      getEleId(spanID).style.display = "none";
      return true;
    }

    getEleId(spanID).innerHTML = mess;
    getEleId(spanID).style.display = "block";
    return false;
  }

  // Kiểm tra ngày (định dạng mm/dd/yyyy)
  checkDate(value, spanID, mess) {
    const date = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (value.match(date)) {
      getEleId(spanID).innerHTML = "";
      getEleId(spanID).style.display = "none";
      return true;
    }

    getEleId(spanID).innerHTML = mess;
    getEleId(spanID).style.display = "block";
    return false;
  }

  // Kiểm tra lương cơ bản
  checkSalary(value, spanID, mess) {
    if (value < 1000000 || value > 20000000) {
      getEleId(spanID).innerHTML = mess;
      getEleId(spanID).style.display = "block";
      return false;
    }

    getEleId(spanID).innerHTML = "";
    getEleId(spanID).style.display = "none";
    return true;
  }

  // Kiểm tra chức vụ
  checkRole(idRole, spanID, mess) {
    if (getEleId(idRole).selectedIndex === 0) {
      getEleId(spanID).innerHTML = mess;
      getEleId(spanID).style.display = "block";
      return false;
    }

    getEleId(spanID).innerHTML = "";
    getEleId(spanID).style.display = "none";
    return true;
  }

  // Kiểm tra số giờ làm (80 - 200 giờ)
  checkHours(value, spanID, mess) {
    if (value < 80 || value > 200) {
      getEleId(spanID).innerHTML = mess;
      getEleId(spanID).style.display = "block";
      return false;
    }

    getEleId(spanID).innerHTML = "";
    getEleId(spanID).style.display = "none";
    return true;
  }
}

export default Validation;
