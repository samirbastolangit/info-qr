const qrimg = document.getElementById("qrimgId");
const generateQr = document.getElementById("generateQr");
const urlInput = document.getElementById("urlenteredid");
const errorMsg = document.getElementById("errorMsg");
const qrbox = document.querySelector(".qrbox");

const downloadBtn = document.getElementById("downloadBtn");
const shareBtn = document.getElementById("shareBtn");

let qrGenerated = false;

// Hide error while typing
urlInput.addEventListener("input", () => {
    if (urlInput.value.trim() !== "") {
        errorMsg.style.display = "none";
    }
});

// Generate QR
generateQr.addEventListener("click", () => {

    const url = urlInput.value.trim();

    if (url === "") {
        errorMsg.style.display = "block";
        return;
    }

    errorMsg.style.display = "none";

    // Remove previous QR
    qrimg.innerHTML = "";

    new QRCode(qrimg, {
        text: url,
        width: 180,
        height: 180
    });

    qrGenerated = true;

    // Show QR section once
    qrbox.style.display = "flex";

    setTimeout(() => {
        qrbox.classList.add("show");
    }, 20);

});

// Download QR Image
downloadBtn.addEventListener("click", () => {

    if (!qrGenerated) return;

    const canvas = qrimg.querySelector("canvas");
    const image = qrimg.querySelector("img");

    let imageURL;

    if (canvas) {
        imageURL = canvas.toDataURL("image/png");
    } else if (image) {
        imageURL = image.src;
    } else {
        return;
    }

    const link = document.createElement("a");

    link.href = imageURL;
    link.download = "qr-code.png";

    link.click();

});

// Copy URL
shareBtn.addEventListener("click", async () => {

    if (!qrGenerated) return;

    try {

        await navigator.clipboard.writeText(urlInput.value.trim());

        shareBtn.innerHTML = `
            Copied ✓
        `;

        setTimeout(() => {

            shareBtn.innerHTML = `
                Share
                <img src="resources/shareicon.png" width="18">
            `;

        }, 2000);

    } catch (err) {
        alert("Failed to copy URL.");
    }

});
urlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        generateQr.click();
    }
});