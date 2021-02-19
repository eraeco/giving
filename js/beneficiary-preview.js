class BeneficiaryPreview extends HTMLElement {
  template = document.querySelector("#beneficiary-preview-template").content.cloneNode(true);

  constructor() {
    super();
  }

  // on mounted
  connectedCallback() {
    this.setup();
    this.render();
  }

  // on change of attributes
  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }

  setup() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.template);

    this.view = Object.values(this.attributes).reduce((view, attr) => {
      view[attr.name] = this.shadowRoot.querySelector("." + attr.name);
      return view;
    }, []);
  }

  render() {
    this.view.raised.textContent = "$" + this.attributes.raised.value;
    this.view.goal.textContent = "raised of $" + this.attributes.goal.value + " goal";
    this.view.description.textContent = this.attributes.description.value;
  }
}

// Register with HTML
window.customElements.define("beneficiary-preview", BeneficiaryPreview);
