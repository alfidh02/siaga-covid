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
                    <div class="darkmode-switch" id="darkmode-switch">
                        <span>
                            <i class="bx bxs-moon"></i>
                            <i class="bx bxs-sun"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
    }

}

customElements.define("top-nav", TopNavbar);