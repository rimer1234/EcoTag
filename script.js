let current = 0;
let prev = 4;
let next = 1;

let mat1, pct1;

var c = 0, w = 0, e = 0, eut = 0, l = 0, tox = 0;

function updateCategory()
{    
	current = 0;
    prev = 4;
    next = 1;
    
    const slides = document.querySelectorAll(".item");
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        slides[i].classList.remove("prev");
        slides[i].classList.remove("next");
    }

    slides[current].classList.add("active");
    slides[prev].classList.add("prev");
    slides[next].classList.add("next");
    
    var choice = document.getElementById("clothes").value;
    if (choice == "Dresses")
    {
        document.getElementById("lnk0").href = dress_lnk[0];
        document.getElementById("lnk1").href = dress_lnk[1];
        document.getElementById("lnk2").href = dress_lnk[2];
        document.getElementById("lnk3").href = dress_lnk[3];
        document.getElementById("lnk4").href = dress_lnk[4];

        document.getElementById("img0").src = dress_img[0];
        document.getElementById("img1").src = dress_img[1];
        document.getElementById("img2").src = dress_img[2];
        document.getElementById("img3").src = dress_img[3];
        document.getElementById("img4").src = dress_img[4];
    }
    if (choice == "Tops")
    {
        document.getElementById("lnk0").href = shirts_lnk[0];
        document.getElementById("lnk1").href = shirts_lnk[1];
        document.getElementById("lnk2").href = shirts_lnk[2];
        document.getElementById("lnk3").href = shirts_lnk[3];
        document.getElementById("lnk4").href = shirts_lnk[4];

        document.getElementById("img0").src = shirts_img[0];
        document.getElementById("img1").src = shirts_img[1];
        document.getElementById("img2").src = shirts_img[2];
        document.getElementById("img3").src = shirts_img[3];
        document.getElementById("img4").src = shirts_img[4];
    }
    if (choice == "Pants")
    {
        document.getElementById("lnk0").href = pants_lnk[0];
        document.getElementById("lnk1").href = pants_lnk[1];
        document.getElementById("lnk2").href = pants_lnk[2];
        document.getElementById("lnk3").href = pants_lnk[3];
        document.getElementById("lnk4").href = pants_lnk[4];

        document.getElementById("img0").src = pants_img[0];
        document.getElementById("img1").src = pants_img[1];
        document.getElementById("img2").src = pants_img[2];
        document.getElementById("img3").src = pants_img[3];
        document.getElementById("img4").src = pants_img[4];
    }

    current = 0;
    prev = 4;
    next = 1;

    updatedesc()
}


function updatedesc()
{
    const slides = document.querySelectorAll(".item");
    var id_num = parseInt(slides[current].id);
    var choice = document.getElementById("clothes").value;
    if (choice == "Dresses")
        document.getElementById("name").innerHTML = dress_name[id_num];
    if (choice == "Tops")
        document.getElementById("name").innerHTML = shirts_name[id_num];
    if (choice == "Pants")
        document.getElementById("name").innerHTML = pants_name[id_num];

    document.getElementById("dress_mat").innerHTML = ""; 
    document.getElementById("dress_mat2").innerHTML = ""; 
    
    if (choice == "Dresses")
    {
        pct1 = dress_pct1[id_num] ; 
        mat1 = dress_mat1[id_num]; 
        pct2 = 0; 
        mat2 = ""; 
        document.getElementById("dress_mat").innerHTML = dress_pct1[id_num] + "%" + " " +dress_mat1[id_num]; 
        document.getElementById("dress_mat2").innerHTML = ""; 
    }
    if (choice == "Tops")
    {
        pct1 = shirts_pct1[id_num] ; 
        mat1 = shirts_mat1[id_num]; 
        pct2 = shirts_pct2[id_num] ; 
        mat2 = shirts_mat2[id_num]; 
        document.getElementById("dress_mat").innerHTML = shirts_pct1[id_num] + "%" + " " +shirts_mat1[id_num]; 
        if (shirts_mat2[id_num] != "")
            document.getElementById("dress_mat2").innerHTML = shirts_pct2[id_num] + "%" + " " + shirts_mat2[id_num]; 
    }
    if (choice == "Pants")
    {
        pct1 = pants_pct1[id_num] ; 
        mat1 = pants_mat1[id_num]; 
        pct2 = pants_pct2[id_num] ; 
        mat2 = pants_mat2[id_num]; 
        document.getElementById("dress_mat").innerHTML = pants_pct1[id_num] + "%" + " " +pants_mat1[id_num]; 
        if (pants_mat2[id_num] != "")
            document.getElementById("dress_mat2").innerHTML = pants_pct2[id_num] + "%" + " " + pants_mat2[id_num]; 
    }
    calcScores() 
}

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
        chart1.title("Outfit EcoTag Composition");
        
        document.getElementById("result").innerHTML = String(msi);
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
    for (i = 0; i < Fabric.length; i++)
    {
        if (mat1 == Fabric[i])
        {
            c = pct1 / 100 * CO2[i];
            w = pct1 / 100 * Water[i];
            e = pct1 / 100 * Energy[i];
            eut = pct1 / 100 * Eut[i];
            l = pct1 / 100 * Land[i];
            tox = pct1 / 100 * Tox[i];
            break;
        }
    }

    for (i = 0; i < Fabric.length; i++)
    {
        if (mat2 == Fabric[i] && pct2 != 0.0)
        {
            c += pct2 / 100 * CO2[i];
            w += pct2 / 100 * Water[i];
            e += pct2 / 100 * Energy[i];
            eut += pct2 / 100 * Eut[i];
            l += pct2 / 100 * Land[i];
            tox += pct2 / 100 * Tox[i];
            break;
        }
    }

    console.log("land: "+l);
    console.log("tox: "+tox);
    updateChart();
}

function pageload()
{
    const slider = document.querySelector(".items");
    const slides = document.querySelectorAll(".item");
    const button = document.querySelectorAll(".button");

    for (let i = 0; i < button.length; i++) 
        button[i].addEventListener("click", () => i == 0 ? gotoPrev() : gotoNext());
    

    const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);

    const gotoNext = () => current < 4 ? gotoNum(current + 1) : gotoNum(0);

    const gotoNum = number => {
        current = number;
        prev = current - 1;
        next = current + 1;

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
            slides[i].classList.remove("prev");
            slides[i].classList.remove("next");
        }

        if (next == 5) {
            next = 0;
        }

        if (prev == -1) {
            prev = 4;
        }

        slides[current].classList.add("active");
        slides[prev].classList.add("prev");
        slides[next].classList.add("next");

        updatedesc(); 
    }
}

function add()
{
    const slides = document.querySelectorAll(".item");
    var id_num = parseInt(slides[current].id);
    var choice = document.getElementById("clothes").value;
    
    if (localStorage['w_img'])
        w_img = JSON.parse(localStorage.getItem('w_img'));
    if (localStorage['w_name'])
        w_name = JSON.parse(localStorage.getItem('w_name'));
    if (localStorage['w_c'])
        w_c = JSON.parse(localStorage.getItem('w_c'));
    if (localStorage['w_e'])
        w_e = JSON.parse(localStorage.getItem('w_e'));
    if (localStorage['w_eut'])
        w_eut = JSON.parse(localStorage.getItem('w_eut'));
    if (localStorage['w_w'])
        w_w = JSON.parse(localStorage.getItem('w_w'));
    if (localStorage['w_tox'])
         w_tox = JSON.parse(localStorage.getItem('w_tox'));
    if (localStorage['w_l'])
         w_l = JSON.parse(localStorage.getItem('w_l'));


    if (w_img != null)
        w_idx = w_img.length;
    if (choice == "Dresses")
    {
        w_img[w_idx] =  dress_img[id_num];
        w_name[w_idx]  = dress_name[id_num];
    }
    else if (choice == "Tops")
    {
        w_img[w_idx] =  shirts_img[id_num];
        w_name[w_idx]  = shirts_name[id_num];
    }
    else if (choice = "Pants")
    {
        w_img[w_idx] =  pants_img[id_num];
        w_name[w_idx]  = pants_name[id_num];
    }
       
    w_c[w_idx]  = c;
    w_e[w_idx]  = e;
    w_eut[w_idx] = eut;
    w_l[w_idx] = l;
    w_tox[w_idx] =tox;
    w_w[w_idx] = w;
    
    localStorage.setItem('w_img', JSON.stringify(w_img));
    localStorage.setItem('w_name', JSON.stringify(w_name));
    localStorage.setItem('w_c', JSON.stringify(w_c));
    localStorage.setItem('w_e', JSON.stringify(w_e));
    localStorage.setItem('w_eut', JSON.stringify(w_eut));
    localStorage.setItem('w_w', JSON.stringify(w_w));
    localStorage.setItem('w_l', JSON.stringify(w_l));
    localStorage.setItem('w_tox', JSON.stringify(w_tox));
    console.log("Land: " + w_l[w_idx]);
    console.log("Tox: " + w_tox[w_idx]);
}

function updatelocalstorage()
{
    if (localStorage['w_img'])
        w_img = JSON.parse(localStorage.getItem('w_img'));
    if (localStorage['w_name'])
        w_name = JSON.parse(localStorage.getItem('w_name'));
    if (localStorage['w_c'])
        w_c = JSON.parse(localStorage.getItem('w_c'));
    if (localStorage['w_e'])
        w_e = JSON.parse(localStorage.getItem('w_e'));
    if (localStorage['w_eut'])
        w_eut = JSON.parse(localStorage.getItem('w_eut'));
    if (localStorage['w_w'])
        w_w = JSON.parse(localStorage.getItem('w_w'));
    if (localStorage['w_l'])
        w_l = JSON.parse(localStorage.getItem('w_l'));
    if (localStorage['w_tox'])
        w_tox = JSON.parse(localStorage.getItem('w_tox'));

    if (w_img == null)
    {
        alert("here")
        localStorage.setItem('w_img', JSON.stringify(w_img));
        localStorage.setItem('w_name', JSON.stringify(w_name));
        localStorage.setItem('w_c', JSON.stringify(w_c));
        localStorage.setItem('w_e', JSON.stringify(w_e));
        localStorage.setItem('w_eut', JSON.stringify(w_eut));
        localStorage.setItem('w_w', JSON.stringify(w_w));
        localStorage.setItem('w_l', JSON.stringify(w_l));
        localStorage.setItem('w_tox', JSON.stringify(w_tox));
    }

    console.log("Hello");
    console.log("Landuse: " + w_l[w_idx]);
    console.log("Toxuse: " + w_tox[w_idx]);
}

document.getElementById("clothes").value = "Dresses";
updatelocalstorage();
updateCategory();
pageload();
updatedesc();