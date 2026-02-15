interface IStudent {
  registerToSchool(schoolID: string, studentID: StudentID): void;
  isRegistered(schoolID: SchoolID): boolean;
  hasStudentID(): boolean;
  getStudentID(): StudentID | null;
}

type StudentID = string;
type SchoolID = string;
type SocietyID = number;

class Society {
  constructor(
    readonly name: string,
    readonly id: SocietyID
  ) {}
}

class Apprentice implements IStudent {
  private readonly _registrations: Set<SchoolID> = new Set();
  private _id?: StudentID;

  constructor(
    public firstname: string,
    public lastname: string,
    readonly society: Society
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

class Student implements IStudent {
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
    private readonly students: Set<IStudent> = new Set()
  ) {
    this._id = Bun.randomUUIDv7();
  }

  //School dépend d'un type abstrait IStudent
  registerStudent(student: IStudent) {
    const studentID: StudentID = student.getStudentID() ?? Bun.randomUUIDv7();

    student.registerToSchool(this._id, studentID);

    if (!this.students.has(student)) {
      this.students.add(student);
    } else {
      throw new Error("Student is already registered");
    }
  }
}

const society: Society = new Society("Best Society", 123);

const johnDoe: Student = new Student("John", "Doe");
const jamesLee: Student = new Student("James", "Lee");
const billSmith: Student = new Student("Bill", "Smith");

const martinDen: Apprentice = new Apprentice("Martin", "Den", society);

const school: School = new School("Best School");

school.registerStudent(johnDoe);
school.registerStudent(jamesLee);
school.registerStudent(billSmith);
school.registerStudent(martinDen);
