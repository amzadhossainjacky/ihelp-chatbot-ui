document.addEventListener('DOMContentLoaded', () => {

    const carousel = document.getElementById('carousel_ar');
    const prevBtn = document.querySelector('.prev_ar');
    const nextBtn = document.querySelector('.next_ar');

    const totalItems = carousel.children.length;
    const cardWidth = 350;
    let index = 0;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * cardWidth}px)`;

        prevBtn.classList.toggle('hidden', index === 0);
        nextBtn.classList.toggle('hidden', index === totalItems - 1);
    }

    nextBtn.addEventListener('click', () => {
        if (index < totalItems - 1) {
            index++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (index > 0) {
            index--;
            updateCarousel();
        }
    });

    updateCarousel();

    const attachBtn = document.getElementById('attachBtn_ar');
    const attachmentInput = document.getElementById('attachmentInput_ar');
    const attachmentList = document.querySelector('.attachment_list_ar');

    let attachments = []; // store selected files

    // Open file selector
    attachBtn.addEventListener('click', () => {
        attachmentInput.click();
    });

    // Handle file selection
    attachmentInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            // Avoid duplicates
            if (!attachments.find(f => f.name === file.name && f.size === file.size)) {
                attachments.push(file);
                renderAttachment(file);
            }
        });

        // Clear input for next selection
        attachmentInput.value = '';
    });

    function renderAttachment(file) {
        const tag = document.createElement('div');
        tag.className = 'attachment_tag_ar';
        tag.textContent = file.name;

        const removeBtn = document.createElement('span');
        removeBtn.innerHTML = '&times;';
        removeBtn.addEventListener('click', () => {
            attachments = attachments.filter(f => f !== file);
            tag.remove();
        });

        tag.appendChild(removeBtn);
        attachmentList.appendChild(tag);
    }

    // Optional: get attachments before sending form
    window.getAttachments = () => attachments; // returns array of File objects

    /* ===============================
      LANGUAGE DICTIONARY
   =============================== */
    const translations = {
        en: {
            add_ticket: "Add Ticket",
            tickets: "Tickets",
            issue_category: "Issue Category",
            chat: "Chat",
            subject: "subject",
            product: "Product",
            knowledge: "Knowledge",
            case_information: "Case Information",
            contact_name: "Contact Name",
            email: "Email",
            description: "Description",
            sector_user: "Sector of user reporting issues",
            bsw_application: "BSW Application",
            agency_type: "Agency Type",
            type_of_clp: "Type of CLP",
            verify_proceed: "Please verify to proceed",
            submit: "Submit",
            reset: "Reset",
            powered_by: "Powered by iHelpBD",
            start_with_phone: "Start With Phone Number",
            live_chat_agent: "Chat with our agent directly",
            getting_started: "Getting Started",
            knowledge_base: "Knowledge Base",
        },

        bn: {
            add_ticket: "টিকিট যোগ করুন",
            tickets: "টিকিট",
            issue_category: "সমস্যার ধরন ",
            chat: "চ্যাট",
            subject: "বিষয়",
            product: "প্রোডাক্ট",
            knowledge: "জ্ঞানভাণ্ডার",
            case_information: "কেস তথ্য",
            contact_name: "যোগাযোগের নাম",
            email: "ইমেইল",
            description: "বিবরণ",
            sector_user: "সমস্যা রিপোর্টকারী ব্যবহারকারীর খাত",
            bsw_application: "বিএসডব্লিউ অ্যাপ্লিকেশন",
            agency_type: "সংস্থার ধরন",
            type_of_clp: "CLP এর ধরন",
            verify_proceed: "এগিয়ে যেতে যাচাই করুন",
            submit: "জমা দিন",
            reset: "রিসেট",
            powered_by: "iHelpBD দ্বারা চালিত",
            start_with_phone: "ফোন নম্বর দিয়ে শুরু করুন",
            live_chat_agent: "সরাসরি আমাদের এজেন্টের সাথে চ্যাট করুন",
            getting_started: "শুরু করুন",
            knowledge_base: "জ্ঞানভাণ্ডার",
        }
    };

    /* ===============================
       UPDATE HEADER TITLE BASED ON ACTIVE TAB & LANGUAGE
    =============================== */
    function updateHeaderTitle() {
        const lang = localStorage.getItem("chatbot_lang") || "en";
        const activeTab = document.querySelector('.tab_ar.active_ar');
        const headerTitle = document.getElementById('header_title_ar');
        
        if (!activeTab || !headerTitle) return;
        
        const target = activeTab.dataset.tab;
        
        switch (target) {
            case 'tickets_ar':
                headerTitle.innerText = translations[lang].add_ticket;
                break;
                
            case 'chat_ar':
                headerTitle.innerText = translations[lang].getting_started;
                break;
                
            case 'product_ar':
                headerTitle.innerText = translations[lang].product;
                break;
                
            case 'kb_ar':
                headerTitle.innerText = translations[lang].knowledge_base;
                break;
        }
    }

    /* ===============================
       LANGUAGE SWITCH FUNCTION
    =============================== */
    function setLanguage(lang) {

        // Update all text nodes
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.dataset.i18n;
            if (translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });

        // Update dropdown header label
        const dropdownTrigger = document.getElementById("dropdownTrigger_ar");
        dropdownTrigger.innerHTML =
            `<i class="fa-solid fa-globe"></i> ${lang === "en" ? "English" : "বাংলা"} <i class="fa-solid fa-caret-down"></i>`;

        // Update active language UI
        document.querySelectorAll(".language_list_ar li")
            .forEach(li => li.classList.remove("active_ar"));

        document.querySelector(`.language_list_ar a[data-lang="${lang}"]`)
            ?.parentElement.classList.add("active_ar");

        // Save preference
        localStorage.setItem("chatbot_lang", lang);
        
        // Update header title for current active tab
        updateHeaderTitle();
    }

    /* ===============================
       LANGUAGE CLICK EVENTS
    =============================== */
    document.querySelectorAll(".language_list_ar a").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const lang = link.dataset.lang;
            setLanguage(lang);
        });
    });

    /* ===============================
       LOAD SAVED LANGUAGE
    =============================== */
    const savedLang = localStorage.getItem("chatbot_lang") || "en";
    setLanguage(savedLang);

    let isPhoneStep = true;

    /* ===== CHAT OPEN / CLOSE ===== */
    const chatBtn = document.querySelector('.chatbot_show_button_ar');
    const chatBox = document.querySelector('.chatbot_layout_ar');
    const closeBtn = document.querySelector('.close_chatbot_ar');

    chatBtn.addEventListener('click', () => {
        chatBox.style.display = 'flex';
        chatBox.classList.add('slide-up');
        chatBtn.style.display = 'none';
    });

    closeBtn.addEventListener('click', () => {
        chatBox.classList.remove('slide-up');
        chatBox.classList.add('fade-out');

        setTimeout(() => {
            chatBox.style.display = 'none';
            chatBox.classList.remove('fade-out');
            chatBtn.style.display = 'flex';
        }, 250);
    });

    /* ===== Tabs ===== */
    const tabs = document.querySelectorAll('.tab_ar');
    const contents = document.querySelectorAll('.tab_content_ar');

    const ticket_footer_ar = document.getElementById('ticket_footer_ar');
    const chat_footer = document.getElementById('chat_footer_ar');
    const knowledge_footer = document.getElementById('knowledge_footer_ar');
    const product_footer = document.getElementById('product_footer_ar');
    const direct_chat_footer = document.getElementById('direct_chat_footer_ar');

    const headerTitle = document.getElementById('header_title_ar');

    const faqChat = document.getElementById('faq_chat_ar');
    const liveChat = document.getElementById('live_chat_ar');
    const phone_number_log_ar = document.getElementById('phone_number_log_ar');

    const loader = document.getElementById('tab_loader_ar');

    /* ===== TAB HISTORY FOR BACK BUTTON ===== */
    let tabHistory = [];

    /* ===== Loader helper ===== */
    function showLoader(callback) {
        loader.style.display = 'flex';
        setTimeout(() => {
            loader.style.display = 'none';
            callback();
        }, 1000);
    }
  
    /* ===== Activate Tab ===== */
    function activateTab(tab) {
        const target = tab.dataset.tab; // tickets_ar, chat_ar, etc
        const lang = localStorage.getItem("chatbot_lang") || "en";

        const currentActive = document.querySelector('.tab_ar.active_ar');
        if (currentActive && currentActive.dataset.tab !== target) {
            tabHistory.push(currentActive.dataset.tab);
            if (tabHistory.length > 10) tabHistory.shift();
        }

        showLoader(() => {

            tabs.forEach(t => t.classList.remove('active_ar'));
            tab.classList.add('active_ar');

            contents.forEach(c => c.classList.remove('active_ar', 'fade-in'));

            const activeContent = document.getElementById(`tab-${target}`);
            if (activeContent) {
                activeContent.classList.add('active_ar', 'fade-in');
            }

            switch (target) {

                case 'tickets_ar':
                    headerTitle.innerText = translations[lang].add_ticket;
                    ticket_footer_ar.style.display = 'block';
                    chat_footer.style.display = 'none';
                    product_footer.style.display = 'none';
                    knowledge_footer.style.display = 'none';
                    direct_chat_footer.style.display = 'none';
                    phone_number_log_ar.style.display = 'none';
                    liveChat.style.display = 'none';
                    break;

                case 'chat_ar':
                    headerTitle.innerText = translations[lang].getting_started;
                    ticket_footer_ar.style.display = 'none';
                    product_footer.style.display = 'none';
                    knowledge_footer.style.display = 'none';
                    direct_chat_footer.style.display = 'none';
                    liveChat.style.display = 'none';
                    if (isPhoneStep) {
                        phone_number_log_ar.style.display = 'flex';
                        faqChat.style.display = 'none';
                        chat_footer.style.display = 'none';
                    } else {
                        phone_number_log_ar.style.display = 'none';
                        faqChat.style.display = 'block';
                        chat_footer.style.display = 'block';
                    }
                    break;

                case 'product_ar':
                    headerTitle.innerText = translations[lang].product;
                    ticket_footer_ar.style.display = 'none';
                    chat_footer.style.display = 'none';
                    product_footer.style.display = 'block';
                    knowledge_footer.style.display = 'none';
                    direct_chat_footer.style.display = 'none';
                    phone_number_log_ar.style.display = 'none';
                    faqChat.style.display = 'none';
                    liveChat.style.display = 'none';
                    break;

                case 'kb_ar':
                    headerTitle.innerText = translations[lang].knowledge_base;
                    ticket_footer_ar.style.display = 'none';
                    chat_footer.style.display = 'none';
                    product_footer.style.display = 'none';
                    knowledge_footer.style.display = 'block';
                    direct_chat_footer.style.display = 'none';
                    phone_number_log_ar.style.display = 'none';
                    liveChat.style.display = 'none';
                    break;
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab));
    });

    /* ===== Default Tab ===== */
    const defaultTab = document.querySelector('.tab_ar[data-tab="tickets_ar"]');
    if (defaultTab) activateTab(defaultTab);

    /* ===== Back Button Functionality ===== */
    const backBtn = document.getElementById('tab_back_btn_ar');

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (!tabHistory.length) return;

            const prev = tabHistory.pop();
            const tabEl = document.querySelector(`.tab_ar[data-tab="${prev}"]`);
            if (tabEl) activateTab(tabEl);
        });
    }

    /* ===== Start / End Live Chat ===== */
    const startChat = document.getElementById('start_live_chat_ar');
    const endChat = document.getElementById('end_chat_ar');

    if (startChat) {
        startChat.addEventListener('click', () => {
            showLoader(() => {
                faqChat.style.display = 'none';
                liveChat.style.display = 'block';
                liveChat.classList.add('slide-up');

                headerTitle.innerText = 'BSW Service Desk';
                chat_footer.style.display = 'none';
                direct_chat_footer.style.display = 'block';
            });
        });
    }

    if (endChat) {
        endChat.addEventListener('click', () => {
            liveChat.classList.add('fade-out');

            setTimeout(() => {
                liveChat.style.display = 'none';
                liveChat.classList.remove('fade-out');

                faqChat.style.display = 'block';
                faqChat.classList.add('fade-in');

                const lang = localStorage.getItem("chatbot_lang") || "en";
                headerTitle.innerText = translations[lang].chat;
                chat_footer.style.display = 'block';
                direct_chat_footer.style.display = 'none';
            }, 250);
        });
    }

    const kbItems = document.querySelectorAll('.kb_item_ar');

    kbItems.forEach(item => {
        const question = item.querySelector('h5');

        question.addEventListener('click', () => {
            // Toggle this item
            item.classList.toggle('active_ar');

            // Optional: close other items (accordion behavior)
            kbItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active_ar');
                }
            });
        });
    });

    // Get the elements
    const trigger = document.getElementById('dropdownTrigger_ar');
    const menu = document.getElementById('dropdownMenu_ar');

    // Toggle menu on click
    trigger.addEventListener('click', function (event) {
        // Prevent the click from bubbling up to the window
        event.stopPropagation();
        menu.classList.toggle('show');
    });

    // Close menu if user clicks outside of it
    window.addEventListener('click', function (event) {
        if (!menu.contains(event.target) && !trigger.contains(event.target)) {
            menu.classList.remove('show');
        }
    });

    /* ===== Multi Select (CLP) – Hide Selected Options ===== */
    document.querySelectorAll('.multi-select_ar').forEach(select => {

        const display = select.querySelector('.multi-display_ar');
        const dropdown = select.querySelector('.multi-dropdown_ar');
        const search = select.querySelector('.multi-search_ar');
        const options = select.querySelectorAll('.multi-options_ar li');
        const tagsBox = select.querySelector('.multi-tags_ar');
        const hiddenInp = document.getElementById('clpValues_ar');

        let values = [];

        /* Open / close */
        display.addEventListener('click', e => {
            e.stopPropagation();

            document.querySelectorAll('.multi-dropdown_ar').forEach(d => {
                if (d !== dropdown) d.style.display = 'none';
            });

            dropdown.style.display =
                dropdown.style.display === 'block' ? 'none' : 'block';

            search.value = '';
            filter('');
            search.focus();
        });

        dropdown.addEventListener('click', e => e.stopPropagation());

        /* Select option */
        options.forEach(option => {
            option.addEventListener('click', e => {
                e.stopPropagation();

                const val = option.dataset.value;
                const text = option.textContent;

                if (values.includes(val)) return;

                values.push(val);

                /* HIDE selected option */
                option.style.display = 'none';

                const tag = document.createElement('div');
                tag.className = 'multi-tag';
                tag.innerHTML = `${text} <span>&times;</span>`;

                tag.querySelector('span').addEventListener('click', ev => {
                    ev.stopPropagation();

                    values = values.filter(v => v !== val);

                    /* SHOW option back */
                    option.style.display = 'block';

                    tag.remove();
                    updatePlaceholder();
                    hiddenInp.value = values.join(',');
                });

                tagsBox.appendChild(tag);
                updatePlaceholder();
                hiddenInp.value = values.join(',');
            });
        });

        /* Search filter */
        search.addEventListener('keyup', () => {
            filter(search.value.toLowerCase());
        });

        function filter(val) {
            options.forEach(o => {
                if (values.includes(o.dataset.value)) {
                    o.style.display = 'none';
                    return;
                }

                o.style.display = o.textContent.toLowerCase().includes(val)
                    ? 'block'
                    : 'none';
            });
        }

        function updatePlaceholder() {
            const ph = tagsBox.querySelector('.multi-placeholder_ar');
            ph.style.display = values.length ? 'none' : 'inline';
        }
    });

    /* Outside click close */
    document.addEventListener('click', () => {
        document.querySelectorAll('.multi-dropdown_ar').forEach(d => {
            d.style.display = 'none';
        });
    });

    let captchaText = '';

    function generateCaptcha() {
        const canvas = document.getElementById('captchaCanvas_ar');
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$%';
        captchaText = '';

        for (let i = 0; i < 6; i++) {
            captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = 'italic 26px Georgia';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < captchaText.length; i++) {
            ctx.save();

            const x = 15 + i * 18;
            const y = canvas.height / 2 + random(-6, 6);
            const angle = random(-0.5, 0.5);

            ctx.translate(x, y);
            ctx.rotate(angle);

            ctx.shadowColor = 'rgba(0,0,0,0.4)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;

            ctx.lineWidth = 1;
            ctx.strokeStyle = '#333';
            ctx.strokeText(captchaText[i], 0, 0);

            ctx.fillStyle = '#000';
            ctx.fillText(captchaText[i], 0, 0);

            ctx.restore();
        }

        // Noise curve
        ctx.strokeStyle = '#999';
        ctx.beginPath();
        ctx.moveTo(0, random(10, 40));
        ctx.bezierCurveTo(30, random(0, 50), 80, random(0, 50), canvas.width, random(10, 40));
        ctx.stroke();

        // Reset message & input on refresh
        document.getElementById('verify_ar').value = '';
        document.getElementById('captchaMsg_ar').textContent = '';
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    /*  VALIDATION */
    document.getElementById('verify_ar').addEventListener('input', function () {
        const msg = document.getElementById('captchaMsg_ar');

        if (this.value.length === captchaText.length) {
            if (this.value === captchaText) {
                msg.textContent = '✔ CAPTCHA matched';
                msg.style.color = 'green';
            } else {
                msg.textContent = '✖ CAPTCHA not matched';
                msg.style.color = 'red';
            }
        } else {
            msg.textContent = '';
        }
    });

    /* Refresh */
    document.getElementById('captchaCanvas_ar').addEventListener('click', generateCaptcha);
    document.getElementById('refreshCaptcha_ar').addEventListener('click', generateCaptcha);

    /* Load */
    generateCaptcha();
});

/* ===== Custom Select ===== */
document.querySelectorAll('.custom-select_ar').forEach(select => {

    const display = select.querySelector('.select-display_ar');
    const dropdown = select.querySelector('.dropdown_ar');
    const search = select.querySelector('.search-input_ar');
    const options = select.querySelectorAll('.options_ar li');
    const selectedValue = select.querySelector('.selected-value_ar');

    display.addEventListener('click', e => {
        e.stopPropagation();

        document.querySelectorAll('.dropdown_ar').forEach(d => {
            if (d !== dropdown) d.style.display = 'none';
        });

        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        search.value = '';
        filterOptions('');
        search.focus();
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selectedValue.textContent = option.textContent;
            options.forEach(o => o.classList.remove('active_ar'));
            option.classList.add('active_ar');
            dropdown.style.display = 'none';
        });
    });

    search.addEventListener('keyup', () => {
        filterOptions(search.value.toLowerCase());
    });

    function filterOptions(value) {
        options.forEach(option => {
            option.style.display = option.textContent.toLowerCase().includes(value)
                ? 'block'
                : 'none';
        });
    }
});

function toggleNumberAr() {
    const faqChat = document.getElementById('faq_chat_ar');
    const phone_number_log_ar = document.getElementById('phone_number_log_ar');
    const chat_footer = document.getElementById('chat_footer_ar');
    const headerTitle = document.getElementById('header_title_ar');
    const lang = localStorage.getItem("chatbot_lang") || "en";
    
    const translations = {
        en: { chat: "Chat" },
        bn: { chat: "চ্যাট" }
    };
    
    headerTitle.innerText = translations[lang].chat;
    phone_number_log_ar.style.display = 'none';
    faqChat.style.display = 'block';
    chat_footer.style.display = 'block';

    isPhoneStep = false;
}

/* ===== Outside click close ===== */
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown_ar').forEach(d => d.style.display = 'none');
});


