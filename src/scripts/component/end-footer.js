class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="footer">
        Sumber data : <a href="https://github.com/Reynadi531/api-covid19-indonesia-v2" target="_blank">API COVID-19 Indonesia</a> oleh Reynadi531
        <br>
        Made with <span style="color: #e25555;">&#9829;</span> by <a href="https://github.com/alfidh02" target="_blank">Alfi</a>
    </div>
        `;
  }
}

customElements.define('end-footer', Footer);
