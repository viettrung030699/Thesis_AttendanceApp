
async function updateResults() {
  if (!isFaceDetectionModelLoaded()) {
    return;
  }

  const inputImgEl = $("#inputImg").get(0);
  const options = getFaceDetectorOptions();

  const detections = await faceapi.detectAllFaces(inputImgEl, options);
  const faceImages = await faceapi.extractFaces(inputImgEl, detections);

  displayExtractedFaces(faceImages);
  DownloadCanvasAsImage();
}

// function displayExtractedFaces(faceImages) {
//   const canvas = $('#overlay').get(0)
//   faceapi.matchDimensions(canvas, $('#inputImg').get(0))

//   $('#facesContainer').empty()
//   faceImages.forEach(canvas => {
//     $('#facesContainer').append(canvas)
//     let dataURL = canvas.toDataURL();
//     fs.writeFileSync("face.json", dataURL);
//     console.log("-" + dataURL);
//   })
// }

function DownloadCanvasAsImage() {
  let downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", "CanvasAsImage.png");
  let canvas = document.getElementById("myCanvas");
  canvas.toBlob(function (blob) {
    let url = URL.createObjectURL(blob);
    downloadLink.setAttribute("href", url);
    downloadLink.click();
  });
}

async function run() {
  // load face detection model
  await changeFaceDetector(selectedFaceDetector);

  // start processing image
  updateResults();
}

$(document).ready(function () {
  renderNavBar("#navbar", "face_extraction");
  initImageSelectionControls();
  initFaceDetectionControls();
  run();
});
function displayExtractedFaces(faceImages) {
  const canvas = $("#overlay").get(0);
  faceapi.matchDimensions(canvas, $("#inputImg").get(0));

  $("#facesContainer").empty();
  faceImages.forEach((canvas) => {
    $("#facesContainer").append(canvas);
    let dataURL = canvas.toDataURL();
    fs.writeFileSync("face.json", dataURL);
    console.log("-" + dataURL);
  });
}
