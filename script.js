// script.js
// ডিফল্ট ডেমো ডেটা (যদি অ্যাডমিন থেকে কিছু যোগ না করা থাকে)
const defaultAnime = [
    {
        id: "1",
        title: "Demon Slayer",
        poster: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
        video: "https://www.w3schools.com/html/mov_bbb.mp4", // ডেমো MP4
        description: "Tanjiro becomes a demon slayer to avenge his family and cure his sister."
    },
    {
        id: "2",
        title: "Jujutsu Kaisen",
        poster: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
        video: "https://www.w3schools.com/html/mov_bbb.mp4", // ডেমো MP4
        description: "Yuji Itadori swallows a cursed finger to save his friends."
    }
];

// LocalStorage থেকে Anime লোড করা
function getAnimeList() {
    let saved = localStorage.getItem('snac_anime_db');
    if (!saved) {
        localStorage.setItem('snac_anime_db', JSON.stringify(defaultAnime));
        return defaultAnime;
    }
    return JSON.parse(saved);
}

// হোম পেজে Anime রেন্ডার করা
function renderHome() {
    const grid = document.getElementById('animeGrid');
    if (!grid) return; // যদি এই পেজে না থাকে

    const animeList = getAnimeList();
    grid.innerHTML = '';

    if (animeList.length === 0) {
        grid.innerHTML = '<p style="color:#aaa;">কোনো Anime নেই। অ্যাডমিন প্যানেল থেকে যোগ করুন।</p>';
        return;
    }

    animeList.forEach(anime => {
        const card = document.createElement('a');
        card.href = `watch.html?id=${anime.id}`;
        card.className = 'anime-card';
        
        // ছবি না থাকলে প্লেসহোল্ডার
        const imgSrc = anime.poster || 'https://via.placeholder.com/300x400?text=No+Image';

        card.innerHTML = `
            <img src="${imgSrc}" alt="${anime.title}" onerror="this.src='https://via.placeholder.com/300x400?text=No+Image'">
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <p>▶ Watch Now</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// পেজ লোড হলে রান হবে
document.addEventListener('DOMContentLoaded', renderHome);