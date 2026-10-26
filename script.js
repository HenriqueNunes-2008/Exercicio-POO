// Passo 1: Conceito de Abstração

// classe Disciplina
class Disciplina {
    constructor(codigo, nome, categoria, cargaHorariaSemanalHoras) {
        this.codigo = codigo;
        this.nome = nome;
        this.categoria = categoria;

        if (cargaHorariaSemanalHoras <= 0) {
            this.cargaHorariaSemanalHoras = 2;
        } else {
            this.cargaHorariaSemanalHoras = cargaHorariaSemanalHoras;
        }
    }

    GetNome() {
    return this.nome;
    }

    CalcularCargaEmMinutos() {
        return this.cargaHorariaSemanalHoras * 60;
    }

    ExibirResumo() {
        return `[${this.codigo}] ${this.nome} (${this.categoria}) — ${this.cargaHorariaSemanalHoras}h/semana (${this.CalcularCargaEmMinutos()} min)`;
    }
}


// Como utilizar a classe:

// Criando três instâncias
const disciplina1 = new Disciplina(
    "ADS201",
    "Programação Orientada a Objetos",
    "Computação",
    4
);
console.log(disciplina1.ExibirResumo());

const disciplina2 = new Disciplina(
    "ADS201",
    "Estrutura de Dados",
    "Computação",
    4
);
console.log(disciplina2.ExibirResumo());

const disciplina3 = new Disciplina(
    "ADS201",
    "Banco de Dados Avançado",
    "Computação",
    4
);
console.log(disciplina3.ExibirResumo());

const disciplinas = {
    disciplina1: disciplina1,
    disciplina2: disciplina2,
    disciplina3: disciplina3
};


// Passo 2: Encapsulamento

// Classe MetaEstudo privada
class MetaEstudo {
    #metaMinutosSemana;
    #minutosCumpridos;

    constructor(metaMinutosSemana) {
        this.#minutosCumpridos = 0;
        this.RedefinirMeta(metaMinutosSemana);
    }

    RegistrarAvanco(minutos) {
        if (minutos <= 0 || minutos > 480) {
            return false;
        } else {
            this.#minutosCumpridos += minutos;
            return true;
        }
    }

    RedefinirMeta(novaMeta) {
        if (novaMeta < 30) {
            novaMeta = 30;
        } else if (novaMeta > 3000) {
            novaMeta = 3000;
        }
        this.#metaMinutosSemana = novaMeta;
    }

    CalcularPercentual() {
        let percentual = (this.#minutosCumpridos / this.#metaMinutosSemana) * 100;
        if (percentual > 100) {
            return 100.0;
        } else {
            return percentual;
        }
    }

    EstaCumprida() {
        return this.#minutosCumpridos >= this.#metaMinutosSemana;
    }

    GetMinutosCumpridos() {
    return this.#minutosCumpridos;
    }

    // Passo 6: exportação para JSON
    ParaJson() {
    return JSON.stringify({
        metaMinutosSemana: this.#metaMinutosSemana,
        minutosCumpridos: this.#minutosCumpridos,
        percentual: this.CalcularPercentual(),
        cumprida: this.EstaCumprida()
    });
    }
}

// Teste de mesa
const meta = new MetaEstudo(100);

console.log(meta.RegistrarAvanco(-20));
console.log(meta.GetMinutosCumpridos());

console.log(meta.RegistrarAvanco(900));
console.log(meta.GetMinutosCumpridos());

//console.log(meta.RegistrarAvanco(60));
console.log(meta.GetMinutosCumpridos());

console.log(meta.CalcularPercentual() + "%");


// Passo 3: Herança

// Classe Abstrata Usuario

class Usuario {
    #id;
    #nome;
    #email;
    #senha;

    constructor(id, nome, email, senha) {
        if (new.target === Usuario) {
            throw new Error("Classe abstrata!");
        }

        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
    }

    GetId() {
        return this.#id;
    }

    GetNome() {
        return this.#nome;
    }

    GetEmail() {
        return this.#email;
    }

    Autenticar(senhaDigitada) {
        if (senhaDigitada === this.#senha) {
            return true;
        } else {
            return false;
        }
    }

    ObterTipoPerfil() {
        throw new Error("Método abstrato!");
    }

    GerarPainelResumo() {
        throw new Error("Método abstrato!");
    }
}


// Três subclasses concretas de Usuario
class Administrador extends Usuario {
    constructor (id, nome, email, cargo, senha) {
        super(id, nome, email, senha);
        this.cargo = cargo;
    }
    // sobrescever ObterTipoPerfil
    ObterTipoPerfil() {
        return "Administrador";
    }
    // sobrescever GerarPainelResumo
    GerarPainelResumo() {
        return `Administrador: ${this.GetNome()} - Cargo: ${this.cargo}`;
    }
}

class Responsavel extends Usuario{
    constructor (id, nome, email, parentesco, senha){
        super(id, nome, email, senha);
        this.parentesco = parentesco;
    }
    // sobrescever ObterTipoPerfil
    ObterTipoPerfil() {
        return "Responsável";
    }
    // sobrescever GerarPainelResumo
    GerarPainelResumo() {
        return `Responsável: ${this.GetNome()} - Parentesco: ${this.parentesco}`;
    }

    // Passo 7

    #discentesAcompanhados = [];
    #metasEstudo = new Map();
    // Método VincularDiscente
    VincularDiscente(discente) {
        if (!(discente instanceof Discente)) {
            return false;
        }

        if (this.#discentesAcompanhados.includes(discente)) {
            return false;
        }

        this.#discentesAcompanhados.push(discente);
        return true;
    }
}

class Discente extends Usuario{
    constructor (id, nome, email, ra, xpTotal, senha){
        super(id, nome, email, senha);
        this.ra = ra;
        this.xpTotal = 0;
    }
    // sobrescever ObterTipoPerfil
    ObterTipoPerfil() {
        return "Discente";
    }
    // sobrescever GerarPainelResumo
    GerarPainelResumo() {
        return `Discente: ${this.GetNome()} - RA: ${this.ra} - XP: ${this.xpTotal}`;
    }

    // Passo 5: Polimorfismo estático

    // Lista privada histórico de sessões de estudo
    #historicoSessoes = [];


RegistrarEstudo(arg1, arg2, arg3, arg4) {
    if (arg1 instanceof SessaoEstudo) {
        // Forma 1: com xpTotal
        const sessao = arg1;

        this.#historicoSessoes.push(sessao);
        this.xpTotal += sessao.CalcularXp();

    } else if (arg1 instanceof Disciplina && arg3 === undefined && arg4 === undefined) {
        // Forma 2: cria SessaoPomodoro
        const disciplina = arg1;
        const minutos = arg2;

        const ciclos = Math.max(1, Math.floor(minutos / 25));

        const sessao = new SessaoPomodoro(
            disciplina,
            minutos,
            ciclos
        );

        this.RegistrarEstudo(sessao);

    } else if (arg1 instanceof Disciplina && arg3 !== undefined && arg4 !== undefined) {
        // Forma 3: por horário
        const disciplina = arg1;
        const horaInicio = arg2;
        const horaFim = arg3;
        const paginasLidas = arg4;

        const minutos = (horaFim - horaInicio) * 60;

        const sessao = new SessaoLeitura(
            disciplina,
            minutos,
            paginasLidas,
            true
        );

        this.RegistrarEstudo(sessao);

    } else {
        throw new Error("Argumentos inválidos!");
    }
 }
}

const discente = new Discente(
    1,
    "João",
    "joao@email.com",
    "RA001",
    0,
    "123456"
);

const responsavel = new Responsavel(
    2,
    "Maria",
    "maria@email.com",
    "Mãe",
    "123456"
);

responsavel.VincularDiscente(discente);


// Passo 4: Polimorfismo

// Classe SessaoEstudo
class SessaoEstudo {
    #disciplina;
    #duracaoMinutos;

    constructor(disciplina, duracaoMinutos) {
        if (new.target === SessaoEstudo) {
            throw new Error("Classe abstrata!");
        }
        this.#disciplina = disciplina;
        this.#duracaoMinutos = duracaoMinutos;
    }

    GetDisciplina() {
        return this.#disciplina;
    }

    GetDuracaoMinutos() {
        return this.#duracaoMinutos;
    }

    ObterModalidade() {
        throw new Error("Método abstrato!");
    }

    CalcularXp() {
        throw new Error("Método abstrato!");
    }

    //Método virtual
    GerarFeedback() {
        return `${this.ObterModalidade()} em ${this.#disciplina.GetNome()} (${this.#duracaoMinutos} min) -> +${this.CalcularXp()} XP`;
    }

    //Passo 6: exportação para JSON
    ParaJson() {
    return JSON.stringify({
        disciplina: this.GetDisciplina().GetNome(),
        modalidade: this.ObterModalidade(),
        duracaoMinutos: this.GetDuracaoMinutos(),
        xp: this.CalcularXp()
    });
    }
}

// Três subclasses concretas de SessaoEstudo
class SessaoPomodoro extends SessaoEstudo {
    constructor(disciplina, duracaoMinutos, ciclosCompletos) {
        super(disciplina, duracaoMinutos);
        this.ciclosCompletos = ciclosCompletos;
    }

    ObterModalidade() {
        return "Pomodoro";
    }

    CalcularXp() {
        return this.GetDuracaoMinutos() * 2 + (this.ciclosCompletos * 15);
    }

    GerarFeedback() {
        return `${super.GerarFeedback()} - Ciclos completos: ${this.ciclosCompletos}`;
    }
}

class SessaoExercicios extends SessaoEstudo{
    constructor (disciplina, duracaoMinutos, totalQuestoes, acertos) {
        super(disciplina, duracaoMinutos);
        this.totalQuestoes = totalQuestoes;
        this.acertos = acertos;
    }

    ObterModalidade() {
        return "Exercícios";
    }

    CalcularXp() {
        return this.GetDuracaoMinutos() + (this.acertos * 10);
    }
    // Feedback em porcentagem
    GerarFeedback() {
        let percentual = this.totalQuestoes > 0
        ? (this.acertos / this.totalQuestoes) * 100
        : 0;
        // O toFixed(1) limita à uma casa decimal
    return `${super.GerarFeedback()} - Acertos: ${percentual.toFixed(1)}%`;
    }
}

class SessaoLeitura extends SessaoEstudo{
    constructor (disciplina, duracaoMinutos, paginasLidas, fezResumo) {
        super(disciplina, duracaoMinutos);
        this.paginasLidas = paginasLidas;
        this.fezResumo = fezResumo;
    }

    ObterModalidade() {
        return "Leitura";
    }

    CalcularXp() {
        return this.GetDuracaoMinutos() + (this.paginasLidas * 3) + (this.fezResumo ? 25 : 0);
    }

    GerarFeedback() {
        return `${super.GerarFeedback()} - Páginas lidas: ${this.paginasLidas} - Resumo feito: ${this.fezResumo ? "Sim" : "Não"}`;
    }
}

// Array de sessões de estudo
const sessoes = [
    new SessaoPomodoro(disciplina1, 50, 3),
    new SessaoExercicios(disciplina2, 40, 20, 18),
    new SessaoLeitura(disciplina3, 30, 15, true)
];

let xpTotal = 0;
// Percorrer o array com um único foreach, com feedback de xp
sessoes.forEach(sessao => {
    console.log(sessao.GerarFeedback());
    xpTotal += sessao.CalcularXp();
});

console.log(`XP Total: ${xpTotal}`);


// Passo 6

// Criação de interface
class INotificador {
    ObterCanal(){
        throw new Error("Método ObterCanal deve ser implementado!");
    }
    EnviarAlerta(destinatario, mensagem) {
        throw new Error("Método EnviarAlerta deve ser implementado!");
    }

}

// Classes que assinam a interface
class NotificadorEmail extends INotificador {
    ObterCanal() {
        return "E-mail";
    }
    EnviarAlerta(destinatario, mensagem) {
        console.log(`Enviando alerta por e-mail para ${destinatario}: ${mensagem}`);
        return true;
    }
}

class NotificadorWhatsApp extends INotificador {
    ObterCanal() {
        return "WhatsApp";
    }
    EnviarAlerta(destinatario, mensagem) {
        console.log(`Enviando alerta por WhatsApp para ${destinatario}: ${mensagem}`);
        return true;
    }
} 

// Função para verificar se um objeto implementa a interface INotificador
function verificarNotificador(obj) {
    return typeof obj.ObterCanal === "function"
        && typeof obj.EnviarAlerta === "function";
}

// Passo 7: Associação
class TrilhaEstudo {
    #disciplinas = [];

    constructor(titulo, administrador) {
        this.titulo = titulo;
        this.administrador = administrador;
    }

    AdicionarDisciplina(disciplina) {
        if (disciplina instanceof Disciplina) {
            this.#disciplinas.push(disciplina);
            return true;
        }

        return false;
    }

    CalcularCargaHorariaTotal() {
    let totalHoras = 0;

    for (const disciplina of this.#disciplinas) {
        totalHoras += disciplina.CalcularCargaEmMinutos() / 60;
    }

    return totalHoras;
    }
}

// Passo 8

class ItemCronograma{
    constructor(diaSemana, minutosPlanejados) {
        this.diaSemana = diaSemana;
        this.minutosPlanejados = minutosPlanejados;
    }
}

class PlanoEstudo {
    #ItemCronograma = [];

    AdicionarItem(diaSemana, minutosPlanejados) {
        const item = new ItemCronograma(diaSemana, minutosPlanejados);
        this.#ItemCronograma.push(item);
    }
}


class ServicoAlertaResponsavel {
    AvaliarDiscente(discente, meta, responsavel, notificador) {
        const percentual = meta.CalcularPercentual();

        let mensagem;

        if (percentual >= 100) {
            mensagem = `Parabéns! ${discente.GetNome()} atingiu 100% da meta de estudo!`;
        } else {
            mensagem = `${discente.GetNome()} cumpriu ${percentual.toFixed(1)}% da meta de estudo.`;
        }

        return notificador.EnviarAlerta(
            responsavel.GetEmail(),
            mensagem
        );
    }
}

//Conexão backend

const conectorBackend = new ConectorBackend();

// Exibir os resumos ao carregar a página
document.getElementById("resumoDiscente").textContent =
    discente.GerarPainelResumo();

document.getElementById("resumoResponsavel").textContent =
    responsavel.GerarPainelResumo();

document.getElementById("registrarEstudo").addEventListener("click", async () => {

    // 1. Ler os dados do formulário
    const disciplinaSelecionada = document.getElementById("disciplina").value;
    const modalidade = document.getElementById("modalidade").value;
    const minutos = Number(document.getElementById("minutos").value);
    const dadoExtra = Number(document.getElementById("dadoExtra").value);

    // 2. Recuperar o objeto Disciplina
    const disciplina = disciplinas[disciplinaSelecionada];

    if (
    !disciplina ||
    !Number.isInteger(minutos) ||
    minutos <= 0 ||
    minutos > 480
    ) {
        alert("Selecione uma disciplina e informe uma duração entre 1 e 480 minutos.");
        return;
    }

// 3. Criar a sessão de estudo
let sessao;

    if (modalidade === "pomodoro") {

    // Calcular o máximo de ciclos completos
    const ciclosMaximos = Math.floor(minutos / 25);

    // Validar a quantidade informada
    if (
        !Number.isInteger(dadoExtra) ||
        dadoExtra < 0 ||
        dadoExtra > ciclosMaximos
    ) {
        alert(
            `Para ${minutos} minutos, você pode registrar no máximo ${ciclosMaximos} ciclo(s) completo(s).`
        );
        return;
    }

    // Criar a sessão
    sessao = new SessaoPomodoro(
        disciplina,
        minutos,
        dadoExtra
    );

    } else if (modalidade === "exercicios") {

        // Implementaremos os campos de questões e acertos

    } else if (modalidade === "leitura") {

        // Implementaremos páginas e resumo

    }

    // Impede o registro se a sessão não foi criada
    if (!sessao) {
        alert("Selecione uma modalidade válida. Por enquanto, teste Pomodoro.");
        return;
    }
    // 4. Registrar localmente
    discente.RegistrarEstudo(sessao);
    meta.RegistrarAvanco(minutos);
    
    document.getElementById("resumoDiscente").textContent =
        discente.GerarPainelResumo();

    const percentual = meta.CalcularPercentual();

    document.getElementById("progressoPreenchido").style.width =
        `${percentual}%`;

    document.getElementById("percentualMeta").textContent =
        `${percentual.toFixed(1)}% concluído`;

    const item = document.createElement("li");
    item.textContent = sessao.GerarFeedback();

    document.getElementById("listaFeedback").appendChild(item);

    // 5. Salvar no backend C#
    try {
        const resultado = await conectorBackend.salvarSessaoNoBanco(
            discente.GetNome(),
            sessao
        );

        console.log("Sessão salva no servidor:", resultado);

    } catch (erro) {
        console.error("Erro ao salvar no servidor:", erro);
    }

});
