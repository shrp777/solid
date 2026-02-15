type Order = { id: string; amount: number };

/* Couche d'Infrastructure */
class MySQLOrderRepository {
  save(order: Order): void {
    console.log("INSERT INTO orders ...", order);
  }
}

/* Couche du Domaine */
class PlaceOrderService {
  private readonly repository = new MySQLOrderRepository();
  //la couche du Domaine dépend d'une classe concrète définie dans la couche d'Infrastructure

  execute(amount: number): Order {
    const order = {
      id: crypto.randomUUID(),
      amount
    };

    this.repository.save(order);

    return order;
  }
}

/* Point d'entrée du programme */
const service = new PlaceOrderService();
service.execute(100);
