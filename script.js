if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(reg) {
        console.log("Service worker terdaftar.", reg);

        navigator.serviceWorker.ready.then(function(reg) {
            console.log("Service worker sudah aktif dan sudah siap:", reg);
        });
    })
    .catch(function(error) {
        console.error("Gagal mendaftarkan service worker:", error)
    });
}



document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("minumBtn");
    console.log("Tombol ditemukan?", !!btn);
});

function bukaDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("PiodrinkDB", 3);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("konsumsiHarian")) {
                db.createObjectStore("konsumsiHarian", { keyPath: "tanggal" });
                console.log("Object store 'konsumsiHarian' dibuat")
            }
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("konsumsiHarian")) {
                console.error("Object store belum tersedia. Harap refresh halaman.");
                db.close();
                reject("Object store belum tersedia.")
                return;
            }

            resolve(db);
        };
        request.onerror = function () {
            reject(request.error);
        }
    });
}

function ambilDataHariIni(store, tanggal) {
    return new Promise((resolve, reject) => {
        const request = store.get(tanggal);
        request.onsuccess = () => resolve(request.result || { tanggal, total: 0 });
        request.onerror = reject;
    });
}

async function simpanKonsumsiHarian(jumlah) {
    let db;
    try {
        db = await bukaDatabase();
        const tx = db.transaction("konsumsiHarian", "readwrite");
        const store = tx.objectStore("konsumsiHarian");
        const tanggal = new Date().toISOString().split("T")[0];

        const data = await ambilDataHariIni(store, tanggal);
        data.total += jumlah;

        store.put(data);

        tx.oncomplete = () => db.close();
        tx.onerror = () => {
            console.error("Transaksi gagal");
            db.close(); 
        };
    } catch (error) {
        console.error("Error saat menyimpan konsumsi harian:", error);
        if (db) db.close;
    }
}

bukaDatabase().then(db => {
    const tx = db.transaction("konsumsiHarian", "readonly");
    const store = tx.objectStore("konsumsiHarian");
    const getAll = store.getAll();

    getAll.onsuccess = function () {
        console.log("Data konsumsi harian:", getAll.result);
    };

    tx.oncomplete = () => db.close();
}).catch(error => {
    console.error("Gagal membuka database", error);
});



let konsumsiSaatIni = 0;
const target = 2025;
const jumlahMinumMl = 135;
const tanggalSaatIni = new Date().toISOString().split("T")[0];
const maksInactiveDurasi = 24 * 60 * 60 * 1000;
let notifInterval;

function memintaIzinNotifikasi() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Izin notifkasi sudah diberikan");
                    mulaiNotifikasi();
            }
        });
    } else {
        mulaiNotifikasi();
    }
}
function mulaiNotifikasi() {
    if (!notifInterval) {
        notifInterval = setInterval(kirimNotifikasi, 3600000);
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
        "Jangan sampai Pio mati, ambil air sekarang!",
        "Pio senang kalau Kamu minum air yang cukup",
        "Tubuhmu membutuhkan 135 ml lagi",
        "Sekarang ambil gelas minumlah"
    ];
    
    const notifAcak = pesanMotivasi[Math.floor(Math.random() * pesanMotivasi.length)];
    console.log("Pesan Notifikasi:", notifAcak);

    if(Notification.permission === "granted" && navigator.serviceWorker) {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification("Waktunya minum!", {
                body: notifAcak,
                icon: "https://raw.githubusercontent.com/aflacake/piodrink/main/img/pio.png"
            });
        });
    } else {
        console.log("Izin notifikasi tidak diberikan");
    }
}


async function perbaruiKonsumsi() {
    konsumsiSaatIni += jumlahMinumMl;
    await simpanKonsumsiHarian(jumlahMinumMl);

    let totalKonsumsi = parseInt(localStorage.getItem("totalKonsumsi") || 0);
    totalKonsumsi += jumlahMinumMl;
    localStorage.setItem("totalKonsumsi", totalKonsumsi);
    document.getElementById("totalKonsumsi").innerText = totalKonsumsi;

    const tersisa = target - konsumsiSaatIni;

    document.getElementById("jumlahSekarang").innerText = konsumsiSaatIni;
    document.getElementById("jumlahTersisa").innerText = tersisa;
    document.getElementById("progressKonsumsi").value = konsumsiSaatIni;

    localStorage.setItem("konsumsiSaatIni", konsumsiSaatIni);
    localStorage.setItem("waktuMinumTerakhir", new Date().getTime());

    const perbaruBtn = document.getElementById("minumBtn");
    perbaruBtn.disabled = true;
    perbaruBtn.innerText = "Tunggu 1 jam...";
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
    const minumBtn = document.getElementById("minumBtn");
    if (!minumBtn) {
        console.error("Tombol minum tidak ditemukan saat mengaktifkan");
        return;
    }

    minumBtn.disabled = false;
    minumBtn.innerText = "Beri Pio Minum";
}

function cekStatusTombol() {
    const waktuSimpan = parseInt(localStorage.getItem("tombolDisabledSampai") || 0);
    const sekarang = Date.now();

    const btn = document.getElementById("minumBtn");
    if (!btn) {
        console.error("Tombol minum tidak ditemukan saat cek status");
        return;
    }

    if (sekarang < waktuSimpan) {
        console.log("Tombol masih dinonaktifkan.");
        btn.disabled = true;
        btn.innerText = "Tunggu 1 jam...";

        const waktuTersisa = waktuSimpan - sekarang;
        setTimeout(aktifkanTombol, waktuTersisa);
    } else {
        console.log("Tombol aktif.");
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
        let data = parseInt(localStorage.getItem("konsumsiSaatIni"));
        konsumsiSaatIni = isNaN(data) ? 0 : data;

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
        statusElement.style.color = "black";
        gambarPio.src = "https://raw.githubusercontent.com/aflacake/piodrink/main/img/pio.png";
    }
}



document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById("minumBtn");
    const suaraAir = document.getElementById("suaraAir");
    if (!btn || !suaraAir) {
        console.error("Tombol atau elemen suara tidak ditemukan.");
        return;
    }

    memintaIzinNotifikasi();

    document.getElementById("jumlahTanaman").innerText = localStorage.getItem("jumlahTanaman") || 0;

    document.getElementById("totalKonsumsi").innerText = localStorage.getItem("totalKonsumsi") || 0;

    cekResetHarian();

    cekStatusTombol();

    cekInactivity();
    setInterval(cekInactivity, 5000);

    document.getElementById("minumBtn").addEventListener("click", async function() {
        console.log("Tombol diklik.");
        const suaraAir = document.getElementById("suaraAir");
        suaraAir.style.display = "none";

        suaraAir.currentTime = 0;
        suaraAir.play().catch(error => {
            console.warn("Gagal memutar suara: ", error);
        });

        await perbaruiKonsumsi();
    });
});
