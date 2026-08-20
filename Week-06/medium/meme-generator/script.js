const canvas = document.getElementById("meme-canvas");
const ctx = canvas.getContext("2d");

const templateSelect = document.getElementById("template-select");
const topTextInput = document.getElementById("top-text-input");
const bottomTextInput = document.getElementById("bottom-text-input");
const colorInput = document.getElementById("color-input");
const downloadBtn = document.getElementById("download-btn");

let currentImage = null;

function loadTemplate(url) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    currentImage = img;
    draw();
  };
  img.src = url;
}

function draw() {
  if (!currentImage) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);

  ctx.font = "bold 40px Impact";
  ctx.textAlign = "center";
  ctx.fillStyle = colorInput.value;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  const topText = topTextInput.value.toUpperCase();
  const bottomText = bottomTextInput.value.toUpperCase();

  ctx.strokeText(topText, canvas.width / 2, 50);
  ctx.fillText(topText, canvas.width / 2, 50);

  ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
  ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
}

templateSelect.addEventListener("change", () => loadTemplate(templateSelect.value));
topTextInput.addEventListener("input", draw);
bottomTextInput.addEventListener("input", draw);
colorInput.addEventListener("input", draw);

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

loadTemplate(templateSelect.value);
