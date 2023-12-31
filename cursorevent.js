AFRAME.registerComponent("cursor-listener", {
    schema: {
      selectedItemId: { default: "", type: "string" }
    },
    init: function() {
      this.handleClickEvents();
      this.handleMouseEnterEvents();
      this.handleMouseLeaveEvents();
    },
    handleClickEvents: function() {
      
      this.el.addEventListener("click", evt => {
        console.log("mouse clicked")
        const placesContainer = document.querySelector("#places-container");
  
        const { state } = placesContainer.getAttribute("space");
  
        if (state == "places-list") {
  
          const id = this.el.getAttribute("id");
  
          const placesId = [
            "stars",
            "planets",
            "asteroids",
            "meteorites"
          ];
  
          if (placesId.includes(id)) {
            placesContainer.setAttribute("space", {
              state: "view",
              selectedCard: id
            });
          }
        }
  
        if (state == "view") {
          console.log(state)
          this.handleViewState();
        }
        if (state == "change-view") {
          this.handleViewState();
        }
      });
    },
    handleViewState: function() {
      console.log("handle view state")
      const el = this.el;
  
      const id = el.getAttribute("id");
  
      const placesContainer = document.querySelector("#places-container");
  
      const { selectedItemId } = placesContainer.getAttribute("cursor-listener");
  console.log(selectedItemId)
      
      const sideViewPlacesId = ["place-1", "place-2", "place-3", "place-4"];
  
      if (sideViewPlacesId.includes(id)) {
        
        placesContainer.setAttribute("space", {
          state: "change-view"
        });
  
        const skyEl = document.querySelector("#main-container");
        
        
        skyEl.setAttribute("material", {
          src: `./assets/360-images/${selectedItemId}/${id}.jpg`,
          color: "#fff"
        });
       
      }
    },
    handleMouseEnterEvents: function() {
      
      this.el.addEventListener("mouseenter", () => {
        const placeContainer = document.querySelector("#places-container");
        const { state } = placeContainer.getAttribute("space");
        if (state === "places-list") {
          this.handlePlacesListState();
        }
      });
    },
    handlePlacesListState: function() {
      const id = this.el.getAttribute("id");
      const placesId = ["stars", "planets", "asteroids", "meteorites"];
      if (placesId.includes(id)) {
        const placeContainer = document.querySelector("#places-container");
        placeContainer.setAttribute("cursor-listener", {
          selectedItemId: id
        });
        this.el.setAttribute("material", {
          color:"#D76B30",
          opacity: 1
        });
      }
    },
    handleMouseLeaveEvents: function() {
      // Mouse Leave Events
      this.el.addEventListener("mouseleave", () => {
        const placesContainer = document.querySelector("#places-container");
        const { state } = placesContainer.getAttribute("space");
        if (state === "places-list") {
          const { selectedItemId } = this.data;
          if (selectedItemId) {
            const el = document.querySelector(`#${selectedItemId}`);
            const id = el.getAttribute("id");
            if (id == selectedItemId) {
              el.setAttribute("material", {
                color: "#0077CC",
                opacity: 1
              });
            }
          }
        }
      });
    },
    
  });
  