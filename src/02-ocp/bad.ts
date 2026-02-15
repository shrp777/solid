type CustomerType = "REGULAR" | "STUDENT" | "VIP";

class OrderItem {
  constructor(
    public price: number,
    public quantity: number
  ) {}
}

class Order {
  constructor(
    readonly orderItems: Array<OrderItem> = [],
    readonly customerType: CustomerType
  ) {}

  //calcule la valeur de la réduction
  calculateDiscount(): number {
    switch (this.customerType) {
      case "STUDENT":
        return this.calculateTotal() * 0.1;
      case "VIP":
        return this.calculateTotal() * 0.2;
      case "REGULAR":
      default:
        return 0;
    }
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

const orderItems: Array<OrderItem> = [
  new OrderItem(10, 3),
  new OrderItem(7, 2)
];

const orderRegular = new Order(orderItems, "REGULAR");
const orderStudent = new Order(orderItems, "STUDENT");
const orderVIP = new Order(orderItems, "VIP");

console.log(orderRegular.calculateAmount()); //44

console.log(orderStudent.calculateAmount()); //39.6

console.log(orderVIP.calculateAmount()); //35.2
