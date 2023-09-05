const url = 'http://185.20.226.74:8001'

const showNumber = document.getElementById('showNumber');
const favDialog = document.getElementById('favDialog');
const number = document.getElementById('number');

showNumber.addEventListener('click', () => {
    number.innerText = Math.floor(Math.random() * 1000);

    favDialog.showModal();
});

function createAnchor(url) {
    const a = document.createElement('a');

    // Create the text node for anchor element.
    const link = document.createTextNode("ссылка на изображение");

    // Append the text node to anchor element.
    a.appendChild(link);

    // Set the title.
    a.title = "This is Link";

    // Set the href property.
    a.href = url;
    number.replaceChildren();
    number.appendChild(a)
    favDialog.showModal();
}

const source = document.querySelector("body");

source.addEventListener("copy", (event) => {
    const selection = document.getSelection();
    event.clipboardData.setData("text/plain", selection.toString().toUpperCase());
    const text = selection.toString()
    const data = { discription: text, prompt: "" };
    postJSON(data);
    event.preventDefault();
});


async function postJSON(data) {
    try {
        const response = await fetch(url, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        createAnchor(result["image_url"]) 
        console.log("Success:", result);

    } catch (error) {
        console.error("Error:", error);
    }
}


