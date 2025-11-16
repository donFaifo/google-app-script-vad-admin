/**
 * Devuelve una cadena con la fecha en el formato d/mm/yyyy para insertar en las
 * celdas de una hoja de cálculo o hacer comparaciones
 * @param date Tipo de Date
 * @return string Cadena en formato d/mm/yyyy de fecha
 */
function getFormattedDate(date) {
  var d = new Date(date);
  var day = d.getDate().toString();
  var month = d.getMonth() < 9 ? `0${d.getMonth()+1}` : (d.getMonth()+1).toString();
  var year = d.getFullYear().toString();

  return {
    text: day + "/" + month + "/" + year,
    html: year + "-" + month + "-" + (day < 10 ? "0" + day : day)
  };
}


function testDate(test) {
  return test;
}
