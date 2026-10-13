

const CHAVE_USUARIOS = 'usuarios';

const USUARIOS_INICIAIS = [
  { email: 'admin@teste.com', senha: '123456', nome: 'Administrador' },
  { email: 'aluno@teste.com', senha: 'react2026', nome: 'Aluno' },
];

function lerUsuarios() {
  try {
    const salvos = JSON.parse(localStorage.getItem(CHAVE_USUARIOS));
    if (Array.isArray(salvos)) return salvos;
  } catch {
  }
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(USUARIOS_INICIAIS));
  return USUARIOS_INICIAIS;
}

function semSenha({ email, nome }) {
  return { email, nome };
}

const normalizarEmail = (email) => email.trim().toLowerCase();


export async function entrar(email, senha) {
  const usuario = lerUsuarios().find(
    (u) => u.email === normalizarEmail(email) && u.senha === senha
  );

  if (!usuario) {
    return { ok: false, erro: 'E-mail ou senha inválidos.' };
  }

  return { ok: true, usuario: semSenha(usuario) };
}

export async function cadastrar({ nome, email, senha }) {
  const usuarios = lerUsuarios();
  const emailFinal = normalizarEmail(email);

  if (usuarios.some((u) => u.email === emailFinal)) {
    return { ok: false, erro: 'Já existe uma conta com esse e-mail.' };
  }

  const novo = { nome: nome.trim(), email: emailFinal, senha };
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify([...usuarios, novo]));

  return { ok: true, usuario: semSenha(novo) };
}
