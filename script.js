let konsumsiSaatIni = 0;
const target = 2025;
const jumlahMinumMl = 135;
const tanggalSaatIni = new Date().toLocaleDateString();
const maksInactiveDurasi = 24 * 60 * 60 * 1000;
let notifInterval;

function memintaIzinNotifikasi() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Izin notifkasi sudah diberikan");
                if (!notifInterval) {
                    notifInterval = setInterval(kirimNotifikasi, 3600000);
                }
            } else {
                console.warn("Izin notfikasi ditolak");
            }
        });
    } else {
        if (!notifInterval) {
            notifInterval = setInterval(kirimNotifikasi, 3600000);
        }
    }
}

// Notifikasi setiap 1 jam
function kirimNotifikasi() {
    const jamSekarang = new Date().getHours();
    console.log("Jam sekarang", jamSekarang);

    if (jamSekarang < 8 || jamSekarang > 22) {
        console.log("Notifikasi hanya aktif antara jam 8 pagi dan 10 malam");
        return;
    }

    const pesanMotivasi = [
        "Tubuhmu butuh air, ambil air sekarang!",
        "Minum air biar tetap fokus",
        "Jangn sampai Pio mati, ambil air sekarang!",
        "Pio senang kalau Kamu minum air yan cukup",
        "Tubuhmu membutuhkan 135 ml lagi"
    ];
    
    const notifAcak = pesanMotivasi[Math.floor(Math.random() * pesanMotivasi.length)];
    console.log("Pesan Notifikasi:", notifAcak);

    if(Notification.permission === "granted") {
        new Notification("Waktunya minum!", {
            body: notifAcak,
            icon: "https://raw.githubusercontent.com/aflacake/piodrink/main/img/pio.png"
        });

        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }
    } else {
        console.log("Izin notifikasi tidak diberikan");
    }
}


function perbaruiKonsumsi() {
    konsumsiSaatIni += jumlahMinumMl;
    const tersisa = target - konsumsiSaatIni;

    document.getElementById("jumlahSekarang").innerText = konsumsiSaatIni;
    document.getElementById("jumlahTersisa").innerText = tersisa;
    document.getElementById("progressKonsumsi").value = konsumsiSaatIni;

    localStorage.setItem("konsumsiSaatIni", konsumsiSaatIni)
    localStorage.setItem("waktuMinumTerakhir", new Date().getTime());

    const btn = document.getElementById("minumBtn");
    btn.disabled = true;
    btn.innerText = "Tunggu 1 jam...";
    localStorage.setItem("tombolDisabledSampai", new Date().getTime() + 3600000);

    setTimeout(aktifkanTombol, 3600000);

    // jika target tercapai
    if (konsumsiSaatIni >= target) {
        alert("Selamat! Target konsumsi air telah tercapai!");

        document.getElementById("progressKonsumsi").value = target;

        const gambarPio = document.getElementById("gambarPio");
        gambarPio.src = "https://raw.githubusercontent.com/aflacake/piodrink/second/img/piotanamanmerah.png";

        const btn = document.getElementById("minumBtn");
        btn.disabled = true;
        btn.innerText = "Target tercapai";

        let jumlahTanaman = parseInt(localStorage.getItem("jumlahTanaman") || 0);
        jumlahTanaman += 1;
        localStorage.setItem("jumlahTanaman", jumlahTanaman);
        document.getElementById("jumlahTanaman").innerText = jumlahTanaman;

        localStorage.setItem("tombolDisabledSampai", Infinity);
        return;
    }
}



function aktifkanTombol() {
    const btn = document.getElementById("minumBtn");
    btn.disabled = false;
    btn.innerText = "Beri Pio Minum";
}

function cekStatusTombol() {
    const waktuSimpan = parseInt(localStorage.getItem("tombolDisabledSampai") || 0);
    const sekarang = new Date().getTime();

    const btn = document.getElementById("minumBtn");

    if (sekarang < waktuSimpan) {
        btn.disabled = true;
        btn.innerText = "Tunggu 1 jam...";

        setTimeout(aktifkanTombol, waktuSimpan - sekarang);
    } else {
        aktifkanTombol();
    }
}


function cekResetHarian() {
    const tanggalTersimpan = localStorage.getItem("tanggalTerakhirDiperbarui");
    document.getElementById("progressKonsumsi").value = konsumsiSaatIni;
    document.getElementById("progressKonsumsi").max = target;


    if (tanggalTersimpan !== tanggalSaatIni) {
        localStorage.setItem("tanggalTerakhirDiperbarui", tanggalSaatIni);
        localStorage.setItem("konsumsiSaatIni", 0);
        konsumsiSaatIni = 0;
        document.getElementById("jumlahSekarang").innerText = konsumsiSaatIni;
        document.getElementById("jumlahTersisa").innerText = target;
    } else {
        konsumsiSaatIni = parseInt(localStorage.getItem("konsumsiSaatIni") ||0);
        document.getElementById("jumlahSekarang").innerText = konsumsiSaatIni;
        document.getElementById("jumlahTersisa").innerText = target - konsumsiSaatIni;
        document.getElementById("progressKonsumsi").value = konsumsiSaatIni;
    }
}

function cekInactivity() {
    const waktuMinumTerakhir = parseInt(localStorage.getItem("waktuMinumTerakhir") || 0);
    const waktuSaatIni = new Date().getTime();
    const statusElement = document.getElementById("status");
    const gambarPio = document.getElementById("gambarPio");

    if (waktuSaatIni - waktuMinumTerakhir > maksInactiveDurasi) {
        statusElement.innerText = "Pio mati, Kamu belum minum lebih dari 24 jam, silahkan ambil gelas lalu tuangkan airnya."
        statusElement.style.color = "red";
        gambarPio.src = "https://raw.githubusercontent.com/aflacake/piodrink/main/img/piomati.png";
    } else {
        statusElement.innerText = "Pio masih hidup, teruskan pertahankan runtuhan air minum dalam jam tertibmu ini";
        statusElement.style.color = "#01b23b";
        gambarPio.src = "https://raw.githubusercontent.com/aflacake/piodrink/main/img/pio.png";
    }
}



document.addEventListener('DOMContentLoaded', function () {
    memintaIzinNotifikasi();
    kirimNotifikasi();

    document.getElementById("jumlahTanaman").innerText = localStorage.getItem("jumlahTanaman") || 0;

    cekResetHarian();

    cekStatusTombol();

    cekInactivity();
    setInterval(cekInactivity, 5000);

    document.getElementById("minumBtn").addEventListener("click", function() {
        memintaIzinNotifikasi();
        perbaruiKonsumsi();
    });
});
