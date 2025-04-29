let konsumsiSaatIni = 0;
const target = 2025;
const jumlahMinumMl = 135;
const tanggalSaatIni = new Date().toLocaleDateString();
const maksInactiveDurasi = 24 * 60 * 60 * 1000;

// Notifikasi setiap 1 jam
function kirimNotifikasi() {
    if(Notification.permission === "granted") {
        new Notification("Waktunya minum!", {
            body: "Jangan lupa minum 135 ml air sekarang.",
            icon: "https://raw.githubusercontent.com/aflacake/piodrink/main/img/pio.png"
        });
    }
}

function memintaIzinNotifikasi() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Izin notifkasi sudah diberikan");
            } else {
                console.warn("Izin notfikasi ditolak");
            }
        });
    }
}

function perbaruiKonsumsi() {
    konsumsiSaatIni += jumlahMinumMl;
    const tersisa = target - konsumsiSaatIni;

    document.getElementById("jumlahSekarang").innerText = konsumsiSaatIni;
    document.getElementById("jumlahTersisa").innerText = tersisa;

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
    }
}

function cekInactivity() {
    const waktuMinumTerakhir = parseInt(localStorage.getItem("waktuMinumTerakhir") || 0);
    const waktuSaatIni = new Date().getTime();
    const statusElement = document.getElementById("status");
    const gambarPio = document.getElementById("gambarPio")

    if (waktuSaatIni - waktuMinumTerakhir > maksInactiveDurasi) {
        statusElement.innerText = "Pio mati, kamu belum minum lebih dari 24 jam, silahkana ambil gelas lalu tuangkan airnya."
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

cekResetHarian();

cekStatusTombol();

cekInactivity();
setInterval(cekInactivity, 5000);

document.getElementById("minumBtn").addEventListener("click", function() {
    memintaIzinNotifikasi();
    perbaruiKonsumsi();
});

// Set notifikasi setiap 1 jam (3600000 ms = 1 jam)
setInterval(kirimNotifikasi, 3600000);
});
