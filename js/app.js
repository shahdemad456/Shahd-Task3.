class Student {
  #g1;
  #g2;
  #g3;
  #att;

  constructor(name, g1, g2, g3, att) {
    if (!name.trim()) {
      throw new Error("من فضلك اكتب اسم الطالب");
    }
    this.name = name.trim();
    this.g1 = g1;
    this.g2 = g2;
    this.g3 = g3;
    this.att = att;
  }

  #checkNumber(val, label) {
    const num = Number(val);
    if (val === "" ||  isNaN(num) || num < 0 || num > 100) {
      throw new Error(label + " يجب أن تكون رقماً بين 0 و 100");
    }
    return num;
  }

  set g1(v) {
    this.#g1 = this.#checkNumber(v, "الدرجة الأولى");
  }

  set g2(v) {
    this.#g2 = this.#checkNumber(v, "الدرجة الثانية");
  }

  set g3(v) {
    this.#g3 = this.#checkNumber(v, "الدرجة الثالثة");
  }

  set att(v) {
    this.#att = this.#checkNumber(v, "نسبة الحضور");
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

  getAverage() {
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
    const student = new Student(
      nameInput.value,
      g1Input.value,
      g2Input.value,
      g3Input.value,
      attInput.value
    );

    studentsList.push(student);

    studentsBox.innerHTML +=
      "<div class='student-card'>" +
      "<strong>الاسم:</strong> " + student.name + " | " +
      "<strong>الدرجات:</strong> " + student.g1 + "، " + student.g2 + "، " + student.g3 + " | " +
      "<strong>المتوسط:</strong> " + student.getAverage().toFixed(2) + " | " +
      "<strong>الحضور:</strong> " + student.att + "%" +
      "</div>";

    nameInput.value = "";
    g1Input.value = "";
    g2Input.value = "";
    g3Input.value = "";
    attInput.value = "";
  } catch (err) {
    errorBox.textContent = err.message;
    errorBox.classList.remove("d-none");
  }
};

mercyBtn.onclick = function () {
  errorBox.classList.add("d-none");

  const struggling = studentsList.filter(function (s) {
    return s.getAverage() >= 40 && s.getAverage() <= 49;
  });

  if (struggling.length === 0) {
    reportBox.innerHTML = "<p class='mb-0'>عدد الطلاب المتعثرين: 0</p>";
    return;
  }

  const afterMercy = struggling.map(function (s) {
    return {
      name: s.name,
      newAvg: s.getAverage() + 5
    };
  });

  const sumAvg = afterMercy.reduce(function (total, item) {
    return total + item.newAvg;
  }, 0);

  const finalAvg = sumAvg / afterMercy.length;

  const namesList = afterMercy.map(function (item) {
    return item.name;
  }).join("، ");

  reportBox.innerHTML =
    "<p><strong>عدد الطلاب المتعثرين:</strong> " + afterMercy.length + "</p>" +
    "<p><strong>أسماء الطلاب المتعثرين:</strong> " + namesList + "</p>" +
    "<p class='mb-0'><strong>المتوسط العام بعد الرأفة:</strong> " + finalAvg.toFixed(2) + "</p>";
};