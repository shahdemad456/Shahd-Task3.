class Student {
  #g1;
  #g2;
  #g3;
  #att;

  constructor(name, g1, g2, g3, att) {
    if (name.trim() === "") {
      throw new Error("برجاء ادخال اسم الطالب");
    }
    this.name = name.trim();
    this.g1 = g1;
    this.g2 = g2;
    this.g3 = g3;
    this.att = att;
  }

  #checkNum(val, msgName) {
    if (val === "") {
      throw new Error(msgName + " فارغه");
    }
    const num = Number(val);
    if (isNaN(num)  num < 0  num > 100) {
      throw new Error(msgName + " غير صحيحه");
    }
    return num;
  }

  set g1(v) {
    this.#g1 = this.#checkNum(v, "الدرجه الاولي");
  }

  set g2(v) {
    this.#g2 = this.#checkNum(v, "الدرجه الثانيه");
  }

  set g3(v) {
    this.#g3 = this.#checkNum(v, "الدرجه الثالثه");
  }

  set att(v) {
    this.#att = this.#checkNum(v, "نسبه الحضور");
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

  getAvg() {
    return (this.#g1 + this.#g2 + this.#g3) / 3;
  }
}

const studentsList = [];

const nameInput = document.getElementById("studentName");
const g1Input = document.getElementById("grade1");
const g2Input = document.getElementById("grade2");
const g3Input = document.getElementById("grade3");
const attInput = document.getElementById("attendance");

const addBtn = document.getElementById("addBtn");
const mercyBtn = document.getElementById("mercyBtn");

const errorBox = document.getElementById("errorBox");
const studentsBox = document.getElementById("studentsBox");
const reportBox = document.getElementById("reportBox");

addBtn.onclick = function () {
  errorBox.classList.add("d-none");
  errorBox.textContent = "";

  try {
    const st = new Student(
      nameInput.value,
      g1Input.value,
      g2Input.value,
      g3Input.value,
      attInput.value
    );

    studentsList.push(st);

    studentsBox.innerHTML +=
      "<div class='student-row'>" +
      "الاسم : " + st.name + " | " +
      "الدرجات : " + st.g1 + " ، " + st.g2 + " ، " + st.g3 + " | " +
      "المتوسط : " + st.getAvg().toFixed(2) + " | " +
      "الحضور : " + st.att + "%" +
      "</div>";

    nameInput.value = "";
    g1Input.value = "";
    g2Input.value = "";
    g3Input.value = "";
    attInput.value = "";
  } catch (error) {
    errorBox.textContent = error.message;
    errorBox.classList.remove("d-none");
  }
};

mercyBtn.onclick = function () {
  errorBox.classList.add("d-none");

  const weakStudents = studentsList.filter(function (st) {
    const avg = st.getAvg();
    return avg >= 40 && avg <= 49;
  });

  if (weakStudents.length === 0) {
    reportBox.innerHTML =
      "<div class='report-box'>" +
      "<div>عدد الطلاب المتعثرين : 0</div>" +
      "<div>اسماء الطلاب : لا يوجد</div>" +
      "<div>المتوسط بعد الرافه : 0</div>" +
      "</div>";
    return;
  }

  const afterMercy = weakStudents.map(function (st) {
    return {
      name: st.name,
      newAvg: st.getAvg() + 5
    };
  });

  const sumAvg = afterMercy.reduce(function (total, item) {
    return total + item.newAvg;
  }, 0);

  const finalAvg = afterMercy.length > 0 ? sumAvg / afterMercy.length : 0;

  const namesText = afterMercy
    .map(function (item) {
      return item.name;
    })
    .join(" ، ");

  reportBox.innerHTML =
    "<div class='report-box'>" +
    "<div>عدد الطلاب المتعثرين : " + afterMercy.length + "</div>" +
    "<div>اسماء الطلاب : " + namesText + "</div>" +
    "<div>المتوسط بعد الرافه : " + finalAvg.toFixed(2) + "</div>" +
    "</div>";
};
