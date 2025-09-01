let img; // Image chargée
let pixelSize = 10; // Taille des pixels pour l'affichage
let threshold = 128; // Seuil pour convertir en noir ou blanc
let imgWidthAdjusted; // Largeur ajustée de l'image
let imgHeightAdjusted; // Hauteur ajustée de l'image
let imgOriginalWidth, imgOriginalHeight; // Dimensions originales de l'image
let heightSlider; // Curseur pour ajuster la hauteur de l'image
let columnCountText; // Texte affichant le nombre de colonnes
let rowCountText; // Texte affichant le nombre de lignes
let stretchText; // Texte affichant le facteur d'étirement
let showGrid = false; // Variable pour afficher ou masquer la grille
let showNumbers = false; // Variable pour afficher ou masquer les numéros

function setup() {
  createCanvas(windowWidth, windowHeight * 2.5); // Canvas plus haut pour scroller
  noLoop();

  // Bouton pour importer une image
  const fileInput = createFileInput(handleFile);
  fileInput.position(10, 10);

  // Slider pour ajuster la taille des pixels
  createP("Taille des points").position(10, 40);
  const pixelSlider = createSlider(5, 50, pixelSize, 1);
  pixelSlider.position(10, 70);
  pixelSlider.input(() => {
    pixelSize = pixelSlider.value();
    updateColumnCount(); // Mise à jour du nombre de colonnes
    updateRowCount(); // Mise à jour du nombre de lignes
    redraw();
  });

  // Slider pour ajuster la hauteur de l'image
  createP("Ajuster la hauteur").position(10, 100);
  heightSlider = createSlider(100, 140, 100, 1); // Min: 100%, Max: 140%
  heightSlider.position(10, 130);
  heightSlider.input(() => {
    updateImageHeight(); // Mise à jour de la hauteur de l'image
    updateRowCount(); // Mise à jour du nombre de lignes
    updateStretchText(); // Mise à jour du facteur d'étirement
    redraw();
  });

  // Affichage du nombre de colonnes, lignes et facteur d'étirement
  columnCountText = createP("Colonnes : ").position(10, 160);
  rowCountText = createP("Lignes : ").position(10, 180);
  stretchText = createP("Étirement : x1").position(10, 200);

  // Curseur pour ajuster le seuil
  createP("Seuil").position(10, 230);
  const thresholdSlider = createSlider(0, 255, threshold, 1);
  thresholdSlider.position(10, 260);
  thresholdSlider.input(() => {
    threshold = thresholdSlider.value();
    redraw();
  });

  // Bouton pour afficher/masquer la grille
  const gridButton = createButton("Afficher/Masquer la grille");
  gridButton.position(10, 290);
  gridButton.mousePressed(() => {
    showGrid = !showGrid;
    redraw();
  });

  // Bouton pour afficher/masquer la numérotation
  const numberingButton = createButton("Numéroter");
  numberingButton.position(10, 320);
  numberingButton.mousePressed(() => {
    showNumbers = !showNumbers;
    redraw();
  });

  // Bouton pour télécharger l'image normale
  const downloadButton = createButton("Télécharger l'image pixelisée");
  downloadButton.position(10, 350);
  downloadButton.mousePressed(downloadPixelArt);

  // Bouton pour télécharger l'image affichée (avec grille/numérotation si activées)
  const downloadDisplayedButton = createButton("Télécharger l'image affichée");
  downloadDisplayedButton.position(10, 380);
  downloadDisplayedButton.mousePressed(downloadDisplayedImage);
}

function draw() {
  background(255);

  if (img) {
    // Ajuster l'image pour qu'elle s'adapte sans déformation
    const widthRatio = (width * 0.75) / imgOriginalWidth;
    const heightRatio = (height * 0.75) / imgOriginalHeight;
    const scaleFactor = min(widthRatio, heightRatio);

    imgWidthAdjusted = imgOriginalWidth * scaleFactor;
    imgHeightAdjusted = imgOriginalHeight * scaleFactor * (heightSlider.value() / 100);

    // Positionnement centré de l'image
    let imgX = (width - imgWidthAdjusted) / 2; // Centrage horizontal
    let imgY = 50; // Décalage de 50 pixels depuis le haut

    img.resize(imgWidthAdjusted, imgHeightAdjusted); // Redimensionnement de l'image
    img.loadPixels();

    for (let y = 0; y < img.height; y += pixelSize) {
      for (let x = 0; x < img.width; x += pixelSize) {
        const index = (x + y * img.width) * 4;
        const r = img.pixels[index];
        const g = img.pixels[index + 1];
        const b = img.pixels[index + 2];

        // Convertir en niveaux de gris
        const gray = (r + g + b) / 3;

        // Décider de la couleur bicolore (noir ou blanc)
        const fillColor = gray > threshold ? 255 : 0;

        fill(fillColor);
        noStroke();
        rect(imgX + x, imgY + y, pixelSize, pixelSize);
      }
    }

    // Affichage de la grille si activée
    if (showGrid) {
      stroke(200);
      for (let y = 0; y < img.height; y += pixelSize) {
        for (let x = 0; x < img.width; x += pixelSize) {
          noFill();
          rect(imgX + x, imgY + y, pixelSize, pixelSize);
        }
      }

      // Si les numéros sont activés, les dessiner
      if (showNumbers) {
        fill(0);
        textSize(pixelSize / 2);
        textAlign(CENTER, CENTER);

        // Numérotation des colonnes en haut et en bas
        for (let x = 0; x < img.width; x += pixelSize) {
          const colNumber = Math.floor(x / pixelSize) + 1;
          text(colNumber, imgX + x + pixelSize / 2, imgY - pixelSize / 2); // En haut
          text(colNumber, imgX + x + pixelSize / 2, imgY + img.height + pixelSize / 2); // En bas
        }

        // Numérotation des lignes à gauche et à droite
        for (let y = 0; y < img.height; y += pixelSize) {
          const rowNumberLeft = Math.floor((img.height - y) / pixelSize);
          const rowNumberRight = rowNumberLeft * 2 + 66;

          text(rowNumberLeft, imgX - pixelSize / 2, imgY + y + pixelSize / 2); // À gauche
          text(rowNumberRight, imgX + img.width + pixelSize / 2, imgY + y + pixelSize / 2); // À droite
        }
      }
    }
  }
}

// Fonction pour gérer le chargement de fichiers
function handleFile(file) {
  if (file.type === 'image') {
    img = loadImage(file.data, () => {
      imgOriginalWidth = img.width;
      imgOriginalHeight = img.height;
      updateImageHeight(); // Initialiser la hauteur ajustée
      updateColumnCount(); // Initialiser le nombre de colonnes
      updateRowCount(); // Initialiser le nombre de lignes
      redraw();
    });
  } else {
    console.error("Veuillez importer une image.");
  }
}

// Mise à jour de la hauteur de l'image en fonction du curseur
function updateImageHeight() {
  if (img) {
    imgHeightAdjusted = (imgOriginalHeight * heightSlider.value()) / 100;
  }
}

// Mise à jour du nombre de colonnes
function updateColumnCount() {
  if (img) {
    const columns = Math.floor(imgWidthAdjusted / pixelSize);
    columnCountText.html("Colonnes : " + columns);
  }
}

// Mise à jour du nombre de lignes
function updateRowCount() {
  if (img) {
    const rows = Math.floor(imgHeightAdjusted / pixelSize);
    rowCountText.html("Lignes : " + rows);
  }
}

// Mise à jour du facteur d'étirement
function updateStretchText() {
  const stretchFactor = heightSlider.value() / 100;
  stretchText.html("Étirement : x" + stretchFactor.toFixed(1));
}

// Fonction pour télécharger l'image pixelisée
function downloadPixelArt() {
  if (!img) return;

  const pixelCanvas = createGraphics(img.width / pixelSize, img.height / pixelSize);
  pixelCanvas.background(255);

  img.loadPixels();
  pixelCanvas.noStroke();

  for (let y = 0; y < img.height; y += pixelSize) {
    for (let x = 0; x < img.width; x += pixelSize) {
      const index = (x + y * img.width) * 4;
      const r = img.pixels[index];
      const g = img.pixels[index + 1];
      const b = img.pixels[index + 2];

      const gray = (r + g + b) / 3;
      const fillColor = gray > threshold ? 255 : 0;

      pixelCanvas.fill(fillColor);
      pixelCanvas.rect(x / pixelSize, y / pixelSize, 1, 1);
    }
  }

  save(pixelCanvas, "pixel_art.png");
}

// Fonction pour télécharger l'image affichée
function downloadDisplayedImage() {
  if (!img) return;

  const margin = 50; // Marge autour de l'image
  const outputWidth = imgWidthAdjusted + margin * 2;
  const outputHeight = imgHeightAdjusted + margin * 2;

  const outputCanvas = createGraphics(outputWidth, outputHeight);
  outputCanvas.background(255);
  outputCanvas.translate(margin, margin);

  // Redessiner l'image pixelisée
  img.loadPixels();
  for (let y = 0; y < img.height; y += pixelSize) {
    for (let x = 0; x < img.width; x += pixelSize) {
      const index = (x + y * img.width) * 4;
      const r = img.pixels[index];
      const g = img.pixels[index + 1];
      const b = img.pixels[index + 2];

      const gray = (r + g + b) / 3;
      const fillColor = gray > threshold ? 255 : 0;

      outputCanvas.fill(fillColor);
      outputCanvas.noStroke();
      outputCanvas.rect(x, y, pixelSize, pixelSize);
    }
  }

  // Dessiner la grille et les numéros si activés
  if (showGrid) {
    outputCanvas.stroke(200);
    for (let y = 0; y < img.height; y += pixelSize) {
      for (let x = 0; x < img.width; x += pixelSize) {
        outputCanvas.noFill();
        outputCanvas.rect(x, y, pixelSize, pixelSize);
      }
    }

    if (showNumbers) {
      outputCanvas.fill(0);
      outputCanvas.textSize(pixelSize / 2);
      outputCanvas.textAlign(CENTER, CENTER);

      // Numérotation des colonnes en haut et en bas
      for (let x = 0; x < img.width; x += pixelSize) {
        const colNumber = Math.floor(x / pixelSize) + 1;
        outputCanvas.text(colNumber, x + pixelSize / 2, -pixelSize / 2); // En haut
        outputCanvas.text(colNumber, x + pixelSize / 2, img.height + pixelSize / 2); // En bas
      }

      // Numérotation des lignes à gauche et à droite
      for (let y = 0; y < img.height; y += pixelSize) {
        const rowNumberLeft = Math.floor((img.height - y) / pixelSize);
        const rowNumberRight = rowNumberLeft * 2 + 66;

        outputCanvas.text(rowNumberLeft, -pixelSize / 2, y + pixelSize / 2); // À gauche
        outputCanvas.text(rowNumberRight, img.width + pixelSize / 2, y + pixelSize / 2); // À droite
      }
    }
  }

  save(outputCanvas, "image_affichee.png");
}


