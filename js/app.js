class Student {
  #g1;
  #g2;
  #g3;
  #att;

  constructor(name, g1, g2, g3, att) {
    if (name.trim() === "") {
      throw new Error("من فضلك اكتب اسم الطالب");
    }
    this.name = name.trim();
    this.g1 = g1;
    this.g2 = g2;
    this.g3 = g3;
    this.att = att;
  }

  #check(val, label) {
    if (val === "") {
      throw new Error("من فضلك اكتب " + label);
    }
    var n = Number(val);
    if (isNaN(n)  n < 0  n > 100) {
      throw new Error(label + " يجب أن تكون بين 0 و 100");
    }
    return n;
  }

  set g1(v) {
    this.#g1 = this.#check(v, "المادة الأولى");
  }

  set g2(v) {
    this.#g2 = this.#check(v, "المادة الثانية");
  }

  set g3(v) {
    this.#g3 = this.#check(v, "المادة الثالثة");
  }

  set att(v) {
    this.#att = this.#check(v, "نسبة الحضور");
  }

  get g1() {
    return this.#g1;
  }

  get g2() {
    return this.#g2;
  }

  get g3() {
    return this.#g3;
  }

  get att() {
    return this.#att;
  }

  avg() {
    return (this.#g1 + this.#g2 + this.#g3) / 3;
  }
}

var studentsList = [];

function addStudent() {
  var errorBox = document.getElementById("errorBox");
  var studentsBox = document.getElementById("studentsBox");
  errorBox.className = "alert alert-danger d-none";
  errorBox.innerHTML = "";

  try {
    var nameVal = document.getElementById("studentName").value;
    var g1Val = document.getElementById("grade1").value;
    var g2Val = document.getElementById("grade2").value;
    var g3Val = document.getElementById("grade3").value;
    var attVal = document.getElementById("attendance").value;

    var st = new Student(nameVal, g1Val, g2Val, g3Val, attVal);
    studentsList.push(st);

    studentsBox.innerHTML =
      studentsBox.innerHTML +
      "<div class='student-row'>" +
      "الاسم: " + st.name + " | " +
      "المادة الأولى: " + st.g1 + " | " +
      "المادة الثانية: " + st.g2 + " | " +
      "المادة الثالثة: " + st.g3 + " | " +
      "المتوسط: " + st.avg().toFixed(2) + " | " +
      "نسبة الحضور: " + st.att + "%" +
      "</div>";

    document.getElementById("studentName").value = "";
    document.getElementById("grade1").value = "";
    document.getElementById("grade2").value = "";
    document.getElementById("grade3").value = "";
    document.getElementById("attendance").value = "";
  } catch (err) {
    errorBox.innerHTML = err.message;
    errorBox.className = "alert alert-danger";
  }
}

function runMercy() {
  var errorBox = document.getElementById("errorBox");
  var reportBox = document.getElementById("reportBox");
  errorBox.className = "alert alert-danger d-none";

  var weak = studentsList.filter(function (st) {
    return st.avg() >= 40 && st.avg() <= 49;
  });

  if (weak.length === 0) {
    reportBox.innerHTML =
      "<div class='report-box'>" +
      "<div>عدد الطلاب المتعثرين: 0</div>" +
      "<div>أسماء الطلاب المتعثرين: لا يوجد</div>" +
      "<div>المتوسط العام بعد الرأفة: 0.00</div>" +
      "</div>";
    return;
  }

  var boosted = weak.map(function (st) {
    return {
      name: st.name,
      newAvg: st.avg() + 5
    };
  });

  var sum = boosted.reduce(function (acc, item) {
    return acc + item.newAvg;
  }, 0);

  var finalAvg = boosted.length > 0 ? sum / boosted.length : 0;

  var names = boosted
    .map(function (item) {
      return item.name;
    })
    .join("، ");

  reportBox.innerHTML =
    "<div class='report-box'>" +
    "<div>عدد الطلاب المتعثرين: " + boosted.length + "</div>" +
    "<div>أسماء الطلاب المتعثرين: " + names + "</div>" +
    "<div>المتوسط العام بعد الرأفة: " + finalAvg.toFixed(2) + "</div>" +
    "</div>";
}

window.onload = function () {
  var addBtn = document.getElementById("addBtn");
  var mercyBtn = document.getElementById("mercyBtn");

  if (addBtn) {
    addBtn.onclick = addStudent;
  }
  if (mercyBtn) {
    mercyBtn.onclick = runMercy;
  }
};
