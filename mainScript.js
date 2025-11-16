
/**
 * Obtiene todas las tiendas con el formato TIENDA (##).
 * 
 * @return Array con todas las tiendas.
 */
function getShops() {
  var shops = VadAdminSp.getSheetByName("Tiendas").getRange("D2:D200").getValues();
  return shops;
}

/**
 * Obtiene todos los pedidos del día actual
 * @return Objeto con las propiedades data (array de los pedidos), totalAmount y totalOrders
 */
function getDailyOrders(day, month, year) {

  var ordersSheet = VadAdminSp.getSheetByName("Pedidos");

  var searchString = day + '/' + month + '/' + year;

  var searchRange = ordersSheet.getRange("A:A");
  var searchResult = searchRange.createTextFinder(searchString).findAll();

  var orders = searchResult.map(function (index) {
    return {
      number: ordersSheet.getRange(index.getRow(), 2).getValue(),
      shop: ordersSheet.getRange(index.getRow(), 3).getValue(),
      amount: ordersSheet.getRange(index.getRow(), 8).getValue(),
      paymentMethod: ordersSheet.getRange(index.getRow(), 9).getValue()
    };
  });
  
  var totalAmount = 0;
  for (var i=0; i<orders.length; i++) {
    totalAmount += orders[i].amount;
  }

  return {
    data: orders,
    totalAmount: totalAmount.toFixed(2),
    totalOrders: orders.length
  }
}

/**
 * Obtiene los presupuestos pendientes
 * @return Objeto con las propiedades data (array de los presupuestos), totalAmount y totalEstimations
 */
function getEstimations() {
  var estimationSheet = VadAdminSp.getSheetByName("Presupuestos");
  var firstRow = 2;
  var numberOfRows = estimationSheet.getLastRow() - 1;
  var estimations = estimationSheet.getSheetValues(firstRow, 1, numberOfRows, 9);
  var estimationsObject = {data: [], totalAmount: 0, totalEstimations: 0};

  for(var i=0; i<estimations.length; i++) {
    estimationsObject.data[i] = {
      date: getFormattedDate(estimations[i][0]).text, 
      estimationNumber: estimations[i][1],
      shop: estimations[i][2],
      amount: estimations[i][6],
      notes: estimations[i][7]
    }
    estimationsObject.totalAmount += estimations[i][6];
    estimationsObject.totalEstimations += 1;
  }

  estimationsObject.totalAmount = estimationsObject.totalAmount.toFixed(2);

  return estimationsObject;
}

/**
 * Obtiene las estadísticas semanales
 * @return Objeto con las propiedades data (array de los días de la semana), totalAmount y totalOrders
 */
function getWeeklyStatistics(day, month, year) {

  let utcDay = parseInt(day);
  let utcMonth = parseInt(month) - 1;

  var statisticSheet = VadAdminSp.getSheetByName("Pedidos");
  var dateRange = statisticSheet.getRange("A:A");

  var statistics = [];
  var totalAmount = 0;
  var totalOrders = 0;

  var currentDate = new Date(Date.UTC(year, utcMonth, utcDay, 12, 0, 0));
  var weekDay = currentDate.getDay();
  var weekStart = new Date(currentDate);
  weekStart.setDate(weekStart.getDate() - weekDay + 1);
  var week = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  for (var i=0; i<7; i++) {
    var dayOrders = dateRange.createTextFinder(getFormattedDate(weekStart).text).findAll();
    var dayAmount = 0;
    for (var j=0; j<dayOrders.length; j++) {
      dayAmount += statisticSheet.getRange(dayOrders[j].getRow(), 8).getValue();
    }

    statistics[i] = [
      week[i],
      dayOrders.length,
      dayAmount.toFixed(2)
    ]

    totalAmount += dayAmount;
    totalOrders += dayOrders.length;

    weekStart.setDate(weekStart.getDate() + 1);
  }

  return {
    data: statistics,
    totalAmount: totalAmount.toFixed(2),
    totalOrders: totalOrders
  }
}

/**
 * Obtiene los datos de la tienda a partir del número que se le pasa como argumento. Este  número
 * puede ser el número de tienda (<999) o un código postal (>1000) y se hará la búsqueda en la hoja
 * correspondiente del archivo VADAdmin
 * @param shopNumber que puede ser <999 (número de tienda) o >1000 (código postal)
 * @return Object con los datos de la tienda
 */
function getShop(shopNumber) {
  var shopData = {shop: "No encontrada", province: "-", area: "-", address: "-", info: "-"};
  var shopsListSheet = VadAdminSp.getSheetByName("Tiendas");

  if (shopNumber > 1000) {
    var zipCodesSheet = VadAdminSp.getSheetByName("DIST CP LM");
    var textFinder = zipCodesSheet.getRange("A:A").createTextFinder(shopNumber);
    if(textFinder.findNext() != null) {
      zipRow = textFinder.getCurrentMatch().getRow();
    } else {
      return shopData;
    }
    shopNumber = zipCodesSheet.getRange(zipRow, 4).getValue();
  }

  if (shopNumber == "") return shopData;
  var textFinder = shopsListSheet.getRange("A:A").createTextFinder(shopNumber);
  var resultRow = textFinder.findNext().getRow();
  
  shopData.shop = shopsListSheet.getRange(resultRow, 4).getValue();
  shopData.province = shopsListSheet.getRange(resultRow, 10).getValue();
  shopData.area = shopsListSheet.getRange(resultRow, 3).getValue();
  shopData.address = shopsListSheet.getRange(resultRow, 7).getValue();
  shopData.info = shopsListSheet.getRange(resultRow, 8).getValue();

  return shopData;
}

/**
 * Obtiene la información sobre la referencia a partir del lm del producto.
 * @param reference Number con el lm del producto.
 */
function getReferenceInfo(reference) {
  const avaibleRefsSheet = StockAvaible.getSheetByName("DISPONIBILIDAD ALMACENES");
  let refRow = 0;
  let refCol = 6;

  let textFinder = avaibleRefsSheet.getRange("B:B").createTextFinder(reference);

  if(textFinder.findNext() != null) {
    refRow = textFinder.getCurrentMatch().getRow();
  } else {
    return {
      ref: "NO ENCONTRADO",
      qt: "--"
    }
  }

  let refQt = avaibleRefsSheet.getRange(refRow, refCol).getValue();

  return {
    ref: reference,
    qt: refQt
  }
}
