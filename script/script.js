const lowercaseChars = "qwertyuiopasdfghjklzxcvbnm";
const uppercaseChars = "QWERTYUIOPASDFGHJKLZXCVBNM";
const symbolChars = "`~!@#$%^&*()_+{};:,<.>";
const numberChars = "1234567890";
let tries = 0

function generatePassword() {
    let useNumber = document.getElementById("number");
    let useSymbol = document.getElementById("symbol");
    let useUppercase = document.getElementById("uppercase");
    let useLowercase = document.getElementById("lowercase");
    let length = parseInt(document.getElementById("length").value);

    let allowedChars = "";
    let password = "";

    if (useNumber.checked) allowedChars += numberChars;
    if (useSymbol.checked) allowedChars += symbolChars;
    if (useUppercase.checked) allowedChars += uppercaseChars;
    if (useLowercase.checked) allowedChars += lowercaseChars;

    for (let i = 0; i < length; i++) {
        let random = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[random];
    }

    if (allowedChars.length === 0 || length == 0){
        return "Invalid Input"
    }
    else{
        return password
    }
}

function generate(){
    let history = document.getElementById("history")
    if (generatePassword() != "Invalid Input"){
        let result = document.getElementById("result")
        result.value = generatePassword()

        result.classList.add('bump');
    
            // Remove the class after the animation is done to allow re-triggering
            setTimeout(() => {
                result.classList.remove('bump');
            }, 150); // Match the duration of the animation in CSS (0.3s)

        tries ++
        history.value += "\n" + `${tries}) ` + result.value + "\n"
        history.scrollTop = history.scrollHeight;
        console.log(`From Generate: ${document.getElementById("result").value}`);

        document.getElementById("copy").style.display = "inline"
    }
    else{
        let result = document.getElementById("result")
        result.value = generatePassword()
        result.classList.add('shake');
        document.getElementById("copy").style.display = "none"
        

        setTimeout(() => {
            result.classList.remove('shake');
        }, 300); 
    }
    
}
function clearHistory(){
    let history = document.getElementById("history")
    history.value = ""
    tries = 0
    console.clear()
    console.log("clearHistory called.")
}

function copyToClipboard() {
    let result = document.getElementById("result")
    
    // Select the text in the textbox
    result.select();
    result.setSelectionRange(0, 99999); // For mobile devices
    
    // Copy the text to clipboard
    try {
        document.execCommand('copy');
        alert(`Text Copied: ${result.value}`);
    } catch (err) {
        alert('Failed to copy text.');
    }
}
