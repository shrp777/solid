type StudentID = string;
type SchoolID = string;

class Student {
  private readonly _registrations: Set<SchoolID> = new Set();
  private _id?: StudentID;

  constructor(
    public firstname: string,
    public lastname: string
  ) {}

  registerToSchool(schoolID: string, studentID: StudentID): void {
    this._id = studentID;
    this._registrations.add(schoolID);
  }

  isRegistered(schoolID: SchoolID): boolean {
    return this._registrations.has(schoolID);
  }

  hasStudentID(): boolean {
    return this._id !== undefined;
  }

  getStudentID(): StudentID | null {
    return this._id !== undefined ? this._id : null;
  }
}

class School {
  private readonly _id: SchoolID;

  constructor(
    readonly name: string,
    private readonly students: Set<Student> = new Set()
  ) {
    this._id = Bun.randomUUIDv7();
  }

  //School dépend d'un type concret Student
  //ce qui restreint le périmètre fonctionnel
  //ex: il ne serait pas possible d'inscrire d'autres types d'étudiant (alternant, VAE, formation continue...)
  //sans modifier la classe Student
  registerStudent(student: Student) {
    const studentID: StudentID = student.getStudentID() ?? Bun.randomUUIDv7();

    student.registerToSchool(this._id, studentID);

    if (!this.students.has(student)) {
      this.students.add(student);
    } else {
      throw new Error("Student is already registered");
    }
  }
}

const johnDoe: Student = new Student("John", "Doe");
const jamesLee: Student = new Student("James", "Lee");
const billSmith: Student = new Student("Bill", "Smith");

const school: School = new School("Best School");

school.registerStudent(johnDoe);
school.registerStudent(jamesLee);
school.registerStudent(billSmith);

try {
  school.registerStudent(billSmith);
} catch (error) {
  if (error instanceof Error) console.error(error.message); //Student is already registered
}
