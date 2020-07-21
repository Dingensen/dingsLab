// OF is to iterate over arrays
// IN is to "iterate" over objects

let animals = ['🐔', '🐷', '🐑', '🐇'];
let names = {chicken:'Gertrude', pig:'Henry', sheep:'Melvin', bunny:'Billy Bob'};

for(let animal of animals){
  console.log(animal);
  //prints each animal
}

for(let animal in animals){
  console.log(animal);
  //prints each index
}

for(let name of names){
  //WILL NOT WORK: names is not iterable as an object
  console.log(name);
}

for(let name in names){
  console.log(name);
  //prints each name
}
