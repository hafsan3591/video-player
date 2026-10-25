// admin.js
function getAnimeList() {
    let saved = localStorage.getItem('snac_anime_db');
    return saved ? JSON.parse(saved) : [];
}

function saveAnimeList(list) {
    localStorage.setItem('snac_anime_db', JSON.stringify(list));
}

// নতুন Anime যোগ করা
function addAnime() {
    const title = document.getElementById('animeTitle').value.trim();
    const poster = document.getElementById('animePoster').value.trim();
    const video = document.getElementById('animeVideo').value.trim();
    const desc = document.getElementById('animeDesc').value.trim();

    if (!title || !video) {
        alert("Anime Name এবং Video Link অবশ্যই দিতে হবে!");
        return;
    }

    const animeList = getAnimeList();
    const newAnime = {
        id: Date.now().toString(), // ইউনিক আইডি
        title: title,
        poster: poster,
        video: video,
        description: desc
    };

    animeList.push(newAnime);
    saveAnimeList(animeList);

    // ফর্ম খালি করা
    document.getElementById('animeTitle').value = '';
    document.getElementById('animePoster').value = '';
    document.getElementById('animeVideo').value = '';
    document.getElementById('animeDesc').value = '';

    alert("Anime সফলভাবে যোগ হয়েছে!");
    renderAdminList();
}

// অ্যাডমিন লিস্টে Anime দেখানো
function renderAdminList() {
    const listDiv = document.getElementById('adminList');
    if (!listDiv) return;

    const animeList = getAnimeList();
    listDiv.innerHTML = '';

    if (animeList.length === 0) {
        listDiv.innerHTML = '<p style="color:#aaa;">কোনো Anime নেই।</p>';
        return;
    }

    animeList.forEach(anime => {
        const item = document.createElement('div');
        item.className = 'admin-item';
        item.innerHTML = `
            <div>
                <strong style="color: white;">${anime.title}</strong><br>
                <span style="font-size: 12px; color: #888;">ID: ${anime.id}</span>
            </div>
            <button class="btn btn-delete" onclick="deleteAnime('${anime.id}')">Delete</button>
        `;
        listDiv.appendChild(item);
    });
}

// Anime ডিলিট করা
function deleteAnime(id) {
    if (!confirm("আপনি কি সত্যিই এই Anime ডিলিট করতে চান?")) return;

    let animeList = getAnimeList();
    animeList = animeList.filter(a => a.id !== id);
    saveAnimeList(animeList);
    
    renderAdminList();
}

// পেজ লোড হলে রান হবে
document.addEventListener('DOMContentLoaded', renderAdminList);