poly_pct = 20;
oc_pct = 20;
wool_pct = 20;
silk_pct = 20;
visc_pct = 20;

function durability(a)
{
    poly_pct = parseInt(a);
    calcScores();
}

function softness(a)
{
    oc_pct = parseInt(a);
    calcScores();
}

function warmth(a)
{
    wool_pct = parseInt(a);
    calcScores();
}

function sheen(a)
{
    silk_pct = parseInt(a);
    calcScores();
}

function dryfit(a)
{
    visc_pct = parseInt(a);
    calcScores();
}

var c = 0, w = 0, e = 0, eut = 0, l = 0, tox = 0;

function updateChart()
{
    document.getElementById("container").innerHTML = "";
        // data set
        var data = [
            {x: "CO2", value: c},
            {x: "Water", value: w},
            {x: "Energy", value: e},
            {x: "Eutrophy", value: eut},
            {x: "Land", value: l},
            {x: "Toxicity", value: tox},
        ];
          
        // create and configure a pie chart
        chart1 = anychart.pie(data);
        chart1.innerRadius("90%");
    
        // create a bar chart
        chart2 = anychart.bar();
        var series = chart2.bar(data);
        series.name("MSI");
        series.labels().fontSize(5);
                      
        chart2.background().fill("none");
            
        // set bar chart as the center content of a pie chart
        var msi = c+w+e+eut+l+tox;
        msi = Math.ceil(msi)
        chart1.center().content(chart2);
        chart1.background().fill("none");

        var tot = poly_pct + oc_pct + wool_pct +  silk_pct +visc_pct
        var name = "";
        var comp = "";
        const m = new Map();
        m.set("Po", poly_pct);
        m.set("Co", oc_pct);
        m.set("Wo", wool_pct);
        m.set("Si", silk_pct);
        m.set("Vi", visc_pct);
        console.log(m);
        // sort by value
        const mapSort1 = new Map([...m.entries()].sort((a, b) => b[1] - a[1]));
        console.log(mapSort1);
        for (const [key, value] of mapSort1) 
        { // Using the default iterator (could be `map.entries()` instead)
            if (value > 0)
            {
                name += key;
                if (key == "Po")
                    comp += "Polyester: " + Math.round(poly_pct / tot * 100) + "%&nbsp";
                if (key == "Co")
                    comp += "Organic Cotton: " + Math.round(oc_pct / tot * 100) + "%&nbsp";
                if (key == "Wo")
                    comp += "Wool: " + Math.round(wool_pct / tot * 100) + "%&nbsp";
                if (key == "Si")
                    comp += "Silk: " + Math.round(silk_pct / tot * 100) + "%&nbsp";
                if (key == "Vi")
                    comp += "Viscose: " + Math.round(visc_pct / tot * 100) + "%"; 
            }
            console.log(`The value for key ${key} is ${value}`);
        }
        comp+="<br>"
     
       document.getElementById("result").innerHTML = "Your New blended material is " + name + ". <br> Its composition is "+ comp + name +"'s EcoTag: " + String(msi);
       if (msi <= 21)
            document.getElementById("result").style.color = "green";
        else if (msi < 31)
            document.getElementById("result").style.color = "orange";
        else
            document.getElementById("result").style.color = "red";
        chart1.container("container");
        chart1.draw();  
}


function calcScores()
{
    var tot = poly_pct + oc_pct + wool_pct +  silk_pct +visc_pct;
    poly_pct = poly_pct / tot * 100;
    oc_pct = oc_pct / tot * 100;
    wool_pct = wool_pct / tot * 100;
    silk_pct = silk_pct / tot * 100;
    visc_pct = visc_pct / tot * 100;
    console.log(poly_pct, oc_pct, wool_pct, silk_pct, visc_pct)
    c = oc_pct / 100 * CO2[2];
    w = oc_pct / 100 * Water[2];
    e = oc_pct / 100 * Energy[2];
    eut = oc_pct / 100 * Eut[2];
    l = oc_pct / 100 * Land[2];
    tox = oc_pct / 100 * Tox[2];

    c += poly_pct / 100 * CO2[4];
    w += poly_pct / 100 * Water[4];
    e += poly_pct / 100 * Energy[4];
    eut += poly_pct / 100 * Eut[4];
    l += poly_pct / 100 * Land[4];
    tox += poly_pct / 100 * Tox[4];

    c += visc_pct / 100 * CO2[5];
    w += visc_pct / 100 * Water[5];
    e += visc_pct / 100 * Energy[5];
    eut += visc_pct / 100 * Eut[5];
    l += visc_pct / 100 * Land[5];
    tox += visc_pct / 100 * Tox[5];

    c += wool_pct / 100 * CO2[8];
    w += wool_pct / 100 * Water[8];
    e += wool_pct / 100 * Energy[8];
    eut += wool_pct / 100 * Eut[8];
    l += wool_pct / 100 * Land[8];
    tox += wool_pct / 100 * Tox[8];

    c += silk_pct / 100 * CO2[9];
    w += silk_pct / 100 * Water[9];
    e += silk_pct / 100 * Energy[9];
    eut += silk_pct / 100 * Eut[9];
    l += silk_pct / 100 * Land[9];
    tox += silk_pct / 100 * Tox[9];
    updateChart()
}


calcScores()