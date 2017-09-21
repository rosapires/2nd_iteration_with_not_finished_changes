let main = document.querySelector("main");
let article = document.querySelector("article");
const colors = ['#F9DBBD', '#FCA17D', '#DA627D', '#9A348E', 'lightgrey'];

let LENGHT = 0;
let animationOccurance = 0;

// new FetchGoogleJSON("1_EHOt_PDayCeNhF_nRSLVdsNSXhv2Gbp90Dr0vhvZ_U", show);

function generateContent(json) {
  console.log(json);
  const sections = Object.keys(json);
  LENGHT = sections.length;
  
  sections.forEach((section, i) => {
    let template = document.querySelector(".section-template").content;
    let clone = template.cloneNode(true);
    
    const sectionData = json[section];
    clone.querySelector('.section-name span').textContent = sectionData.title;
    clone.querySelector('.mainIcons').src = sectionData.image;
    
    const sectionElement = clone.querySelector('.box');
    sectionElement.style.backgroundColor = colors[i];
    sectionElement.setAttribute('id', 'h' + i)
    sectionElement.addEventListener('click', () => show(i));
    main.appendChild(clone);
    generateSubcategory(clone, sectionData);
  });
  
  createSectionOne(json);
  createSectionTwo(json);
  listenforClose();
}

function createSectionOne(json){
  /*clone.querySelector('.table').src = sectionData.table;
    clone.querySelector('.table').classList.add("hidden");
    clone.querySelector('.intro').textContent = sectionData.intro;
    clone.querySelector('.intro').classList.add("hidden");
    */  
}
function createSectionTwo(data){
  let daddy = document.querySelector('section#h1');
  console.log(data)
  let template = document.querySelector('.sectiontwo').content;
  let clone = template.cloneNode(true);
  clone.querySelector('h2').textContent=data.FirstYear.subcategory.titleSub;
  clone.querySelector('.table').src = data.FirstYear.table;
  clone.querySelector('.subone').textContent=data.FirstYear.portev.name;
  clone.querySelector('.subtwo').textContent=data.FirstYear.firstexam.name;
  clone.querySelector('.suboneDes').textContent=data.FirstYear.portev.description;
  clone.querySelector('.subtwoDes').textContent=data.FirstYear.firstexam.description;
  daddy.appendChild(clone)
}

function generateSubcategory(clone, data) {
    const subsections = Object.keys(data.subcategory);
    
  subsections.forEach((subsection, i) => {
    const template = document.querySelector(".subsection-template").content;
    const subClone = template.cloneNode(true);
    console.log(subClone)
    const subsectionData = data.subcategory[subsection];
    console.log(data)
    const subElements = Object.keys(subsectionData);
    let lastOverlay;
    let modalContent = "";
    
    subElements.forEach(element => {
      if (element === 'title') {
        modalContent += `<h3>${subsectionData[element]}</h3>`;

      } else if (typeof subsectionData[element] === "object" && subsectionData[element].length) {
        let list = '<ul>' + element;
        subsectionData[element].forEach(el => {
          list += `<li>${el}</li>`;
        });
        list += "</ul>"
        modalContent += list;
      } else {
        modalContent += `<p>${subsectionData[element]}</p>`;
      }
    });

    const container = subClone.querySelector('div');

    container.innerHTML = `<h3>${subsectionData.title}</h3>`;

    container.addEventListener('click', function (e) {
      showModal(modalContent);
    })
    document.querySelector(".subsection-template").appendChild(subClone);
    
  });
  // removeM();
}


// function removeM() {
//   document.querySelector(".section-content>.modal").classList.remove(".modal");
// }

function showModal(content) {
  const modal = document.querySelector('.modalNew ');
  modal.innerHTML = content;
  document.querySelector('.modal-wrapper').classList.add('show');
}

function closeModal() {
  document.querySelector('.modal-wrapper').classList.remove('show');

}

// let mainIcons = document.querySelectorAll('.mainIcons');

function show(i) {
  console.log("show called")
  const mainSection = document.querySelector('#h' + i);
  document.querySelectorAll('.visible').forEach(element => {
    element.classList.remove('visible');
    element.classList.remove('expanded');
  });
  mainSection.classList.add('visible');
  mainSection.classList.add('expanded');
  let mainIcons = document.querySelectorAll('.mainIcons');
  let tables = document.querySelectorAll('.table');
  // document.querySelector('.intro').classList.remove("hidden");
  mainIcons.forEach((mi) => {
    mi.classList.add("hidden");
  });
  tables.forEach((ti) => {
    ti.classList.remove("hidden");
  });
  handleArrows('h' + i);
}

function next() {
  if (Date.now() - animationOccurance < 900)
    return;
  animationOccurance = Date.now();
  const currentSection = document.querySelector('.visible');
  const nextElementId = currentSection.id[1] * 1 === LENGHT - 1 ? 'h0' : 'h' + (currentSection.id[1] * 1 + 1);
  const nextElement = document.querySelector('#' + nextElementId);
  currentSection.classList.remove('visible');
  currentSection.classList.remove('expanded');
  nextElement.classList.add('visible');
  nextElement.classList.add('expanded');
  handleArrows(nextElementId);
}

function prev() {
  if (Date.now() - animationOccurance < 900)
    return;
  animationOccurance = Date.now();
  const currentSection = document.querySelector('.visible');
  const nextElementId = currentSection.id[1] * 1 === 0 ? 'h' + (LENGHT - 1) : 'h' + (currentSection.id[1] * 1 - 1);
  const nextElement = document.querySelector('#' + nextElementId);
  currentSection.classList.remove('visible');
  currentSection.classList.remove('expanded');
  nextElement.classList.add('visible');
  nextElement.classList.add('expanded');
  handleArrows(nextElementId);
}

function listenforClose() {
  let closeImgs = document.querySelectorAll('.close');
  
  closeImgs.forEach((ci)=> {
    ci.addEventListener('click', close)
  });
}

function close(e) {
  console.log("close called")
  e.stopPropagation();
  let mainIcons = document.querySelectorAll('.mainIcons');
  let tables = document.querySelectorAll('.table');
  // document.querySelector('.intro').classList.add("hidden");
  mainIcons.forEach((mi) => {
    mi.classList.remove("hidden");
  });
  tables.forEach((ti) => {
    ti.classList.add("hidden");
  });
  document.querySelectorAll('.box').forEach(element => {
    element.classList.add('visible');
    element.classList.remove('expanded');
  });
 handleArrows();
}

function handleArrows(id) {
  if (id === 'h0') {
    document.querySelector('.arrow_left').style.display = 'none';
    document.querySelector('.arrow_right').style.display = 'flex';
  } else if (id === "h" + (LENGHT - 1)) {
    document.querySelector('.arrow_left').style.display = 'flex';
    document.querySelector('.arrow_right').style.display = 'none';
  } else if (id) {
    document.querySelector('.arrow_left').style.display = 'flex';
    document.querySelector('.arrow_right').style.display = 'flex';
  } else {
    document.querySelector('.arrow_left').style.display = 'none';
    document.querySelector('.arrow_right').style.display = 'none';
  }
}

fetch('pimp.json').then(response => response.json()).then(generateContent);
// new FetchGoogleJSON("1_EHOt_PDayCeNhF_nRSLVdsNSXhv2Gbp90Dr0vhvZ_U", generateContent);


document.addEventListener('keyup', (e) => {
  switch (e.keyCode) {
    case 39:
      next();
      break;

    case 37:
      prev();
      break;

    case 27:
      close();
      break;

    default:
      break;
  }
});