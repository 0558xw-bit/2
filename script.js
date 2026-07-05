"use strict";

function sum(arr) { 
    let sum = 0;
    for(let i = 0; i < arr.length; i++) 
        sum += arr[i];   
    return sum;
}

function generate_sp(amount, max) {

    // ----------------
    // Initialize

    let point = new Array(amount + 1).fill(null);
    let sp = new Array(amount).fill(null);

    // -----------------
    // generate points

    point[0] = 0;
    point[point.length-1] = max;

    for(let i = 1; i < point.length - 1; i++) {
        point[i] = Math.floor(Math.random()*100*max)/100;
    }

    // sort points
    point = point.sort(function (a, b) {  return a - b;  });

    // calculate sp    
    for(let i = 0; i < sp.length; i++) sp[i] = point[i+1]-point[i];

    // round sp
    for(let i = 0; i < sp.length; i++) sp[i] = +sp[i].toFixed(2);    

    // ------------------
    return sp;
}

function generate_balanced_sp() {
    let sp = generate_sp(5, 100-15*5);

    for(let i = 0; i < 5; i++) {
        sp[i] += 15;
    }

    return sp;
}

function generate_leaned_sp(group, lean) {
    const groups = [[3, 4], [1, 2], [0]];
    const leans = [20, 35];

    let sp = generate_sp(5, 100-leans[lean]*groups[group].length);
    const lean_sp = generate_sp(groups[group].length, leans[lean]*groups[group].length);

    for(let i = 0; i < groups[group].length; i++) {
        sp[groups[group][i]] += lean_sp[i];
    }
    
    return sp;
}

function format_sp(sp) {

    const sp_names = [
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

    let sp_headers = [ "Первичные боевые параметры", "Вторичные боевые параметры" ];

    let sp_table = "";

    let pm = "";

    for(let group = 0; group < sp.length; group++) {
        sp_table += "<tr><th colspan='2'><b>" + sp_headers[group] +"</b><th></tr>";
        for(let i = 0; i < sp[group].length; i++) {

            if((group == 1) && (i === 0 || i === 1)) pm = "-";
            else pm = "+";

            sp_table += "<tr><td>"+ pm + sp[group][i].toFixed(1) + "%</td><td>" + sp_names[group][i] + "</td></tr>";
        } 
        sp_table += "<tr><td colspan='2' class='sum'>сумма: " +sum(sp[group]).toFixed(1) +"%<td></tr>";
    }

    document.getElementById("sp").innerHTML = sp_table;
}

const new_sp = [generate_sp(5, 100), generate_sp(3, 30)];
format_sp(new_sp);


var form = document.getElementById("select_group");

form.addEventListener("submit", function(e) {
    e.preventDefault(); 

    var data = new FormData(form);
    var value = data.get('type');
    
    console.log(value);
    switch(value) {
        case "1":
            format_sp([generate_sp(5, 100), generate_sp(3, 30)]);
            break;
        case "2":
            format_sp([generate_balanced_sp(), generate_sp(3, 30)]);
            break;
        case "3":
            format_sp([generate_leaned_sp(0, 0), generate_sp(3, 30)]);
            break;
        case "4":
            format_sp([generate_leaned_sp(0, 1), generate_sp(3, 30)]);
            break;
        case "5":
            format_sp([generate_leaned_sp(1, 0), generate_sp(3, 30)]);
            break;
        case "6":
            format_sp([generate_leaned_sp(1, 1), generate_sp(3, 30)]);
            break;
        case "7":
            format_sp([generate_leaned_sp(2, 0), generate_sp(3, 30)]);
            break;
        case "8":
            format_sp([generate_leaned_sp(2, 1), generate_sp(3, 30)]);
            break;            
    }
});

  






 


