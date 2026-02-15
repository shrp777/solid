type CustomerType = "STUDENT" | "VIP" | "REGULAR";

class OrderItem {
  constructor(
    public price: number,
    public quantity: number
  ) {}
}

class Order {
  constructor(
    readonly orderItems: Array<OrderItem> = [],
    readonly customerType: CustomerType,
    private discountEngine: DiscountEngine
  ) {}

  //calcule la valeur de la réduction
  calculateDiscount(): number {
    return this.discountEngine.compute(this); //le calcul de la réduction est délégué à une classe spécialisée
  }

  //calcule le total, sans réduction
  calculateTotal(): number {
    return this.orderItems.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
  }

  //calcule le montant, avec réduction si applicable
  calculateAmount(): number {
    return this.calculateTotal() - this.calculateDiscount();
  }
}

interface DiscountPolicy {
  matchWith(customerType: string): boolean;
  applyDiscount(order: Order): number;
}

class StudentDiscount implements DiscountPolicy {
  matchWith(ct: CustomerType) {
    return ct === "STUDENT";
  }
  applyDiscount(order: Order) {
    return order.calculateTotal() * 0.1;
  }
}

class VipDiscount implements DiscountPolicy {
  matchWith(ct: CustomerType) {
    return ct === "VIP";
  }
  applyDiscount(order: Order) {
    return order.calculateTotal() * 0.2;
  }
}

class NoDiscount implements DiscountPolicy {
  matchWith(_: string) {
    return true;
  }
  applyDiscount(_: Order) {
    return 0;
  }
}

class DiscountEngine {
  constructor(private readonly policies: DiscountPolicy[]) {}
  compute(order: Order): number {
    const policy =
      this.policies.find((p) => p.matchWith(order.customerType)) ??
      new NoDiscount();
    return policy.applyDiscount(order);
  }
}

const discountEngine: DiscountEngine = new DiscountEngine([
  new StudentDiscount(),
  new VipDiscount(),
  new NoDiscount()
]);

const orderItems: Array<OrderItem> = [
  new OrderItem(10, 3),
  new OrderItem(7, 2)
];

const orderRegular = new Order(orderItems, "REGULAR", discountEngine);
const orderStudent = new Order(orderItems, "STUDENT", discountEngine);
const orderVIP = new Order(orderItems, "VIP", discountEngine);

console.log(orderRegular.calculateAmount()); //44

console.log(orderStudent.calculateAmount()); //39.6

console.log(orderVIP.calculateAmount()); //35.2
