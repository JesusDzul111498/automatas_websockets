const socket = io();

//DOM elements

let message = document.getElementById('message');
let user = document.getElementById('user');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let btn = document.getElementById('sed');

btn.addEventListener('click', function(){
   socket.emit('chat:message', {
        username: user.value,
        message: message.value

   });
});

message.addEventListener('keypress', function(){
    socket.emit('chat:typing', user.value);
});

socket.on('chat:message', function(data){
    actions.innerHTML = '';
     var b = vocales(data.message);
        console.log(b + "numero de vocoles recibidas");
      
    var c = palabra(data.message);
        console.log(c + " Cantidad de palabra recibidas.");
    var d = numeros(data.message);
        console.log(d +"Cantidad de numeros contenidos en el mensaje enviado.");
    var m = mayusculas(data.message);
        console.log(m +"Cantidad de palabras que inician con mayuscula.")
    
    var a = fnvocal(data.message);
        console.log(a + "Palabras que finalizan con letras que no son vocal.");
    output.innerHTML +=  
    `<p><strong>${data.username}</strong>:${data.message}</p>
     <p><strong>"Numero de vocales recibidas</strong>:: ${b}</p>
     <p><strong>"Cantidad de palabra recibidas</strong>:: ${c}</p>
     <p><strong>"Cantidad de numeros contenidos en el mensaje enviado</strong>:: ${d}</p>
     <p><strong>"Cantidad de palabras que inician con mayuscula</strong>:: ${m}</p>
     <p><strong>"Palabras que finalizan con letras que no son vocal</strong>:: ${a}</p>
        `;
       
   
});

socket.on('chat:typing', function(data){
    actions.innerHTML = `<p><em>${data} esta escribiendo</em></p>`
});


//Expresion regulares
function vocales(datas){
    // Cantidad de vocales recibidas.
    var vocaless = /[aeiouáéíóú]/gim;
    var plantilla = datas.toString();
    var info = 0;
    if(plantilla.match(vocaless)!=null){
        info = plantilla.match(vocaless);
    }else{
        return 0;
    }
   return info.length;
 }

 //Expresion regulares
function palabra(datas){
    // Cantidad de palabra recibidas.
    var palabraa = datas.split(" ");
    var contador = 0;
    var ca = 0;
    for(var i = 0; i<palabraa.length; i++){
          contador++;  
    }
    // Palabras no se si contar numeros como palabras
   return contador;

         
 }
 //Expresion regulares
function numeros(datas){
    // Cantidad de numeros contenidos en el mensaje enviado.
     var numeross = /[0-9]/g;
     var nums =0;
     var palabra = datas.split(" ");
     for(var i = 0; i<palabra.length; i++){
         if(palabra[i].match(numeross)!=null){
            var j =palabra[i].match(numeross);
            nums = j.length;
         }
     }
     
     return nums;
 }

 //Expresion regulares
function mayusculas(datas){
    // Cantidad de palabras que inician con mayuscula.
    var mayusculass = /^[A-Z-ÁÉÍÓÚ]/gm;
    var cadenas = datas.split(" ");
    var info = 0;
    for(var i = 0; i<cadenas.length; i++){
        if(cadenas[i].match(mayusculass)!=null){
            info++;
        }
    }
    
    return info;  
 }

 //Expresion regulares
function fnvocal(datas){
    // Palabras que finalizan con letras que no son vocal.
     var fnvocall = /[^aeiou]$/igm;
     var conta = 0;
     var cadenas = datas.split(" ");
     for (let i = 0; i < cadenas.length; i++) {
        
            if(cadenas[i].match(fnvocall)!=null && cadenas[i].match(/[^0-9]$/gm) ){
                
                    conta  ++;
                
            }
        
         
     }
     return conta;
     
 }