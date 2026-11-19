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

  #checkNum(val, label) {
    if (val === "") {
      throw new Error("من فضلك اكتب " + label);
    }
    const num = Number(val);
    if (isNaN(num)  num < 0  num > 100) {
      throw new Error(label + " يجب أن تكون بين 0 و 100");
    }
    return num;
  }

  set g1(v) {
    this.#g1 = this.#checkNum(v, "درجة المادة الأولى");
  }

  set g2(v) {
    this.#g2 = this.#checkNum(v, "درجة المادة الثانية");
  }

  set g3(v) {
    this.#g3 = this.#checkNum(v, "درجة المادة الثالثة");
  }

  set att(v) {
    this.#att = this.#checkNum(v, "نسبة الحضور");
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
    const s = new Student(
      nameInput.value,
      g1Input.value,
      g2Input.value,
      g3Input.value,
      attInput.value
    );

    studentsList.push(s);

    studentsBox.innerHTML +=
      "<div class='student-row'>" +
      "الاسم: " + s.name + " | " +
      "الدرجات: " + s.g1 + "، " + s.g2 + "، " + s.g3 + " | " +
      "المتوسط: " + s.getAvg().toFixed(2) + " | " +
      "الحضور: " + s.att + "%" +
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

  const struggling = studentsList.filter(function (s) {
    return s.getAvg() >= 40 && s.getAvg() <= 49;
  });

  if (struggling.length === 0) {
    reportBox.innerHTML =
      "<div class='report-box'>" +
      "<div>عدد الطلاب المتعثرين: 0</div>" +
      "<div>أسماء الطلاب المتعثرين: لا يوجد</div>" +
      "<div>المتوسط العام بعد الرأفة: 0.00</div>" +
      "</div>";
    return;
  }

  const afterMercy = struggling.map(function (s) {
    return {
      name: s.name,
      newAvg: s.getAvg() + 5
    };
  });

  const sum = afterMercy.reduce(function (total, item) {
    return total + item.newAvg;
  }, 0);

  const finalAvg = afterMercy.length > 0 ? sum / afterMercy.length : 0;

  const names = afterMercy
    .map(function (item) {
      return item.name;
    })
    .join("، ");

  reportBox.innerHTML =
    "<div class='report-box'>" +
    "<div>عدد الطلاب المتعثرين: " + afterMercy.length + "</div>" +
    "<div>أسماء الطلاب المتعثرين: " + names + "</div>" +
    "<div>المتوسط العام بعد الرأفة: " + finalAvg.toFixed(2) + "</div>" +
    "</div>";
};
