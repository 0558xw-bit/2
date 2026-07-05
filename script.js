"use strict";

function sum(arr) { 
    let sum = 0;
    for(let i = 0; i < arr.length; i++) 
        sum += arr[i];   
    return sum;
}

function generate_sp(amount, max) {
    amount -= 1;

    // ----------------

    function gen(max) {
        return Math.floor(Math.random()*100*max)/100;
    }

    // ----------------
    // Initialize

    var point = [];
    point.length = amount;

    var sp = [];
    sp.length = point.length + 1;

    // -----------------
    // generate

    for(let i = 0; i < point.length; i++) {
        point[i] = gen(max);
    }

    // sort
    point = point.sort(function (a, b) {  return a - b;  });

    // find sp
    sp[0] = point[0] - 0;                           // sp [0]
    sp[sp.length-1] = max - point[point.length-1];  // sp [-1]

    for(let i = 1; i < sp.length-1; i++) {          // sp [i]
        sp[i] = point[i]-point[i-1];
    }

    // round
    for(let i = 0; i < sp.length; i++) sp[i] = +sp[i].toFixed(2);    

    // ------------------
    return sp;
}

const newsp = [generate_sp(5, 100), generate_sp(3, 30)];

function format_sp() {

    const spnames = [
        [
            "Сила удара",
            "Количество энергии",
            "Скорость восстановления энергии",
            "Скорость вращения стрелки",
            "Скорость движения против стрелки",
        ],
        [ 
            "Расход энергии за удар",
            "Трата бодрости при втором дыхании",
            "Получение боевых умений"
        ]
    ];

    let spheaders = [ "Первичные боевые параметры", "Вторичные боевые параметры" ];

    let sptable = "";

    let pm = "";

    for(let group = 0; group < newsp.length; group++) {
        sptable += "<tr><th colspan='2'><b>" + spheaders[group] +"</b><th></tr>";
        for(let i = 0; i < newsp[group].length; i++) {

            if((group == 1) && (i === 0 || i === 1)) pm = "-";
            else pm = "+";

            sptable += "<tr><td>"+ pm + newsp[group][i].toFixed(1) + "%</td><td>" + spnames[group][i] + "</td></tr>";
        } 
        sptable += "<tr><td colspan='2' class='sum'>сумма: " +sum(newsp[group]).toFixed(1) +"%<td></tr>";
    }

    document.getElementById("sp").innerHTML = sptable;
} format_sp();
