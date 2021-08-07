class SearchBar extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="row">
            <div class="col-3 col-md-6 col-sm-12">
                <div class="box">
                    <div class="country-select" id="country-select">
                        <div class="country-select-toggle" id="country-select-toggle">
                            <span>
                                Global
                            </span>
                            <i class="bx bx-chevron-down"></i>
                        </div>
                        <div class="country-select-list" id="country-select-list">
                            <input type="text" placeholder="Search country name">
                        </div>
                    </div>
                </div>
            </div>     
        </div>
        `;
    }
}

customElements.define("search-bar", SearchBar);