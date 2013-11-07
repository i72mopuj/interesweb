function enviar()
{
  var dParametros = pasoRevisar();
  if(dParametros === null)
    return;
  pasoResultados(dParametros);
  
  if(dParametros[""])
    pasoTablaEstandar();
}

function pasoRevisar()
{
  var cCapital = document.getElementById("capital");
  var cDuracion = document.getElementById("duracion");
  var cInteres = document.getElementById("interes");

  var vCTabla = document.getElementById("tablas").getElementsByTagName("input");
  var vTabla = new Array("Estándar","Cuenta de la vieja");
  var tTabla = ""; 

  var msj = "";  
  if(cCapital.value == "")
     msj += "Introduzca el capital\n";
  else
  {
    capital = parseFloat(cCapital.value);
    if(capital != capital)
      msj += "El capital debe ser un número\n";    
  }

  if(cDuracion.value == "")
    msj += "Introduzca la duración\n";
  else
  {
    duracion = parseInt(cDuracion.value, 10);
    if(duracion != duracion)
      msj += "La duración debe ser un entero\n";  
  }

  if(cInteres.value == "")
     msj += "Introduzca el interés\n";
  else
  {
    interes = parseFloat(cInteres.value); 
    if(interes != interes)
      msj += "El interés debe ser un número\n";
    else if(interes < 0 || interes > 100)
      msj += "El interés debe estar entre 0 y 100\n";
  }

  if(msj != "")
  {    
    console.log(msj);
    return null;
  }
  
  msj += "Su capital es: " + capital + "\n";
  msj += "Su duración es: " + duracion + "\n";
  msj += "Su interés es: " + interes + "\n";

  for(i = 0; i < vCTabla.length; i++)  
    if(vCTabla[i].checked)
      tTabla = tTabla + "   " + vTabla[i] + "\n";

  console.log({"capital":capital, "duracion":duracion, "interes":interes,
           "tablaStd":vCTabla["std"].checked, "tablaCv":vCTabla["cv"].checked});
  return {"capital":capital, "duracion":duracion, "interes":interes,
           "tablaStd":vCTabla["std"].checked, "tablaCv":vCTabla["cv"].checked};
}

function calcularPago(interes, nPeriodo, valAct)
  {return valAct/((1 - 1/Math.pow(1 + interes, nPeriodo))/interes);}

function pasoResultados(dParametros)
{ MI CARRO ME LO ROBARON
  msj = "";
  interes = dParametros["interes"]/100;
  interesM = (Math.pow(1 + interes, 1.0/12) - 1);
  interesMCv = interes/12
  cuota = calcularPago(interesM, dParametros["duracion"] * 12,
            dParametros["capital"]);
  cuotaCv = calcularPago(interesMCv, dParametros["duracion"] * 12,
             dParametros["capital"]);
  pagoExt = (cuotaCv - cuota) * 12

  msj += "Interés mensual: " + (100 * interesM) + "\n";
  msj += "Interés mensual CV: " + (100 * interesMCv) + "\n";
  msj += "Interés anual CV: " + (100 * (Math.pow(1 + interesMCv, 12) - 1)) + "\n";
  msj += "Cuota mensual: " + cuota + "\n";
  msj += "Cuota mensual CV: " + cuotaCv + "\n";
  msj += "Pago extra anual: " + pagoExt + "\n";
  msj += "Pago extra total: " + (pagoExt * dParametros["duracion"]) + "\n";
  console.log(msj);
}
