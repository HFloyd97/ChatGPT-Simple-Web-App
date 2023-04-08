function insert(num) {
    document.getElementById('result').value += num;
}

function clearDisplay() {
    document.getElementById('result').value = "";
}

function calculate() {
    var result = eval(document.getElementById('result').value);
    document.getElementById('result').value = result;
}
