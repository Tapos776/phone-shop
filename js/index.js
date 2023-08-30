const phoneCard = async (texts,all) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/phones?search=${texts}`)
    const data = await res.json();
    const phone = data.data
    phoneContainer(phone,all)
    // console.log(phone)

}

const phoneContainer = (phone,all) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';
    const shaw = document.getElementById('shaw');
    if (phone.length > 12 && !all) {
        shaw.classList.remove('hidden')
    } else {
        shaw.classList.add('hidden')
    }
   if(!all){
    phone = phone.slice(0, 12)
   }

    phone.forEach(element => {
        const div = document.createElement('div');
        div.classList = `card bg-pink-100 shadow-xl my-10 p-5`
        div.innerHTML = `
    <figure><img src=" ${element.image}"/></ figure>
    <div class="card-body">
      <h2 class=" text-2xl text-center">${element.phone_name}</h2>
      <div class="card-actions justify-center">
        <button onclick ="modalCard('${element.slug}')" class="btn bg-pink-300 text-green-900 font-bold">View Phone</button>
      </div>
    </div>
    `
        phoneContainer.appendChild(div)
    });
    loadingToggle(0)
}

const searchPhone = (all) => {
    loadingToggle(1)
    const search = document.getElementById('search').value;
    phoneCard(search,all);

}

const loadingToggle = (isLoading) => {
    const loading = document.getElementById('loading');
    if (isLoading) {
        loading.classList.remove('hidden')
    } else {
        loading.classList.add('hidden')
    }
}

const shawAll =()=>{
    searchPhone(1)
} 

const modalCard = async(id)=>{
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phoneDit = data.data
    shawModal(phoneDit)
    console.log(phoneDit)
}
const shawModal =(phone)=>{
    my_modal_5.showModal()
    const modalId =document.getElementById('modalId')
    modalId.innerText ='';
    const  div =document.createElement('div');
    div.innerHTML =`
    <h2 class ="text-center text-3xl font-bold ">${phone.name}
    <img class="mx-[30%] my-4" src="${phone.image}" />
    <h3><span class="font-bold"> Storage:</span> ${phone.mainFeatures.storage} </h3>
    <h3><span class="font-bold"> Release Date:</span> ${phone. releaseDate} </h3>
    `
    modalId.appendChild(div)
}