type User = { id: string; email: string };

//la classe UserService a trop de responsabilités
// --> manque de cohésion + nombreuses raisons de modifications
class UserService {
  createUser(email: string): User {
    // logique métier
    const user = { id: crypto.randomUUID(), email };

    // simule l'enregistrement en base de données
    console.log("INSERT INTO users ...", user);

    // simule l'envoi d'un mail à l'utilisateur
    console.log("Send welcome email to", email);

    return user;
  }
}

const userService: UserService = new UserService();

console.log(userService.createUser("john@doe.com"));
