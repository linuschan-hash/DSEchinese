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

    // --- 每日測驗題庫 ---
    const dailyQuizzes = [
        { // 第 1 日題目
            mcqs: [
                {
                    question: "1. (選擇題) 孔子在《論孝》中，認為只「能養」而「不敬」，與飼養甚麼沒有分別？",
                    options: { a: "雞、豬", b: "犬、馬", c: "魚、鳥" },
                    answer: "b"
                },
                {
                    question: "2. (選擇題) 「事父母幾諫」一句中的「幾」字是甚麼意思？",
                    options: { a: "幾次", b: "幾乎", c: "輕微、委婉" },
                    answer: "c"
                }
            ],
            long_question: {
                question: "3. (長問答) 孔子對孟懿子說「無違」，並闡述為「生，事之以禮；死，葬之以禮，祭之以禮。」請解釋為什麼「不違背禮節」是孝的重要體現。",
                placeholder: "請在此輸入你的答案...",
                id: "q3",
                reference: "孔子認為「禮」是維繫社會秩序和人倫關係的規範。孝順並非純粹的個人情感，更是一種社會責任。依禮行事，能確保子女對父母的尊敬和奉養是以一種莊重、合宜的方式進行，避免因過度或不足而失當。這也將孝行從單純的家庭倫理，提升到維護社會和諧的層次，因此是孝的重要體現。"
            }
        },
        { // 第 2 日題目
            mcqs: [
                {
                    question: "1. (選擇題) 《說文解字》中，「孝」字的結構「子承老」表達了甚麼核心意象？",
                    options: { a: "子女繼承長輩的財產", b: "子女服從和奉養長輩", c: "子女與長輩平等對話" },
                    answer: "b"
                },
                {
                    question: "2. (選擇題) 「父母之年，不可不知也。一則以喜，一則以懼。」這句話中的「懼」是指甚麼？",
                    options: { a: "害怕父母責罵", b: "因父母年邁而擔憂時日無多", c: "害怕奉養父母的責任" },
                    answer: "b"
                }
            ],
            long_question: {
                question: "3. (長問答) 請解釋《論孝》中「敬」的層次，以及為什麼孔子認為「敬」是區分人與動物的關鍵。",
                placeholder: "請在此闡述你對「敬」的理解...",
                id: "q3",
                reference: "「敬」是指發自內心的恭敬與尊重。孔子認為，如果奉養父母（能養）時沒有「敬」，那就和飼養犬馬沒有區別，因為飼養動物也能提供物質所需。因此，「敬」是孝行的精神核心，體現了對父母人格的尊重和情感的真誠，這是人類倫理的獨特之處，也是孝道超越單純物質供養的關鍵。"
            }
        },
        { // 第 3 日題目
            mcqs: [
                {
                    question: "1. (選擇題) 「三年無改於父之道，可謂孝矣。」這句話強調的是孝在哪一方面的表現？",
                    options: { a: "對父親教誨的繼承與尊重", b: "三年內不可改變家裡的任何佈置", c: "父親去世後要守孝三年" },
                    answer: "a"
                },
                {
                    question: "2. (選擇題) 「身體髮膚，受之父母，不敢毀傷，孝之始也。」這句話的涵義是什麼？",
                    options: { a: "完全不能理髮或修剪指甲", b: "不能參加任何危險的活動", c: "愛護自己的身體是孝道的開端" },
                    answer: "c"
                }
            ],
            long_question: {
                question: "3. (長問答) 結合「事父母幾諫，見志不從，又敬不違，勞而不怨」的原則，構思一個具體行動方案，應對父母沉迷手機的問題。",
                placeholder: "請在此構思你的行動方案...",
                id: "q3",
                reference: "一個好的方案應體現「敬而不違」和「勞而不怨」的精神。例如：\n1. **表達關心（勞）：**不直接指責，而是找機會（如吃飯時）溫和地說：「最近看您們常用手機，眼睛會不會不舒服？要不要多休息一下？」\n2. **委婉勸諫（幾諫）：**分享一些關於長時間使用手機對健康影響的文章或新聞給他們，或者建議一些可以替代的家庭活動，如飯後散步、一起看電視節目等。\n3. **尊重態度（敬不違）：**如果父母暫時沒有改變，也不要強迫或爭吵，保持耐心，在日常生活中繼續表達關心，尋找更合適的時機溝通。"
            }
        }
    ];

    // --- 載入每日測驗功能 ---
    function loadDailyQuiz() {
        const quizContent = document.getElementById('quiz-content');
        if (!quizContent) return; // 如果測驗區塊不存在則退出

        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const quizIndex = dayOfYear % dailyQuizzes.length;
        const currentQuiz = dailyQuizzes[quizIndex];
        
        let html = '';

        // 載入選擇題
        currentQuiz.mcqs.forEach((mcq, index) => {
            html += `<div class="quiz-question">`;
            html += `<p>${mcq.question}</p>`;
            for (const key in mcq.options) {
                html += `<label><input type="radio" name="mcq${index}" value="${key}"> ${key.toUpperCase()}. ${mcq.options[key]}</label><br>`;
            }
            html += `</div>`;
        });

        // 載入長問答
        const lq = currentQuiz.long_question;
        html += `<div class="quiz-question">`;
        html += `<p>${lq.question}</p>`;
        html += `<textarea id="${lq.id}" rows="6" placeholder="${lq.placeholder}"></textarea>`;
        html += `</div>`;
        
        quizContent.innerHTML = html;
        document.getElementById('quiz-results').innerHTML = ''; // 清除上次的結果
    }

    // --- 測驗提交功能 ---
    const submitButton = document.getElementById('submit-quiz');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            // 再次獲取當日題目以核對答案
            const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
            const quizIndex = dayOfYear % dailyQuizzes.length;
            const currentQuiz = dailyQuizzes[quizIndex];

            let mcqScore = 0;
            const maxMcqScore = currentQuiz.mcqs.length * 5; // 每題選擇題 5 分
            const maxLqScore = 5; // 長問答 5 分
            const maxTotalScore = maxMcqScore + maxLqScore;
            
            let resultsHTML = '<h3>測驗結果：</h3>';

            // --- 批改選擇題 ---
            currentQuiz.mcqs.forEach((mcq, index) => {
                const questionNum = index + 1;
                const userAnswer = document.querySelector(`input[name="mcq${index}"]:checked`);
                
                resultsHTML += `<hr><h4>第 ${questionNum} 題 (選擇題)</h4>`
                if (userAnswer) {
                    if (userAnswer.value === mcq.answer) {
                        mcqScore += 5;
                        resultsHTML += '<p class="correct">回答正確！</p>';
                    } else {
                        resultsHTML += `<p class="incorrect">回答錯誤。</p>`;
                    }
                    resultsHTML += `<p>正確答案是：<strong>${mcq.answer.toUpperCase()}. ${mcq.options[mcq.answer]}</strong></p>`;
                } else {
                    resultsHTML += `<p class="incorrect">您未作答。</p><p>正確答案是：<strong>${mcq.answer.toUpperCase()}. ${mcq.options[mcq.answer]}</strong></p>`;
                }
            });
            
            // --- 批改長問答 (提供回饋與自評建議) ---
            const lq = currentQuiz.long_question;
            const lqUserAnswer = document.getElementById(lq.id).value;
            resultsHTML += `<hr><h4>第 ${currentQuiz.mcqs.length + 1} 題 (長問答)</h4>`;
            resultsHTML += `<p><strong>你的答案：</strong><br>${lqUserAnswer.replace(/\n/g, '<br>') || '（未作答）'}</p>`;
            resultsHTML += `<p><strong>參考答案：</strong><br>${lq.reference}</p>`;
            
            resultsHTML += `<p><strong>評分建議 (本題佔 ${maxLqScore} 分)：</strong></p><ul>`;
            resultsHTML += `<li>能準確理解題意，回答方向正確 (建議 1-2 分)</li>`;
            resultsHTML += `<li>能引用《論孝》原文或核心概念支持論點 (建議 1-2 分)</li>`;
            resultsHTML += `<li>論述清晰，結構完整 (建議 1 分)</li></ul>`;
            resultsHTML += `<p><em>*長問答題請根據參考答案和評分建議自行評估。</em></p>`;

            // --- 最終分數顯示 ---
            resultsHTML += `<hr><h3>總結</h3>`;
            resultsHTML += `<p>選擇題得分：<strong>${mcqScore} / ${maxMcqScore}</strong></p>`;
            resultsHTML += `<p>請根據以上建議，為你的長問答評分，以計算最終總分 (滿分 ${maxTotalScore} 分)。</p>`;

            document.getElementById('quiz-results').innerHTML = resultsHTML;
        });
    }

    // --- 每日名言 ---
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
    
    const quoteElement = document.getElementById('quote-of-the-day');
    if (quoteElement) {
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const quoteIndex = dayOfYear % quotes.length;
        quoteElement.textContent = quotes[quoteIndex];
    }
    
    // --- 頁面初始化 ---
    loadDailyQuiz();
});
