document.addEventListener('DOMContentLoaded', () => {
     /* ===============================
       LANGUAGE DICTIONARY
    =============================== */
    const translations = {
        en: {
            add_ticket: "Add Ticket",
            tickets: "Tickets",
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
        },

        bn: {
            add_ticket: "টিকিট যোগ করুন",
            tickets: "টিকিট",
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
        }
    };

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
        document.querySelectorAll(".language_list li")
            .forEach(li => li.classList.remove("active"));

        document.querySelector(`.language_list a[data-lang="${lang}"]`)
            ?.parentElement.classList.add("active");

        // Save preference
        localStorage.setItem("chatbot_lang", lang);
    }

    /* ===============================
       LANGUAGE CLICK EVENTS
    =============================== */
    document.querySelectorAll(".language_list a").forEach(link => {
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

    const loader = document.getElementById('tab_loader');

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
        const target = tab.dataset.tab;

        // Push current tab to history
        const currentActive = document.querySelector('.tab_ar.active');
        if (currentActive && currentActive.dataset.tab !== target) {
            tabHistory.push(currentActive.dataset.tab);
            if (tabHistory.length > 10) tabHistory.shift(); // keep max 10
        }

        showLoader(() => {

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            contents.forEach(c => {
                c.classList.remove('active', 'fade-in');
            });

            const activeContent = document.getElementById(`tab-${target}`);
            if (activeContent) {
                activeContent.classList.add('active', 'fade-in');
            }

            switch (target) {
                case 'tickets':
                    headerTitle.innerText = translations[savedLang].add_ticket;
                    ticket_footer_ar.style.display = 'block';
                    phone_number_log_ar.style.display = 'none';
                    chat_footer.style.display = 'none';
                    product_footer.style.display = 'none';
                    knowledge_footer.style.display = 'none';
                    direct_chat_footer.style.display = 'none';
                    break;

                case 'chat':
                    headerTitle.innerText = 'Getting Started';
          
                    liveChat.style.display = 'none';
                    ticket_footer_ar.style.display = 'none';
                    product_footer.style.display = 'none';
                    knowledge_footer.style.display = 'none';
                    direct_chat_footer.style.display = 'none';
                    if (isPhoneStep) {
                        // PHONE STEP
                        phone_number_log_ar.style.display = 'flex';
                        faqChat.style.display = 'none';
                        chat_footer.style.display = 'none';
                    } else {
                        // FAQ STEP
                        phone_number_log_ar.style.display = 'none';
                        faqChat.style.display = 'block';
                        chat_footer.style.display = 'block';
                    }
                    break;
                case 'product':
                    headerTitle.innerText = 'Product';
                    // headerTitle.innerText = translations[savedLang].chat;
                    phone_number_log_ar.style.display = 'none';
                    faqChat.style.display = 'none';
                    liveChat.style.display = 'none';
                    ticket_footer_ar.style.display = 'none';
                    chat_footer.style.display = 'none';
                    product_footer.style.display = 'block';
                    knowledge_footer.style.display = 'none';
                    direct_chat_footer.style.display = 'none';
                    break;

                case 'kb':
                    headerTitle.innerText = 'Knowledge Base';
                    phone_number_log_ar.style.display = 'none';
                    ticket_footer_ar.style.display = 'none';
                    chat_footer.style.display = 'none';
                    knowledge_footer.style.display = 'block';
                    direct_chat_footer.style.display = 'none';
                    product_footer.style.display = 'none';
                    break;
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab));
    });

    /* ===== Default Tab ===== */
    const defaultTab = document.querySelector('.tab_ar[data-tab="tickets"]');
    if (defaultTab) activateTab(defaultTab);

    /* ===== Back Button Functionality ===== */
    const backBtn = document.getElementById('tab_back_btn_ar'); // your <i> back arrow
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (tabHistory.length === 0) return;
            const previousTab = tabHistory.pop();
            const tabElement = document.querySelector(`.tab_ar[data-tab="${previousTab}"]`);
            if (tabElement) activateTab(tabElement);
        });
    }
    /* ===== Start / End Live Chat ===== */
    const startChat = document.getElementById('start_live_chat');
    const endChat = document.getElementById('end_chat');

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

                headerTitle.innerText = 'Chat';
                chat_footer.style.display = 'block';
                direct_chat_footer.style.display = 'none';
            }, 250);
        });
    }

    const kbItems = document.querySelectorAll('.kb_item');

    kbItems.forEach(item => {
        const question = item.querySelector('h5');

        question.addEventListener('click', () => {
            // Toggle this item
            item.classList.toggle('active');

            // Optional: close other items (accordion behavior)
            kbItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // Get the elements
    const trigger = document.getElementById('dropdownTrigger_ar');
    const menu = document.getElementById('dropdownMenu');

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
        const search = select.querySelector('.multi-search');
        const options = select.querySelectorAll('.multi-options_ar li');
        const tagsBox = select.querySelector('.multi-tags_ar');
        const hiddenInp = document.getElementById('clpValues');

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

});

/* ===== Custom Select ===== */
document.querySelectorAll('.custom-select_ar').forEach(select => {

    const display = select.querySelector('.select-display_ar');
    const dropdown = select.querySelector('.dropdown_ar');
    const search = select.querySelector('.search-input');
    const options = select.querySelectorAll('.options_ar li');
    const selectedValue = select.querySelector('.selected-value');

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
            options.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
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
 headerTitle.innerText = 'Chat';
    phone_number_log_ar.style.display = 'none';
    faqChat.style.display = 'block';
    chat_footer.style.display = 'block';

    isPhoneStep = false;
}
/* ===== Outside click close ===== */
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown_ar').forEach(d => d.style.display = 'none');
});
