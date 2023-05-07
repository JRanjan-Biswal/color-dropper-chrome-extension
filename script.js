let input = document.getElementsByClassName('input')[0];
let hex = document.getElementsByClassName('hex')[0];
let rgb = document.getElementsByClassName('rgb')[0];
let button = document.getElementById('button');


console.log('testeing js', input.value)
button.addEventListener('click', () => sampleColorFromScreen());

input.addEventListener('change', (e) => {
    let color = input.value;
    hex.innerHTML = color;
    rgb.innerHTML = HexToRgbA(color);

    // rgb.style.color = color;
    // hex.style.color = color;
})

async function sampleColorFromScreen(abortController) {
    const eyeDropper = new EyeDropper();

    eyeDropper.open().then((result) => {
        let colorFromDropper = result.sRGBHex;
        let rgbToHex = RGBToHex(colorFromDropper);
        rgb.textContent = colorFromDropper;
        hex.innerHTML = rgbToHex;
        input.value = rgbToHex;

        // rgb.style.color = rgbToHex;
        // hex.style.color = rgbToHex;
    }).catch((e) => {
        let { action } = chrome.runtime.getManifest();
        hex.textContent = input.value
    });
}

function HexToRgbA(hex, a) {

    var r = parseInt(hex.substring(1, 3), 16),

        g = parseInt(hex.substring(3, 5), 16),

        b = parseInt(hex.substring(5, 7), 16);

    return "rgba(" + r + ", " + g + ", "
        + b + ")";
}

function RGBToHex(rgb) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}
