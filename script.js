document.addEventListener('DOMContentLoaded', function() {

    // 分頁切換功能
    const tabLinks = document.querySelectorAll('.tab-link, .nav-card');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);

            document.querySelectorAll('.tab-link').forEach(innerLink => {
                innerLink.classList.remove('active');
                if (innerLink.getAttribute('href') === `#${targetId}`) {
                    innerLink.classList.add('active');
                }
            });

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetId) {
                    content.classList.add('active');
                }
            });
            window.scrollTo(0, 0);
        });
    });

    // 字詞卡翻轉功能
    const flashcards = document.querySelectorAll('.flashcard');
    flashcards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });

    // 測驗提交功能
    const submitButton = document.getElementById('submit-quiz');
    submitButton.addEventListener('click', function() {
        const answers = {
            q1: 'b',
            q2: 'c'
        };
        let score = 0;
        let resultsHTML = '<h3>測驗結果：</h3>';

        // --- 批改選擇題 ---
        // 檢查第一題
        const q1Answer = document.querySelector('input[name="q1"]:checked');
        if (q1Answer) {
            if (q1Answer.value === answers.q1) {
                score++;
                resultsHTML += '<p class="correct">第一題：正確！</p>';
            } else {
                resultsHTML += '<p class="incorrect">第一題：錯誤。正確答案是 B. 犬、馬。</p>';
            }
        } else {
            resultsHTML += '<p class="incorrect">第一題：未作答。</p>';
        }

        // 檢查第二題
        const q2Answer = document.querySelector('input[name="q2"]:checked');
        if (q2Answer) {
            if (q2Answer.value === answers.q2) {
                score++;
                resultsHTML += '<p class="correct">第二題：正確！</p>';
            } else {
                resultsHTML += '<p class="incorrect">第二題：錯誤。正確答案是 C. 輕微、委婉。</p>';
            }
        } else {
            resultsHTML += '<p class="incorrect">第二題：未作答。</p>';
        }

        resultsHTML += `<h4>選擇題得分：${score} / 2</h4><hr>`;
        
        // --- 顯示長問題的參考答案 ---
        // 第三題
        const q3UserAnswer = document.getElementById('q3').value;
        resultsHTML += '<h4>第三題參考答案：</h4>';
        resultsHTML += `<p><strong>你的答案：</strong>${q3UserAnswer || '（未作答）'}</p>`;
        resultsHTML += '<p><strong>參考方向：</strong>孔子認為「禮」是維繫社會秩序和人倫關係的規範。孝順並非純粹的個人情感，更是一種社會責任。依禮行事，能確保子女對父母的尊敬和奉養是以一種莊重、合宜的方式進行，避免因過度或不足而失當。這也將孝行從單純的家庭倫理，提升到維護社會和諧的層次，因此是孝的重要體現。</p><hr>';
        
        // 第四題
        const q4UserAnswer = document.getElementById('q4').value;
        resultsHTML += '<h4>第四題參考答案：</h4>';
        resultsHTML += `<p><strong>你的答案：</strong>${q4UserAnswer || '（未作答）'}</p>`;
        resultsHTML += '<p><strong>參考方向：</strong>一個好的方案應體現「敬而不違」和「勞而不怨」的精神。例如：</p>';
        resultsHTML += '<ul>';
        resultsHTML += '<li><strong>表達關心（勞）：</strong>不直接指責，而是找機會（如吃飯時）溫和地說：「最近看您們常用手機，眼睛會不會不舒服？要不要多休息一下？」</li>';
        resultsHTML += '<li><strong>委婉勸諫（幾諫）：</strong>分享一些關於長時間使用手機對健康影響的文章或新聞給他們，或者建議一些可以替代的家庭活動，如飯後散步、一起看電視節目等。</li>';
        resultsHTML += '<li><strong>尊重態度（敬不違）：</strong>如果父母暫時沒有改變，也不要強迫或爭吵，保持耐心，在日常生活中繼續表達關心，尋找更合適的時機溝通。</li>';
        resultsHTML += '</ul>';

        document.getElementById('quiz-results').innerHTML = resultsHTML;
    });

    // 每日名言 (與孝相關)
    const quotes = [
        "弟子入則孝，出則弟。",
        "父母在，不遠游，游必有方。",
        "父母之年，不可不知也。一則以喜，一則以懼。",
        "事父母幾諫，見志不從，又敬不違，勞而不怨。",
        "三年無改於父之道，可謂孝矣。",
        "不得乎親，不可以為人；不順乎親，不可以為子。",
        "孝子之至，莫大乎尊親。",
        "老吾老以及人之老，幼吾幼以及人之幼。",
        "樹欲靜而風不止，子欲養而親不待。",
        "身體髮膚，受之父母，不敢毀傷，孝之始也。",
        "羊有跪乳之恩，烏鴉有反哺之義。",
        "親親，仁也；敬長，義也。",
        "好飯先盡娘用，好衣先盡娘穿。",
        "千萬經典，孝義為先。"
    ];
    
    // 根據日期選擇名言，確保每天不同
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % quotes.length;
    const quoteElement = document.getElementById('quote-of-the-day');
    quoteElement.textContent = quotes[quoteIndex];
});
