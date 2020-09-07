//pretends to be abstract class
class SubApplication{
    constructor(data){
        this.data = data; //setting application data via super() call
        this.parents; // set when parents are selected
    }

    setParents(els){
        this.parents = els;
    }

    set(propName,newValue){
        if(this.data[propName] != newValue){
            this.data[propName] = newValue;
            console.log(this.data);
            
            for(let el of this.parents){
                el.innerHTML = "";
                SubApplication.render(el,this);
            }
        }
    }

    // TODO: must implement in children class
    // @return definedDOMType
    createUI(data){}

    // attach events
    static attachEvents(element,onFunctions){
        for(let eventType in onFunctions){
            element.addEventListener(eventType,onFunctions[eventType]);
        }
    }

    // defined DOM to real DOM
    static toDOM(definedDOM){
        let element = document.createElement(definedDOM.type);
        element.innerText = definedDOM.value;
        SubApplication.attachEvents(element,definedDOM.on)//attach Events
        return element;
    }

    // render el and setApp
    static render(el,applicationInstance){
        let definedDOM = applicationInstance.createUI(applicationInstance.data); // defiend:dom type
        el.appendChild(SubApplication.toDOM(definedDOM)) //create Real DOM
    }

    // mount UI to Elements
    static mount(mountName,applicationInstance){
        const mountEls = document.querySelectorAll(mountName); // one time selection
        applicationInstance.setParents(mountEls); // so that elements are not selected again & save CPUs        
        
        for(let el of mountEls){            
            SubApplication.render(el,applicationInstance)    
        }
    }
}