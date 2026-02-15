type User = { id: string; email: string };

class UserFactory {
  create(email: string): User {
    return { id: crypto.randomUUID(), email };
  }
}

class UserRepository {
  save(user: User): void {
    console.log("INSERT INTO users ...", user);
  }
}

class EmailSender {
  sendWelcome(email: string): void {
    console.log("Send welcome email to", email);
  }
}

//UserService coordonne plusieurs classes spécialisées dans des tâches spécifiques
class UserService {
  constructor(
    private readonly factory: UserFactory,
    private readonly repo: UserRepository,
    private readonly mailer: EmailSender
  ) {}

  createUser(email: string): User {
    const user = this.factory.create(email);
    this.repo.save(user);
    this.mailer.sendWelcome(user.email);
    return user;
  }
}

const userService: UserService = new UserService(
  new UserFactory(),
  new UserRepository(),
  new EmailSender()
);

console.log(userService.createUser("john@doe.com"));
