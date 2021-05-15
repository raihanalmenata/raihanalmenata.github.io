new p5(null,'container'); // The P5 Instances

const startButton = document.getElementById("start-button");
const container = document.getElementById("container");

startButton.addEventListener("click", () => {
    panel.refresh();
    container.removeChild(document.getElementById("welcome"));
    document.getElementById('console').style.opacity = "100%";
    document.querySelector(".column").getElementsByTagName("p")[0].style.opacity = "100%";
})

const mainObject = {
    typeList : [
        box,
        sphere,
        cylinder,
        torus,
        ellipsoid
    ],
    lightColor : [
        255,
        255,
        255,
    ] , 
    pointLightColor : [
        255,
        255,
        255
    ],
    scale : 1 ,
    customType : box,
    autoRotate : true,
    angle : 0 ,
    rotateValue : 0.01, 

    rescale : () => {
        if(mainObject.scale == 3)
        mainObject.scale = 1;
        else
        mainObject.scale++;

        customConsole.refresh(`Shape rescaled : ${mainObject.scale}x`)
    },

    changeLightColor : () => {
        mainObject.lightColor[0] = Math.floor(Math.random() * 255);
        mainObject.lightColor[1] = Math.floor(Math.random() * 255);
        mainObject.lightColor[2] = Math.floor(Math.random() * 255);
        
        mainObject.pointLightColor[0] = Math.floor(Math.random() * 255);
        mainObject.pointLightColor[1] = Math.floor(Math.random() * 255);
        mainObject.pointLightColor[2] = Math.floor(Math.random() * 255);

        customConsole.refresh('Color Changed!');
    },
    changeType : () => {
        mainObject.customType = mainObject.typeList[Math.floor(Math.random() * mainObject.typeList.length)];
        customConsole.refresh(`Shape Type Changed!`)
    },
    turnRotate : () => {
        if(mainObject.autoRotate){
            mainObject.autoRotate = false;
            mainObject.rotateValue = 0;
        }
        else{
            mainObject.autoRotate = true;
            mainObject.rotateValue = 0.01;
        }

        const status = mainObject.autoRotate ? "ON" : "OFF";
        customConsole.refresh(` Auto-Rotate : ${status}`)
    },
    customRender : () => {
        strokeWeight(0.5)
        background(255)
        ambientMaterial(255,255,255);
        ambientLight(
            mainObject.lightColor[0],
            mainObject.lightColor[1],
            mainObject.lightColor[2]
        )
        pointLight(
            mainObject.pointLightColor[0] ,
            mainObject.pointLightColor[1] ,
            mainObject.pointLightColor[2] ,
            mouseX - width/2, 
            mouseY - height/2, 
            50);
        scale(mainObject.scale)
            rotateX(mainObject.angle)
            rotateY(mainObject.angle)
            rotateZ(mainObject.angle)
            mainObject.angle += mainObject.rotateValue;
        mainObject.customType();
    },

}

class Button{
    constructor(content, action){
        this.content = content;
        this.action = action;
        this.DOMForm = this.renderDOM();
    }
    renderDOM(){
        const buttonElement = document.createElement('div');
        buttonElement.classList.add("button");
        buttonElement.innerHTML = this.content;
        buttonElement.addEventListener("click", this.action);
        return buttonElement;
    }
}

let panel = {
    buttonInPanel : [] ,
    refresh : function(){
        const target = document.getElementById("panel");
        target.innerHTML = "";
        panel.buttonInPanel.forEach(element => {
            target.appendChild(element.DOMForm);
        });
    }
}

let customConsole = {
    target : document.getElementById("console"),
    refresh : function(content){
        this.target.innerHTML = content;
    }
}

panel.buttonInPanel.push(
    new Button("Rescale", mainObject.rescale) ,
    new Button("Change Color" , mainObject.changeLightColor),
    new Button("Change Type", mainObject.changeType),
    new Button("Auto-Rotate" , mainObject.turnRotate)
);

function setup(){
    createCanvas(400,400,WEBGL);
}

function draw(){
    mainObject.customRender()
}