document.addEventListener('DOMContentLoaded', function () {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.fontFamily = "Times New Roman";
    document.body.style.backgroundColor = "white";

   const navbar = document.getElementById("navbar");
   
   navbar.style.display = "flex";
   navbar.style.position = "fixed";
   navbar.style.flexDirection = "column";
   navbar.style.width = '50px';
   navbar.style.padding = '10px';
   navbar.style.height = '100vh';
   navbar.style.top = '0';
   navbar.style.right = '0';
   navbar.style.backgroundColor = "white";
   navbar.style.justifyContent = "flex-start";
   navbar.style.alignItems = "flex-start";
   navbar.style.borderLeft = "1px solid #ccc";
   
   const linkNavbar = navbar.querySelectorAll("a");
   linkNavbar.forEach(link => {
       link.style.display = "block";
       link.style.width = '100%';
       link.style.marginTop = '20px';
       link.style.color = "";
       link.style.textDecoration = "none";
       
       // Efek hover
       link.addEventListener("mouseover", () => {
           link.style.backgroundColor = "white";
       });
       link.addEventListener("mouseout", () => {
           link.style.backgroundColor = "transparent";
       });
   });

    const navbarAirPutih = document.getElementById("navbarAirPutih");
    navbarAirPutih.style.display = "block";
    navbarAirPutih.style.marginTop = '40vh';
    navbarAirPutih.style.width = '100%';
    navbarAirPutih.style.paddingTop = '20px';

    const header = document.querySelector("header");
    header.style.cssText = `
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        border-bottom: 8px solid #80ff80;
        padding: 20px;
        color: #404040;
        background-color: #01b23b;
    `;
     document.querySelector("header > p").style.marginTop = '-20px';

    const kontenPio = document.querySelector(".konten");
    kontenPio.style.padding = '20px';
    kontenPio.style.margin = '20px';
    kontenPio.style.backgroundColor = "white";
    kontenPio.style.border = "2px solid #ccc"
    kontenPio.style.borderRadius = '15px';
    
    const pKontenPioNotif = document.querySelector(".konten > #kontenNotifPio");
    pKontenPioNotif.style.borderLeft = "8px solid #01b23b";
    pKontenPioNotif.style.paddingLeft = '8px';

    const kontenPertanyaan = document.querySelector(".pertanyaan");
    kontenPertanyaan.style.padding = '20px';
    kontenPertanyaan.style.margin = '20px';
    kontenPertanyaan.style.border = "2px solid #ccc";
    kontenPertanyaan.style.borderRadius = '15px';

    const daftarPertanyaan = document.getElementById("daftarPertanyaan");
    daftarPertanyaan.style.listStyle = "none";

    const itemDaftarPertanyaan = daftarPertanyaan.getElementsByTagName("li");
    for (let i = 0; i < itemDaftarPertanyaan.length; i++) {
        const teksAsli = itemDaftarPertanyaan[i].textContent?.trim();
            if (teksAsli) {
                itemDaftarPertanyaan[i].textContent = `${i + 1}. ${teksAsli}`;
        }
    }



    const footer = document.querySelector("footer");
    footer.style.cssText = `
        padding: 20px;
        color: #404040;
        background-color: #01b23b;
        border-top: 8px solid #80ff80;
    `;
});
