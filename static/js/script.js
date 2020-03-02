$(document).ready(function () {
    $("input[type=button][value=Proceed]").click(function () {
        $("form#pizzaform").find("div.setcont.defaultcont").next().addClass("defaultcont");
        $("form#pizzaform").find("div.setcont.defaultcont").prev().removeClass("defaultcont");
    });
    $("input[type=button][value=Previous]").click(function () {
        $("form#pizzaform").find("div.setcont.defaultcont").prev().addClass("defaultcont");
        $("form#pizzaform").find("div.setcont.defaultcont").next().removeClass("defaultcont");
    });
    // pizza sizes
    let small = { name: "small", price: 750 };
    let medium = { name: "small", price: 1000 };
    let large = { name: "small", price: 1437 };

    //piza toppings
    let pepperoni = { name: "Pepperoni", price: 60 };
    let sausage = { name: "Sausage", price: 40 };
    let mushroom = { name: "Mushroom", price: 100 };
    let greenPepper = { name: "Green Pepper", price: 50 };
    let olive = { name: "Olive", price: 50 };
    let onions = { name: "Onions", price: 30 };
    let extraCheese = { name: "Extra Cheese", price: 150 };
    let pineapple = { name: "Pineapple", price: 100 };

    //pizza crusts
    let cripsy = { name: "Crispy", price: 200 }
    let stuffed = { name: "Stuffed", price: 250 }
    let gluttenFree = { name: "Glutten Free", price: 300 }


    let getCheckedSize = function () {
        var size = "";
        var n = $("input[type=radio][name=size]:checked").val();
        if (n == 1) { size = small } else
            if (n == 2) { size = medium } else
                if (n == 3) { size = large };
        return size;
    }
    let getCheckedCrust = function () {
        var crust = "";
        var n = $("input[type=radio][name=crust]:checked").val();
        if (n == 1) { crust = cripsy } else
            if (n == 2) { crust = stuffed } else
                if (n == 3) { crust = gluttenFree }
        return crust;
    }
    let getCheckedTopping = function () {
        var topping = ""
        var n = $("input[type=radio][name=topping]:checked").val();
        if (n == 1) { topping = pepperoni } else
            if (n == 2) { topping = sausage } else
                if (n == 3) { topping = mushroom } else
                    if (n == 4) { topping = greenPepper } else
                        if (n == 5) { topping = olive } else
                            if (n == 6) { topping = onions } else
                                if (n == 7) { topping = extraCheese } else
                                    if (n == 8) { topping = pineapple }
        return topping;
    }
    let getPizzaNumbers = function () {
        var n = $("input[type=radio][name=number]:checked").val();
        if (n == "custom") {
            var n = $("input[type=number][min=1]");
            var n = n.val();
        }
        return n;
    }
    let getDelivery = function () {
        var cost = 0; var addr = { name: "Null", box: "Null", town: "Null" }
        var n = $("input[type=radio][name=delivery]:checked").val();
        if (n == "yes") {
            var name = $("input[type=text][name=uname]").val();
            var poBox = $("input[type=text][name=pbox]").val();
            var pTown = $("input[type=text][name=ptown]").val();
            var addr = { name: name, box: poBox, town: pTown }
            var cost = (name.length + poBox.length + pTown.length) * 7;
        }
        return { addr: addr, cost: cost };
    }


    $("input[type=button][value=Proceed]").click(function (e) {
    //variables for calculation
    var pizzaCrustCost = getCheckedCrust().price;
    var pizzaCrustName = getCheckedCrust().name;
    var pizzaSizeCost = getCheckedSize().price;
    var pizzaSizeName = getCheckedSize().name;
    var pizzaToppingCost = getCheckedTopping().price;
    var pizzaToppingName = getCheckedTopping().name;
    var PizzaNumbers = getPizzaNumbers();
    var deliveryCost = getDelivery().cost;
    var deliveryAddress = "Name: " + getDelivery().addr.name + ", P.O. Box: " + getDelivery().addr.box + ", Postal Town: " + getDelivery().addr.town;

    //Total Cost calculator//Constructors
    function totalCost(crust, size, toppings, numbers, delivery) {
        this.cost = (crust + size + toppings) * numbers + delivery;
    }
        var items =[pizzaSizeName +" = Ksh" +pizzaSizeCost,pizzaCrustName +" = Ksh" +pizzaCrustCost,pizzaToppingName +" = Ksh" +pizzaToppingCost]
            $("ul#items").html("<li>"+items[0]+"</li>"+"<li>"+items[1]+"<li>"+items[2]+"</li>")

        e.preventDefault();
        var total = new totalCost(pizzaCrustCost,pizzaSizeCost,pizzaToppingCost,PizzaNumbers,deliveryCost).cost;
        $("span#costscreen").html(total);
        $("p.addressscreen").html(deliveryAddress);
    });


});