class TopNavbar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="nav-wrapper">
            <div class="container">
                <div class="nav">
                    <a href="" class="logo">
                        SIAGA C<i class="bx bxs-virus-block bx-tada"></i>VID
                    </a>
                </div>
            </div>
        </div>
    `;
  }
}

customElements.define('top-nav', TopNavbar);
