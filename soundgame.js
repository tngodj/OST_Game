// 영화 데이터 (OST와 제목)
const movies = [
    { title: "고양이의 보은", ost: "고양이 보은1.m4a", video: "고양이 보은1.gif" },
    { title: "고양이의 보은", ost: "고양이 보은2.m4a", video: "고양이 보은2.gif" },
    { title: "벼랑 끝의 포뇨", ost: "포뇨1.m4a", video: "포뇨1.gif" },
    { title: "벼랑 끝의 포뇨", ost: "포뇨2.m4a", video: "포뇨2.gif" },
    { title: "벼랑 끝의 포뇨", ost: "포뇨3.m4a", video: "포뇨3.gif" },
    { title: "하울의 움직이는성", ost: "하울1.m4a", video: "하울1.gif" },
    { title: "하울의 움직이는성", ost: "하울2.m4a", video: "하울2.gif" },
    { title: "하울의 움직이는성", ost: "하울3.m4a", video: "하울3.gif" },
    { title: "천공의성 라퓨타", ost: "천공1.m4a", video: "천공1.gif" },
    { title: "천공의성 라퓨타", ost: "천공2.m4a", video: "천공2.gif" },
    { title: "천공의성 라퓨타", ost: "천공3.m4a", video: "천공3.gif" },
    { title: "이웃집 토토로", ost: "토토로1.m4a", video: "토토로1.gif" },
    { title: "이웃집 토토로", ost: "토토로2.m4a", video: "토토로2.gif" },
    { title: "이웃집 토토로", ost: "토토로3.m4a", video: "토토로3.gif" },
    { title: "센과 치히로의 해방불명", ost: "센과치히로1.m4a", video: "센과치히로1.gif" },
    { title: "센과 치히로의 해방불명", ost: "센과치히로2.m4a", video: "센과치히로2.gif" },
    { title: "센과 치히로의 해방불명", ost: "센과치히로3.m4a", video: "센과치히로3.gif" },
];

// 기본 게임 설정
let currentMovieIndex = 0;
let score = 0; // 초기 점수
let timeLeft = 30; // 시간 제한(초)
let timer; // 타이머 변수
let shuffledMovies = []; // 섞인 영화 배열
let totalQuestions = 10;  // 문제 수 설정 (기본 10문제)
let hasAnsweredCorrectly = false; // 정답 여부를 체크하는 변수

// 오디오 플레이어와 GIF 이미지
let audioPlayer = document.getElementById("audio-player");
let movieImage = document.getElementById("movie-image");  // GIF 이미지

// 페이지 로드 시, 영화 목록 섞기 및 첫 번째 문제 로드
document.addEventListener("DOMContentLoaded", () => {
    shuffledMovies = shuffleArray([...movies]); // 영화 목록 랜덤 섞기
    shuffledMovies = shuffledMovies.slice(0, totalQuestions); // 게임에 사용할 문제 수 설정
    loadMovie();  // 첫 번째 문제 로드
});

// 배열을 섞는 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 두 요소를 교환
    }
    return array;
}

// 문제 로드 시 OST 및 동영상 재생
function loadMovie() {
    const movie = shuffledMovies[currentMovieIndex];

    // OST 파일 경로 설정
    audioPlayer.src = movie.ost;
    audioPlayer.preload = "auto"; // 오디오 미리 로드
    audioPlayer.play();  // OST 재생

    // 비디오 파일 경로 설정 (GIF가 있을 경우)
    if (movie.video) {
        movieImage.src = movie.video;        // GIF 경로 설정
        movieImage.style.display = "block";  // GIF 보이기
    } else {
        movieImage.style.display = "none";   // GIF 숨기기
    }

    // 타이틀 및 입력 필드 초기화
    document.getElementById("result").innerText = ''; 
    document.getElementById("answer-input").value = ''; 
    document.getElementById("answer-input").disabled = false; // 입력 필드 활성화
    resetTimer(); // 타이머 초기화

    // 남은 문제 수 업데이트
    document.getElementById("questions-left").innerText = `남은 문제: ${shuffledMovies.length - currentMovieIndex - 1}`; // 남은 문제 수 갱신
}

function resetTimer() {
    // 타이머가 이미 실행 중이면 clearInterval로 종료
    if (timer) {
        clearInterval(timer);
    }

    timeLeft = 30; // 초기 시간 설정
    document.getElementById("timer").innerText = `남은 시간: ${timeLeft}초`;

    // 타이머 새로 시작
    timer = setInterval(() => {
        timeLeft--;  // 시간을 1초씩 감소
        document.getElementById("timer").innerText = `남은 시간: ${timeLeft}초`;

        if (timeLeft <= 0) {  // 시간이 0이 되면
            clearInterval(timer); // 타이머 종료
            document.getElementById("result").innerText = "시간이 다 되었습니다!"; // 시간 초과 시 메시지
            document.getElementById("answer-input").disabled = true; // 입력 비활성화
        }
    }, 1000);
}

// 문제를 넘기는 함수
function nextMovie() {
    if (currentMovieIndex < shuffledMovies.length - 1) {
        currentMovieIndex++; // 문제 인덱스 증가
        loadMovie(); // 새 문제 로드

        // 초기화: 정답 여부, 메시지, 입력 필드
        hasAnsweredCorrectly = false; // 정답 여부 초기화
        document.getElementById("submit-button").disabled = false; // 제출 버튼 활성화
        document.getElementById("answer-input").disabled = false; // 입력 필드 활성화
        document.getElementById("result").innerText = ''; // 결과 메시지 초기화
        document.getElementById("answer-input").value = ''; // 입력 필드 초기화

        resetTimer(); // 타이머 초기화 (새 문제에 대해 타이머가 새로 시작)
    } else {
        endGame(); // 게임 종료 처리
    }
}

// 제출 버튼 클릭
document.getElementById("submit-button").addEventListener("click", () => {
    if (hasAnsweredCorrectly) {
        alert("이미 정답을 맞혔습니다.");
        return; // 이미 정답을 맞혔으면 점수를 추가하지 않음
    }

    const answer = document.getElementById("answer-input").value.trim().replace(/\s+/g, '').toLowerCase(); // 공백 제거 및 소문자 변환
    const correctAnswer = shuffledMovies[currentMovieIndex].title.trim().replace(/\s+/g, '').toLowerCase(); // 정답의 공백 제거 및 소문자 변환

    if (answer === correctAnswer) {
        score += 1; // 점수 1점 추가
        document.getElementById("result").innerText = "정답입니다! 🎉"; // 정답 메시지
        document.getElementById("score").innerText = `현재 점수: ${score}`; // 점수 업데이트
        clearInterval(timer); // 정답을 맞히면 타이머 멈추기

        hasAnsweredCorrectly = true; // 정답 맞혔으므로, 더 이상 제출할 수 없도록 설정
        document.getElementById("submit-button").disabled = true; // 제출 버튼 비활성화
    } else {
        document.getElementById("result").innerText = "틀렸습니다!"; // 틀렸을 경우 메시지
    }
});

// 문제를 넘기는 함수
document.getElementById("next-button").addEventListener("click", nextMovie);

// 나가기 버튼 클릭시 초기화 및 메인으로 이동
document.getElementById("reset-button").addEventListener("click", () => {
    localStorage.removeItem('players');
    window.location.href = 'https://tngodj.github.io/Retire-Page/'; // 소개 페이지로 이동------------------------------------------------------------------------------------------------------------------------------------
});

// 게임 종료 처리
function endGame() {
    clearInterval(timer); // 타이머 정지

    const playerName = prompt("이름을 입력하세요:"); // 플레이어 이름 입력
    if (playerName) {
        // 기존에 저장된 플레이어 리스트를 로드
        let players = JSON.parse(localStorage.getItem('players')) || [];

        // 새로운 플레이어 추가
        players.push({ name: playerName, score: score });

        // 점수 내림차순으로 정렬
        players.sort((a, b) => b.score - a.score);

        // 로컬 스토리지에 점수 저장
        localStorage.setItem('players', JSON.stringify(players));

        // 5명이 넘으면 자동 초기화
        if (players.length > 5) {
            alert("플레이어가 5명이 넘었습니다. 순위가 초기화됩니다.");
            localStorage.removeItem('players'); // 순위 초기화
        } else {
            // 5명이 안 넘으면 점수 저장
            localStorage.setItem('players', JSON.stringify(players));
        }
    }

    // 결과 페이지로 이동
    window.location.href = 'soundresult.html'; // 순위표 페이지로 이동
}
