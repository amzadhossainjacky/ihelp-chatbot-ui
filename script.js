document.addEventListener('DOMContentLoaded', () => {

    /* ===== Chat open / close ===== */
    const chatBtn  = document.querySelector('.chatbot_show_button');
    const chatBox  = document.querySelector('.chatbot_layout_ar');
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
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab_content');

    const ticket_footer = document.getElementById('ticket_footer');
    const chat_footer = document.getElementById('chat_footer');
    const knowledge_footer = document.getElementById('knowledge_footer');
    const direct_chat_footer = document.getElementById('direct_chat_footer');

    const headerTitle = document.getElementById('header_title');

    const faqChat  = document.getElementById('faq_chat');
    const liveChat = document.getElementById('live_chat');

    const loader = document.getElementById('tab_loader');

    /* ===== Loader helper ===== */
    function showLoader(callback){
        loader.style.display = 'flex';
        setTimeout(() => {
            loader.style.display = 'none';
            callback();
        }, 1000);
    }

    /* ===== Activate Tab ===== */
    function activateTab(tab) {
        const target = tab.dataset.tab;

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
                    headerTitle.innerText = 'Add Ticket';
                    ticket_footer.style.display = 'block';
                    chat_footer.style.display = 'none';
                    knowledge_footer.style.display = 'none';
                    direct_chat_footer.style.display = 'none';
                    break;

                case 'chat':
                    headerTitle.innerText = 'Live Chat';
                    faqChat.style.display = 'block';
                    liveChat.style.display = 'none';
                    ticket_footer.style.display = 'none';
                    chat_footer.style.display = 'block';
                    knowledge_footer.style.display = 'none';
                    direct_chat_footer.style.display = 'none';
                    break;

                case 'kb':
                    headerTitle.innerText = 'Knowledge Base';
                    ticket_footer.style.display = 'none';
                    chat_footer.style.display = 'none';
                    knowledge_footer.style.display = 'block';
                    direct_chat_footer.style.display = 'none';
                    break;
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab));
    });

    /* ===== Default Tab ===== */
    const defaultTab = document.querySelector('.tab[data-tab="tickets"]');
    if (defaultTab) activateTab(defaultTab);

    /* ===== Start / End Live Chat ===== */
    const startChat = document.getElementById('start_live_chat');
    const endChat   = document.getElementById('end_chat');

    if(startChat){
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

    if(endChat){
        endChat.addEventListener('click', () => {
            liveChat.classList.add('fade-out');

            setTimeout(() => {
                liveChat.style.display = 'none';
                liveChat.classList.remove('fade-out');

                faqChat.style.display = 'block';
                faqChat.classList.add('fade-in');

                headerTitle.innerText = 'Chat';
                chat_footer.style.display = 'flex';
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
const trigger = document.getElementById('dropdownTrigger');
const menu = document.getElementById('dropdownMenu');

// Toggle menu on click
trigger.addEventListener('click', function(event) {
    // Prevent the click from bubbling up to the window
    event.stopPropagation();
    menu.classList.toggle('show');
});

// Close menu if user clicks outside of it
window.addEventListener('click', function(event) {
    if (!menu.contains(event.target) && !trigger.contains(event.target)) {
        menu.classList.remove('show');
    }
});
});

/* ===== Custom Select ===== */
document.querySelectorAll('.custom-select').forEach(select => {

    const display = select.querySelector('.select-display');
    const dropdown = select.querySelector('.dropdown');
    const search = select.querySelector('.search-input');
    const options = select.querySelectorAll('.options li');
    const selectedValue = select.querySelector('.selected-value');

    display.addEventListener('click', e => {
        e.stopPropagation();

        document.querySelectorAll('.dropdown').forEach(d => {
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

/* ===== Outside click close ===== */
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach(d => d.style.display = 'none');
});
