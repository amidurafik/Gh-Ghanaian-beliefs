// Dark mode support
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

// Simple and reliable mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Simple toggle function
    function toggleMobileMenu() {
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            // Show menu
            mobileMenu.classList.remove('hidden');
            menuOpenIcon.classList.add('hidden');
            menuCloseIcon.classList.remove('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        } else {
            // Hide menu
            mobileMenu.classList.add('hidden');
            menuOpenIcon.classList.remove('hidden');
            menuCloseIcon.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    // Close menu function
    function closeMobileMenu() {
        mobileMenu.classList.add('hidden');
        menuOpenIcon.classList.remove('hidden');
        menuCloseIcon.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // Event listeners
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    // Close menu when clicking navigation links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            if (!mobileMenu.classList.contains('hidden')) {
                closeMobileMenu();
            }
        }
    });

    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            closeMobileMenu();
        }
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 100) {
            nav.classList.add('shadow-xl');
        } else {
            nav.classList.remove('shadow-xl');
        }
    }
});

// Your existing advisor contact functionality remains the same...
function showAdvisorContact(advisorName, faithType) {
    const advisorContacts = {
        'Jawad': {
            fullName: 'Imam Abdul Jawad Al-Hassan',
            email: 'abduljawadalhassan4@gmail.com',
            phone: '0265587871',
            whatsapp: '0265587871',
            specialty: 'Islamic Scholar & Imam',
            faith: 'Islamic',
            location: 'Central Mosque, Kumasi',
            color: 'islamic-primary'
        },
        'samuel': {
            fullName: 'Pastor Samuel Oduro',
            email: 'revsamueloduro@yahoo.com',
            phone: '0265587871',
            whatsapp: '0265587871',
            specialty: 'Senior Pastor & Theologian',
            faith: 'Christian',
            location: 'Grace Methodist Church',
            color: 'christian-primary'
        },
        'asare': {
            fullName: 'ISAAC ASARE-ABOAGYE',
            email: 'isaac.asare-aboagye@uenr.edu.gh',
            phone: '020 – 6638205',
            whatsapp: '020 – 6638205',
            specialty: 'Traditional Priest & Cultural Elder',
            faith: 'Traditional',
            location: 'Sunyani Traditional',
            color: 'traditional-primary'
        }
    };

    const advisor = advisorContacts[advisorName];
    if (!advisor) return;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <div class="text-center mb-4">
                <div class="advisor-avatar w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style="background: linear-gradient(135deg, ${getColorValue(advisor.color)} 0%, ${getColorValue(advisor.color)}AA 100%);">
                    <span class="text-white text-xl font-bold">${advisor.fullName.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">${advisor.fullName}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">${advisor.specialty}</p>
                <p class="text-xs text-gray-400">${advisor.location}</p>
            </div>
            
            <p class="text-gray-600 dark:text-gray-300 mb-4 text-center">Choose your preferred method to contact our ${advisor.faith.toLowerCase()} advisor:</p>
            
            <div class="space-y-3">
                <button onclick="contactAdvisorViaEmail('${advisor.email}', '${advisor.fullName}', '${advisor.faith}')" class="w-full bg-green-600 text-white py-3 px-4 rounded hover:bg-green-700 transition-colors flex items-center justify-center">
                    <span class="mr-2">📧</span> Send Email
                </button>
                <button onclick="contactAdvisorViaPhone('${advisor.phone}')" class="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <span class="mr-2">📱</span> Call ${advisor.phone}
                </button>
                <button onclick="contactAdvisorViaWhatsApp('${advisor.whatsapp}', '${advisor.fullName}', '${advisor.faith}')" class="w-full bg-green-500 text-white py-3 px-4 rounded hover:bg-green-600 transition-colors flex items-center justify-center">
                    <span class="mr-2">💬</span> WhatsApp Chat
                </button>
            </div>
            
            <div class="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded text-sm">
                <p class="text-gray-600 dark:text-gray-400">
                    <strong>Available:</strong> Monday - Saturday, 8 AM - 8 PM<br>
                    <strong>Emergency:</strong> +233 508742111 (Kumasi-Afrancho)
                </p>
            </div>
            
            <button onclick="this.closest('.fixed').remove()" class="w-full mt-4 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors">
                Close
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

function getColorValue(colorClass) {
    const colorMap = {
        'islamic-primary': '#008080',
        'christian-primary': '#8B4513',
        'traditional-primary': '#228B22'
    };
    return colorMap[colorClass] || '#666666';
}

// Contact methods for advisors
function contactAdvisorViaEmail(email, advisorName, faith) {
    const subject = encodeURIComponent(`${faith} Spiritual Guidance Request - ${advisorName}`);
    const body = encodeURIComponent(`Dear ${advisorName},

I hope this message finds you in good health and spirits. I am reaching out to request ${faith.toLowerCase()} spiritual guidance and counseling.

I would appreciate the opportunity to schedule a consultation at your convenience.

Please let me know your availability and preferred meeting format (in-person, phone, or video call).

Thank you for your time and service to our community.

Blessings and regards,
[Your Name]
[Your Phone Number]

---
Sent from Ghanaian Religious Heritage website`);
    
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
    showNotification('Email client opened! If it didn\'t work, please email: ' + email, 'success');
}

function contactAdvisorViaPhone(phone) {
    window.open(`tel:${phone}`, '_self');
    showNotification(`Calling ${phone}... If dialer didn't open, please dial manually.`, 'info');
}

function contactAdvisorViaWhatsApp(phone, advisorName, faith) {
    const whatsappNumber = phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Peace be upon you ${advisorName}. I found your contact on the Ghanaian Religious Heritage website. I would like to request ${faith.toLowerCase()} spiritual guidance and counseling. Thank you for your service to our community. Blessings.`);
    
    window.open(`https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`, '_blank');
    
    setTimeout(() => {
        showNotification(`WhatsApp opened! If it didn't work, try: wa.me/${whatsappNumber}`, 'success');
    }, 1000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-start">
            <span class="mr-2">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <p class="text-sm">${message}</p>
            <button onclick="this.closest('.fixed').remove()" class="ml-2 text-white hover:text-gray-200">
                ✕
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

        // Add scroll effect to header
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.classList.add('shadow-xl');
            } else {
                nav.classList.remove('shadow-xl');
            }
        });

