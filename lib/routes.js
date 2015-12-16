exports.order = function order(req, res, next) {
  var order = req.body, returnValue = {};
  var nbItems = order.names.length, index = 0, total = 0;
  console.log('ORDER >>\n', JSON.stringify(order));
  for (; index < nbItems; index++) {
    total += order.quantities[index] * order.prices[index];
  }
  if(!tva[order.country]) {
    res.json(returnValue);
    return;
  }
  total += total * tva[order.country];
  index = 0;
  if (reductions[order.reduction]) {
    for (; index < reductions[order.reduction].length; index++) {
      if (total >= reductions[order.reduction][index][0] && total < reductions[order.reduction][index][1] ) {
        total -= total * reductions[order.reduction][index][2];
      }
      break;
    }
    returnValue = {total: parseFloat(total.toFixed(2), 10)};
  }
  if (!order.reduction) {
    returnValue = {total: parseFloat(total.toFixed(2), 10)};
  }
  res.json(returnValue);
}

function computePrice(quantity, price) {
  return (quantity * price);
}

exports.feedback = function feedback(req, res, next) {
  console.info("FEEDBACK:", req.body.type, req.body.content);
  next();
}

var reductions = {
    "STANDARD": [
        [1000, 5000, 0.03],
        [5000, 7000, 0.05],
        [7000, 10000, 0.07],
        [10000, 50000, 0.10],
        [50000, 1000000000000000, 0.15]
    ]
};

var tva = {
    "DE": 0.20,
    "UK": 0.21,
    "FR": 0.2,
    "IT": 0.25,
    "ES": 0.19,
    "PL": 0.21,
    "RO": 0.20,
    "NL": 0.20,
    "BE": 0.24,
    "EL": 0.20,
    "CZ": 0.19,
    "PT": 0.23,
    "HU": 0.27,
    "SE": 0.23,
    "AT": 0.22,
    "BG": 0.21,
    "DK": 0.21,
    "FI": 0.17,
    "SK": 0.18,
    "IE": 0.21,
    "HR": 0.23,
    "LT": 0.23,
    "SI": 0.24,
    "LV": 0.20,
    "EE": 0.22,
    "CY": 0.21,
    "LU": 0.25,
    "MT": 0.20
};
