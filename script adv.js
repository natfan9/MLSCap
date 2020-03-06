var maxbudgetcharge = 550000;
var maxtamcharge = maxbudgetcharge + 1000000;
var maxwidth = 0;
var barheight = 18;
var gamtotal = 2725000;
var gamspent = 0;
var gamremaining = 2725000;

var tamtotal = 2800000;
var tamspent = 0;
var tamremaining = 2800000;

var captotal = 4900000;
var capspent = 0;
var capremaining = 4900000;

var currentyear = 2020;

var cellwidth = document.getElementsByClassName("breakdown")[0].offsetWidth;
maxwidth = cellwidth-20;

players = []
gamtamcap = {"player1": {DP: 5950000, cap: 550000},"player2": {DP: 1950000, cap: 550000},"player3": {DP: 1250000, cap: 550000},"player4": {TAM: 900000, cap: 550000},"player5": {TAM: 750000, cap: 550000},"player6": {GAM: 600000, cap: 400000},"player7": {TAM: 250000, GAM: 125000, cap: 325000},"player8": {GAM: 125000, cap: 250000},"player9": {GAM:100000, cap: 200000},"player10": {GAM: 75000, cap: 175000},"player11": {cap: 175000},"player12": {cap: 150000},"player13": {cap: 100000},"player14": {cap: 75000},"player15": {cap: 75000},"player16": {cap: 75000},"player17": {cap: 75000},"player18": {cap: 75000}};
statusarr = {"player1": ["DP","INTL"], "player2": ["DP","INTL"], "player3": ["YDP","INTL"], "player4": [], "player5": ["INTL"], "player6": ["INTL"], "player7": ["INTL"], "player8": ["HGP"], "player9": [], "player10": ["INTL"], "player11": ["INTL"], "player12": ["HGP"], "player13": ["INTL"], "player14": ["INTL"], "player15": [],"player16": ["HGP"], "player17": [],"player18": ["HGP"]};
colors = ["fill:#4F2DBE","fill:#FF2323","fill:#1DD61D","fill:#FFD923"]

for (x in gamtamcap) {
    players.push(x);
}

// recursiveRows(players);

function switchTable(pageName, elmnt) {
    // Hide all elements with class="tabcontent" by default
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tables");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";
}

window.onload = function(){
	//document.getElementById("weightedpure").click();
	document.getElementById("default").click();
}

const playerlist = "https://natfan9.github.io/MLSCap/playerlist.json";
const playerlist2 = "https://natfan9.github.io/MLSCap/playerlist adv.json";

getPlayerData()

function getPlayerData() {
	var originaldata = playerlist2;
	var request = new XMLHttpRequest();
	request.open('GET', originaldata);
	request.responseType = 'json';
	request.send();

	request.onload = function() {
        var maindata = request.response;
        newplayers = [];
        for (x in maindata) {
            if (maindata[x]["team"] == "Example") {
                newplayers.push(maindata[x]);
            }
            // console.log(sumObject(maindata[x]["breakdown"]));
        }
        newplayers.sort(function(a,b) {
            return getBudgetCharge(b) - getBudgetCharge(a);
        })
        var seniorplayers = [];
        var supplplayers = [];
        for (y in newplayers) {
            if (newplayers[y]["roster"] == "senior") {
                seniorplayers.push(newplayers[y]);
            } else if (newplayers[y]["roster"] == "supplemental" || newplayers[y]["roster"] == "reserve") {
                supplplayers.push(newplayers[y]);
            }
        }
        recursiveRowsBreakdown(seniorplayers,"senior");
        recursiveRowsFutures(seniorplayers,"senior");
        recursiveRowsBreakdown(supplplayers,"supplemental");
        recursiveRowsFutures(supplplayers,"supplemental");
    }
}

function recursiveRowsBreakdown(playerarr,roster) {
    if (document.querySelectorAll("#" + roster + "table td.breakdown").length == playerarr.length) {
        createBreakdown(playerarr,roster);
        /*for (p = 0, plen = playerarr.length; p < plen; p++) {
            var parent = document.getElementById(playerarr[p]);
            var widthsum = interp(sumObject(gamtamcap[playerarr[p]]),0,maxtamcharge,0,maxwidth);
            var moneysum = sumObject(gamtamcap[playerarr[p]]);
            if (moneysum > maxtamcharge) {
                parent.setAttributeNS(null, "width", maxwidth);
            } else {
                parent.setAttributeNS(null, "width", widthsum);
            }
            width = widthsum;
            xpos = 0;
            salaryparent = document.getElementById("sal" + playerarr[p]);
            salaryparent.innerHTML = formatDollars(sumObject(gamtamcap[playerarr[p]]));
            for (x in gamtamcap[playerarr[p]]) {
                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("x","0");
                svg.setAttribute("y","0");
                svg.setAttribute("width",width);
                svg.setAttribute("height",barheight);
                parent.appendChild(svg);
                
                var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("width",widthsum);
                rect.setAttribute("height",barheight);
                rect.setAttribute("ry",barheight/2);
                switch (x) {
                    case "TAM":
                        rect.setAttribute("style",colors[2]);
                        break;
                    case "GAM":
                        rect.setAttribute("style",colors[1]);
                        break;
                    case "cap":
                        rect.setAttribute("style",colors[0]);
                        break;
                    default:
                        rect.setAttribute("style",colors[3]);
                }
                svg.appendChild(rect);
        
                var hoverbox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                hoverbox.setAttribute("width",interp(gamtamcap[playerarr[p]][x],0,maxtamcharge,0,maxwidth));
                hoverbox.setAttribute("height",barheight);
                hoverbox.setAttribute("x",width-interp(gamtamcap[playerarr[p]][x],0,maxtamcharge,0,maxwidth));
                hoverbox.setAttribute("class","hoverbox")
                svg.appendChild(hoverbox);
        
                width -= interp(gamtamcap[playerarr[p]][x],0,maxtamcharge,0,maxwidth);
                xpos += interp(gamtamcap[playerarr[p]][x],0,maxtamcharge,0,maxwidth);
        
                if (x == "GAM") {
                    gamspent += gamtamcap[playerarr[p]][x];
                    gamremaining -= gamtamcap[playerarr[p]][x];
                }
        
                if (x == "TAM") {
                    tamspent += gamtamcap[playerarr[p]][x];
                    tamremaining -= gamtamcap[playerarr[p]][x];
                }
        
                if (x == "cap") {
                    capspent += gamtamcap[playerarr[p]][x];
                    capremaining -= gamtamcap[playerarr[p]][x];
                }
            }
            statuscell = document.getElementById("status" + playerarr[p]);
            var playerstatus = "";
            for (y in statusarr[playerarr[p]]) {
                playerstatus += " " + statusarr[playerarr[p]][y] + " ";
                // console.log(statusarr[playerarr[p]][y]);
            }
            statuscell.innerHTML = "<b> "+playerstatus+" </b>";
        }*/
    } else if (document.querySelectorAll("#" + roster + "table td.breakdown").length > playerarr.length) {
        console.log("THERE'S MORE ROWS THAN PLAYERS");
        items = document.querySelectorAll("#" + roster + "table td.breakdown");
        parent = items[document.querySelectorAll("#" + roster + "table td.breakdown").length-1].parentElement;
        parent.remove();
        recursiveRowsBreakdown(playerarr,roster);
    } else if (document.querySelectorAll("#" + roster + "table td.breakdown").length < playerarr.length) {
        console.log("THERE'S MORE PLAYERS THAN ROWS");
        table = document.getElementById(roster + "table").firstElementChild;
        var row = document.createElement("tr");
        var namecell = document.createElement("td");
        namecell.setAttribute("id","name" + roster + "player"+(document.querySelectorAll("#" + roster + "table td.breakdown").length+1));
        row.appendChild(namecell);

        var statuscell = document.createElement("td");
        statuscell.setAttribute("id","status" + roster + "player"+(document.querySelectorAll("#" + roster + "table td.breakdown").length+1));
        statuscell.setAttribute("class","status");
        row.appendChild(statuscell);

        var salarycell = document.createElement("td");
        salarycell.setAttribute("id","sal" + roster + "player"+(document.querySelectorAll("#" + roster + "table td.breakdown").length+1));
        salarycell.setAttribute("class","salary");
        row.appendChild(salarycell);

        var breakdowncell = document.createElement("td");
        breakdowncell.setAttribute("class","breakdown");

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("height",barheight);
        svg.setAttribute("id",roster + "player"+(document.querySelectorAll("#" + roster + "table td.breakdown").length+1))
        breakdowncell.appendChild(svg);

        row.appendChild(breakdowncell);

        table.appendChild(row);
        recursiveRowsBreakdown(playerarr,roster);
    }
}

function createBreakdown(playerarr,roster) {
    for (p = 0, plen = playerarr.length; p < plen; p++) {
        var parent = document.getElementById(roster + "player" + (p+1));
        var widthsum = interp(getBudgetCharge(playerarr[p]),0,maxtamcharge,0,maxwidth);
        var moneysum = getBudgetCharge(playerarr[p]);
        if (moneysum > maxtamcharge) {
            parent.setAttributeNS(null, "width", maxwidth);
        } else {
            parent.setAttributeNS(null, "width", widthsum);
        }
        width = widthsum;
        xpos = 0;
        salaryparent = document.getElementById("sal" + roster + "player" + (p+1));
        salaryparent.innerHTML = formatDollars(moneysum);
        
        if (playerarr[p]["status"].includes("DP") || playerarr[p]["status"].includes("YDP")) {
            var dpoverage = moneysum - maxbudgetcharge;
            if (playerarr[p]["buydown"]) {
                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("x","0");
                svg.setAttribute("y","0");
                svg.setAttribute("width",width);
                svg.setAttribute("height",barheight);
                parent.appendChild(svg);

                var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("width",widthsum);
                rect.setAttribute("height",barheight);
                rect.setAttribute("ry",barheight/2);
                rect.setAttribute("style",colors[3]);
                svg.appendChild(rect);

                width -= interp(dpoverage,0,maxtamcharge,0,maxwidth);

                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("x","0");
                svg.setAttribute("y","0");
                svg.setAttribute("width",width);
                svg.setAttribute("height",barheight);
                parent.appendChild(svg);

                var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("width",widthsum);
                rect.setAttribute("height",barheight);
                rect.setAttribute("ry",barheight/2);
                switch (playerarr[p]["buydown"]["mechanism"]) {
                    case "TAM":
                        rect.setAttribute("style",colors[2]);
                        break;
                    case "GAM":
                        rect.setAttribute("style",colors[1]);
                        break;
                    default:
                        rect.setAttribute("style",colors[3]);
                }
                svg.appendChild(rect);

                width -= interp(playerarr[p]["buydown"]["amount"],0,maxtamcharge,0,maxwidth);

                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("x","0");
                svg.setAttribute("y","0");
                svg.setAttribute("width",width);
                svg.setAttribute("height",barheight);
                parent.appendChild(svg);

                var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("width",widthsum);
                rect.setAttribute("height",barheight);
                rect.setAttribute("ry",barheight/2);
                rect.setAttribute("style",colors[0]);
                svg.appendChild(rect);

                if (playerarr[p]["buydown"]["mechanism"] == "GAM") {
                    gamspent += playerarr[p]["buydown"]["amount"];
                    gamremaining -= playerarr[p]["buydown"]["amount"];
                } else if (playerarr[p]["buydown"]["mechanism"] == "TAM") {
                    tamspent += playerarr[p]["buydown"]["amount"];
                    tamremaining -= playerarr[p]["buydown"]["amount"];
                }

                if (playerarr[p]["status"].includes("HGP") == false && roster == "senior") {
                    var caphit = moneysum - dpoverage - playerarr[p]["buydown"]["amount"];
                    capspent += caphit;
                    capremaining -= caphit;
                }
            } else {
                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("x","0");
                svg.setAttribute("y","0");
                svg.setAttribute("width",width);
                svg.setAttribute("height",barheight);
                parent.appendChild(svg);

                var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("width",widthsum);
                rect.setAttribute("height",barheight);
                rect.setAttribute("ry",barheight/2);
                rect.setAttribute("style",colors[3]);
                svg.appendChild(rect);

                width -= interp(dpoverage,0,maxtamcharge,0,maxwidth);

                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("x","0");
                svg.setAttribute("y","0");
                svg.setAttribute("width",width);
                svg.setAttribute("height",barheight);
                parent.appendChild(svg);

                var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("width",widthsum);
                rect.setAttribute("height",barheight);
                rect.setAttribute("ry",barheight/2);
                rect.setAttribute("style",colors[0]);
                svg.appendChild(rect);

                if (playerarr[p]["status"].includes("HGP") == false) {
                    capspent += moneysum - dpoverage;
                    capremaining -= moneysum - dpoverage;
                }
            }
        } else {
            if (playerarr[p]["buydown"]) {
                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("x","0");
                svg.setAttribute("y","0");
                svg.setAttribute("width",width);
                svg.setAttribute("height",barheight);
                parent.appendChild(svg);

                var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("width",widthsum);
                rect.setAttribute("height",barheight);
                rect.setAttribute("ry",barheight/2);
                switch (playerarr[p]["buydown"]["mechanism"]) {
                    case "TAM":
                        rect.setAttribute("style",colors[2]);
                        break;
                    case "GAM":
                        rect.setAttribute("style",colors[1]);
                        break;
                    default:
                        rect.setAttribute("style",colors[3]);
                }
                svg.appendChild(rect);

                width -= interp(playerarr[p]["buydown"]["amount"],0,maxtamcharge,0,maxwidth);

                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("x","0");
                svg.setAttribute("y","0");
                svg.setAttribute("width",width);
                svg.setAttribute("height",barheight);
                parent.appendChild(svg);

                var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("width",widthsum);
                rect.setAttribute("height",barheight);
                rect.setAttribute("ry",barheight/2);
                rect.setAttribute("style",colors[0]);
                svg.appendChild(rect);

                if (playerarr[p]["buydown"]["mechanism"] == "GAM") {
                    gamspent += playerarr[p]["buydown"]["amount"];
                    gamremaining -= playerarr[p]["buydown"]["amount"];
                } else if (playerarr[p]["buydown"]["mechanism"] == "TAM") {
                    tamspent += playerarr[p]["buydown"]["amount"];
                    tamremaining -= playerarr[p]["buydown"]["amount"];
                }

                if (playerarr[p]["status"].includes("HGP") == false && roster == "senior") {
                    var caphit = moneysum - playerarr[p]["buydown"]["amount"];
                    capspent += caphit;
                    capremaining -= caphit;
                }
            } else {
                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("x","0");
                svg.setAttribute("y","0");
                svg.setAttribute("width",width);
                svg.setAttribute("height",barheight);
                parent.appendChild(svg);

                var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("width",widthsum);
                rect.setAttribute("height",barheight);
                rect.setAttribute("ry",barheight/2);
                rect.setAttribute("style",colors[0]);
                svg.appendChild(rect);

                if (playerarr[p]["status"].includes("HGP") == false) {
                    capspent += moneysum;
                    capremaining -= moneysum;
                }
            }
        }
        var statuscell = document.getElementById("status" + roster + "player" + (p+1));
        var statuswidth = statuscell.offsetWidth - 10;
        /*for (y in playerarr[p]["status"]) {
            var newwidth = statuswidth / playerarr[p]["status"].length
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("x","0");
            svg.setAttribute("y","0");
            svg.setAttribute("width",newwidth);
            svg.setAttribute("height",barheight);
            statuscell.appendChild(svg);
            
            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("width",newwidth);
            rect.setAttribute("height",barheight);
            rect.setAttribute("ry",barheight/4);
            rect.setAttribute("style","fill:#888888");
            svg.appendChild(rect);

            var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x",newwidth/2);
            text.setAttribute("y",barheight-5);
            text.setAttribute("text-anchor","middle");
            text.setAttribute("class","tag");
            text.innerHTML = playerarr[p]["status"][y];
            svg.appendChild(text);
        }*/
        var playerstatus = "";
        for (y in playerarr[p]["status"]) {
            playerstatus += " " + playerarr[p]["status"][y] + " ";
            // console.log(playerarr[p]["status"][y]);
        }
        statuscell.innerHTML = "<b> "+playerstatus+" </b>";
        namecell = document.getElementById("name" + roster + "player" + (p+1));
        namecell.innerHTML = playerarr[p]["name"];
    }
    document.getElementById("GAMtotal").innerHTML = formatDollars(gamtotal);
    document.getElementById("GAMspent").innerHTML = formatDollars(gamspent);
    document.getElementById("GAMremaining").innerHTML = formatDollars(gamremaining);
    document.getElementById("tradableGAM").innerHTML = formatDollars(gamremaining);

    document.getElementById("TAMtotal").innerHTML = formatDollars(tamtotal);
    document.getElementById("TAMspent").innerHTML = formatDollars(tamspent);
    document.getElementById("TAMremaining").innerHTML = formatDollars(tamremaining);

    document.getElementById("captotal").innerHTML = formatDollars(captotal);
    document.getElementById("capspent").innerHTML = formatDollars(capspent);
    document.getElementById("capremaining").innerHTML = formatDollars(capremaining);

    document.getElementById("tastotal").innerHTML = formatDollars(gamtotal+tamtotal+captotal);
    document.getElementById("tasspent").innerHTML = formatDollars(gamspent+tamspent+capspent);
    document.getElementById("tasremaining").innerHTML = formatDollars(gamremaining+tamremaining+capremaining);
}

function recursiveRowsFutures(playerarr,roster) {
    if (document.querySelectorAll("#" + roster + "futurestable td.salary").length == playerarr.length) {
        setSalaries(playerarr,roster);
    } else if (document.querySelectorAll("#" + roster + "futurestable td.salary").length > playerarr.length) {
        console.log("THERE'S MORE ROWS THAN PLAYERS");
        items = document.querySelectorAll("#" + roster + "futurestable td.salary");
        parent = items[document.querySelectorAll("#" + roster + "futurestable td.salary").length-1].parentElement;
        parent.remove();
        recursiveRowsBreakdown(playerarr,roster);
    } else if (document.querySelectorAll("#" + roster + "futurestable td.salary").length < playerarr.length) {
        console.log("THERE'S MORE PLAYERS THAN ROWS");
        table = document.getElementById(roster + "futurestable").firstElementChild;
        var row = document.createElement("tr");
        var namecell = document.createElement("td");
        namecell.setAttribute("id","futuresname" + roster + "player"+(document.querySelectorAll("#" + roster + "futurestable td.salary").length+1));
        row.appendChild(namecell);

        var statuscell = document.createElement("td");
        statuscell.setAttribute("id","futuresstatus" + roster + "player"+(document.querySelectorAll("#" + roster + "futurestable td.salary").length+1));
        statuscell.setAttribute("class","status");
        row.appendChild(statuscell);

        var salarycell = document.createElement("td");
        salarycell.setAttribute("id","futuressal" + roster + "player"+(document.querySelectorAll("#" + roster + "futurestable td.salary").length+1));
        salarycell.setAttribute("class","salary");
        row.appendChild(salarycell);

        var yearcell1 = document.createElement("td");
        yearcell1.setAttribute("id","futuresyear" + currentyear + roster + "player"+(document.querySelectorAll("#" + roster + "futurestable td.salary").length+1));
        yearcell1.setAttribute("class","years");
        row.appendChild(yearcell1);

        var yearcell2 = document.createElement("td");
        yearcell2.setAttribute("id","futuresyear" + (currentyear + 1) + roster + "player"+(document.querySelectorAll("#" + roster + "futurestable td.salary").length+1));
        yearcell2.setAttribute("class","years");
        row.appendChild(yearcell2);

        var yearcell3 = document.createElement("td");
        yearcell3.setAttribute("id","futuresyear" + (currentyear + 2) + roster + "player"+(document.querySelectorAll("#" + roster + "futurestable td.salary").length+1));
        yearcell3.setAttribute("class","years");
        row.appendChild(yearcell3);

        var yearcell4 = document.createElement("td");
        yearcell4.setAttribute("id","futuresyear" + (currentyear + 3) + roster + "player"+(document.querySelectorAll("#" + roster + "futurestable td.salary").length+1));
        yearcell4.setAttribute("class","years");
        row.appendChild(yearcell4);

        var yearcell5 = document.createElement("td");
        yearcell5.setAttribute("id","futuresyear" + (currentyear + 4) + roster + "player"+(document.querySelectorAll("#" + roster + "futurestable td.salary").length+1));
        yearcell5.setAttribute("class","years");
        row.appendChild(yearcell5);

        table.appendChild(row);
        recursiveRowsFutures(playerarr,roster);
    }
}

function setSalaries(playerarr,roster) {
    for (p = 0, plen = playerarr.length; p < plen; p++) {
        var moneysum = getBudgetCharge(playerarr[p]);
        salaryparent = document.getElementById("futuressal" + roster + "player" + (p+1));
        salaryparent.innerHTML = formatDollars(moneysum);
        statuscell = document.getElementById("futuresstatus" + roster + "player" + (p+1));
        var playerstatus = "";
        for (y in playerarr[p]["status"]) {
            playerstatus += " " + playerarr[p]["status"][y] + " ";
            // console.log(playerarr[p]["status"][y]);
        }
        statuscell.innerHTML = "<b> "+playerstatus+" </b>";
        namecell = document.getElementById("futuresname" + roster + "player" + (p+1));
        namecell.innerHTML = playerarr[p]["name"];
        for (x in playerarr[p]["base salary"]) {
            if (parseInt(x) >= 2020) {
                salarycell = document.getElementById("futuresyear" + x + roster + "player" + (p+1));
                salarycell.innerHTML = formatDollars(playerarr[p]["base salary"][x]);
                // console.log(x);
                // console.log(playerarr[p]["base salary"][x]);
            }
        }
    }
}

function getBudgetCharge(obj) {
    return obj["base salary"][currentyear] + (obj["transfer fee"] / obj["contract years"]);
}

function sumObject(obj) {
    var sum = 0;
    for (x in obj) {
        sum += obj[x];
    }
    return sum;
}

function avgObject(obj) {
    var sum = 0;
    for (x in obj) {
        sum += obj[x];
    }
    var avg = sum / Object.keys(obj).length
    return avg;
}

function interp(input,basemin,basemax,convmin,convmax) {
    output = (convmin*(basemax-input)+convmax*(input-basemin))/(basemax-basemin)
    return output;
}

function formatDollars(number) {
    var rounded = Math.round(number);
    if (rounded < 0) {
        abs = Math.abs(rounded);
        str = abs.toString();
        reverse = "";
        for (x in str) {
            if (x % 3 == 0) {
                if (x == 0) {
                    reverse += str[str.length - x - 1]
                } else {
                reverse += "," + str[str.length - x - 1]
                }
            } else {
                reverse += str[str.length - x - 1]
            }
        }
        output = "";
        for (y in reverse) {
            output += reverse[reverse.length - y - 1]
        }
        output = "-$" + output;
        return output;
    } else {
        str = rounded.toString();
        reverse = "";
        for (x in str) {
            if (x % 3 == 0) {
                if (x == 0) {
                    reverse += str[str.length - x - 1]
                } else {
                reverse += "," + str[str.length - x - 1]
                }
            } else {
                reverse += str[str.length - x - 1]
            }
        }
        output = "";
        for (y in reverse) {
            output += reverse[reverse.length - y - 1]
        }
        output = "$" + output;
        return output;
    }
}