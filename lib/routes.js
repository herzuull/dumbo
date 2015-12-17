var http = require('http');

exports.order = function order(req, res, next) {

/*
  http.get('http://10.0.34.92/licenses', function(err, result) {
    console.log(result);
  });
  categories : http://10.0.35.98:3000/categories
  */
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
	break;
      }
    }
    returnValue = {total: parseFloat(total.toFixed(2), 10), voucher: 0, licenses: []};
  } else if (order.reduction == 'HALF PRICE') {
    total = total/2;
    returnValue = {total: parseFloat(total.toFixed(2), 10), voucher: 0, licenses: []}
  }

  if (!order.reduction) {
    returnValue = {total: parseFloat(total.toFixed(2), 10), voucher: 0, licenses: []}
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

exports.vouchers = function vouchers(req, res) {
res.json(voucherData);
};

exports.voucher = function voucher(req, res, next) {
  var category = req.params['category'], returnValue = {error: 404, message: 'No category founded'}, index = 0, nbItems = voucherData.length;

  for (; index < nbItems; index++) {
    //if (voucherData[]) {

    //}
  }
  res.json(returnValue);
};

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

var voucherData = [{
    "category": "Drinks",
    "amount": 10
}, {
    "category": "Fishing",
    "amount": 50
}, {
    "category": "Weapons",
    "amount": 100
}, {
    "category": "Phones",
    "amount": 100
}, {
    "category": "Computers",
    "amount": 200
}, {
    "category": "Cars",
    "amount": 1000
}, {
    "category": "Planes",
    "amount": 20000
}, {
    "category": "Houses",
    "amount": 20000
}, {
    "category": "Boats",
    "amount": 20000
}];

var licencesDatas = [{"category":"Weapons","country":"FR","license":"HUNTING"},{"category":"Weapons","country":"UK","license":"HUNTING"},{"category":"Alcohol","country":"UK","license":"OLDER_THAN_21"},{"category":"Alcohol","country":"DE","license":"OLDER_THAN_21"},{"category":"Fishing","country":"CZ","license":"FISHING"},{"category":"Fishing","country":"US","license":"FISHING"},{"category":"Fishing","country":"XE","license":"FISHING"}];
var categories = [
  {
    "item": "Shirt",
    "category": "Clothes"
  },
  {
    "item": "Trouser",
    "category": "Clothes"
  },
  {
    "item": "Jean",
    "category": "Clothes"
  },
  {
    "item": "Glove",
    "category": "Clothes"
  },
  {
    "item": "Socks",
    "category": "Clothes"
  },
  {
    "item": "Shoe",
    "category": "Clothes"
  },
  {
    "item": "Coat",
    "category": "Clothes"
  },
  {
    "item": "Jacket",
    "category": "Clothes"
  },
  {
    "item": "Pyjama",
    "category": "Clothes"
  },
  {
    "item": "Beret",
    "category": "Clothes"
  },
  {
    "item": "Hat",
    "category": "Clothes"
  },
  {
    "item": "Spacesuit for elephant",
    "category": "Clothes"
  },
  {
    "item": "Water gun",
    "category": "Weapons"
  },
  {
    "item": "Wooden sword",
    "category": "Weapons"
  },
  {
    "item": "Stinking cheese",
    "category": "Weapons"
  },
  {
    "item": "Dalek",
    "category": "Weapons"
  },
  {
    "item": "Laser saber",
    "category": "Weapons"
  },
  {
    "item": "Death Star",
    "category": "Weapons"
  },
  {
    "item": "Cheese",
    "category": "Food"
  },
  {
    "item": "Candy",
    "category": "Food"
  },
  {
    "item": "Paella",
    "category": "Food"
  },
  {
    "item": "Tomato",
    "category": "Vegetables"
  },
  {
    "item": "Cucumber",
    "category": "Vegetables"
  },
  {
    "item": "Carrot",
    "category": "Vegetables"
  },
  {
    "item": "Tomato juice",
    "category": "Drinks"
  },
  {
    "item": "Apple juice",
    "category": "Drinks"
  },
  {
    "item": "Diet coke",
    "category": "Drinks"
  },
  {
    "item": "Water",
    "category": "Drinks"
  },
  {
    "item": "Coffee",
    "category": "Drinks"
  },
  {
    "item": "Tea",
    "category": "Drinks"
  },
  {
    "item": "Wine",
    "category": "Alcohol"
  },
  {
    "item": "Beer",
    "category": "Alcohol"
  },
  {
    "item": "Whisky",
    "category": "Alcohol"
  },
  {
    "item": "Fishing rod",
    "category": "Fishing"
  },
  {
    "item": "Worms",
    "category": "Fishing"
  },
  {
    "item": "Net",
    "category": "Fishing"
  }
];
