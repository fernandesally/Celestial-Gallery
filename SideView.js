AFRAME.registerComponent("place-side-view",{
    init:function(){
        this.createGallery()
    },
    tick:function(){
        const placesContainer=document.querySelector("#places-container")

        const{state}=placesContainer/getAttribute("space")

        if(state==="view"||state==="change-view"){
            this.el,setAttribute("visible",true)
        }
        else{
            this.el,setAttribute("visible",false)
        }
    },
    
    createGallery:function(){
        const sideViewContainer=document.querySelector("#side-view-container")
        let previousXposition=-150
        let previousYposition=30

        for(var i=1;i,i<=4;i++){
            const position={
                x:(previousXposition+=50),
                y:(previousYposition+=2),
                z:-40
            };
            const entityel=this.createPlaceThumbnail(position,i)
            sideviewcontainer.appendChild(entityEl)
        }
    },
    createPlaceThumbnail:function(position,id){
        const entityEl=document.createElement("a-entity")
        entityEl.setAttribute("visible",true)
        entityEl.setAttribute("id",`places-${id}`)
        entityEl.setAttribute("geometry",{
            primitive:"circle",
            radius:2.5
        })
        
        entityEl.setAttribute("material",{
            src:"assets-1/rocket.jpg",
            opacity:1
        })
        entityEl.setAttribute("position", position);
        entityEl.setAttribute("cursor-listener",{})
        return entityEl
    }
})