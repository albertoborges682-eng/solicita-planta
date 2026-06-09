from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel

from database import engine, Base, SessionLocal
from models import Solicitacao

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


class SolicitacaoCreate(BaseModel):
    protocolo: str
    nome: str
    cpf: str
    telefone: str
    endereco: str
    tipo_projeto: str
    descricao: str
    status: str


@app.get("/")
def home():
    return {"mensagem": "API Solicita Planta funcionando!"}


@app.post("/solicitacao")
def criar_solicitacao(dados: SolicitacaoCreate):

    db = SessionLocal()

    nova_solicitacao = Solicitacao(
        protocolo=dados.protocolo,
        nome=dados.nome,
        cpf=dados.cpf,
        telefone=dados.telefone,
        endereco=dados.endereco,
        tipo_projeto=dados.tipo_projeto,
        descricao=dados.descricao,
        status=dados.status,
    )

    db.add(nova_solicitacao)
    db.commit()

    return {"mensagem": "Solicitação criada com sucesso!"}


@app.get("/solicitacao/{protocolo}")
def buscar_solicitacao(protocolo: str):

    db = SessionLocal()

    solicitacao = db.query(Solicitacao).filter(
        Solicitacao.protocolo == protocolo
    ).first()

    if not solicitacao:
        return {"erro": "Solicitação não encontrada"}

    return {
        "protocolo": solicitacao.protocolo,
        "nome": solicitacao.nome,
        "cpf": solicitacao.cpf,
        "telefone": solicitacao.telefone,
        "endereco": solicitacao.endereco,
        "tipo_projeto": solicitacao.tipo_projeto,
        "descricao": solicitacao.descricao,
        "status": solicitacao.status,
    }


@app.get("/solicitacoes")
def listar_solicitacoes():

    db = SessionLocal()

    solicitacoes = db.query(Solicitacao).all()

    resultado = []

    for solicitacao in solicitacoes:

        resultado.append({
            "protocolo": solicitacao.protocolo,
            "nome": solicitacao.nome,
            "cpf": solicitacao.cpf,
            "telefone": solicitacao.telefone,
            "endereco": solicitacao.endereco,
            "tipo_projeto": solicitacao.tipo_projeto,
            "descricao": solicitacao.descricao,
            "status": solicitacao.status,
        })

    return resultado

@app.put("/editar/{protocolo}")
def editar_solicitacao(
    protocolo: str,
    dados: SolicitacaoCreate
):

    db = SessionLocal()

    solicitacao = db.query(Solicitacao).filter(
        Solicitacao.protocolo == protocolo
    ).first()

    if not solicitacao:
        return {"erro": "Solicitação não encontrada"}

    solicitacao.nome = dados.nome
    solicitacao.cpf = dados.cpf
    solicitacao.telefone = dados.telefone
    solicitacao.endereco = dados.endereco
    solicitacao.tipo_projeto = dados.tipo_projeto
    solicitacao.descricao = dados.descricao

    db.commit()

    return {
        "mensagem": "Solicitação atualizada com sucesso!"
    }

@app.put("/cancelar/{protocolo}")
def cancelar_solicitacao(protocolo: str):

    db = SessionLocal()

    solicitacao = db.query(Solicitacao).filter(
        Solicitacao.protocolo == protocolo
    ).first()

    if not solicitacao:
        return {"erro": "Solicitação não encontrada"}

    solicitacao.status = "Cancelada"

    db.commit()

    return {"mensagem": "Solicitação cancelada com sucesso!"}