// watch.js
function getAnimeList() {
    let saved = localStorage.getItem('snac_anime_db');
    return saved ? JSON.parse(saved) : [];
}

function loadVideo() {
    // URL থেকে ID বের করা (যেমন watch.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('id');

    if (!animeId) {
        window.location.href = "index.html";
        return;
    }

    const animeList = getAnimeList();
    const anime = animeList.find(a => a.id === animeId);

    if (!anime) {
        document.getElementById('watchTitle').innerText = "Anime Not Found!";
        return;
    }

    // পেজের টাইটেল এবং ডেসক্রিপশন আপডেট
    document.title = `Watching ${anime.title} - SNAC ANIME`;
    document.getElementById('watchTitle').innerText = anime.title;
    document.getElementById('watchDesc').innerText = anime.description || "";

    const videoWrapper = document.getElementById('videoWrapper');
    videoWrapper.innerHTML = ''; // আগের ভিডিও ক্লিয়ার

    // ভিডিও লিংক চেক করা (MP4 না YouTube)
    const videoUrl = anime.video;
    
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        // YouTube এম্বেড
        let videoId = "";
        if (videoUrl.includes('youtu.be/')) {
            videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
        } else if (videoUrl.includes('watch?v=')) {
            videoId = videoUrl.split('watch?v=')[1].split('&')[0];
        } else if (videoUrl.includes('embed/')) {
            videoId = videoUrl.split('embed/')[1].split('?')[0];
        }
        
        videoWrapper.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" allowfullscreen allow="autoplay"></iframe>`;
    } else {
        // সাধারণ MP4 ভিডিও
        videoWrapper.innerHTML = `<video src="${videoUrl}" controls autoplay></video>`;
    }
}

document.addEventListener('DOMContentLoaded', loadVideo);