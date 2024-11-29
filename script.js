let sortDirection = 1;

function loadContacts() {
    const tbody = document.getElementById("contactTableBody");
    tbody.innerHTML = "";

    contactosData.forEach(contact => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td title="${contact.NomeProprio}" onclick="showDetails(${JSON.stringify(contact).replace(/"/g, '&quot;')})">${contact.NomeProprio}</td>
            <td title="${contact.Apelido}" onclick="showDetails(${JSON.stringify(contact).replace(/"/g, '&quot;')})">${contact.Apelido}</td>
            <td title="${contact.Email}" onclick="showDetails(${JSON.stringify(contact).replace(/"/g, '&quot;')})">${contact.Email}</td>
            <td title="${contact.Cargo}" onclick="showDetails(${JSON.stringify(contact).replace(/"/g, '&quot;')})">${contact.Cargo}</td>
            <td title="${contact.Empresa}" onclick="showDetails(${JSON.stringify(contact).replace(/"/g, '&quot;')})">${contact.Empresa}</td>
            <td title="${contact.TelefoneTrabalho}" onclick="showDetails(${JSON.stringify(contact).replace(/"/g, '&quot;')})">${contact.TelefoneTrabalho}</td>
            <td title="${contact.TelefoneCasa}" onclick="showDetails(${JSON.stringify(contact).replace(/"/g, '&quot;')})">${contact.TelefoneCasa}</td>
            <td title="${contact.Telemovel}" onclick="showDetails(${JSON.stringify(contact).replace(/"/g, '&quot;')})">${contact.Telemovel}</td>
        `;
        tbody.appendChild(row);
    });

    updateResultCounter();
}

function toggleTheme() {
    const body = document.body;
    body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark";
}

function showDetails(contact) {
    const modal = document.getElementById("contactModal");
    const modalDetails = document.getElementById("modalDetails");

    modalDetails.innerHTML = `
        <strong>Nome Próprio:</strong> ${contact.NomeProprio}<br>
        <strong>Apelido:</strong> ${contact.Apelido}<br>
        <strong>Email:</strong> ${contact.Email}<br>
        <strong>Cargo:</strong> ${contact.Cargo}<br>
        <strong>Empresa:</strong> ${contact.Empresa}<br>
        <strong>Telefone de Trabalho:</strong> ${contact.TelefoneTrabalho}<br>
        <strong>Telefone de Casa:</strong> ${contact.TelefoneCasa}<br>
        <strong>Telemóvel:</strong> ${contact.Telemovel}
    `;

    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("contactModal").style.display = "none";
}

function showPrivacyPolicy() {
    document.getElementById("privacyModal").style.display = "flex";
}

function closePrivacyModal() {
    document.getElementById("privacyModal").style.display = "none";
}

function showAuthorModal() {
    document.getElementById("authorModal").style.display = "flex";
}

function closeAuthorModal() {
    document.getElementById("authorModal").style.display = "none";
}

function sendEmail() {
    const email = document.querySelector("#modalDetails").textContent.match(/Email:\s([\w.-]+@[\w.-]+)/);
    if (email) {
        window.location.href = `mailto:${email[1]}`;
    } else {
        alert("Para enviar um email a este contacto, insira primeiramente um endereço de email.");
    }
}

function copyContact() {
    const details = document.getElementById("modalDetails").textContent;
    navigator.clipboard.writeText(details).then(() => {
        alert("Contacto copiado para a área de transferência!");
    });
}

function shareContact() {
    const details = document.getElementById("modalDetails").textContent;
    if (navigator.share) {
        navigator.share({ text: details }).catch(() => alert("Partilha não suportada neste navegador."));
    } else {
        alert("O seu navegador não suporta a funcionalidade de partilha.");
    }
}

function filterContacts() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#contactTable tbody tr");

    rows.forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(input) ? "" : "none";
    });

    updateResultCounter();
}

function clearSearch() {
    document.getElementById("searchInput").value = "";
    filterContacts();
}

function sortTable(column) {
    const rows = Array.from(document.querySelectorAll("#contactTable tbody tr"));

    rows.sort((a, b) => {
        const cellA = a.cells[column].textContent.trim().toLowerCase();
        const cellB = b.cells[column].textContent.trim().toLowerCase();

        if (cellA < cellB) return -1 * sortDirection;
        if (cellA > cellB) return 1 * sortDirection;
        return 0;
    });

    sortDirection *= -1;
    const tbody = document.getElementById("contactTableBody");
    rows.forEach(row => tbody.appendChild(row));
}

function updateResultCounter() {
    const visibleRows = Array.from(document.querySelectorAll("#contactTable tbody tr"))
        .filter(row => row.style.display !== "none");
    document.getElementById("resultCounter").textContent = `Total de contactos: ${visibleRows.length}`;
}

// Função para mapear emojis para as condições meteorológicas
function getWeatherEmoji(description) {
    const weatherConditions = {
        // Group 2xx: Thunderstorm
        "trovoada com chuva": "⛈️",
        "trovoada com chuva leve": "⛈️",
        "trovoada com chuva forte": "⛈️",
        "trovoada com granizo": "🌩️",
        "trovoada com chuva fraca": "⛈️",
        "trovoada com chuva moderada": "⛈️",
        "trovoada": "🌩️",

        // Group 3xx: Drizzle
        "chuvisco": "🌦️",
        "chuvisco leve": "🌦️",
        "chuvisco moderado": "🌧️",

        // Group 5xx: Rain
        "chuva leve": "🌧️",
        "chuva moderada": "🌦️",
        "chuva intensa": "🌧️",
        "chuva muito forte": "🌧️",
        "chuva extrema": "🌧️",
        "chuva congelante": "❄️",

        // Group 6xx: Snow
        "neve": "❄️",
        "neve leve": "🌨️",
        "neve moderada": "❄️",
        "neve intensa": "❄️",

        // Group 7xx: Atmosphere
        "nevoeiro": "🌫️",
        "fumaça": "🌫️",
        "poeira": "🌪️",
        "areia": "🌪️",

        // Group 800: Clear
        "céu limpo": "☀️",
        "céu claro": "☀️",

        // Group 80x: Clouds
        "nuvens dispersas": "🌤️",
        "algumas nuvens": "🌥️",
        "nublado": "☁️",
        "nuvens quebradas": "☁️",
    };

    // Procura o emoji correspondente ao estado do tempo
    for (let condition in weatherConditions) {
        if (description.toLowerCase().includes(condition)) {
            return weatherConditions[condition];
        }
    }

    // Emoji padrão caso a condição não seja reconhecida
    return "🌍";
}

// Função para buscar informações meteorológicas
function fetchWeather() {
    const apiKey = '7c12fc613b3fd9ea957d8829e99cb182';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=41.3433&lon=-6.9611&units=metric&lang=pt&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar informações meteorológicas.');
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            const temp = data.main.temp;
            const description = data.weather[0].description;
            let city = data.name;

            // Remove "Municipality" do nome da cidade, se estiver presente
            if (city.toLowerCase().includes("municipality")) {
                city = city.replace("Municipality", "").trim();
            }

            const emoji = getWeatherEmoji(description);

            weatherInfo.innerHTML = `Meteorologia em ${city}: ${emoji} ${temp}°C, ${description}`;
        })
        .catch(error => {
            console.error(error);
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.textContent = 'Não foi possível carregar informações meteorológicas.';
        });
}


function fetchInspirationalQuote() {
    // Conjunto de citações estáticas
    const quotes = [
    { content: "O sucesso é a soma de pequenos esforços repetidos dia após dia.", author: "Robert Collier" },
    { content: "Acredite que você pode, assim você já está no meio do caminho.", author: "Theodore Roosevelt" },
    { content: "A vida é 10% o que acontece a você e 90% como você reage a isso.", author: "Charles R. Swindoll" },
    { content: "O único lugar onde o sucesso vem antes do trabalho é no dicionário.", author: "Vidal Sassoon" },
    { content: "Se você quer algo que nunca teve, precisa estar disposto a fazer algo que nunca fez.", author: "Thomas Jefferson" },
    { content: "Não importa quão devagar você vá, desde que você não pare.", author: "Confúcio" },
    { content: "É sempre impossível até que seja feito.", author: "Nelson Mandela" },
    { content: "Se você não arriscar, terá que se contentar com o comum.", author: "Jim Rohn" },
    { content: "Você nunca é velho demais para estabelecer outro objetivo ou sonhar um novo sonho.", author: "C.S. Lewis" },
    { content: "O fracasso é apenas a oportunidade de começar de novo, desta vez de forma mais inteligente.", author: "Henry Ford" },
    { content: "Nossa maior glória não está em nunca falhar, mas em levantar toda vez que falhamos.", author: "Confúcio" },
    { content: "Coragem não é a ausência de medo; é a conquista dele.", author: "Nelson Mandela" },
    { content: "O futuro pertence àqueles que acreditam na beleza de seus sonhos.", author: "Eleanor Roosevelt" },
    { content: "Grandes coisas nunca vêm de zonas de conforto.", author: "Desconhecido" },
    { content: "A jornada de mil milhas começa com um único passo.", author: "Lao Tsé" },
    { content: "Não espere por uma oportunidade perfeita. Faça do momento perfeito para agir.", author: "George Herbert" },
    { content: "Tudo o que você pode imaginar é real.", author: "Pablo Picasso" },
    { content: "Sua única limitação é a sua mente.", author: "Desconhecido" },
    { content: "O sucesso é ir de fracasso em fracasso sem perder o entusiasmo.", author: "Winston Churchill" },
    { content: "Você é mais forte do que pensa, mais capaz do que imagina e mais corajoso do que acredita.", author: "Desconhecido" },
    { content: "O segredo do sucesso é começar.", author: "Mark Twain" },
    { content: "Não conte os dias, faça os dias valerem.", author: "Muhammad Ali" },
    { content: "Seja a mudança que você quer ver no mundo.", author: "Mahatma Gandhi" },
    { content: "Não deixe o medo de errar impedir você de jogar.", author: "Babe Ruth" },
    { content: "O sucesso não é o fim, o fracasso não é fatal: é a coragem para continuar que conta.", author: "Winston Churchill" },
    { content: "Os melhores sonhos acontecem quando estamos acordados.", author: "Cherie Gilderbloom" },
    { content: "A maior riqueza é viver contente com pouco.", author: "Platão" },
    { content: "Tudo parece impossível até que seja feito.", author: "Nelson Mandela" },
    { content: "A melhor maneira de prever o futuro é criá-lo.", author: "Peter Drucker" },
    { content: "Não deixe o ontem ocupar muito do hoje.", author: "Will Rogers" },
    { content: "Você não precisa ser perfeito para começar, mas precisa começar para ser perfeito.", author: "Zig Ziglar" },
    { content: "Se você puder sonhar, você pode fazer.", author: "Walt Disney" },
    { content: "Não importa o quão lento você vá, desde que você não pare.", author: "Confúcio" },
    { content: "É melhor falhar na originalidade do que ter sucesso na imitação.", author: "Herman Melville" },
    { content: "O sucesso é alcançado por aqueles que continuam tentando com um pouco mais de persistência.", author: "Napoleon Hill" },
    { content: "Sonhe grande e ouse falhar.", author: "Norman Vaughan" },
    { content: "Você não pode mudar o vento, mas pode ajustar as velas para alcançar o seu destino.", author: "Jimmy Dean" },
    { content: "Não é o que acontece com você, mas como você reage que importa.", author: "Epicteto" },
    { content: "A vida não é sobre encontrar a si mesmo, é sobre criar a si mesmo.", author: "George Bernard Shaw" },
    { content: "O que você faz hoje pode melhorar todos os seus amanhãs.", author: "Ralph Marston" }
];


    // Seleciona uma citação aleatória
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // Seleciona o elemento no rodapé
    const quoteElement = document.getElementById('quoteOfDay');

    // Exibe a citação e o autor
    quoteElement.innerHTML = `"${randomQuote.content}" — <strong>${randomQuote.author}</strong>`;
}

// Inicialização ao carregar a página
window.onload = function () {
    loadContacts();
    fetchWeather();
    fetchInspirationalQuote(); // Função para exibir a citação estática
};
