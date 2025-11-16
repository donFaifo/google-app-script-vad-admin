/**
 * Aplicación creada para Leroy Merlin durante el período de venta telefónica. 
 * Se creó con el propósito de gestionar los pedidos telefónicos en las diferentes modalidades de envío.
 * Las implementaciones han sido archivadas por no poder usar la URL de la implementación en la 
 * variable baseUrl que contiene la raíz de la url de la aplicación. En su lugar hay que usar la 
 * implementación de prueba que usa siempre la misma url. Desde ahí se pueden crear los pedidos en el 
 * botón Nuevo Pedido.
 */

var VadAdminSp = SpreadsheetApp.openById("1z-wbbGqpYwV9SJosTxnnzHeDGKDIgIizmQ9PiS2gsIs");
var baseUrl = "https://script.google.com/macros/s/AKfycbyBts5Mih6RdtS5MDI2v0qEvv7KUf6rmjH_olXDOVc/dev";
//var baseUrl = "https://script.google.com/macros/s/AKfycbyzmStbUh2fz9a6I3Snp8qP3-zlZQ9S2_VP01Zuc8UWNbB7purGldPmUzggHLl1ssl7/exec";
var navbar = HtmlService.createTemplateFromFile("navbar").evaluate().getContent();
var head = HtmlService.createHtmlOutputFromFile("head").getContent();
var bsScripts = HtmlService.createHtmlOutputFromFile("bootstrapScripts").getContent();

function doGet(e) 
{
  var mainHtml = HtmlService.createTemplateFromFile("main");

  var dest = e.parameter.dest;

  // Variables de datos de la página

  switch (dest) {
    case 'newOrder':
      return HtmlService.createTemplateFromFile('newOrder').evaluate().addMetaTag("viewport", "width=device-width, initial-scale=1").setTitle("VAD Admin 2.0 - Nuevo Pedido");
      break;
    default:
      return mainHtml.evaluate().addMetaTag("viewport", "width=device-width, initial-scale=1").setTitle("VAD Admin 2.0");
  }
}