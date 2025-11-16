function addOrder(order) {
  var orderSheet = VadAdminSp.getSheetByName("Pedidos");
  var nextRow = orderSheet.getLastRow() + 1;
  orderSheet.getRange(nextRow, 1).setValue(order.date);
  orderSheet.getRange(nextRow, 2).setValue(order.orderNumber);
  orderSheet.getRange(nextRow, 3).setValue(order.shop);
  orderSheet.getRange(nextRow, 4).setValue(order.customerName);
  orderSheet.getRange(nextRow, 5).setValue(order.customerPhone);
  orderSheet.getRange(nextRow, 6).setValue(order.customerMail);
  orderSheet.getRange(nextRow, 7).setValue(order.customerId);
  orderSheet.getRange(nextRow, 8).setValue(order.orderAmount);
  orderSheet.getRange(nextRow, 9).setValue(order.paymentMethod);
  orderSheet.getRange(nextRow, 10).setValue(order.deliveryDate);
  orderSheet.getRange(nextRow, 11).setValue(order.sendingMethod);
}