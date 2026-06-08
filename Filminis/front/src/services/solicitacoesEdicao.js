
const CHAVE = "solicitacoes_edicao_cinelist";

export function listarSolicitacoes() {
    try {
        return JSON.parse(localStorage.getItem(CHAVE)) || [];
    } catch {
        return [];
    }
}

export function salvarSolicitacao(solicitacao) {
    const atuais = listarSolicitacoes();
    atuais.push(solicitacao);
    localStorage.setItem(CHAVE, JSON.stringify(atuais));
}

export function removerSolicitacao(idSolicitacao) {
    const restantes = listarSolicitacoes().filter((s) => s.idSolicitacao !== idSolicitacao);
    localStorage.setItem(CHAVE, JSON.stringify(restantes));
}
