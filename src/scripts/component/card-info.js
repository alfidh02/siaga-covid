class CardInfo extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="col-12">
        <div class="box">
            <div class="box-header">
                Cara Mencegah Penularan COVID-19
            </div>
            <div class="box-body">
                <div class="box-content">
                    <img src="../src/images/01.png" alt="">
                    <h3>Pakai Masker</h3>
                    <p>Selalu pakai masker ketika beraktivitas di luar rumah</p>
                </div>

                <div class="box-content">
                    <img src="../src/images/02.png" alt="">
                    <h3>Jaga Jarak</h3>
                    <p>Menjaga jarak dengan orang sekitar, terutama jika orang tersebut batuk/bersin/flu</p>
                </div>

                <div class="box-content">
                    <img src="../src/images/03.png" alt="">
                    <h3>Konsultasi ke Dokter</h3>
                    <p>Segera konsultasi ke dokter apabila terkena gejala COVID-19</p>
                </div>

                <div class="box-content">
                    <img src="../src/images/04.png" alt="">
                    <h3>Cuci Tangan</h3>
                    <p>Rajin mencuci tangan dimanapun dan kapanpun</p>
                </div>

                <div class="box-content">
                    <img src="../src/images/05.png" alt="">
                    <h3>Elbow Cough</h3>
                    <p>Tutup mulut dan hidung dengan tisu saat batuk, bersin, atau menggunakan siku yang tertekuk</p>
                </div>

                <div class="box-content">
                    <img src="../src/images/06.png" alt="">
                    <h3>Jaga Kebersihan</h3>
                    <p>Rutin menjaga kebersihan lingkungan sekitar</p>
                </div>
            </div>
        </div>
    </div>
    `;
  }
}

customElements.define('card-info', CardInfo);
