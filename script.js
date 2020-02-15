var maxbudgetcharge = 550000;
var maxtamcharge = 1500000;
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

function recursiveRows(playerarr) {
    if (document.querySelectorAll("td.breakdown").length == playerarr.length) {
        createBreakdown(playerarr);
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
    } else if (document.querySelectorAll("td.breakdown").length > playerarr.length) {
        console.log("THERE'S MORE ROWS THAN PLAYERS");
        items = document.querySelectorAll("td.breakdown");
        parent = items[document.querySelectorAll("td.breakdown").length-1].parentElement;
        parent.remove();
        recursiveRows(playerarr);
    } else if (document.querySelectorAll("td.breakdown").length < playerarr.length) {
        console.log("THERE'S MORE PLAYERS THAN ROWS");
        table = document.getElementById("maintable").firstElementChild;
        var row = document.createElement("tr");
        var namecell = document.createElement("td");
        namecell.setAttribute("id","nameplayer"+(document.querySelectorAll("td.breakdown").length+1));
        row.appendChild(namecell);

        var statuscell = document.createElement("td");
        statuscell.setAttribute("id","statusplayer"+(document.querySelectorAll("td.breakdown").length+1));
        statuscell.setAttribute("class","status");
        row.appendChild(statuscell);

        var salarycell = document.createElement("td");
        salarycell.setAttribute("id","salplayer"+(document.querySelectorAll("td.breakdown").length+1));
        salarycell.setAttribute("class","salary");
        row.appendChild(salarycell);

        var breakdowncell = document.createElement("td");
        breakdowncell.setAttribute("class","breakdown");

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("height",barheight);
        svg.setAttribute("id","player"+(document.querySelectorAll("td.breakdown").length+1))
        breakdowncell.appendChild(svg);

        row.appendChild(breakdowncell);

        table.appendChild(row);
        recursiveRows(playerarr);
    }
}

function createBreakdown(playerarr) {
    for (p = 0, plen = playerarr.length; p < plen; p++) {
        var parent = document.getElementById("player" + (p+1));
        var widthsum = interp(sumObject(playerarr[p]["breakdown"]),0,maxtamcharge,0,maxwidth);
        var moneysum = sumObject(playerarr[p]["breakdown"]);
        if (moneysum > maxtamcharge) {
            parent.setAttributeNS(null, "width", maxwidth);
        } else {
            parent.setAttributeNS(null, "width", widthsum);
        }
        width = widthsum;
        xpos = 0;
        salaryparent = document.getElementById("salplayer" + (p+1));
        salaryparent.innerHTML = formatDollars(sumObject(playerarr[p]["breakdown"]));
        for (x in playerarr[p]["breakdown"]) {
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
            hoverbox.setAttribute("width",interp(playerarr[p]["breakdown"][x],0,maxtamcharge,0,maxwidth));
            hoverbox.setAttribute("height",barheight);
            hoverbox.setAttribute("x",width-interp(playerarr[p]["breakdown"][x],0,maxtamcharge,0,maxwidth));
            hoverbox.setAttribute("class","hoverbox")
            svg.appendChild(hoverbox);
    
            width -= interp(playerarr[p]["breakdown"][x],0,maxtamcharge,0,maxwidth);
            xpos += interp(playerarr[p]["breakdown"][x],0,maxtamcharge,0,maxwidth);
    
            if (x == "GAM") {
                gamspent += playerarr[p]["breakdown"][x];
                gamremaining -= playerarr[p]["breakdown"][x];
            }
    
            if (x == "TAM") {
                tamspent += playerarr[p]["breakdown"][x];
                tamremaining -= playerarr[p]["breakdown"][x];
            }
    
            if (x == "cap") {
                capspent += playerarr[p]["breakdown"][x];
                capremaining -= playerarr[p]["breakdown"][x];
            }
        }
        statuscell = document.getElementById("statusplayer" + (p+1));
        var playerstatus = "";
        for (y in playerarr[p]["status"]) {
            playerstatus += " " + playerarr[p]["status"][y] + " ";
            // console.log(playerarr[p]["status"][y]);
        }
        statuscell.innerHTML = "<b> "+playerstatus+" </b>";
        namecell = document.getElementById("nameplayer" + (p+1));
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

const playerlist = "https://natfan9.github.io/MLSCap/playerlist.json";

getPlayerData()

function getPlayerData() {
	var originaldata = playerlist;
	var request = new XMLHttpRequest();
	request.open('GET', originaldata);
	request.responseType = 'json';
	request.send();

	request.onload = function() {
        var maindata = request.response;
        newplayers = [];
        for (x in maindata) {
            if (maindata[x]["team"]) {
                newplayers.push(maindata[x]);
            }
            // console.log(sumObject(maindata[x]["breakdown"]));
        }
        newplayers.sort(function(a,b) {
            return sumObject(b.breakdown) - sumObject(a.breakdown);
        })
        recursiveRows(newplayers);
    }
}

function sumObject(obj) {
    var sum = 0;
    for (x in obj) {
        sum += obj[x];
    }
    return sum;
}

function interp(input,basemin,basemax,convmin,convmax) {
    output = (convmin*(basemax-input)+convmax*(input-basemin))/(basemax-basemin)
    return output;
}

function formatDollars(number) {
    if (number < 0) {
        abs = Math.abs(number);
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
        str = number.toString();
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