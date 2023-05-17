// Locate the 3 checkbox
const tube = document.querySelector('#tube');
const bulb = document.querySelector('#bulb');
const socket = document.querySelector('#socket');

// Add event Listener to the 3 checkbox
tube.addEventListener('change', toggleStatus);
bulb.addEventListener('change', toggleStatus);
socket.addEventListener('change', toggleStatus);

async function sendRequestToServer(url) {
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function toggleStatus(e) {
  let sourceElementName = e.target.name;
  let url = '/toggle/' + sourceElementName + '?status=';
  if (e.target.checked) {
    url += 'true';
  } else {
    url += 'false';
  }
  console.log("Sending to " + url);

  let response = await sendRequestToServer(url);

  console.log(response);
}

const slider = document.querySelector("#dim-value-slider");
const output = document.querySelector("#dim-value");
// Add event on range change
slider.addEventListener('input', updateDimmerValue);

async function updateDimmerValue(e) {
  //send request
  let url = '/dimmer/change' + '?value=' + slider.value;
  console.log("Sending to " + url);

  let response = await sendRequestToServer(url);

  console.log(response);

  //update dimmer value
  output.innerHTML = slider.value;
}


var colorhex = "#FF0000";
var color = "#FF0000";
var colorObj = w3color(color);
function mouseOverColor(hex) {
    document.getElementById("divpreview").style.visibility = "visible";
    document.getElementById("divpreview").style.backgroundColor = hex;
    document.body.style.cursor = "pointer";
}
function mouseOutMap() {
    if (hh == 0) {
        document.getElementById("divpreview").style.visibility = "hidden";
    } else {
      hh = 0;
    }
    document.getElementById("divpreview").style.backgroundColor = colorObj.toHexString();
    document.body.style.cursor = "";
}
var hh = 0;
function clickColor(hex, seltop, selleft, html5) {
    var c, cObj, colormap, areas, i, areacolor, cc;
    if (html5 && html5 == 5)  {
        c = document.getElementById("html5colorpicker").value;
    } else {
        if (hex == 0)  {
            c = document.getElementById("entercolor").value;
            c = c.replace(/;/g, ","); //replace any semicolon with a comma
        } else {
            c = hex;
        }
    }
    cObj = w3color(c);
    colorhex = cObj.toHexString();
    if (cObj.valid) {
        clearWrongInput();
    } else {
        wrongInput();
        return;
    }
    r = cObj.red;
    g = cObj.green;
    b = cObj.blue;
    document.getElementById("colornamDIV").innerHTML = (cObj.toName() || "");
    document.getElementById("colorhexDIV").innerHTML = cObj.toHexString();
    document.getElementById("colorrgbDIV").innerHTML = cObj.toRgbString();
    document.getElementById("colorhslDIV").innerHTML = cObj.toHslString();    
    if ((!seltop || seltop == -1) && (!selleft || selleft == -1)) {
        colormap = document.getElementById("colormap");
        areas = colormap.getElementsByTagName("AREA");
        for (i = 0; i < areas.length; i++) {
            areacolor = areas[i].getAttribute("onmouseover").replace('mouseOverColor("', '');
            areacolor = areacolor.replace('")', '');
            if (areacolor.toLowerCase() == colorhex) {
                cc = areas[i].getAttribute("onclick").replace(')', '').split(",");
                seltop = Number(cc[1]);
                selleft = Number(cc[2]);
            }
        }
    }
    if ((seltop+200)>-1 && selleft>-1) {
        document.getElementById("selectedhexagon").style.top=seltop + "px";
        document.getElementById("selectedhexagon").style.left=selleft + "px";
        document.getElementById("selectedhexagon").style.visibility="visible";
  } else {
        document.getElementById("divpreview").style.backgroundColor = cObj.toHexString();
        document.getElementById("selectedhexagon").style.visibility = "hidden";
  }
    document.getElementById("selectedcolor").style.backgroundColor = cObj.toHexString();
    document.getElementById("html5colorpicker").value = cObj.toHexString();  
  document.getElementById('slideRed').value = r;
  document.getElementById('slideGreen').value = g;
  document.getElementById('slideBlue').value = b;
  changeRed(r);changeGreen(g);changeBlue(b);
  changeColor();
  document.getElementById("fixed").style.backgroundColor = cObj.toHexString();
}
function wrongInput() {
    document.getElementById("entercolorDIV").className = "has-error";
    document.getElementById("wronginputDIV").style.display = "block";
}
function clearWrongInput() {
    document.getElementById("entercolorDIV").className = "";
    document.getElementById("wronginputDIV").style.display = "none";
}
function changeRed(value) {
    document.getElementById('valRed').innerHTML = value;
    changeAll();
}
function changeGreen(value) {
    document.getElementById('valGreen').innerHTML = value;
    changeAll();
}
function changeBlue(value) {
    document.getElementById('valBlue').innerHTML = value;
    changeAll();
}
function changeAll() {
    var r = document.getElementById('valRed').innerHTML;
    var g = document.getElementById('valGreen').innerHTML;
    var b = document.getElementById('valBlue').innerHTML;
    document.getElementById('change').style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    document.getElementById('changetxt').innerHTML = "rgb(" + r + ", " + g + ", " + b + ")";
    document.getElementById('changetxthex').innerHTML = w3color("rgb(" + r + "," + g + "," + b + ")").toHexString();
}