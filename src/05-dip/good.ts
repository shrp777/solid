type Order = { id: string; amount: number };

/* Couche du Domaine */
//la couche du Domaine définit un port sortant OrderRepository
export interface OrderRepository {
  save(order: Order): void;
}

/* Couche du Domaine */
//la couche du Domaine expose le port sortant OrderRepository
//la couche d'infrastructure implémente OrderRepository
//la couche du domaine utilise tout type d'implémentation de OrderRepository
export class PlaceOrderService {
  constructor(private readonly repository: OrderRepository) {}

  execute(amount: number): Order {
    const order: Order = {
      id: crypto.randomUUID(),
      amount
    };

    this.repository.save(order);

    return order;
  }
}

/* Couche d'Infrastructure */
//implémentation du port OrderRepository par la couche d'infrastructure
export class MySQLOrderRepository implements OrderRepository {
  save(order: any): void {
    console.log("INSERT INTO orders ...", order);
  }
}

/* Point d'entrée du programme */
const repository = new MySQLOrderRepository();
const service = new PlaceOrderService(repository);

service.execute(200);
