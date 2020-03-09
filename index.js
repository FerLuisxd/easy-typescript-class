let test = {
    "audit": {
        "appId": "TRX005V1",
        "usuario": "OMNICHANNEL",
        "ipServidor": "192.168.0.1",
        "transaccionId": "201907081428",
        "origen": "OMNICHANNEL"
    },
    "resumenVentasRequest": {
        "comercio": {
            "id": [
               12345,
               42435
            ],
            "numRuc": "20421787485"
        },
        "venta": {
            "monedaId": "840",
            "periodo": "7D"
        }
    }
}

let document = require('./src/function')
document(test,'Yes',true,true);

