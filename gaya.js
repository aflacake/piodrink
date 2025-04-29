document.addEventListener('DOMContentLoaded', function () {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.fontFamily = "Times New Roman";
    document.body.style.backgroundColor = "";

    document.querySelector("header").style.display = "flex";
    document.querySelector("header").style.flexDirection = "column"
    document.querySelector("header").style.textAlign = "center";
    document.querySelector("header").style.justifyContent = "center";
    document.querySelector("header").style.borderBottom = "8px solid #80ff80"
    document.querySelector("header").style.padding = '20px';
    document.querySelector("header > p").style.marginTop = '-20px';
    document.querySelector("header").style.color = "black";
    document.querySelector("header").style.backgroundColor = "#01b23b";
    
    
    const kontenPopUpNotif = document.querySelector(".popUpNotif");
    kontenPopUpNotif.style.display = "flex";
    kontenPopUpNotif.style.flexDirection = "row";
    kontenPopUpNotif.style.padding = '20px';
    kontenPopUpNotif.style.margin = '20px';
    kontenPopUpNotif.style.backgroundColor= "#80ff80";
    kontenPopUpNotif.style.border = "2px solid #ccc";
    kontenPopUpNotif.style.borderRadius = "15px";

    const kontenPopUpNotifP = document.querySelector(".popUpNotif > p");
    kontenPopUpNotifP.paddingTop = '10px';

    const kontenPio = document.querySelector(".konten");
    kontenPio.style.padding = '20px';
    kontenPio.style.margin = '20px';
    kontenPio.style.backgroundColor = "";
    kontenPio.style.border = "2px solid #ccc"
    kontenPio.style.borderRadius = '15px';
    
    const pKontenPioNotif = document.querySelector(".konten > #kontenNotifPio");
    pKontenPioNotif.style.borderLeft = "8px solid #01b23b";
    pKontenPioNotif.style.paddingLeft = '8px';
    
    
    const container = document.querySelector(".container");
    container.style.padding = '20px';
    container.style.textAlign = "center";
    
    
    
    const gambarPio = document.getElementById("gambarPio");
    
    gambarPio.addEventListener("mouseenter", function() {
        gambarPio.style.transform = "scale(1.5)"
    });
    gambarPio.addEventListener("mouseleave", function() {
        gambarPio.style.transform = "scale(1)"
    });

    const minumBtn = document.getElementById("minumBtn");
    minumBtn.style.padding = "10px";
    minumBtn.style.marginBottom = '40px';
    minumBtn.style.fontFamily = "Times New Roman";
    minumBtn.style.fontSize = '24px';
    minumBtn.style.color = "#80ff80"; 
    minumBtn.style.backgroundColor = "#01b23b";
    minumBtn.style.border = "none";
    minumBtn.style.borderRadius = '15px';

    const suaraAir = document.getElementById("suaraAir");
    suaraAir.style.display = "none";

    minumBtn.addEventListener("click", function() {
        suaraAir.currentTime = 0;
        suaraAir.play();

        perbaruiKonsumsi();
    });
    
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
    
    
    document.querySelector("footer").style.padding = '20px';
    document.querySelector("footer").style.backgroundColor = "#01b23b";
    document.querySelector("footer").style.borderTop = "8px solid #80ff80";
    
});