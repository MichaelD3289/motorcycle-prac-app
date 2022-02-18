const baseUrl = 'http://localhost:6500/api';


// adding a motorcycle --------------------------------
const name = document.getElementById('name');
const year = document.getElementById('year');
const color = document.getElementById('color');
const motorcycleForm = document.querySelector('form');

function addMotorcycle(event) {
  event.preventDefault();

  if (name.value === "" || year.value === "" || color.value === "") {
    alert('Please input all fields');
    return
  }

  let body = {
    name: name.value,
    year: year.value,
    color: color.value
  }

  axios
  .post(`${baseUrl}/motorcycle`, body)
  .then(res => {
    const {motorcycle_id: id, motorcycle_name: name, motorcycle_year: year, motorcycle_color: color} = res.data[0];

    const motorcycleCard = document.createElement('div');
       motorcycleCard.classList.add('motorcycleCard');
          motorcycleCard.innerHTML = `
          <section class="motorcycleCardForm">
          <h1 class="motoCardTitle">Motorcycle</h1>
          <div class="motoDivider">
          <h2 class="name" id="${name}">Name: ${name}</h2>
          <input placeholder="Change Name" class="input ${id}"/>
          </div>

          <div class="motoDivider">
          <h2 class="year" id="${year}">Year: ${year}</h2>
          <input placeholder="Change Year" class="input ${id}"/>
          </div>

          <div class="motoDivider">
          <h2 class="color" id="${color}">Color: ${color}</h2>
          <input placeholder="Change Color" class="input ${id}"/>
          </div>         

          
          </section>
          <div class="btnContainer">
          <button class="updateBtn ${id}">Update<span class="material-icons md-red">
          </span></button>
          <button class="removeBtn" id="${id}">Remove<span class="material-icons md-red">
          </span></button>
          </div>
          `
         motorcycleContainer.appendChild(motorcycleCard);

         const allRemoveBtns = document.querySelectorAll('.removeBtn')
         for(let i = 0; i < allRemoveBtns.length; i++) {
           allRemoveBtns[i].addEventListener('click', deleteMoto);
         }
 
         const allUpdateBtns = document.querySelectorAll('.updateBtn')
         for(let i = 0; i < allUpdateBtns.length; i++) {
           allUpdateBtns[i].addEventListener('click', updateMoto);
         }
  })
  .catch(err => console.log(err))

  name.value = "";
  year.value = "";
  color.value = "";
}


motorcycleForm.addEventListener('submit', addMotorcycle);

// Getting all motorcycles -----------------------------------

const motorcycleContainer = document.getElementById('motorcycle-container');
const getAll = document.getElementById('getAll');


function getMotorcycles() {
  axios
      .get(`${baseUrl}/motorcycles`)
      .then(res => {

        while(motorcycleContainer.firstChild) {
          motorcycleContainer.removeChild(motorcycleContainer.firstChild);
        }

        for(let i = 0; i < res.data.length; i++) {
          const {motorcycle_id: id, motorcycle_name: name, motorcycle_year: year, motorcycle_color: color} = res.data[i];

          const motorcycleCard = document.createElement('div');
          motorcycleCard.classList.add('motorcycleCard');
          motorcycleCard.innerHTML = `
          <section class="motorcycleCardForm ${id}">
          <h1 class="motoCardTitle">Motorcycle</h1>
          <div class="motoDivider">
          <h2 class="name" id="${name}">Name: ${name}</h2>
          <input placeholder="Change Name" class="input name ${id}"/>
          </div>

          <div class="motoDivider">
          <h2 class="year" id="${year}">Year: ${year}</h2>
          <input placeholder="Change Year" class="input year ${id}"/>
          </div>

          <div class="motoDivider">
          <h2 class="color" id="${color}">Color: ${color}</h2>
          <input placeholder="Change Color" class="input color ${id}"/>
          </div>         

          
          </section>
          <div class="btnContainer">
          <button class="updateBtn ${id}">Update<span class="material-icons md-red">
          </span></button>
          <button class="removeBtn" id="${id}">Remove<span class="material-icons md-red">
          </span></button>
          </div>
          `
         motorcycleContainer.appendChild(motorcycleCard);

        }
        
        const allRemoveBtns = document.querySelectorAll('.removeBtn')
        for(let i = 0; i < allRemoveBtns.length; i++) {
          allRemoveBtns[i].addEventListener('click', deleteMoto);
        }

        const allUpdateBtns = document.querySelectorAll('.updateBtn')
        for(let i = 0; i < allUpdateBtns.length; i++) {
          allUpdateBtns[i].addEventListener('click', updateMoto);
        }

      })
      .catch(err => console.log(err))
}

getAll.addEventListener('click', getMotorcycles);

// deleting motorcycle ------------------------------------

function deleteMoto (e) {
  const id = e.target.id;
  const container = e.target.parentElement.parentElement
  
  axios
    .delete(`${baseUrl}/motorcycle/${id}`)
      .then(res => {
        container.remove();
      })
        .catch(err => console.log(err))
      
    }

// updating motorcycles ----------------------------------

function updateMoto(e) {
  const id = e.target.classList[1];

  const firstDivider = e.target.parentElement.parentElement.firstChild.nextElementSibling.firstChild.nextElementSibling.nextElementSibling

  let nameInput = firstDivider.firstChild.nextElementSibling.nextElementSibling;
  let yearInput = firstDivider.nextElementSibling.firstChild.nextElementSibling.nextElementSibling;
  let colorInput = firstDivider.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.nextElementSibling;

  const currentName = firstDivider.firstChild.nextElementSibling.id
  const currentYear = firstDivider.nextElementSibling.firstChild.nextElementSibling.id
  const currentColor = firstDivider.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.id

if(isNaN(yearInput.value)) {
  alert('Year must be a number. ex(2015)')
  yearInput.value = "";
  return
}

 if(nameInput.value === "") {
   nameInput = currentName;
 } else {
   nameInput = nameInput.value;
 }

 if(yearInput.value === "") {
   yearInput = currentYear;
 } else {
  yearInput = yearInput.value;
}

 if(colorInput.value === "") {
   colorInput = currentColor;
 } else {
  colorInput = colorInput.value;
}

 const body = {
   name: nameInput,
   year: yearInput,
   color: colorInput
 }


  axios
      .put(`${baseUrl}/motorcycle/${id}`, body)
      .then(res => {
        
        while(motorcycleContainer.firstChild) {
          motorcycleContainer.removeChild(motorcycleContainer.firstChild);
        }

        for(let i = 0; i < res.data.length; i++) {
          const {motorcycle_id: id, motorcycle_name: name, motorcycle_year: year, motorcycle_color: color} = res.data[i];

          const motorcycleCard = document.createElement('div');
          motorcycleCard.classList.add('motorcycleCard');
          motorcycleCard.innerHTML = `
          <section class="motorcycleCardForm ${id}">
          <h1 class="motoCardTitle">Motorcycle</h1>
          <div class="motoDivider">
          <h2 class="name" id="${name}">Name: ${name}</h2>
          <input placeholder="Change Name" class="input name ${id}"/>
          </div>

          <div class="motoDivider">
          <h2 class="year" id="${year}">Year: ${year}</h2>
          <input placeholder="Change Year" class="input year ${id}"/>
          </div>

          <div class="motoDivider">
          <h2 class="color" id="${color}">Color: ${color}</h2>
          <input placeholder="Change Color" class="input color ${id}"/>
          </div>         

          
          </section>
          <div class="btnContainer">
          <button class="updateBtn ${id}">Update<span class="material-icons md-red">
          </span></button>
          <button class="removeBtn" id="${id}">Remove<span class="material-icons md-red">
          </span></button>
          </div>
          `
         motorcycleContainer.appendChild(motorcycleCard);

        }
        
        const allRemoveBtns = document.querySelectorAll('.removeBtn')
        for(let i = 0; i < allRemoveBtns.length; i++) {
          allRemoveBtns[i].addEventListener('click', deleteMoto);
        }

        const allUpdateBtns = document.querySelectorAll('.updateBtn')
        for(let i = 0; i < allUpdateBtns.length; i++) {
          allUpdateBtns[i].addEventListener('click', updateMoto);
        }
      })
      .catch(err => console.log(err))

      nameInput.value="";
      yearInput.value="";
      colorInput.value="";
}