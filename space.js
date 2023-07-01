AFRAME.registerComponent("space",{
    schema:{
      state: { type: "string", default: "places-list" },
      selectedCard:{type:"string",default:"#card1"},
      zoomAspectRatio: { type: "number", default: 1 }
    },
    init:function(){
        this.placeContainer=this.el
        this.cameraEl= document.querySelector("#camera");
        this.createCards()
    },
    update:function(){
      window.addEventListener("keydown", e =>{
        if (e.key=== "UpArrow"){
          if (
            (this.data.zoomAspectRatio <= 10 && this.data.state === "view") ||
            (this.data.zoomAspectRatio <= 10 && this.data.state === "change-view")
          ) {
            this.data.zoomAspectRatio += 0.002;
            this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
          }
        }
        if (e.key === "ArrowDown") {
          if (
            (this.data.zoomAspectRatio > 1 && this.data.state === "view") ||
            (this.data.zoomAspectRatio > 1 && this.data.state === "change-view")
          ) {
            this.data.zoomAspectRatio -= 0.002;
            this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
          }
        }
      });
    },
    tick: function() {
      const { state } = this.el.getAttribute("space");
  
      if (state == "view") {
        this.hideEl([this.placeContainer]);
        this.showView();
      }
    },
    hideEl: function(elList) {
      
      elList.map(el => {
        console.log(el)
        el.setAttribute("visible", false);
      });
    },
    showView: function() {
      console.log("view Process started")
      const { selectedCard } = this.data;
  
      
      const skyEl = document.querySelector("#main-container");
  
      skyEl.setAttribute("material", {
        src: `assets/360-images/${selectedCard}/place-0.jpg`,
        color: "#fff"
      });
    },
    createCards: function () {
        const thumbNailsRef = [
          {
            id: "stars",
            title: "Stars",
            url: "assets/thumbnails/stars.jpg",
          },
          {
            id: "planets",
            title: "Planets",
            url: "assets/thumbnails/planets.jpg",
          },
    
          {
            id: "asteroids",
            title: "Asteroids",
            url: "assets/thumbnails/asteroids.jpg",
          },
          {
            id: "meteroites",
            title: "Meteroites",
            url: "assets/thumbnails/meteorites.jpg",
          },
        ];
        let previousXPosition=-60
        for(var item of thumbNailsRef)
        {
        const posX = previousXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      previousXPosition = posX;

      
    
    const borderEl = this.createBorder(position, item.id);

    
    const thumbNail = this.createThumbNail(item);
    borderEl.appendChild(thumbNail);

    
    const titleEl = this.createTitleEl(position, item);
    borderEl.appendChild(titleEl);

    this.placeContainer.appendChild(borderEl);
  }
},
createBorder: function (position, id) {
  const entityEl = document.createElement("a-entity");
  entityEl.setAttribute("id", id);
  entityEl.setAttribute("visible", true);
  entityEl.setAttribute("geometry", {
    primitive: "ring",
    radiusInner: 9,
    radiusOuter: 10,
  });
  entityEl.setAttribute("position", position);
  entityEl.setAttribute("material", {
    color: "#8000ff",
    opacity: 1,
  });
  entityEl.setAttribute("cursor-listener", {});
  return entityEl;
},
createThumbNail: function (item) {
  const entityEl = document.createElement("a-entity");
  entityEl.setAttribute("visible", true);
  entityEl.setAttribute("geometry", {
    primitive: "circle",
    radius: 9,
  });
  entityEl.setAttribute("material", { src: item.url });
  entityEl.setAttribute("cursor-listener", {});
  return entityEl;
},
createTitleEl: function (position, item) {
  const entityEl = document.createElement("a-entity");
  entityEl.setAttribute("text", {
    font: "exo2bold",
    align: "center",
    width: 70,
    color: "#804eb1",
    value: item.title,
  });
  const elPosition = position;
  elPosition.y = -20;
  entityEl.setAttribute("position", elPosition);
  entityEl.setAttribute("visible", true);
  return entityEl;
},
});