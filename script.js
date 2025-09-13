const languages = [
    {name:'JavaScript', type:'Frontend', year:'1995', difficulty:'Beginner', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', description:'The most popular programming language for web development.', category:'frontend'},
    {name:'Python', type:'Backend', year:'1991', difficulty:'Beginner', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', description:'A versatile, high-level language known for simplicity and readability.', category:'backend'},
    {name:'React', type:'Frontend', year:'2013', difficulty:'Intermediate', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', description:'A JavaScript library for building user interfaces.', category:'frontend'},
    {name:'Java', type:'Backend', year:'1995', difficulty:'Intermediate', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', description:'Widely used in enterprise applications and Android development.', category:'backend'},
    {name:'TypeScript', type:'Frontend', year:'2012', difficulty:'Intermediate', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', description:'A superset of JavaScript with static types.', category:'frontend'},
    {name:'Swift', type:'Mobile', year:'2014', difficulty:'Intermediate', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg', description:'Apple\'s language for iOS and macOS development.', category:'mobile'},
    {name:'Kotlin', type:'Mobile', year:'2011', difficulty:'Intermediate', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg', description:'Google\'s preferred language for Android development.', category:'mobile'},
    {name:'C++', type:'Backend', year:'1985', difficulty:'Advanced', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', description:'A powerful, high-performance language used for systems.', category:'backend'},
    {name:'Go', type:'Backend', year:'2009', difficulty:'Intermediate', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg', description:'Developed by Google for scalable web services.', category:'backend'},
    {name:'Rust', type:'Backend', year:'2010', difficulty:'Advanced', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg', description:'Memory-safe, fast systems programming language.', category:'backend'},
    {name:'Vue.js', type:'Frontend', year:'2014', difficulty:'Beginner', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', description:'Progressive JavaScript framework for building UIs.', category:'frontend'},
    {name:'PHP', type:'Backend', year:'1995', difficulty:'Beginner', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', description:'Server-side scripting language powering WordPress.', category:'backend'}
];

let currentLanguages = [...languages];
let featuredIndex = 0;

function init(){
    renderLanguages();
    updateFeaturedLanguage(languages[0]);
    setupSearch();
    startAutoRotation();
}

function renderLanguages(){
    const grid = document.getElementById('languagesGrid');
    grid.innerHTML = currentLanguages.map(lang=>`
        <div class="language-card" onclick="selectLanguage('${lang.name}')">
            <img src="${lang.logo}" alt="${lang.name}" class="language-logo">
            <div class="language-name">${lang.name}</div>
            <div class="language-type">${lang.type}</div>
        </div>`).join('');
}

function updateFeaturedLanguage(language){
    document.getElementById('featuredLogo').src = language.logo;
    document.getElementById('featuredTitle').textContent = language.name;
    document.getElementById('featuredYear').textContent = language.year;
    document.getElementById('featuredDifficulty').textContent = language.difficulty;
    document.getElementById('featuredType').textContent = language.type;
    document.getElementById('featuredDescription').textContent = language.description;
}

function selectLanguage(name){
    const language = languages.find(lang=>lang.name===name);
    if(language){
        updateFeaturedLanguage(language);
        showNotification(`Selected ${name}!`);
    }
}

function filterLanguages(category){
    currentLanguages = category==='all' ? [...languages] : languages.filter(lang=>lang.category===category);
    renderLanguages();
}

function setupSearch(){
    document.getElementById('searchInput').addEventListener('input',e=>{
        const q=e.target.value.toLowerCase();
        currentLanguages = languages.filter(lang=>lang.name.toLowerCase().includes(q) || lang.type.toLowerCase().includes(q));
        renderLanguages();
    });
}

function startAutoRotation(){
    setInterval(()=>{
        featuredIndex=(featuredIndex+1)%languages.length;
        updateFeaturedLanguage(languages[featuredIndex]);
    },8000);
}

function startLearning(){ showNotification('Starting learning journey! 🚀'); }
function addToList(){ showNotification('Added to your learning list! 📚'); }

function showNotification(message){
    const notification=document.createElement('div');
    notification.style.cssText=`
        position:fixed;top:100px;right:20px;background:linear-gradient(45deg,#00d4ff,#0099cc);
        color:white;padding:1rem 2rem;border-radius:10px;box-shadow:0 10px 30px rgba(0,212,255,0.3);
        z-index:2000;animation:slideIn 0.3s ease-out;`;
    notification.textContent=message;
    document.body.appendChild(notification);
    setTimeout(()=>{notification.style.animation='slideOut 0.3s ease-in';setTimeout(()=>notification.remove(),300)},3000);
}

const style=document.createElement('style');
style.textContent=`@keyframes slideIn{from{transform:translateX(100%);opacity:0;}to{transform:translateX(0);opacity:1;}}
@keyframes slideOut{from{transform:translateX(0);opacity:1;}to{transform:translateX(100%);opacity:0;}}`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded',init);
