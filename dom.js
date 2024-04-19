const root = document.getElementById("root");

class Element{
    tag;
    attributes;
    content;

    constructor(tag, attributes, content){
        this.tag = tag;
        this.attributes = attributes;
        this.content = content;

        console.log(attributes);
    }

    addToRoot(){
        root.innerHTML = this.getElement();
    }

    getElement() {
        let attributeString = "";
        for (const [key, value] of Object.entries(this.attributes)) {
            if (typeof value === 'object') {
                // Si el valor es un objeto (como estilo), construir una cadena de subatributos
                let subAttributeString = "";
                for (const [subKey, subValue] of Object.entries(value)) {
                    subAttributeString += `${subKey}: ${subValue}; `;
                }
                attributeString += `${key}="${subAttributeString}"`;
            } else {
                attributeString += `${key}="${value}"`;
            }
        }
        const element = `<${this.tag} ${attributeString}>${this.content}</${this.tag}>`;
        return element;
    }
}