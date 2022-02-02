const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

let particlesArray = [];
let hue = 0


canvas.width = innerWidth
canvas.height = innerHeight

window.addEventListener("resize",()=>{
    canvas.width = innerWidth
    canvas.height = innerHeight
})

const Particle = function(){

    this.velocityX = Math.random() * 5 - 2.5;
    this.velocityY = Math.random() * 5 - 2.5; 

    this.x = Math.random()*innerWidth+1
    this.y = Math.random()*innerHeight+1

    this.size = Math.random()*40+10
    this.color = `hsl(${hue},100%,50%)`

    this.update = function(){
        this.x+=this.velocityX
        this.y+=this.velocityY
        this.color = `hsl(${hue},100%,50%)`
        if(this.y < -innerHeight/30||this.y > innerHeight){
            this.velocityY*=-1
        }
        if(this.x < -innerWidth/30||this.x > innerWidth){
            this.velocityX*=-1
        }
    }
    this.draw = function(){
        c.strokeStyle = this.color;
        c.lineWidth = 2;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.stroke();
    }
}

function init(){
    for (let index = 0; index < 200; index++) {
        let p = new Particle()
        particlesArray.push(p)
    }
}

init()

function animate(){
    c.fillStyle = "rgba(0,0,0,0.05)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    hue++
    requestAnimationFrame(animate)
}

animate()