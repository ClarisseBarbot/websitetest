

//analysis appear on click


function r1(){ document.getElementById("cartello").innerHTML = '<h5>Analyse & Abstract</h5> <p> test </p><a class="btn btn-sm btn-outline-dark rounded-pill" href="#">Plantes</a>';}
   
function r1out(){ document.getElementById("cartello").innerHTML="";}

function r2(){ document.getElementById("cartello").innerHTML="onMouseOver event ROW 2 applied";}
function r2out(){document.getElementById("cartello").innerHTML="";}

function dubois(){ document.getElementById("cartello").innerHTML='<h5 class="blog-post-meta">Dubois, Arnaud. <a class="italic">La vie chromatique des objets: une anthropologie de la couleur de l art contemporain.</a> Turnhout, Belgique: Brepols, 2019.</h5><a class="btn btn-sm btn-outline-dark rounded-pill" href="#">Plantes</a><a class="btn btn-sm btn-outline-dark rounded-pill">Teinture</a> <p> Résultat du travail de thèse d Arnaud Dubois, mené sous la direction de Béatrice Fraenkel et de Denis Vidal à l Ecole des Hautes Etudes en Sciences Sociales, l ouvrage transcrit l enquête anthropologique menée par Arnaud Dubois sur les processus qui permettent d aboutir à la “mise en couleurs” dans l art contemporain. Afin de répondre à un questionnement, fil rouge de l ensemble de l ouvrage : Qu est-ce que le système technique de la couleur contemporaine ?, A.Dubois réalise une enquête de terrain qui s articule, principalement, autour du travail de Daniel Buren pour Monumenta 2011, de l architecte Patrick Bouchain et du Graphiste Laurent Ungerer pour le Centre Pompidou Mobile. Néanmoins, l auteur développe également le travail de conservation réalisé par le Centre Pompidou pour la pièce vidéo *Art Make-up (*1974)de Bruce Nauman et réalise des entretiens-visites auprès d industriels tel que Serge Ferrari, spécialisé dans la réalisation de textiles techniques à Bourgouin-Jailleux qui réalise la bâche de l œuvre d Anish Kapoor Marsyas pour le Tate Museum en 2002.  Arnaud Dubois s inscrit dans le courant du “Material turn” en Histoire de l art, c est-à-dire qu il ne s intéresse pas à la signification de la couleur, mais cherche à “enquêter sur ses modes de matérialisation et décrire à quoi elle s agglutine et comment elle est agglutinée” (p59). En ce sens, l  auteur se positionne dans la continuité du travail de Leroi-Gourhan (L Homme et la Matière, 1971) qui réalise une anthropologie des techniques de la couleur et catégorise celle-ci comme un “agglutinant”, une matière adhérente, collante au même titre que les colles, vernis ou émaux. Le premier apport de l’ouvrage, est de réaliser un historique cultivé du processus dindustrialisation de la couleur au travers de l Atlas of color de Munsell (1915), de la structuration internationale de lindustrie colorée au travers de la création dorganisations telles que la Society of Dyers and colourists  (1884) ou en sappuyant sur le travail de Bernadette Bensaude-Vincent, qui traite de l invention moderne de la Chimie au travers de la chimie des colorants et l invention du Mauve par Henry Perkin en 1856 (Histoire de la chimie, 1992). Par ailleurs, Arnaud Dubois propose une caractérisation de la couleur contemporaine en terme de processus de matérialisation de celle-ci, daspect et dappréhension de “l efficacité technique de la couleur” telle qu elle est perçue dans le milieu industriel. </p>';}
function duboisout(){document.getElementById("cartello").innerHTML="";}

function deribere(){ document.getElementById("cartello").innerHTML='<h5 class="blog-post-meta">Déribéré, Maurice. <a class="italic"> La couleur dans les activités humaines.</a> Paris, France: Dunod, 1968.</h5><a class="btn btn-sm btn-outline-dark rounded-pill" href="#">Plantes</a><a class="btn btn-sm btn-outline-dark rounded-pill">Teinture</a> <p> texte analyse et lecture de deribere </p>';
window.scrollTo(0,0)}
function deribereout(){document.getElementById("cartello").innerHTML="";}

function r5(){ document.getElementById("cartello").innerHTML='<p class="blog-post-meta">Déribéré, Maurice. <a class="italic"> La couleur dans les activités humaines.</a> Paris, France: Dunod, 1968.</p>';}
function r5out(){document.getElementById("cartello").innerHTML="";}

//print on click
      
// Defining the myFunc function

function myFunc() {
   print = window.print();
}

//filter elements

document.addEventListener("DOMContentLoaded", function() {
    // séelction de tous les boutons pour filtrer l’affichage
    var filters = document.querySelectorAll('nav button');
    // sélection de tous les élements à filtrer
    var elements = document.querySelectorAll('.color');
  
    filters.forEach( filter => { 
      filter.onclick = (e) => {
        // modifie les liens du menu (les filtres)
        document.querySelector('nav .active').classList.remove('active');
        filter.classList.add('active');
        // on lit la catégorie du filtre
        var category = filter.dataset.category;
        // on parcourt tous les projets pour voir s’ils 
        // ont la class corrrespondant à la catégorie active
        elements.forEach( element => {
          if(element.classList.contains(category)){
            // si oui, on les affiche
            element.classList.remove('hidden');
          } else {
            // si non, on les masque
            element.classList.add('hidden');
          }
        })
      }
    });
  });


